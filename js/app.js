/**
 * Karachi Industry–University Project Intelligence System - Main Application Controller
 * Integrates Excel Processing, Intelligence Analysis, 7-Criteria Scoring,
 * Visualizations, ORIC Pipeline, and Export Reporting.
 */

class KarachiIntelligenceApp {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.activeTab = "dashboard";
    this.selectedProject = null;

    // Sub-modules
    this.excelProcessor = new ExcelProcessor();
    this.intelligenceEngine = new IntelligenceEngine(window.KARACHI_INDUSTRY_TAXONOMY, window.SUBJECT_TAXONOMY);
    this.scoringEngine = new ScoringEngine();
    this.oricPipeline = new OricPipeline();
    this.chartsManager = new ChartsManager();
    this.exportManager = new ExportManager();
    this.aiIntegration = new AIIntegration();

    // Filters state
    this.filters = {
      search: "",
      department: "all",
      specialization: "all",
      industry: "all",
      tier: "all",
      pathway: "all",
      oricStatus: "all"
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDropzone();
    this.populateFilterDropdowns();
    this.loadInitialDemoData();
  }

  /**
   * Load the rich demonstration dataset of Karachi University projects
   */
  loadInitialDemoData() {
    if (window.SAMPLE_PROJECTS_DATA && window.SAMPLE_PROJECTS_DATA.length > 0) {
      const { records, stats } = this.excelProcessor.transformAndValidate(
        window.SAMPLE_PROJECTS_DATA,
        {
          projectTitle: "projectTitle",
          projectAbstract: "projectAbstract",
          facultyName: "facultyName",
          department: "department",
          studentName: "studentName",
          studentRegNo: "studentRegNo",
          studentClass: "studentClass",
          courseCode: "courseCode",
          supervisorName: "supervisorName",
          existingCategory: "existingCategory"
        }
      );

      this.processUploadedRecords(records, stats);
      this.showToast(`Loaded ${records.length} authentic Karachi University semester projects for demonstration.`, "info");
    }
  }

  /**
   * Process raw mapped records through Intelligence & Scoring Engines
   */
  processUploadedRecords(rawRecords, stats = null) {
    this.projects = rawRecords.map(rec => {
      const intelligence = this.intelligenceEngine.analyzeProject(rec);
      const scoreData = this.scoringEngine.evaluateProject(rec, intelligence);

      return {
        ...rec,
        intelligence,
        scoreData
      };
    });

    this.applyFilters();
    this.updateUploadStats(stats || {
      totalUploaded: this.projects.length,
      validRecords: this.projects.filter(p => p.isValid).length,
      flaggedRecords: this.projects.filter(p => !p.isValid).length,
      duplicateRecords: this.projects.filter(p => p.isDuplicate).length
    });
    this.renderAllViews();
  }

  /**
   * Filter and search logic
   */
  applyFilters() {
    const q = this.filters.search.toLowerCase().trim();

    this.filteredProjects = this.projects.filter(p => {
      // Search query across title, abstract, student, faculty, specialization, industry
      if (q) {
        const text = [
          p.title,
          p.abstract,
          p.studentName,
          p.facultyName,
          p.department,
          p.intelligence?.specialization,
          p.intelligence?.industryMatch
        ].join(" ").toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Department filter
      if (this.filters.department !== "all" && p.department !== this.filters.department) {
        return false;
      }

      // Specialization filter
      if (this.filters.specialization !== "all" && p.intelligence?.specialization !== this.filters.specialization) {
        return false;
      }

      // Industry filter
      if (this.filters.industry !== "all" && p.intelligence?.industryMatch !== this.filters.industry) {
        return false;
      }

      // Potential Tier filter
      if (this.filters.tier !== "all" && p.scoreData?.tier !== this.filters.tier) {
        return false;
      }

      // Commercialization Pathway filter
      if (this.filters.pathway !== "all" && p.intelligence?.commercialPathway !== this.filters.pathway) {
        return false;
      }

      // ORIC Status filter
      if (this.filters.oricStatus !== "all") {
        const status = this.oricPipeline.getProjectStatus(p.id);
        if (status !== this.filters.oricStatus) return false;
      }

      return true;
    });

    this.renderPortfolioTable();
    this.updateDashboardMetrics();
    this.chartsManager.updateAllCharts(this.filteredProjects);
  }

  /**
   * Render all primary views
   */
  renderAllViews() {
    this.updateDashboardMetrics();
    this.chartsManager.updateAllCharts(this.filteredProjects);
    this.renderPortfolioTable();
    this.renderSpecializationView();
    this.renderIndustryView();
    this.renderOricKanban();
  }

  /**
   * Update Executive Dashboard KPI metric cards
   */
  updateDashboardMetrics() {
    const total = this.projects.length;
    const analysed = this.projects.filter(p => p.isValid).length;

    const depts = new Set(this.projects.map(p => p.department)).size;
    const industries = new Set(this.projects.map(p => p.intelligence?.industryMatch)).size;

    const highPotential = this.projects.filter(p => (p.scoreData?.totalScore || 0) >= 80).length;
    const startups = this.projects.filter(p => (p.intelligence?.commercialPathway || "").includes("Startup")).length;
    const industryCollabs = this.projects.filter(p => (p.intelligence?.commercialPathway || "").includes("Industry Collaboration")).length;
    const needsValidation = this.projects.filter(p => (p.scoreData?.confidence === "Low") || !p.isValid).length;

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal("kpiTotalProjects", total);
    setVal("kpiAnalysedProjects", analysed);
    setVal("kpiDepartments", depts);
    setVal("kpiIndustriesMatched", industries);
    setVal("kpiHighPotential", highPotential);
    setVal("kpiStartups", startups);
    setVal("kpiIndustryCollabs", industryCollabs);
    setVal("kpiNeedsValidation", needsValidation);
  }

  /**
   * Render the Portfolio Table with badges and clickable rows
   */
  renderPortfolioTable() {
    const tbody = document.getElementById("portfolioTableBody");
    const countEl = document.getElementById("portfolioMatchCount");
    if (countEl) countEl.textContent = `${this.filteredProjects.length} Projects`;

    if (!tbody) return;

    if (this.filteredProjects.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No projects match the current search filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.filteredProjects.map(p => {
      const intel = p.intelligence || {};
      const score = p.scoreData || {};
      const oricStatus = this.oricPipeline.getProjectStatus(p.id);

      return `
        <tr class="table-row-clickable" onclick="app.openProjectDetail('${p.id}')">
          <td>
            <div style="font-weight: 600; font-size: 13.5px; color: var(--text-primary); margin-bottom: 2px;">
              ${this.escapeHtml(p.title)}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${this.escapeHtml(p.studentName)} &bull; ${this.escapeHtml(p.department)}
            </div>
          </td>
          <td>
            <span class="badge" style="background: rgba(37,99,235,0.12); color: #60a5fa; border: 1px solid rgba(37,99,235,0.25);">
              ${this.escapeHtml(intel.specialization || "General")}
            </span>
          </td>
          <td>
            <div style="font-size: 12px; font-weight: 500;">
              ${this.escapeHtml(intel.industryMatch || "General")}
            </div>
            <div style="font-size: 10px; color: ${intel.isDirectIndustryMatch ? '#34d399' : '#fbbf24'};">
              ${intel.isDirectIndustryMatch ? '&#x2714; Direct Match' : '&#x25CB; Inferred Match'}
            </div>
          </td>
          <td>
            <div class="score-pill" style="background: ${score.tierColor}20; color: ${score.tierColor}; border: 1px solid ${score.tierColor}50;">
              ${score.totalScore}/100
            </div>
          </td>
          <td>
            <span class="badge ${score.totalScore >= 80 ? 'badge-emerald' : score.totalScore >= 65 ? 'badge-blue' : score.totalScore >= 50 ? 'badge-amber' : 'badge-slate'}">
              ${this.escapeHtml(score.tier || "Evaluated")}
            </span>
          </td>
          <td>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary); border: 1px solid var(--border-color);">
              ${this.escapeHtml(oricStatus)}
            </span>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); app.openProjectDetail('${p.id}')">
              View Dossier &rarr;
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  /**
   * Render Specialization Analysis View
   * Groups projects by Discipline & Specialization, displaying sections A-D
   */
  renderSpecializationView() {
    const container = document.getElementById("specializationCardsContainer");
    if (!container) return;

    // Group projects by specialization
    const specMap = {};
    this.projects.forEach(p => {
      const spec = p.intelligence?.specialization || "General";
      if (!specMap[spec]) {
        specMap[spec] = {
          specialization: spec,
          discipline: p.intelligence?.primaryDiscipline || "General",
          projects: [],
          totalScore: 0,
          industries: new Set()
        };
      }
      specMap[spec].projects.push(p);
      specMap[spec].totalScore += (p.scoreData?.totalScore || 0);
      if (p.intelligence?.industryMatch) {
        specMap[spec].industries.add(p.intelligence.industryMatch);
      }
    });

    const specs = Object.values(specMap).sort((a, b) => b.projects.length - a.projects.length);

    container.innerHTML = specs.map(s => {
      const avgScore = Math.round(s.totalScore / s.projects.length);
      const highPot = s.projects.filter(p => (p.scoreData?.totalScore || 0) >= 80).length;

      return `
        <div class="spec-dossier-card" onclick="app.openSpecDetailModal('${this.escapeHtml(s.specialization)}')">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <span class="badge badge-purple" style="margin-bottom: 6px;">${this.escapeHtml(s.discipline)}</span>
              <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
                ${this.escapeHtml(s.specialization)}
              </h3>
            </div>
            <div class="score-pill" style="background: ${avgScore >= 80 ? '#10b98125' : '#3b82f625'}; color: ${avgScore >= 80 ? '#34d399' : '#60a5fa'};">
              ${avgScore} Avg
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px;">
            <strong>Portfolio:</strong> ${s.projects.length} Projects &bull; ${highPot} High-Potential
          </div>

          <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 16px;">
            <strong>Primary Karachi Sectors:</strong> ${Array.from(s.industries).slice(0, 2).join(", ")}
          </div>

          <button class="btn btn-secondary btn-sm" style="width: 100%;">
            Explore Specialization Dossier (Sections A–D) &rarr;
          </button>
        </div>
      `;
    }).join("");
  }

  /**
   * Modal deep-dive into Sections A-D for a Specialization
   */
  openSpecDetailModal(specName) {
    const projects = this.projects.filter(p => p.intelligence?.specialization === specName);
    if (!projects || projects.length === 0) return;

    const modal = document.getElementById("specDetailModal");
    const content = document.getElementById("specDetailModalContent");
    if (!modal || !content) return;

    const avgScore = Math.round(projects.reduce((acc, p) => acc + (p.scoreData?.totalScore || 0), 0) / projects.length);
    const primaryInds = Array.from(new Set(projects.map(p => p.intelligence?.industryMatch)));

    content.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="badge badge-blue">${this.escapeHtml(projects[0].intelligence?.primaryDiscipline || "")}</span>
        <h2 style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 8px 0 4px;">
          ${this.escapeHtml(specName)}
        </h2>
        <p style="font-size: 13px; color: var(--text-secondary);">
          Aggregated Market Intelligence and 3–5 Year Growth Prospects for Karachi Ecosystem
        </p>
      </div>

      <!-- SECTION A: PROJECT PORTFOLIO -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x25A6;</span> Section A: Project Portfolio Overview
        </div>
        <div class="detail-grid-2">
          <div>
            <p><strong>Total Projects Submitted:</strong> ${projects.length}</p>
            <p><strong>Average Market Potential:</strong> ${avgScore}/100</p>
            <p><strong>High-Priority Projects (Score &ge; 80):</strong> ${projects.filter(p => (p.scoreData?.totalScore || 0) >= 80).length}</p>
          </div>
          <div>
            <p><strong>Top Matched Karachi Industries:</strong> ${primaryInds.join(", ")}</p>
            <p><strong>Common Solution Types:</strong> ${Array.from(new Set(projects.map(p => p.intelligence?.solutionType))).join(", ")}</p>
          </div>
        </div>
      </div>

      <!-- SECTION B: MARKET POTENTIAL -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x2699;</span> Section B: Karachi Market Potential & Problem Fit
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
          <strong>Target Operational Problems:</strong> High electricity costs, unmanaged factory downtime, import reliance for key components, and compliance hurdles in Karachi industrial estates (SITE, Korangi, Port Qasim).
        </p>
        <p style="font-size: 13px; color: var(--text-secondary);">
          <strong>Customer Segments:</strong> Mid-tier manufacturers, healthcare institutions, municipal agencies (KW&SC, SSWMB), and commercial logistics operators along Mauripur freight corridor.
        </p>
      </div>

      <!-- SECTION C: COMMERCIALIZATION OPPORTUNITIES -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x1F680;</span> Section C: Commercialization Opportunities & IP
        </div>
        <div class="detail-grid-2">
          <div>
            <p><strong>Venture Creation (Startups):</strong> High opportunity for B2B digital workflows and edge IoT hardware products.</p>
            <p><strong>Sponsored R&D:</strong> Potential joint pilots with Karachi Chamber of Commerce (KCCI) sectoral members.</p>
          </div>
          <div>
            <p><strong>Import Substitution:</strong> Replacing imported components and specialized software with local formulations and systems.</p>
            <p><strong>Licensing:</strong> Technology transfer to existing manufacturing facilities with established distribution networks.</p>
          </div>
        </div>
      </div>

      <!-- SECTION D: 3-5 YEAR GROWTH PROSPECTS -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x1F4C8;</span> Section D: 3 to 5-Year Growth Prospects
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">
          <strong>Growth Drivers:</strong> Ongoing industrial digitization in Pakistan, SBP IT export retention incentives, rising energy tariffs forcing efficiency automation, and indigenization pressure from Engineering Development Board (EDB).
        </p>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">
          <strong>Key Constraints & Risks:</strong> Local venture capital liquidity, hardware component import duties, and prolonged regulatory approval timelines (DRAP / PTA).
        </p>
        <p style="font-size: 11px; color: var(--text-muted); font-style: italic;">
          * Note: Qualitative assessment based on verified Karachi industrial baseline; requires ongoing empirical validation.
        </p>
      </div>
    `;

    modal.classList.add("active");
  }

  /**
   * Render Karachi Industry Intelligence View (18+ sectors)
   */
  renderIndustryView() {
    const container = document.getElementById("industryCardsContainer");
    if (!container) return;

    const taxonomy = window.KARACHI_INDUSTRY_TAXONOMY || {};

    container.innerHTML = Object.values(taxonomy).map(ind => {
      const matchedProjects = this.projects.filter(p => p.intelligence?.industryMatch === ind.name);

      return `
        <div class="industry-card">
          <div class="industry-card-header">
            <div>
              <span class="badge badge-emerald" style="margin-bottom: 6px;">${this.escapeHtml(ind.category)}</span>
              <h3 class="industry-title">${this.escapeHtml(ind.name)}</h3>
            </div>
            <span class="badge badge-blue">${matchedProjects.length} Projects</span>
          </div>

          <div class="industry-cluster-tags">
            ${(ind.clusters || []).map(c => `<span class="cluster-tag">&#x25CE; ${this.escapeHtml(c)}</span>`).join("")}
          </div>

          <div style="font-size: 12px; color: var(--text-secondary);">
            <strong>Key Karachi Anchors:</strong> ${(ind.keyCompanies || []).slice(0, 4).join(", ")}
          </div>

          <div style="font-size: 12px; color: var(--text-secondary);">
            <strong>Operational Pain Points:</strong>
            <ul style="padding-left: 16px; margin-top: 4px; color: var(--text-muted); font-size: 11.5px;">
              ${(ind.majorProblems || []).slice(0, 2).map(p => `<li>${this.escapeHtml(p)}</li>`).join("")}
            </ul>
          </div>

          <div style="font-size: 11px; color: #10b981; font-weight: 500; margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 10px;">
            &#x2714; ${this.escapeHtml(ind.verificationStatus)} (${this.escapeHtml(ind.verifiedDate)})
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Render ORIC Kanban Pipeline
   */
  renderOricKanban() {
    const container = document.getElementById("oricKanbanBoard");
    if (!container) return;

    const stages = this.oricPipeline.statusStages;

    container.innerHTML = stages.map(stage => {
      const stageProjects = this.projects.filter(p => this.oricPipeline.getProjectStatus(p.id) === stage.label);

      return `
        <div class="kanban-col">
          <div class="kanban-col-header" style="border-top: 3px solid ${stage.color};">
            <span style="color: ${stage.color};">${this.escapeHtml(stage.label)}</span>
            <span class="badge" style="background: rgba(255,255,255,0.06); color: var(--text-secondary);">${stageProjects.length}</span>
          </div>
          <div class="kanban-cards-wrap">
            ${stageProjects.length === 0 ? `
              <div style="font-size: 11.5px; color: var(--text-muted); text-align: center; padding: 20px;">
                No projects in this stage
              </div>
            ` : stageProjects.map(p => `
              <div class="kanban-card" onclick="app.openProjectDetail('${p.id}')">
                <div style="font-size: 12.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
                  ${this.escapeHtml(p.title)}
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
                  ${this.escapeHtml(p.studentName)} &bull; ${this.escapeHtml(p.department)}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="badge" style="background: ${stage.color}20; color: ${stage.color};">
                    ${p.scoreData?.totalScore || 0}/100
                  </span>
                  <span style="font-size: 10.5px; color: var(--text-muted);">
                    ${this.escapeHtml(p.intelligence?.industryMatch || "")}
                  </span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Open the detailed Project Intelligence Dossier Modal (Section 11)
   */
  openProjectDetail(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    this.selectedProject = project;
    const modal = document.getElementById("projectDetailModal");
    const body = document.getElementById("projectDetailBody");
    if (!modal || !body) return;

    const intel = project.intelligence || {};
    const score = project.scoreData || {};
    const crit = score.criteriaScores || {};
    const milestones = this.oricPipeline.generateMilestones(project, intel, score);
    const oricRecord = this.oricPipeline.getProjectRecord(project.id);

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
        <div style="flex: 1;">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;">
            <span class="badge badge-blue">${this.escapeHtml(intel.primaryDiscipline || "Discipline")}</span>
            <span class="badge badge-purple">${this.escapeHtml(intel.specialization || "Specialization")}</span>
            <span class="badge ${score.totalScore >= 80 ? 'badge-emerald' : 'badge-amber'}">${this.escapeHtml(score.tier || "")}</span>
            <span class="badge badge-slate">&#x1F512; Confidence: ${this.escapeHtml(score.confidence || "Medium")}</span>
          </div>
          <h2 style="font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--text-primary); line-height: 1.3;">
            ${this.escapeHtml(project.title)}
          </h2>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">
            <strong>Student(s):</strong> ${this.escapeHtml(project.studentName)} (${this.escapeHtml(project.studentClass)}) &bull; 
            <strong>Faculty:</strong> ${this.escapeHtml(project.facultyName)} &bull; 
            <strong>Department:</strong> ${this.escapeHtml(project.department)} &bull; 
            <strong>Course:</strong> ${this.escapeHtml(project.courseCode)}
          </div>
        </div>

        <div style="text-align: right; min-width: 130px;">
          <div class="score-pill" style="font-size: 22px; padding: 8px 16px; background: ${score.tierColor}20; color: ${score.tierColor}; border: 1px solid ${score.tierColor};">
            ${score.totalScore}/100
          </div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Market Potential Score</div>
        </div>
      </div>

      <!-- Original Abstract -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x1F4C4;</span> Original Submitted Abstract
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; font-style: italic;">
          "${this.escapeHtml(project.abstract)}"
        </p>
      </div>

      <!-- Karachi Industry Match & Target Beneficiary -->
      <div class="detail-grid-2">
        <div class="detail-section">
          <div class="detail-section-title">
            <span>&#x1F3ED;</span> Karachi Industry Match & Use Case
          </div>
          <p style="font-size: 13px; color: var(--text-primary); margin-bottom: 6px;">
            <strong>Primary Sector:</strong> ${this.escapeHtml(intel.industryMatch)}
          </p>
          <p style="font-size: 12px; color: ${intel.isDirectIndustryMatch ? '#34d399' : '#fbbf24'}; margin-bottom: 8px;">
            ${intel.isDirectIndustryMatch ? '&#x2714; Direct Match (Disclosed in Abstract)' : '&#x25CB; Inferred Speculative Match (ORIC Validation Required)'}
          </p>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px;">
            <strong>Identified Problem:</strong> ${this.escapeHtml(intel.problemIdentified)}
          </p>
          <p style="font-size: 12.5px; color: var(--text-secondary);">
            <strong>Proposed Use Case:</strong> ${this.escapeHtml(intel.proposedUseCase)}
          </p>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">
            <span>&#x1F465;</span> Target Customer & Competitive Differentiation
          </div>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px;">
            <strong>Target Customer Profile:</strong> ${this.escapeHtml(intel.targetCustomer)}
          </p>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 8px;">
            <strong>Competitive Alternatives in Karachi:</strong> ${this.escapeHtml(intel.competitiveAlternatives)}
          </p>
          <p style="font-size: 12.5px; color: var(--text-secondary);">
            <strong>Potential Differentiation:</strong> ${this.escapeHtml(intel.potentialDifferentiation)}
          </p>
        </div>
      </div>

      <!-- 7-Criteria Scoring Matrix Breakdown -->
      <div class="detail-section">
        <div class="detail-section-title">
          <span>&#x1F4CA;</span> 7-Criteria Scoring Model & Evidence Factor Breakdown
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          ${Object.values(crit).map(c => `
            <div class="criteria-item">
              <div class="criteria-label-row">
                <span><strong>${this.escapeHtml(c.name)}</strong> (${Math.round(c.weight * 100)}%)</span>
                <span><strong>${c.score}</strong> / 5.0</span>
              </div>
              <div class="criteria-bar-bg">
                <div class="criteria-bar-fill" style="width: ${(c.score / 5) * 100}%; background: ${c.score >= 4 ? '#10b981' : c.score >= 3 ? '#3b82f6' : '#f59e0b'};"></div>
              </div>
              <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 4px;">
                ${this.escapeHtml(c.notes)}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Regulatory, Technical & IP Governance -->
      <div class="detail-grid-2">
        <div class="detail-section">
          <div class="detail-section-title">
            <span>&#x2696;</span> Regulatory & Technical Governance
          </div>
          <ul style="padding-left: 16px; font-size: 12.5px; color: var(--text-secondary);">
            ${(intel.regulatoryNotes || []).map(r => `<li>${this.escapeHtml(r)}</li>`).join("")}
          </ul>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">
            <span>&#x1F4DC;</span> Intellectual Property & Pathway
          </div>
          <p style="font-size: 12.5px; color: var(--text-primary); margin-bottom: 6px;">
            <strong>Commercial Pathway:</strong> ${this.escapeHtml(intel.commercialPathway)}
          </p>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
            <strong>IP Potential:</strong> ${this.escapeHtml(intel.ipPotential)}
          </p>
          <p style="font-size: 11.5px; color: var(--text-muted);">
            ${this.escapeHtml(intel.ipRationale)}
          </p>
        </div>
      </div>

      <!-- 30-60-90 Day ORIC Action Plan -->
      <div class="detail-section" style="border-left: 4px solid var(--accent-emerald);">
        <div class="detail-section-title" style="color: var(--accent-emerald);">
          <span>&#x1F5D3;</span> ORIC 30–60–90 Day Milestone Roadmap
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 12px;">
          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; font-weight: 700; color: #60a5fa; text-transform: uppercase;">Days 1–30</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${this.escapeHtml(milestones.milestone30)}</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; font-weight: 700; color: #a78bfa; text-transform: uppercase;">Days 31–60</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${this.escapeHtml(milestones.milestone60)}</div>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase;">Days 61–90</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${this.escapeHtml(milestones.milestone90)}</div>
          </div>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary);">
          <strong>Target Karachi Partner Profile:</strong> ${this.escapeHtml(milestones.partnerProfile)}
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
          <strong>Preliminary Seed Funding Need:</strong> ${this.escapeHtml(milestones.preliminaryFunding)}
        </div>
      </div>

      <!-- ORIC Status Updater Box -->
      <div class="detail-section" style="background: rgba(37,99,235,0.06); border-color: rgba(37,99,235,0.3);">
        <div class="detail-section-title">
          <span>&#x270E;</span> Update ORIC Management Status & Notes
        </div>
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 4px;">Pipeline Stage:</label>
            <select id="modalOricStatusSelect" class="filter-select" style="background: var(--bg-card);">
              ${this.oricPipeline.statusStages.map(st => `
                <option value="${st.label}" ${oricRecord.status === st.label ? "selected" : ""}>${st.label}</option>
              `).join("")}
            </select>
          </div>
          <div style="flex: 1; min-width: 220px;">
            <label style="font-size: 11px; color: var(--text-muted); display: block; margin-bottom: 4px;">ORIC Evaluation Notes:</label>
            <input type="text" id="modalOricNotesInput" class="search-input" value="${this.escapeHtml(oricRecord.notes || "")}" placeholder="Enter internal ORIC evaluation notes..." />
          </div>
          <div style="margin-top: 18px;">
            <button class="btn btn-primary btn-sm" onclick="app.saveModalOricStatus('${project.id}')">
              Save Pipeline Status
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  }

  saveModalOricStatus(projectId) {
    const statusSelect = document.getElementById("modalOricStatusSelect");
    const notesInput = document.getElementById("modalOricNotesInput");

    if (statusSelect) {
      const newStatus = statusSelect.value;
      const notes = notesInput ? notesInput.value : "";
      this.oricPipeline.updateProjectStatus(projectId, newStatus, notes);
      this.showToast(`ORIC status updated to "${newStatus}" for project.`, "success");
      this.renderPortfolioTable();
      this.renderOricKanban();
      this.closeModal("projectDetailModal");
    }
  }

  /**
   * Setup Drag and drop and file input
   */
  setupDropzone() {
    const dropzone = document.getElementById("excelDropzone");
    const fileInput = document.getElementById("excelFileInput");
    if (!dropzone || !fileInput) return;

    ["dragenter", "dragover"].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    });
  }

  async handleFileUpload(file) {
    if (!file) return;
    try {
      this.showToast(`Reading and processing "${file.name}"...`, "info");
      const result = await this.excelProcessor.processFile(file);
      this.processUploadedRecords(result.records, result.stats);
      this.showToast(`Successfully processed ${result.stats.totalUploaded} records from "${file.name}".`, "success");
      this.switchTab("portfolio");
    } catch (err) {
      alert("Error processing Excel file: " + err.message);
      this.showToast("Failed to process Excel file: " + err.message, "error");
    }
  }

  updateUploadStats(stats) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setVal("statTotalUploaded", stats.totalUploaded);
    setVal("statValidRecords", stats.validRecords);
    setVal("statFlaggedRecords", stats.flaggedRecords);
    setVal("statDuplicateRecords", stats.duplicateRecords);
  }

  /**
   * Tab Navigation System
   */
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-item").forEach(el => {
      el.classList.toggle("active", el.dataset.tab === tabId);
    });

    document.querySelectorAll(".tab-pane").forEach(el => {
      el.classList.toggle("active", el.id === `tab-${tabId}`);
    });

    // Refresh charts if opening dashboard
    if (tabId === "dashboard") {
      this.chartsManager.updateAllCharts(this.filteredProjects);
    }
  }

  /**
   * Event listeners for search, filters, buttons
   */
  setupEventListeners() {
    // Nav Items
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Search input
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.filters.search = e.target.value;
        this.applyFilters();
      });
    }

    // Filter dropdowns
    const bindFilter = (id, key) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", (e) => {
          this.filters[key] = e.target.value;
          this.applyFilters();
        });
      }
    };
    bindFilter("filterDepartment", "department");
    bindFilter("filterSpecialization", "specialization");
    bindFilter("filterIndustry", "industry");
    bindFilter("filterTier", "tier");
    bindFilter("filterPathway", "pathway");
    bindFilter("filterOricStatus", "oricStatus");

    // Clear filters button
    const clearFiltersBtn = document.getElementById("btnClearFilters");
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        this.resetFilters();
      });
    }

    // Load Demo Data button
    const loadDemoBtn = document.getElementById("btnLoadDemoData");
    if (loadDemoBtn) {
      loadDemoBtn.addEventListener("click", () => {
        this.loadInitialDemoData();
      });
    }

    // Download Template button
    const downloadTplBtn = document.getElementById("btnDownloadTemplate");
    if (downloadTplBtn) {
      downloadTplBtn.addEventListener("click", () => {
        this.excelProcessor.downloadTemplate();
      });
    }

    // Clear Dataset button
    const clearDataBtn = document.getElementById("btnClearDataset");
    if (clearDataBtn) {
      clearDataBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the current project dataset?")) {
          this.projects = [];
          this.filteredProjects = [];
          this.renderAllViews();
          this.showToast("Dataset cleared.", "info");
        }
      });
    }

    // Export Buttons
    const exportXlsBtn = document.getElementById("btnExportExcel");
    if (exportXlsBtn) {
      exportXlsBtn.addEventListener("click", () => {
        this.exportManager.exportToExcel(this.filteredProjects, this.filters);
      });
    }

    const exportCsvBtn = document.getElementById("btnExportCSV");
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", () => {
        this.exportManager.exportToCSV(this.filteredProjects);
      });
    }

    const exportPdfBtn = document.getElementById("btnExportPDF");
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener("click", () => {
        this.exportManager.generateExecutivePDF(this.filteredProjects, {});
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        themeBtn.innerHTML = newTheme === "light" ? "&#x1F319;" : "&#x2600;";
      });
    }
  }

  resetFilters() {
    this.filters = {
      search: "",
      department: "all",
      specialization: "all",
      industry: "all",
      tier: "all",
      pathway: "all",
      oricStatus: "all"
    };

    const setSelect = (id) => {
      const el = document.getElementById(id);
      if (el) el.value = "all";
    };
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) searchInput.value = "";

    setSelect("filterDepartment");
    setSelect("filterSpecialization");
    setSelect("filterIndustry");
    setSelect("filterTier");
    setSelect("filterPathway");
    setSelect("filterOricStatus");

    this.applyFilters();
  }

  populateFilterDropdowns() {
    const populate = (id, items) => {
      const el = document.getElementById(id);
      if (!el) return;
      const cur = el.value;
      el.innerHTML = `<option value="all">All ${el.getAttribute("data-label") || "Options"}</option>` +
        items.map(item => `<option value="${this.escapeHtml(item)}">${this.escapeHtml(item)}</option>`).join("");
      if (cur) el.value = cur;
    };

    // Specializations from taxonomy
    const allSpecs = [];
    if (window.SUBJECT_TAXONOMY) {
      Object.values(window.SUBJECT_TAXONOMY).forEach(disc => {
        Object.keys(disc.specializations).forEach(spec => allSpecs.push(spec));
      });
    }
    populate("filterSpecialization", allSpecs);

    // Karachi Industries from taxonomy
    const allInds = window.KARACHI_INDUSTRY_TAXONOMY ? Object.keys(window.KARACHI_INDUSTRY_TAXONOMY) : [];
    populate("filterIndustry", allInds);
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>&#x25C9;</span> <span>${this.escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  window.app = new KarachiIntelligenceApp();
});
