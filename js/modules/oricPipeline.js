/**
 * ORIC Commercialization Prioritization Module
 * Manages the university commercialization pipeline with 7 distinct stages,
 * 30-60-90 day milestone generator, partner profiles, and persistent state in localStorage.
 */

class OricPipeline {
  constructor() {
    this.storageKey = "karachi_oric_pipeline_v1";
    this.statusStages = [
      { id: "under-review", label: "Under Review", color: "#64748b", bg: "#f1f5f9" },
      { id: "selected-validation", label: "Selected for Validation", color: "#0284c7", bg: "#e0f2fe" },
      { id: "prototype-dev", label: "Prototype Development", color: "#7c3aed", bg: "#ede9fe" },
      { id: "industry-engagement", label: "Industry Engagement", color: "#d97706", bg: "#fef3c7" },
      { id: "incubation-candidate", label: "Incubation Candidate", color: "#059669", bg: "#d1fae5" },
      { id: "commercialization-ready", label: "Commercialization Ready", color: "#16a34a", bg: "#dcfce7" },
      { id: "on-hold", label: "On Hold", color: "#dc2626", bg: "#fee2e2" }
    ];

    this.state = this.loadState();
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn("Could not load ORIC state from localStorage:", e);
      return {};
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save ORIC state to localStorage:", e);
    }
  }

  /**
   * Get ORIC status for a project
   */
  getProjectStatus(projectId) {
    if (this.state[projectId] && this.state[projectId].status) {
      return this.state[projectId].status;
    }
    return "Under Review";
  }

  /**
   * Update status & metadata for a project
   */
  updateProjectStatus(projectId, status, notes = "", assignedOfficer = "", targetPartner = "") {
    if (!this.state[projectId]) {
      this.state[projectId] = {};
    }
    this.state[projectId].status = status;
    if (notes !== undefined) this.state[projectId].notes = notes;
    if (assignedOfficer !== undefined) this.state[projectId].assignedOfficer = assignedOfficer;
    if (targetPartner !== undefined) this.state[projectId].targetPartner = targetPartner;
    this.state[projectId].updatedAt = new Date().toISOString();
    this.saveState();
  }

  getProjectRecord(projectId) {
    return this.state[projectId] || {
      status: "Under Review",
      notes: "",
      assignedOfficer: "Unassigned",
      targetPartner: ""
    };
  }

  /**
   * Generate 30, 60, and 90-day milestone roadmap
   */
  generateMilestones(project, intelligence, scoreData) {
    const isTech = /software|ai|fintech|blockchain|web/i.test(intelligence.specialization);
    const isHardware = /device|sensor|iot|biomedical|controller|hardware|mechanical/i.test(intelligence.specialization);
    const isBioPharma = /pharma|biotech|formulation|effluent|extract|biodegradable/i.test(intelligence.specialization);

    let d30 = "";
    let d60 = "";
    let d90 = "";

    if (isHardware) {
      d30 = "Finalize Bill of Materials (BOM) under local procurement; conduct component availability check at Saddar Electronics Market.";
      d60 = "Fabricate Rev-2 ruggedized enclosure and field-test circuit in simulated plant operating environment (temperature/vibration).";
      d90 = "Submit preliminary design dossier to ORIC IP Committee for Utility Patent filing; schedule on-site demo with partner factory.";
    } else if (isBioPharma) {
      d30 = "Complete chromatographic or microbial repeatability assays; document standard operating procedure (SOP) according to pharmacopoeia standards.";
      d60 = "Execute accelerated stability testing (40°C/75% RH) and formulate preliminary Drug Master File (DMF) or SEPA effluent dossier.";
      d90 = "Present confidential technical efficacy report to QC/R&D Director at selected Karachi pharma or chemical processing partner.";
    } else if (isTech) {
      d30 = "Dockerize backend application; conduct stress testing on simulated user load and run automated security vulnerability scan.";
      d60 = "Interview 10 potential business users in Karachi; refine UI/UX based on local language and operational workflows.";
      d90 = "Deploy closed beta pilot with 3 pilot enterprise customers; prepare investor pitch deck for NIC Karachi incubation entry.";
    } else {
      d30 = "Conduct structured stakeholder problem interviews with 10 commercial operators in Karachi.";
      d60 = "Refine value proposition and unit economic model; draft pilot collaboration Memorandum of Understanding (MoU).";
      d90 = "Sign pilot trial agreement with Karachi industry anchor and prepare HEC Technology Development Fund (TDF) grant application.";
    }

    // Suggested Partner Profile
    let partnerProfile = "";
    const indData = window.KARACHI_INDUSTRY_TAXONOMY ? window.KARACHI_INDUSTRY_TAXONOMY[intelligence.industryMatch] : null;
    if (indData && indData.keyCompanies && indData.keyCompanies.length > 0) {
      partnerProfile = `Target Karachi Partners: ${indData.keyCompanies.slice(0, 3).join(", ")}. Profile: Mid-to-large Karachi enterprise with established operations in ${indData.clusters ? indData.clusters[0] : "Karachi industrial zone"}.`;
    } else {
      partnerProfile = "Karachi Chamber of Commerce & Industry (KCCI) sectoral member with annual turnover exceeding PKR 50M.";
    }

    // Funding needs estimate
    let preliminaryFunding = "PKR 300,000 - 500,000 (Initial prototype refinement & customer discovery travel)";
    if (scoreData.totalScore >= 80) {
      preliminaryFunding = isBioPharma || isHardware
        ? "PKR 1,500,000 - 3,000,000 (HEC TDF / Industry Joint Pilot matching grant)"
        : "PKR 800,000 - 1,500,000 (Seed incubation & cloud infrastructure tier)";
    }

    return {
      milestone30: d30,
      milestone60: d60,
      milestone90: d90,
      partnerProfile,
      preliminaryFunding,
      immediateAction: intelligence.oricRecommendedAction
    };
  }
}

if (typeof window !== "undefined") {
  window.OricPipeline = OricPipeline;
}
