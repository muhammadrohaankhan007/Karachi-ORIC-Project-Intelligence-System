/**
 * Export & Report Generation Manager
 * Generates comprehensive multi-sheet Excel workbooks via SheetJS,
 * PDF Executive Dossiers, and clean CSV data files.
 */

class ExportManager {
  constructor() {}

  /**
   * 1. Multi-Sheet Excel Workbook Export
   */
  exportToExcel(projects, currentFilters = {}) {
    if (!projects || projects.length === 0) {
      alert("No project data available to export.");
      return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet 1: Master Projects & Analysis
    const masterData = projects.map((p, idx) => {
      const intel = p.intelligence || {};
      const score = p.scoreData || {};
      const crit = score.criteriaScores || {};

      return {
        "Record #": idx + 1,
        "Project Title": p.title,
        "Department": p.department,
        "Faculty": p.facultyName,
        "Student(s)": p.studentName,
        "Class/Semester": p.studentClass,
        "Course Code": p.courseCode,
        "Primary Discipline": intel.primaryDiscipline || "",
        "Specialization": intel.specialization || "",
        "Secondary Specialization": intel.secondarySpecialization || "",
        "Matched Karachi Industry": intel.industryMatch || "",
        "Industry Match Type": intel.isDirectIndustryMatch ? "Direct" : "Inferred",
        "Solution Type": intel.solutionType || "",
        "TRL Level": intel.trlLevel || "",
        "IP Potential": intel.ipPotential || "",
        "Commercial Pathway": intel.commercialPathway || "",
        "ORIC Status": (window.app && window.app.oricPipeline) ? window.app.oricPipeline.getProjectStatus(p.id) : "Under Review",
        "Total Weighted Score (/100)": score.totalScore || 0,
        "Potential Tier": score.tier || "",
        "Analysis Confidence": score.confidence || "",
        "Score: Karachi Relevance (20%)": crit.relevance ? crit.relevance.score : "",
        "Score: Customer Demand (20%)": crit.demand ? crit.demand.score : "",
        "Score: Commercial Feasibility (15%)": crit.commercial ? crit.commercial.score : "",
        "Score: Differentiation (15%)": crit.differentiation ? crit.differentiation.score : "",
        "Score: Tech Feasibility (10%)": crit.feasibility ? crit.feasibility.score : "",
        "Score: Scalability (10%)": crit.scalability ? crit.scalability.score : "",
        "Score: Local Impact (10%)": crit.localImpact ? crit.localImpact.score : "",
        "Target Customer in Karachi": intel.targetCustomer || "",
        "Identified Problem": intel.problemIdentified || "",
        "Proposed Use Case": intel.proposedUseCase || "",
        "Recommended ORIC Action": intel.oricRecommendedAction || "",
        "Original Abstract": p.abstract
      };
    });

    const wsMaster = XLSX.utils.json_to_sheet(masterData);
    XLSX.utils.book_append_sheet(wb, wsMaster, "Master_Projects_Analysis");

    // Sheet 2: Specialization-Wise Summaries
    const specMap = {};
    projects.forEach(p => {
      const spec = p.intelligence?.specialization || "Unclassified";
      if (!specMap[spec]) {
        specMap[spec] = { count: 0, totalScore: 0, highPotentialCount: 0, discipline: p.intelligence?.primaryDiscipline || "" };
      }
      specMap[spec].count++;
      specMap[spec].totalScore += (p.scoreData?.totalScore || 0);
      if ((p.scoreData?.totalScore || 0) >= 80) specMap[spec].highPotentialCount++;
    });

    const specSummaryData = Object.entries(specMap).map(([spec, obj]) => ({
      "Specialization": spec,
      "Discipline": obj.discipline,
      "Submitted Projects": obj.count,
      "Average Market Score": Math.round(obj.totalScore / obj.count),
      "High-Potential Projects (80+)": obj.highPotentialCount,
      "Top Commercialization Pathway": "Industry Pilot / Venture Incubation"
    })).sort((a, b) => b["Average Market Score"] - a["Average Market Score"]);

    const wsSpec = XLSX.utils.json_to_sheet(specSummaryData);
    XLSX.utils.book_append_sheet(wb, wsSpec, "Specialization_Summaries");

    // Sheet 3: Karachi Industry Opportunity Mapping
    const indMap = {};
    projects.forEach(p => {
      const ind = p.intelligence?.industryMatch || "Unassigned";
      if (!indMap[ind]) {
        indMap[ind] = { count: 0, directCount: 0, topProjects: [] };
      }
      indMap[ind].count++;
      if (p.intelligence?.isDirectIndustryMatch) indMap[ind].directCount++;
      if (indMap[ind].topProjects.length < 3) {
        indMap[ind].topProjects.push(p.title);
      }
    });

    const indSummaryData = Object.entries(indMap).map(([ind, obj]) => {
      const tax = (window.KARACHI_INDUSTRY_TAXONOMY && window.KARACHI_INDUSTRY_TAXONOMY[ind]) || {};
      return {
        "Karachi Industry Sector": ind,
        "Total Projects Matched": obj.count,
        "Direct Matches": obj.directCount,
        "Major Karachi Industrial Clusters": tax.clusters ? tax.clusters.join(", ") : "Karachi Industrial Belt",
        "Key Local Companies": tax.keyCompanies ? tax.keyCompanies.join(", ") : "",
        "Verification Status": tax.verificationStatus || "Preliminary Hypothesis",
        "Sample Matched Projects": obj.topProjects.join(" | ")
      };
    }).sort((a, b) => b["Total Projects Matched"] - a["Total Projects Matched"]);

    const wsInd = XLSX.utils.json_to_sheet(indSummaryData);
    XLSX.utils.book_append_sheet(wb, wsInd, "Karachi_Industry_Mapping");

    // Sheet 4: Shortlisted Commercialization Candidates
    const shortlisted = [...projects]
      .filter(p => (p.scoreData?.totalScore || 0) >= 65)
      .sort((a, b) => (b.scoreData?.totalScore || 0) - (a.scoreData?.totalScore || 0))
      .map((p, idx) => ({
        "Rank": idx + 1,
        "Project Title": p.title,
        "Specialization": p.intelligence?.specialization,
        "Score": p.scoreData?.totalScore,
        "Pathway": p.intelligence?.commercialPathway,
        "ORIC Status": (window.app && window.app.oricPipeline) ? window.app.oricPipeline.getProjectStatus(p.id) : "Selected for Validation",
        "Target Industry": p.intelligence?.industryMatch,
        "Immediate Action": p.intelligence?.oricRecommendedAction,
        "Student Contact": p.studentName,
        "Faculty": p.facultyName
      }));

    const wsShortlist = XLSX.utils.json_to_sheet(shortlisted);
    XLSX.utils.book_append_sheet(wb, wsShortlist, "ORIC_Commercialization_Shortlist");

    // Save File
    const timestamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Karachi_University_Project_Intelligence_Report_${timestamp}.xlsx`);
  }

  /**
   * 2. CSV Data Export
   */
  exportToCSV(projects) {
    if (!projects || projects.length === 0) {
      alert("No project data available to export.");
      return;
    }

    const headers = [
      "ID", "Title", "Faculty", "Department", "Students", "Class",
      "Specialization", "Karachi Industry", "Score", "Tier", "Pathway", "ORIC Status"
    ];

    const rows = projects.map(p => {
      const intel = p.intelligence || {};
      const score = p.scoreData || {};
      const oricStatus = (window.app && window.app.oricPipeline) ? window.app.oricPipeline.getProjectStatus(p.id) : "Under Review";

      const escapeCSV = (val) => {
        const str = String(val || "").replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        p.id,
        escapeCSV(p.title),
        escapeCSV(p.facultyName),
        escapeCSV(p.department),
        escapeCSV(p.studentName),
        escapeCSV(p.studentClass),
        escapeCSV(intel.specialization),
        escapeCSV(intel.industryMatch),
        score.totalScore || 0,
        escapeCSV(score.tier),
        escapeCSV(intel.commercialPathway),
        escapeCSV(oricStatus)
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Karachi_Projects_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * 3. Professional PDF Executive Report Generation
   */
  generateExecutivePDF(projects, stats) {
    if (!projects || projects.length === 0) {
      alert("No projects available to generate report.");
      return;
    }

    // Generate styled printable HTML report in a print-ready iframe/window
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to generate and print the PDF report.");
      return;
    }

    const highPotentialCount = projects.filter(p => (p.scoreData?.totalScore || 0) >= 80).length;
    const promisingCount = projects.filter(p => (p.scoreData?.totalScore || 0) >= 65 && (p.scoreData?.totalScore || 0) < 80).length;
    const topProjects = [...projects].sort((a, b) => (b.scoreData?.totalScore || 0) - (a.scoreData?.totalScore || 0)).slice(0, 10);

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Karachi Industry–University Project Intelligence Report</title>
        <meta charset="utf-8" />
        <style>
          @page { size: A4; margin: 18mm; }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.5; font-size: 13px; margin: 0; padding: 20px; }
          .header { border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 22px; font-weight: 800; color: #0b132b; margin: 0; }
          .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
          .date-badge { font-size: 11px; background: #e2e8f0; padding: 4px 10px; border-radius: 4px; font-weight: 600; }
          
          .grid-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .stat-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #f8fafc; text-align: center; }
          .stat-num { font-size: 24px; font-weight: 800; color: #0f172a; }
          .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 600; margin-top: 2px; }

          h2 { font-size: 15px; font-weight: 700; color: #0f172a; border-left: 4px solid #2563eb; padding-left: 8px; margin: 24px 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; }
          p { margin-bottom: 10px; color: #334155; }

          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11.5px; }
          th { background: #0f172a; color: #ffffff; text-align: left; padding: 8px 10px; font-weight: 600; }
          td { border-bottom: 1px solid #e2e8f0; padding: 8px 10px; vertical-align: top; }
          tr:nth-child(even) { background: #f8fafc; }

          .badge { display: inline-block; padding: 2px 7px; border-radius: 12px; font-size: 10px; font-weight: 600; }
          .badge-emerald { background: #d1fae5; color: #065f46; }
          .badge-blue { background: #dbeafe; color: #1e40af; }
          .badge-amber { background: #fef3c7; color: #92400e; }

          .footer-note { font-size: 10px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          .no-print { text-align: right; margin-bottom: 20px; }
          .btn-print { background: #2563eb; color: #fff; border: none; padding: 8px 16px; font-size: 13px; font-weight: 600; border-radius: 6px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
        </div>

        <div class="header">
          <div>
            <div class="title">Karachi Industry–University Project Intelligence Report</div>
            <div class="subtitle">Office of Research, Innovation and Commercialization (ORIC) &bull; Strategic Assessment</div>
          </div>
          <div class="date-badge">Generated: ${new Date().toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" })}</div>
        </div>

        <div class="grid-summary">
          <div class="stat-box">
            <div class="stat-num">${projects.length}</div>
            <div class="stat-label">Projects Analysed</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #10b981;">${highPotentialCount}</div>
            <div class="stat-label">High Potential (80+)</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #0284c7;">${promisingCount}</div>
            <div class="stat-label">Promising (65-79)</div>
          </div>
          <div class="stat-box">
            <div class="stat-num" style="color: #8b5cf6;">18</div>
            <div class="stat-label">Karachi Sectors Covered</div>
          </div>
        </div>

        <h2>1. Executive Summary & Karachi Industrial Imperative</h2>
        <p>
          This intelligence dossier evaluates ${projects.length} semester projects submitted across university departments
          against empirical industrial requirements in Karachi, Sindh, Pakistan. Utilizing a 7-criteria weighted scoring matrix,
          projects are mapped to real-world industrial challenges in Karachi's key hubs—including the SITE and Korangi Industrial Areas,
          Port Qasim manufacturing cluster, I.I. Chundrigar financial district, and healthcare institutes.
        </p>

        <h2>2. Top 10 Commercialization & Industry Collaboration Candidates</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 40px;">Rank</th>
              <th>Project Title</th>
              <th>Specialization</th>
              <th>Karachi Industry Target</th>
              <th>Pathway</th>
              <th style="width: 60px;">Score</th>
            </tr>
          </thead>
          <tbody>
            ${topProjects.map((p, idx) => `
              <tr>
                <td><strong>#${idx + 1}</strong></td>
                <td><strong>${p.title}</strong><br/><span style="color:#64748b; font-size:10px;">${p.studentName} | ${p.department}</span></td>
                <td>${p.intelligence?.specialization || ""}</td>
                <td>${p.intelligence?.industryMatch || ""}</td>
                <td>${p.intelligence?.commercialPathway || ""}</td>
                <td>
                  <span class="badge ${p.scoreData?.totalScore >= 80 ? 'badge-emerald' : 'badge-blue'}">
                    ${p.scoreData?.totalScore}/100
                  </span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <h2>3. Priority Action Plan for ORIC & Incubator Management</h2>
        <p>
          <strong>Immediate 30-Day Mandate:</strong> Initiate structured stakeholder discovery sessions with industrial associations
          (P@SHA, PPMA, APTMA, KCCI). Establish non-confidential technology briefs for the ${highPotentialCount} high-potential candidates.
        </p>
        <p>
          <strong>Regulatory & IP Governance:</strong> Assist student-faculty teams in filing provisional utility patents and software copyright registrations with IPO-Pakistan. Ensure DRAP Medical Device Rules compliance where diagnostic hardware is proposed.
        </p>

        <div class="footer-note">
          <strong>Methodology & Limitations:</strong> Analysis conducted by Karachi Industry–University Intelligence Engine.
          Heuristic scoring is based on disclosed project abstracts. Unverified claims require on-site technical inspection and customer validation.
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();
  }
}

if (typeof window !== "undefined") {
  window.ExportManager = ExportManager;
}
