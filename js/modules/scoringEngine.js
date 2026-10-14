/**
 * Transparent Market Potential Scoring Engine
 * 7-Criteria Weighted Scoring Model with evidence justification notes.
 * Strictly adheres to Karachi industrial context and transparent confidence flagging.
 */

class ScoringEngine {
  constructor(customWeights = null) {
    this.defaultWeights = {
      relevance: 0.20,      // Relevance to Karachi industry problems (20%)
      demand: 0.20,         // Potential customer demand (20%)
      commercial: 0.15,     // Commercial feasibility (15%)
      differentiation: 0.15,// Competitive differentiation (15%)
      feasibility: 0.10,    // Technical feasibility and maturity (10%)
      scalability: 0.10,    // Scalability and growth potential (10%)
      localImpact: 0.10     // Potential for local impact or import substitution (10%)
    };

    this.weights = customWeights ? { ...this.defaultWeights, ...customWeights } : { ...this.defaultWeights };
  }

  updateWeights(newWeights) {
    this.weights = { ...this.weights, ...newWeights };
  }

  /**
   * Score an individual project using heuristic analysis and extracted project intelligence.
   * Criteria scores: 1.0 to 5.0 scale.
   */
  evaluateProject(project, intelligence) {
    const text = (project.title + " " + project.abstract).toLowerCase();
    const isDetailed = project.abstract.length > 250;
    const hasNumbers = /\d+%|\d+\s*(kg|liters|km|mpa|kw|v|mhz|samples|patients|pkr)/i.test(project.abstract);
    const mentionsKarachi = /karachi|site|korangi|landhi|port qasim|clifton|saddar|lyari|orangi|jodia bazaar|sapt|kpt|k-electric|drap|sepa/i.test(text);

    // 1. Relevance to Karachi Industry Problems (Weight: 20%)
    let sRelevance = 2.5;
    let rRelevanceNotes = [];
    if (mentionsKarachi) {
      sRelevance += 1.5;
      rRelevanceNotes.push("Directly references specific Karachi industrial zones, utilities, or institutional pain points");
    } else if (intelligence.industryMatch && intelligence.industryMatch.directMatch) {
      sRelevance += 1.0;
      rRelevanceNotes.push("Direct alignment with established Karachi operational problems");
    } else {
      rRelevanceNotes.push("General industrial relevance; specific Karachi operational linkage requires field validation");
    }
    if (intelligence.problemIdentified && intelligence.problemIdentified.length > 20) {
      sRelevance += 0.5;
    }
    sRelevance = Math.min(5.0, Math.max(1.0, sRelevance));

    // 2. Potential Customer Demand (Weight: 20%)
    let sDemand = 2.5;
    let rDemandNotes = [];
    if (/market|export|sme|textile mill|hospital|clinic|merchant|assembler|trader|fleet/i.test(text)) {
      sDemand += 1.0;
      rDemandNotes.push("Identifiable commercial buyer profile in Karachi manufacturing or service sector");
    }
    if (/cost reduction|saving|savings|pkr|cheaper|affordable|substitute|alternative/i.test(text)) {
      sDemand += 1.0;
      rDemandNotes.push("Compelling economic buyer incentive (cost reduction or margin preservation)");
    } else {
      rDemandNotes.push("Customer willingness-to-pay needs early ORIC customer discovery interviews");
    }
    sDemand = Math.min(5.0, Math.max(1.0, sDemand));

    // 3. Commercial Feasibility (Weight: 15%)
    let sCommercial = 2.5;
    let rCommercialNotes = [];
    if (intelligence.solutionType === "Software" || intelligence.solutionType === "Service") {
      sCommercial += 1.2;
      rCommercialNotes.push("Low capex software/digital deployment profile allows faster pilot onboarding");
    } else if (/bom|bill-of-materials|cost under|low-cost|off-the-shelf|retrofit/i.test(text)) {
      sCommercial += 1.0;
      rCommercialNotes.push("Realistic unit economics and bill-of-materials within local procurement constraints");
    } else if (/clinical trial|drap approval|heavy machinery|large scale/i.test(text)) {
      sCommercial -= 0.5;
      rCommercialNotes.push("Requires regulatory approvals (DRAP/PEC) and capital before commercial release");
    }
    sCommercial = Math.min(5.0, Math.max(1.0, sCommercial));

    // 4. Competitive Differentiation (Weight: 15%)
    let sDiff = 2.5;
    let rDiffNotes = [];
    if (/novel|custom|yolov8|blockchain|geopolymer|supercritical|lorawan|myoelectric|first of its kind/i.test(text)) {
      sDiff += 1.3;
      rDiffNotes.push("Technical novelty or proprietary methodology distinct from standard off-the-shelf products");
    }
    if (/urdu|local language|indigenous|chitosan|ispaghula|neem/i.test(text)) {
      sDiff += 0.7;
      rDiffNotes.push("Localized adaptation and indigenous raw material formulation providing domestic competitive moat");
    } else {
      rDiffNotes.push("Competitive alternatives exist in international market; local differentiation must be refined");
    }
    sDiff = Math.min(5.0, Math.max(1.0, sDiff));

    // 5. Technical Feasibility and Maturity (Weight: 10%)
    let sFeas = 2.5;
    let rFeasNotes = [];
    if (hasNumbers) {
      sFeas += 1.2;
      rFeasNotes.push("Quantitative bench validation, clinical correlation, or field testbed metrics documented");
    }
    if (/field test|pilot|prototype|fabricated|deployed|installed|tested/i.test(text)) {
      sFeas += 0.8;
      rFeasNotes.push("Physical or digital prototype already built beyond conceptual stage (TRL 4-6)");
    } else {
      rFeasNotes.push("Theoretical or simulated concept; requires physical prototype verification");
    }
    sFeas = Math.min(5.0, Math.max(1.0, sFeas));

    // 6. Scalability and Growth Potential (Weight: 10%)
    let sScale = 2.5;
    let rScaleNotes = [];
    if (intelligence.specialization && /ai|cloud|fintech|software|e-commerce|iot/i.test(intelligence.specialization)) {
      sScale += 1.5;
      rScaleNotes.push("Digital architecture offers high marginal scalability across national and export markets");
    } else if (/manufacturing|export|tannery|textile|pharma/i.test(text)) {
      sScale += 0.8;
      rScaleNotes.push("High vertical scalability across hundreds of manufacturing facilities in Sindh and Punjab");
    } else {
      rScaleNotes.push("Service or artisanal scale; growth constrained by local operations");
    }
    sScale = Math.min(5.0, Math.max(1.0, sScale));

    // 7. Potential for Local Impact or Import Substitution (Weight: 10%)
    let sLocal = 2.5;
    let rLocalNotes = [];
    if (/import|substitut|foreign exchange|forex|indigenous|local|dollar/i.test(text)) {
      sLocal += 1.5;
      rLocalNotes.push("Explicit import substitution target directly saving foreign currency reserves for Pakistan");
    } else if (/effluent|water|waste|pollution|maternal|infant|health|renewable|energy/i.test(text)) {
      sLocal += 1.2;
      rLocalNotes.push("High socio-economic or environmental impact addressing critical urban Karachi crises");
    } else {
      rLocalNotes.push("Moderate local impact; primarily standard enterprise productivity benefit");
    }
    sLocal = Math.min(5.0, Math.max(1.0, sLocal));

    // Calculate normalized weighted score out of 100
    // Weighted score = (Sum of (Score / 5) * Weight) * 100
    const criteriaScores = {
      relevance: { score: Number(sRelevance.toFixed(1)), weight: this.weights.relevance, name: "Relevance to Karachi Industry", notes: rRelevanceNotes.join("; ") },
      demand: { score: Number(sDemand.toFixed(1)), weight: this.weights.demand, name: "Potential Customer Demand", notes: rDemandNotes.join("; ") },
      commercial: { score: Number(sCommercial.toFixed(1)), weight: this.weights.commercial, name: "Commercial Feasibility", notes: rCommercialNotes.join("; ") },
      differentiation: { score: Number(sDiff.toFixed(1)), weight: this.weights.differentiation, name: "Competitive Differentiation", notes: rDiffNotes.join("; ") },
      feasibility: { score: Number(sFeas.toFixed(1)), weight: this.weights.feasibility, name: "Technical Feasibility & Maturity", notes: rFeasNotes.join("; ") },
      scalability: { score: Number(sScale.toFixed(1)), weight: this.weights.scalability, name: "Scalability & Growth", notes: rScaleNotes.join("; ") },
      localImpact: { score: Number(sLocal.toFixed(1)), weight: this.weights.localImpact, name: "Local Impact & Import Substitution", notes: rLocalNotes.join("; ") }
    };

    let totalWeightedScore = 0;
    for (const key of Object.keys(criteriaScores)) {
      const c = criteriaScores[key];
      totalWeightedScore += (c.score / 5.0) * c.weight * 100;
    }
    totalWeightedScore = Math.round(totalWeightedScore);

    // Determine Potential Tier
    let tier = "";
    let tierColor = "";
    let tierAction = "";

    if (totalWeightedScore >= 80) {
      tier = "High Potential";
      tierColor = "#10b981"; // Emerald
      tierAction = "Prioritize validation and fast-track to ORIC commercialization pipeline";
    } else if (totalWeightedScore >= 65) {
      tier = "Promising";
      tierColor = "#3b82f6"; // Blue
      tierAction = "Conduct rigorous customer discovery and technical pilot validation";
    } else if (totalWeightedScore >= 50) {
      tier = "Development Opportunity";
      tierColor = "#f59e0b"; // Amber
      tierAction = "Strengthen value proposition, testbed data, and industry collaboration";
    } else {
      tier = "Early-Stage / Needs Reassessment";
      tierColor = "#64748b"; // Slate
      tierAction = "Reassess fundamental problem-solution fit and customer demand";
    }

    // Determine Confidence Indicator
    let confidence = "Medium";
    let confidenceExplanation = "";
    if (isDetailed && hasNumbers && mentionsKarachi) {
      confidence = "High";
      confidenceExplanation = "Comprehensive abstract with empirical testing data and explicit Karachi industry context";
    } else if (!isDetailed || project.abstract.length < 100) {
      confidence = "Low";
      confidenceExplanation = "Brief or abstract-level submission lacking quantitative validation and field test metrics";
    } else {
      confidence = "Medium";
      confidenceExplanation = "Clear technical concept but lacks explicit local unit economics and empirical field trial data";
    }

    // Missing information & validation questions
    const validationQuestions = [];
    if (!hasNumbers) {
      validationQuestions.push("What are the empirical benchmarks, accuracy rates, or quantitative output metrics?");
    }
    if (!mentionsKarachi) {
      validationQuestions.push("Has this solution been demonstrated to any Karachi-based enterprise or factory manager?");
    }
    if (/device|hardware|machine|kit|implant/i.test(text)) {
      validationQuestions.push("What is the estimated Bill of Materials (BOM) cost and component supply chain vulnerability?");
      validationQuestions.push("Are regulatory compliance certifications (DRAP / PEC / PSQCA) required before deployment?");
    }
    if (/ai|model|algorithm|data/i.test(text)) {
      validationQuestions.push("What is the volume and diversity of local training data, and how is data privacy ensured?");
    }
    if (validationQuestions.length === 0) {
      validationQuestions.push("What is the customer acquisition cost and willingness to pay among early adopters?");
    }

    return {
      totalScore: totalWeightedScore,
      tier,
      tierColor,
      tierAction,
      confidence,
      confidenceExplanation,
      criteriaScores,
      validationQuestions,
      influencingFactors: [
        rRelevanceNotes[0],
        rDemandNotes[0],
        rCommercialNotes[0]
      ].filter(Boolean)
    };
  }
}

if (typeof window !== "undefined") {
  window.ScoringEngine = ScoringEngine;
}
