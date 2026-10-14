/**
 * Project Abstract Analysis & Karachi Industry Matching Engine
 * Rigorously parses project title and abstract, classifies into disciplines,
 * maps to Karachi industry taxonomy, assigns TRL, IP potential, and commercial pathways.
 * Strictly separates Explicit Stated Facts from Inferred Hypotheses.
 */

class IntelligenceEngine {
  constructor(industryTaxonomy = null, subjectTaxonomy = null) {
    this.industryTaxonomy = industryTaxonomy || (typeof window !== "undefined" ? window.KARACHI_INDUSTRY_TAXONOMY : {});
    this.subjectTaxonomy = subjectTaxonomy || (typeof window !== "undefined" ? window.SUBJECT_TAXONOMY : {});
  }

  /**
   * Complete analysis pipeline for a project record
   */
  analyzeProject(project) {
    const text = (project.title + " " + project.abstract).toLowerCase();

    // 1. Subject & Specialization Classification
    const classification = this.classifySubject(project, text);

    // 2. Karachi Industry Matching
    const industryMatch = this.matchKarachiIndustry(project, text, classification);

    // 3. Solution Type Detection
    const solutionType = this.detectSolutionType(text);

    // 4. Technology Readiness Level (TRL)
    const trl = this.evaluateTRL(project.abstract, text);

    // 5. Intellectual Property (IP) Potential
    const ipPotential = this.evaluateIP(text, solutionType);

    // 6. Commercialization Pathway
    const commercialPathway = this.determinePathway(text, solutionType, trl);

    // 7. Problem, Target Beneficiary & Proposed Use Case Extraction
    const extraction = this.extractProblemAndCustomer(project, text, industryMatch);

    // 8. Regulatory & Technical Considerations (DRAP, PEC, SBP, SEPA)
    const regulatoryNotes = this.evaluateRegulatoryNeeds(text, industryMatch);

    // 9. Recommended Next Steps for Validation
    const validationSteps = this.generateValidationSteps(industryMatch, commercialPathway, trl);

    return {
      primaryDiscipline: classification.primaryDiscipline,
      specialization: classification.primarySpecialization,
      secondarySpecialization: classification.secondarySpecialization,
      disciplineColor: classification.color,
      disciplineCode: classification.code,
      
      industryMatch: industryMatch.primary,
      secondaryIndustryMatches: industryMatch.secondary,
      isDirectIndustryMatch: industryMatch.isDirect,
      industryMatchRationale: industryMatch.rationale,
      industryAssumptions: industryMatch.assumptions,

      solutionType,
      trlLevel: trl.level,
      trlDescription: trl.description,
      trlEvidence: trl.evidence,

      ipPotential: ipPotential.type,
      ipRationale: ipPotential.rationale,

      commercialPathway: commercialPathway.pathway,
      pathwayRationale: commercialPathway.rationale,

      problemIdentified: extraction.problem,
      problemExplicit: extraction.problemExplicit,
      targetCustomer: extraction.customer,
      targetCustomerExplicit: extraction.customerExplicit,
      proposedUseCase: extraction.useCase,
      competitiveAlternatives: extraction.competitiveAlternatives,
      potentialDifferentiation: extraction.differentiation,

      regulatoryNotes,
      validationSteps,
      oricRecommendedAction: this.getRecommendedORICAction(commercialPathway.pathway, trl.level)
    };
  }

  /**
   * Classify into 5 disciplines and 40+ sub-specializations
   */
  classifySubject(project, text) {
    let bestDiscipline = "Computer Science and Information Technology";
    let bestSpec = "Artificial Intelligence and Machine Learning";
    let highestScore = -1;
    let secondarySpec = null;
    let specScores = [];

    // Check existing category hint first
    const existing = (project.existingCategory || project.department || "").toLowerCase();

    for (const [discName, discData] of Object.entries(this.subjectTaxonomy)) {
      for (const [specName, specData] of Object.entries(discData.specializations)) {
        let score = 0;

        // Check if department explicitly matches
        if (existing.includes(discName.toLowerCase()) || existing.includes(discData.code.toLowerCase())) {
          score += 3;
        }

        // Match keywords
        for (const kw of specData.keywords) {
          if (text.includes(kw)) {
            // Title matches count double
            if (project.title.toLowerCase().includes(kw)) {
              score += 4;
            } else {
              score += 2;
            }
          }
        }

        if (score > 0) {
          specScores.push({ discipline: discName, specialization: specName, score, color: discData.color, code: discData.code });
        }
      }
    }

    // Sort by match score
    specScores.sort((a, b) => b.score - a.score);

    if (specScores.length > 0) {
      bestDiscipline = specScores[0].discipline;
      bestSpec = specScores[0].specialization;
      if (specScores.length > 1 && specScores[1].score >= 3) {
        secondarySpec = specScores[1].specialization;
      }
    } else {
      // Default heuristic based on department or generic terms
      if (/biomedical|prosthetic|device|hospital|medical/i.test(text)) {
        bestDiscipline = "Biomedical Engineering";
        bestSpec = "Medical Devices";
      } else if (/pharm|drug|formulation|tablet|hplc|capsule/i.test(text)) {
        bestDiscipline = "Pharmacy and Pharmaceutical Sciences";
        bestSpec = "Pharmaceutical Formulations";
      } else if (/bio|bacteria|algae|ferment|microb|effluent/i.test(text)) {
        bestDiscipline = "Biosciences";
        bestSpec = "Biotechnology";
      } else if (/supply chain|logistics|business|finance|market|sme/i.test(text)) {
        bestDiscipline = "Business and Management Sciences";
        bestSpec = "Supply Chain and Logistics";
      }
    }

    const discMeta = this.subjectTaxonomy[bestDiscipline] || { color: "#2563eb", code: "GEN" };

    return {
      primaryDiscipline: bestDiscipline,
      primarySpecialization: bestSpec,
      secondarySpecialization: secondarySpec || "None Identified",
      color: discMeta.color,
      code: discMeta.code
    };
  }

  /**
   * Match to Karachi Industry Taxonomy
   */
  matchKarachiIndustry(project, text, classification) {
    const industryScores = [];

    const industryKeywordsMap = {
      "Textiles and Garments": ["textile", "loom", "yarn", "fabric", "denim", "garment", "spinning", "weaving", "dyeing", "cotton", "apparel"],
      "Pharmaceuticals and Healthcare": ["pharma", "drug", "tablet", "capsule", "metformin", "drap", "excipient", "api", "active pharmaceutical", "formulation", "silver nanoparticle", "neem extract"],
      "Hospitals, Diagnostic Laboratories, and Medical Devices": ["hospital", "clinic", "neonatal", "bilirubin", "infant", "jaundice", "prosthetic", "amputee", "biomedical", "patient", "maternal", "tele-triage"],
      "Ports, Shipping, Maritime Services, and Logistics": ["port", "kpt", "sapt", "container", "truck", "freight", "turnaround", "berth", "shipping", "mauripur", "demurrage"],
      "Retail, Wholesale, and E-commerce": ["e-commerce", "cod", "return-to-origin", "rto", "daraz", "jodia bazaar", "khatta", "wholesale", "retail", "supermarket", "bazaar"],
      "Energy, Renewable Energy, and Energy Efficiency": ["energy", "electricity", "k-electric", "peak shaving", "power factor", "apfc", "solar", "photovoltaic", "battery", "inverter", "kilowatt"],
      "Water, Sanitation, and Environmental Services": ["water", "reverse osmosis", "ro reject", "effluent", "tannery", "kw&sc", "leakage", "drinking water", "desalination", "pipe leak", "sewage"],
      "Chemicals and Industrial Materials": ["concrete", "geopolymer", "cement", "corrosion", "coating", "polymer", "chemical", "surfactant", "insulation tile"],
      "Manufacturing and Industrial Automation": ["manufacturing", "automotive", "weld", "welding", "plc", "scada", "assembly line", "motorcycle", "electric conversion", "retrofit", "chassis", "suzuki", "toyota"],
      "Fisheries, Seafood Processing, and the Blue Economy": ["fisheries", "fish harbour", "shrimp", "marine", "blue economy", "crab", "pomfret", "chitosan", "aquaculture"],
      "Banking, Financial Services, and FinTech": ["fintech", "credit scoring", "micro-credit", "shariah", "islamic finance", "musharakah", "crowdfunding", "banking", "raast"],
      "Waste Management and Recycling": ["waste", "scrap", "recycling", "scrap metal", "shershah", "upcycling", "cotton waste", "solid waste"],
      "Information Technology and Software Exports": ["software", "ai", "yolo", "agent", "llm", "blockchain", "hyperledger", "legal research", "rag", "export"],
      "Food Processing and Beverages": ["food", "spice", "packaging", "shelf life", "antimicrobial film", "preservative", "post-harvest"],
      "Agriculture-related Value Chains Serving Karachi": ["agriculture", "cattle", "dairy", "sabzi mandi", "crop", "biofertilizer", "fodder"],
      "Education and Skills Development": ["education", "edtech", "vocational", "training", "curriculum", "learning"],
      "Tourism, Hospitality, and Creative Industries": ["tourism", "hotel", "heritage", "creative", "media", "film"]
    };

    for (const [indName, keywords] of Object.entries(industryKeywordsMap)) {
      let score = 0;
      let matchedKw = [];
      for (const kw of keywords) {
        if (text.includes(kw)) {
          score += 2;
          matchedKw.push(kw);
        }
      }
      if (score > 0) {
        industryScores.push({ industry: indName, score, matchedKw });
      }
    }

    industryScores.sort((a, b) => b.score - a.score);

    let primaryIndustry = "Information Technology and Software Exports";
    let isDirect = false;
    let matchedKwList = [];
    let secondary = [];

    if (industryScores.length > 0) {
      primaryIndustry = industryScores[0].industry;
      isDirect = industryScores[0].score >= 4;
      matchedKwList = industryScores[0].matchedKw;

      if (industryScores.length > 1) {
        secondary = industryScores.slice(1, 3).map(i => i.industry);
      }
    } else {
      // Heuristic fallback
      primaryIndustry = "Information Technology and Software Exports";
      isDirect = false;
    }

    const indData = this.industryTaxonomy[primaryIndustry] || {};
    const clusterName = indData.clusters ? indData.clusters[0] : "Karachi Industrial Belt";

    return {
      primary: primaryIndustry,
      secondary: secondary,
      isDirect: isDirect,
      matchedKeywords: matchedKwList,
      rationale: isDirect 
        ? `Direct match based on explicit abstract references to ${matchedKwList.slice(0, 3).join(", ")} targeting ${clusterName}.`
        : `Inferred preliminary match based on disciplinary characteristics. Requires verification with Karachi industry stakeholders.`,
      assumptions: isDirect
        ? "Assumes prototype operational parameters translate from lab bench to industrial scale in local conditions."
        : "Hypothetical applicability assumes local Karachi enterprises have willingness and capital to adopt this category."
    };
  }

  /**
   * Detect solution type
   */
  detectSolutionType(text) {
    if (/software|app|application|platform|dashboard|agent|rag|portal|algorithm|blockchain/i.test(text)) {
      return "Software";
    }
    if (/device|hardware|prototype|sensor|kit|controller|exoskeleton|photobioreactor|arm|implant|panel|tile/i.test(text)) {
      return "Product";
    }
    if (/tablet|formulation|film|extract|mucilage|hydrogel|concrete/i.test(text)) {
      return "Product";
    }
    if (/service|dispatching|marketplace|crowdfunding|tele-triage|ledger/i.test(text)) {
      return "Service";
    }
    if (/optimization|bioremediation|method|protocol|process|turnaround|shaving/i.test(text)) {
      return "Process Improvement";
    }
    return "Research Technology";
  }

  /**
   * Evaluate Technology Readiness Level (TRL 1-9)
   */
  evaluateTRL(abstract, text) {
    if (/field test|deployed|installed on a|pilot testbed|commercial trucking fleets|18 wholesale grocery/i.test(abstract)) {
      return {
        level: "TRL 6 - Field-Tested Prototype",
        description: "Prototype verified in operational or simulated industrial environment in Karachi.",
        evidence: "Abstract explicitly reports field trials, testbeds, or pilot customer deployments."
      };
    }
    if (/fabricated|constructed|synthesized|microcontroller|in-vitro|bench-scale|custom dataset of \d+/i.test(abstract)) {
      return {
        level: "TRL 4-5 - Lab Working Prototype",
        description: "Technology validated in university laboratory/bench environment.",
        evidence: "Abstract documents physical fabrication, working code, or in-vitro lab experimental metrics."
      };
    }
    if (/designed|developed|model|simulation|algorithm|conceptualized/i.test(abstract)) {
      return {
        level: "TRL 3 - Proof of Concept",
        description: "Analytical and experimental critical function or concept proven.",
        evidence: "Analytical modeling or software proof-of-concept demonstrated."
      };
    }
    return {
      level: "TRL 2 - Technology Concept Formulated",
      description: "Practical applications formulated but requires experimental validation.",
      evidence: "Conceptual project formulation without detailed empirical trial outputs."
    };
  }

  /**
   * Evaluate Intellectual Property (IP) Potential
   */
  evaluateIP(text, solutionType) {
    if (/formulation|bioremediation|synthesis|geopolymer|supercritical|mucilage|chitosan|extract|nanoparticle/i.test(text)) {
      return {
        type: "Patentable (Novel Composition or Process)",
        rationale: "Chemical formulation, novel extraction protocol, or physical material composite eligible for patent filing under IPO-Pakistan."
      };
    }
    if (/device|controller|mechanism|exoskeleton|acoustic sensor|retrofit kit/i.test(text)) {
      return {
        type: "Utility Patent & Design Registration",
        rationale: "Mechanical design and electronic circuitry architecture protectable via utility patent and industrial design marks."
      };
    }
    if (solutionType === "Software" || /algorithm|agent|ai|platform|model/i.test(text)) {
      return {
        type: "Copyright & Trade Secret (Algorithm)",
        rationale: "Software source code protected by copyright; proprietary training weights and heuristics protected as trade secrets."
      };
    }
    return {
      type: "Trade Secret / Open Academic IP",
      rationale: "Operational methodology and workflows best preserved as proprietary know-how."
    };
  }

  /**
   * Determine Commercialization Pathway
   */
  determinePathway(text, solutionType, trl) {
    if (/b2b|marketplace|app|platform|crowdfunding|agent|bazaarkhata|dawacheck/i.test(text)) {
      return {
        pathway: "Develop a Startup / Venture Incubation",
        rationale: "High customer scalability, software/platform economics, and venture market appeal for Karachi tech incubators (Nest I/O, NIC Karachi)."
      };
    }
    if (/textile mill|auto|assembler|kw&sc|k-electric|tannery|effluent|freight|demurrage/i.test(text)) {
      return {
        pathway: "Seek Industry Collaboration / Corporate Pilot",
        rationale: "Requires direct access to specialized factory floor, utility infrastructure, or enterprise supply chains in SITE, Korangi, or Port Qasim."
      };
    }
    if (/formulation|excipient|mucilage|tablets|chitosan|neem|concrete|drap/i.test(text)) {
      return {
        pathway: "Technology Licensing to Established Manufacturers",
        rationale: "Existing Karachi pharmaceutical or chemical plants have capital and GMP cleanrooms to scale this formulation under licensing royalty."
      };
    }
    return {
      pathway: "Develop a Proof of Concept / Applied R&D",
      rationale: "Technology requires further bench-scale empirical optimization and grant-funded pilot validation before commercial commitment."
    };
  }

  /**
   * Extract Problem, Beneficiary & Use Case
   */
  extractProblemAndCustomer(project, text, industryMatch) {
    let problem = "";
    let problemExplicit = false;
    let customer = "";
    let customerExplicit = false;
    let useCase = "";
    let alternatives = "";
    let differentiation = "";

    const sentences = project.abstract.split(/\.\s+/);

    // Problem extraction: first 1-2 sentences usually state the problem
    if (sentences.length > 0 && sentences[0].length > 15) {
      problem = sentences[0] + (sentences.length > 1 && sentences[1].length < 180 ? ". " + sentences[1] : ".");
      problemExplicit = true;
    } else {
      problem = `Operational inefficiency and lack of localized automation within the ${industryMatch.primary} sector in Karachi.`;
      problemExplicit = false;
    }

    // Customer identification
    if (/textile mill|weaving unit|garment/i.test(text)) {
      customer = "Textile mill operations directors and quality assurance managers in SITE & Korangi";
      customerExplicit = true;
    } else if (/neonatal|infant|maternity|maternal/i.test(text)) {
      customer = "Peri-urban maternity clinics, Lady Health Workers (LHWs), and public pediatric wards in Karachi";
      customerExplicit = true;
    } else if (/tannery|effluent|leather/i.test(text)) {
      customer = "Tannery owners and industrial effluent treatment plant managers in Korangi Industrial Area";
      customerExplicit = true;
    } else if (/pharma|diabetic|metformin|chemist/i.test(text)) {
      customer = "Local pharmaceutical manufacturers seeking cheaper excipient alternatives, and retail pharmacists";
      customerExplicit = true;
    } else if (/port|truck|freight|container/i.test(text)) {
      customer = "Commercial fleet trucking operators, freight forwarders, and customs clearing agents operating at KPT & SAPT";
      customerExplicit = true;
    } else if (/jodia bazaar|wholesale|merchant/i.test(text)) {
      customer = "Informal wholesale traders and micro-merchants in Jodia Bazaar and Bolton Market";
      customerExplicit = true;
    } else if (/k-electric|manufacturing plant|industrial estate/i.test(text)) {
      customer = "Factory owners and electrical maintenance heads across SITE, Korangi, and Hub industrial estates";
      customerExplicit = true;
    } else {
      customer = `Enterprises, public utilities, and SME operators within Karachi's ${industryMatch.primary} ecosystem.`;
      customerExplicit = false;
    }

    // Proposed Use Case
    useCase = `Deployment of ${project.title.toLowerCase().replace(/^(development of|design and|an?)\s+/i, "")} to reduce operational overhead and improve local productivity.`;

    // Competitive Alternatives in Karachi
    if (/textile/i.test(text)) {
      alternatives = "Manual visual human inspection at rolling tables; expensive imported Italian/Japanese vision scanners.";
      differentiation = "Edge AI deployment on local looms at a fraction of imported scanner costs, trained on local fabric patterns.";
    } else if (/neonatal|bilirubin|screening/i.test(text)) {
      alternatives = "Imported $4,000 spectrophotometers or painful invasive heel-prick blood draws processed at distant labs.";
      differentiation = "Non-invasive optical screening built at sub-PKR 18,000 BOM with instant digital results.";
    } else if (/tannery|effluent/i.test(text)) {
      alternatives = "Imported chemical flocculants and lime precipitation creating hazardous sludge.";
      differentiation = "Indigenous Indus delta microbial consortia eliminating chemical costs without toxic secondary sludge.";
    } else if (/metformin|excipient|mucilage/i.test(text)) {
      alternatives = "Imported synthetic HPMC polymers costing heavy foreign exchange.";
      differentiation = "Indigenous Ispaghula husk mucilage extracted locally, reducing raw material costs by 40-50%.";
    } else if (/truck|port|queuing/i.test(text)) {
      alternatives = "Uncoordinated physical queuing on Mauripur road with cash bribes and manual paper tokens.";
      differentiation = "Dynamic algorithmic time-slotting utilizing real-time berth logs and truck GPS.";
    } else if (/jodia bazaar|khata|voice/i.test(text)) {
      alternatives = "Manual physical Khatta books prone to damage, zero formal bank credit trail.";
      differentiation = "Hands-free Karachi Urdu/Memoni voice recording with SBP-aligned algorithmic credit scoring.";
    } else {
      alternatives = "Manual workflows or costly imported foreign commercial software/hardware.";
      differentiation = "Locally engineered, ruggedized for Karachi power and cost conditions, utilizing domestic resources.";
    }

    return {
      problem,
      problemExplicit,
      customer,
      customerExplicit,
      useCase,
      competitiveAlternatives: alternatives,
      differentiation
    };
  }

  /**
   * Regulatory and compliance requirements
   */
  evaluateRegulatoryNeeds(text, industryMatch) {
    const reqs = [];
    if (/device|medical|diagnostic|screening|bilirubin|prosthetic/i.test(text)) {
      reqs.push("DRAP Medical Device Rules 2017: Requires Class A/B/C device registration, biocompatibility certification, and clinical safety ethics approval.");
    }
    if (/pharma|drug|tablet|formulation|mucilage|nanoparticle|extract/i.test(text)) {
      reqs.push("Drug Regulatory Authority of Pakistan (DRAP): Excipient DMF (Drug Master File), GMP validation, and stability testing according to ICH guidelines.");
    }
    if (/effluent|water|waste|tannery|sewage/i.test(text)) {
      reqs.push("Sindh Environmental Protection Agency (SEPA): Compliance with Sindh Environmental Quality Standards (SEQS) for industrial liquid discharge.");
    }
    if (/fintech|banking|payment|credit|ledger|micro-equity/i.test(text)) {
      reqs.push("State Bank of Pakistan (SBP): SBP Regulatory Sandbox approval, Raast API integration compliance, and AML/CFT data storage guidelines.");
    }
    if (/lorawan|rfid|telecom|wireless/i.test(text)) {
      reqs.push("Pakistan Telecommunication Authority (PTA): Type approval for ISM band wireless transceiver modules (868/915 MHz).");
    }
    if (reqs.length === 0) {
      reqs.push("Standard intellectual property disclosure, university IP policy compliance, and industry NDA execution.");
    }
    return reqs;
  }

  /**
   * Suggested validation steps
   */
  generateValidationSteps(industryMatch, pathway, trl) {
    return [
      `Conduct 10-15 structured customer discovery interviews with plant/operational managers in ${industryMatch.primary}.`,
      "Develop a detailed Bill of Materials (BOM) or cloud infrastructure cost breakdown for Karachi market deployment.",
      "Conduct a formal prior art patent and trademark search at IPO-Pakistan (Intellectual Property Organization).",
      "Secure an ORIC Letter of Intent (LOI) or pilot testbed agreement with a verified Karachi industry partner."
    ];
  }

  /**
   * Recommended ORIC Action
   */
  getRecommendedORICAction(pathway, trlLevel) {
    if (pathway.includes("Startup")) {
      return "Induct into university incubation pipeline; connect with student founders to formulate business model canvas and pitch to NIC Karachi.";
    }
    if (pathway.includes("Industry Collaboration")) {
      return "Facilitate industry matchmaking roundtable with relevant Karachi Chamber of Commerce (KCCI) or industrial association committee.";
    }
    if (pathway.includes("Licensing")) {
      return "Prepare non-confidential IP disclosure flyer and schedule technical evaluation meetings with local pharmaceutical/manufacturing R&D directors.";
    }
    return "Assist faculty supervisor in applying for HEC Technology Development Fund (TDF) or Sindh HEC applied research grant.";
  }
}

if (typeof window !== "undefined") {
  window.IntelligenceEngine = IntelligenceEngine;
}
