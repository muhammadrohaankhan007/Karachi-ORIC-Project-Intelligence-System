/**
 * Excel Processor Module
 * Powered by SheetJS (xlsx.full.min.js)
 * Robust ingestion, column matching, validation, and template generation.
 */

class ExcelProcessor {
  constructor() {
    this.columnMappings = {
      facultyName: ["faculty name", "faculty", "teacher", "instructor", "professor", "advisor", "faculty member"],
      department: ["department / faculty", "department", "dept", "academic department", "faculty / department", "program"],
      studentName: ["student name", "student", "students", "group members", "author", "student names", "name of students"],
      studentRegNo: ["student registration number", "registration number", "reg no", "reg. no", "roll no", "student id", "cms id", "registration #"],
      studentClass: ["student class / semester", "student class", "semester", "class", "batch", "term", "academic year"],
      courseCode: ["course code", "course", "subject code", "course #", "course id"],
      projectTitle: ["project title", "title", "project name", "topic", "project"],
      projectAbstract: ["project abstract", "abstract", "description", "summary", "project summary", "synopsis", "abstract / summary"],
      supervisorName: ["supervisor name", "supervisor", "co-supervisor", "guide", "project supervisor"],
      existingCategory: ["existing project category", "existing category", "category", "discipline", "subject area"]
    };
  }

  /**
   * Process an uploaded file (File object)
   * Returns Promise<{ rawRows, mappedRecords, stats, detectedColumns, unmappedColumns }>
   */
  async processFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array", cellDates: true });

          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error("The uploaded Excel workbook contains no sheets.");
          }

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          if (!rawRows || rawRows.length === 0) {
            throw new Error("The uploaded sheet contains no data rows.");
          }

          const headerKeys = Object.keys(rawRows[0] || {});
          const autoMap = this.detectColumnMapping(headerKeys);
          const { records, stats } = this.transformAndValidate(rawRows, autoMap);

          resolve({
            workbook,
            sheetName: firstSheetName,
            rawRows,
            headerKeys,
            columnMapping: autoMap,
            records,
            stats
          });
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = (err) => reject(new Error("File reading failed: " + err.message));

      if (file.name.endsWith(".csv")) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }

  /**
   * Automatically detect column mappings based on fuzzy header name matching
   */
  detectColumnMapping(headers) {
    const mapping = {};
    const normalizedHeaders = headers.map(h => ({
      original: h,
      clean: String(h).toLowerCase().trim().replace(/[\s_\-]+/g, " ")
    }));

    for (const [field, aliases] of Object.entries(this.columnMappings)) {
      let matchedHeader = null;

      // Exact or alias match
      for (const nh of normalizedHeaders) {
        if (aliases.includes(nh.clean)) {
          matchedHeader = nh.original;
          break;
        }
      }

      // Substring fuzzy match fallback
      if (!matchedHeader) {
        for (const nh of normalizedHeaders) {
          for (const alias of aliases) {
            if (nh.clean.includes(alias) || alias.includes(nh.clean)) {
              matchedHeader = nh.original;
              break;
            }
          }
          if (matchedHeader) break;
        }
      }

      mapping[field] = matchedHeader || "";
    }

    return mapping;
  }

  /**
   * Transform raw rows using the column mapping, validate records, flag duplicates & missing data
   */
  transformAndValidate(rawRows, mapping) {
    const records = [];
    const titleSeen = new Map();
    let totalUploaded = rawRows.length;
    let validCount = 0;
    let flaggedCount = 0;
    let duplicateCount = 0;

    rawRows.forEach((row, index) => {
      const getVal = (field) => {
        const colHeader = mapping[field];
        if (!colHeader || row[colHeader] === undefined) return "";
        return String(row[colHeader]).trim();
      };

      const title = getVal("projectTitle");
      const abstract = getVal("projectAbstract");
      const faculty = getVal("facultyName");
      const department = getVal("department");
      const studentName = getVal("studentName");
      const studentRegNo = getVal("studentRegNo");
      const studentClass = getVal("studentClass");
      const courseCode = getVal("courseCode");
      const supervisor = getVal("supervisorName");
      const existingCategory = getVal("existingCategory");

      const flags = [];
      let isDuplicate = false;

      // Check required fields
      if (!title || title.length < 5) {
        flags.push("Missing or incomplete project title");
      }
      if (!abstract || abstract.length < 20) {
        flags.push("Missing or insufficiently detailed abstract (<20 chars)");
      }

      // Check duplicate records
      const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (normalizedTitle && titleSeen.has(normalizedTitle)) {
        isDuplicate = true;
        duplicateCount++;
        flags.push(`Duplicate project title (matches record #${titleSeen.get(normalizedTitle)})`);
      } else if (normalizedTitle) {
        titleSeen.set(normalizedTitle, index + 1);
      }

      const isValid = flags.length === 0;
      if (isValid) {
        validCount++;
      } else {
        flaggedCount++;
      }

      records.push({
        id: `proj-${index + 1}`,
        recordIndex: index + 1,
        title: title || "[Untitled Project]",
        abstract: abstract || "[No abstract provided]",
        facultyName: faculty || "Not Specified",
        department: department || "Not Specified",
        studentName: studentName || "Not Specified",
        studentRegNo: studentRegNo || "",
        studentClass: studentClass || "Semester Project",
        courseCode: courseCode || "N/A",
        supervisorName: supervisor || faculty || "Not Specified",
        existingCategory: existingCategory || "General",
        rawRow: row,
        isValid,
        isDuplicate,
        flags
      });
    });

    const stats = {
      totalUploaded,
      validRecords: validCount,
      flaggedRecords: flaggedCount,
      duplicateRecords: duplicateCount
    };

    return { records, stats };
  }

  /**
   * Generate an official, downloadable template Excel file
   */
  downloadTemplate() {
    const templateHeaders = [
      "Faculty Name",
      "Department / Faculty",
      "Student Name",
      "Student Registration Number (optional)",
      "Student Class / Semester",
      "Course Code",
      "Project Title",
      "Project Abstract",
      "Supervisor Name (optional)",
      "Existing Project Category (optional)"
    ];

    const sampleRow = [
      "Dr. Muhammad Khurram",
      "Computer & Information Systems Engineering",
      "Hamza Tariq, Bilal Ahmed, Ayesha Siddiqui",
      "BCS-2022-041",
      "BS CS Final Year (Semester 8)",
      "CS-499",
      "AI-Powered Computer Vision for Automated Fabric Defect Detection in High-Speed Textile Looms",
      "High-speed weaving looms operating in Karachi's SITE and Korangi industrial zones suffer from substantial fabric rejections due to unspotted yarn mispicks, holes, and oil stains. This project presents a real-time computer vision system deployed on an edge NVIDIA Jetson module mounted directly onto industrial air-jet looms. We trained an optimized YOLOv8 convolutional architecture on a custom dataset of 12,000 Karachi textile mill fabric samples. The system inspects woven cloth at line speeds exceeding 60 meters/minute, flagging defects with 94.2% accuracy and triggering an automated pneumatic loom pause.",
      "Prof. Dr. Tariq Jamil Khan",
      "Computer Science - AI/ML"
    ];

    const wsData = [templateHeaders, sampleRow];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Auto-fit column widths
    const colWidths = templateHeaders.map((h, i) => {
      const maxLen = Math.max(h.length, String(sampleRow[i] || "").length);
      return { wch: Math.min(Math.max(maxLen + 4, 15), 50) };
    });
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Project_Template");

    XLSX.writeFile(wb, "Karachi_University_Project_Template.xlsx");
  }
}

if (typeof window !== "undefined") {
  window.ExcelProcessor = ExcelProcessor;
}
