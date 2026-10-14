/**
 * Karachi Industry Taxonomy & Intelligence Knowledge Base
 * Contextualized for the industrial ecosystem of Karachi, Sindh, Pakistan.
 * Covers major industrial zones: SITE, Korangi, Landhi, Port Qasim, F.B. Area,
 * North Karachi, West Wharf, and I.I. Chundrigar Road financial corridor.
 */

const KARACHI_INDUSTRY_TAXONOMY = {
  "Information Technology and Software Exports": {
    id: "it-software-exports",
    name: "Information Technology and Software Exports",
    category: "Digital & Tech Services",
    clusters: ["Shahrah-e-Faisal Tech Belt", "I.I. Chundrigar Road", "Clifton/Defence Tech Hubs", "NED Technology Park"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Systems Limited", "10Pearls", "Contour Software", "Afiniti", "Aventier", "TRG Pakistan", "VentureDive"],
    majorProblems: [
      "Talent attrition and skill mismatch with US/EU/GCC client requirements",
      "Severe need for Generative AI & agentic automation workflows for offshore BPO/IT outsourcing",
      "Frequent local power disruptions requiring costly uninterruptible power backups",
      "Limited local cybersecurity auditing and compliance frameworks for global exports"
    ],
    customerSegments: ["Global offshore enterprises (US/UK/GCC)", "Karachi IT export houses", "Local corporate enterprises needing digital transformation"],
    relevantSolutions: ["AI agent workflows", "Enterprise cloud migration tools", "Cybersecurity compliance bots", "DevOps orchestration", "Data engineering pipelines"],
    costReductionOpportunities: "Automation of Tier-1 tech support, automated code refactoring, remote monitoring tools.",
    importSubstitution: "High potential: Developing indigenous enterprise SaaS, replacing expensive Salesforce/Oracle licensing with tailored localized solutions.",
    collaborationPotential: "Very High: PSEB, P@SHA, incubation centers like Nest I/O, NIC Karachi.",
    adoptionBarriers: ["Strict international compliance hurdles (SOC2, GDPR, ISO 27001)", "Access to foreign exchange payment rails."],
    growthDrivers: ["Global demand for cost-effective software engineering", "State Bank of Pakistan (SBP) IT export retention incentives (50% forex retention)."]
  },

  "Banking, Financial Services, and FinTech": {
    id: "banking-fintech",
    name: "Banking, Financial Services, and FinTech",
    category: "Financial Services",
    clusters: ["I.I. Chundrigar Road (Wall Street of Pakistan)", "Clifton Financial Towers", "State Bank of Pakistan precinct"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Habib Bank Limited (HBL)", "Meezan Bank (Islamic Banking Leader)", "United Bank Limited (UBL)", "MCB", "Bank Alfalah", "1Link Switch", "Easypaisa/Telenor Microfinance", "Nayapay", "Sadapay"],
    majorProblems: [
      "High cash reliance and unbanked female & informal SME population",
      "Financial fraud, phishing, and SIM-swap authentication vulnerabilities",
      "Compliance complexity with SBP Raast P2P/P2M instant payments and AML/CFT guidelines",
      "Need for Shariah-compliant micro-financing algorithms and digital Murabaha automation"
    ],
    customerSegments: ["Commercial banks", "Microfinance institutions", "Fintech startups", "Jodia Bazaar wholesale merchants", "Karachi retail consumers"],
    relevantSolutions: ["Fraud detection via machine learning", "Raast integration modules", "Digital KYC with NADRA biometrics", "Shariah-compliant alternative credit scoring"],
    costReductionOpportunities: "Automated loan underwriting, reducing branch operating overhead, paperless digital onboarding.",
    importSubstitution: "Medium-High: Replacing legacy foreign core banking add-ons (Temenos/Finacle modules) with domestic microservices.",
    collaborationPotential: "High: SBP Regulatory Sandbox, 1Link Hackathons, Fintech Association of Pakistan.",
    adoptionBarriers: ["Stringent SBP regulatory licensing", "Customer data sovereignty laws", "Legacy banking mainframe resistance."],
    growthDrivers: ["SBP Raast instant payment network rollout", "Surge in digital wallets (NayaPay, SadaPay)", "Rapid growth of Islamic banking assets in Karachi."]
  },

  "Pharmaceuticals and Healthcare": {
    id: "pharma-healthcare",
    name: "Pharmaceuticals and Healthcare",
    category: "Life Sciences & Pharma",
    clusters: ["Korangi Industrial Area Pharma Belt", "SITE Industrial Area", "Landhi Industrial Area", "Hub River Road"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Getz Pharma (Largest Exporter)", "Abbott Laboratories Pakistan", "GSK Pakistan", "Martin Dow", "Hilton Pharma", "Searle Company", "SAMI Pharmaceuticals", "Ferozsons"],
    majorProblems: [
      "90%+ dependence on imported Active Pharmaceutical Ingredients (APIs) primarily from China and India",
      "Strict compliance monitoring by Drug Regulatory Authority of Pakistan (DRAP)",
      "Counterfeit medication distribution in open retail markets",
      "High energy costs for cleanroom HVAC and sterile manufacturing units"
    ],
    customerSegments: ["Pharma formulation manufacturers", "Bulk drug importers", "Hospital pharmacies", "DRAP regulatory auditors"],
    relevantSolutions: ["Local API synthesis bioprocesses", "Blockchain anti-counterfeit drug serialization", "Automated batch quality assurance testing", "Sterile manufacturing IoT temperature monitors"],
    costReductionOpportunities: "Continuous bioprocessing, cleanroom energy efficiency, automated visual pill inspection.",
    importSubstitution: "Extremely High: Synthesis of excipients, herbal extract APIs, and domestic packaging materials saving millions in foreign exchange.",
    collaborationPotential: "High: PPMA (Pakistan Pharmaceutical Manufacturers Association), ICCBS (HEJ Institute of Chemistry, Karachi University).",
    adoptionBarriers: ["Rigorous DRAP clinical validation and GMP certification timeline (1-3 years)", "High capex for cleanrooms."],
    growthDrivers: ["Pharma export targets of $1B+", "DRAP Level 3 WHO validation requirements", "Growing chronic disease therapeutics demand in Sindh."]
  },

  "Hospitals, Diagnostic Laboratories, and Medical Devices": {
    id: "hospitals-medtech",
    name: "Hospitals, Diagnostic Laboratories, and Medical Devices",
    category: "Healthcare Infrastructure",
    clusters: ["Stadium Road Medical Hub (AKUH)", "Civil Hospital/Dow University Medical Complex", "Korangi Indus Hospital Campus", "SIUT City Center"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Aga Khan University Hospital (AKUH)", "The Indus Hospital Health Network", "Sindh Institute of Urology & Transplantation (SIUT)", "Dow University Hospital", "Chughtai Lab Karachi", "Essa Lab", "Tabba Heart Institute"],
    majorProblems: [
      "Almost total import dependency for diagnostic imaging, ventilators, and surgical consumables",
      "Overburdened public tertiary hospitals handling patients from entire Sindh and Balochistan",
      "Diagnostic errors in pathology screening and high test reagent costs",
      "Biomedical equipment downtime due to lack of local spare parts and calibration technicians"
    ],
    customerSegments: ["Private & charitable tertiary hospitals", "Diagnostic pathology lab chains", "Outpatient clinics", "Community healthcare workers"],
    relevantSolutions: ["Low-cost point-of-care diagnostic kits", "AI-assisted radiology/histology triage", "Indigenous rehabilitation prosthetics", "Hospital asset management and calibration IoT"],
    costReductionOpportunities: "Local calibration tools, predictive maintenance of MRI/CT equipment, telemedicine for remote triage.",
    importSubstitution: "Critical National Priority: Developing indigenous blood analyzers, pulse oximeters, ECG monitors, and surgical implants.",
    collaborationPotential: "Extremely High: AKUH Biomedical Innovation Hub, Dow University Innovation Center, SIUT Biomedical Engineering department.",
    adoptionBarriers: ["DRAP Medical Device Rules 2017 compliance", "Doctor resistance to unproven local hardware", "Liability insurance."],
    growthDrivers: ["Universal health insurance schemes (Sehat Card initiatives)", "Rising chronic cardiac and diabetic burdens in urban Karachi."]
  },

  "Textiles and Garments": {
    id: "textiles-garments",
    name: "Textiles and Garments",
    category: "Industrial Manufacturing & Exports",
    clusters: ["SITE Industrial Area (Oldest textile cluster)", "Korangi Industrial Area", "Landhi Industrial Zone", "Nooriabad Industrial Estate"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Gul Ahmed Textile Mills", "Artistic Milliners (Denim Giant)", "Al-Karam Textile Mills", "Soin Mills", "Yunis Textile Mills", "Feroze1888 Mills", "Lucky Textile Mills"],
    majorProblems: [
      "Extremely high gas tariffs and power outages reducing global competitiveness against Bangladesh and Vietnam",
      "High effluent water treatment costs and strict EU ESG / ZDHC environmental compliance mandates",
      "Fabric defect inspection relies heavily on manual labour prone to fatigue errors",
      "High raw cotton import costs due to domestic crop volatility"
    ],
    customerSegments: ["Export-oriented denim & knitwear apparel units", "Home textile weaving mills", "Dyeing and wet processing factories"],
    relevantSolutions: ["Computer vision automated fabric defect scanners", "Zero-liquid discharge (ZLD) effluent water recycling tech", "Smart loom energy management IoT", "Circular economy recycled cotton fibre processing"],
    costReductionOpportunities: "Energy peak shaving, waste yarn recycling, automated cutting optimization minimizing fabric scrap.",
    importSubstitution: "High: Developing indigenous sizing chemicals, dyes, and automated sewing attachments.",
    collaborationPotential: "Very High: Textile Institute of Pakistan (TIP), PRGMEA (Pakistan Readymade Garments Manufacturers & Exporters Association).",
    adoptionBarriers: ["Low margins in cut-make-trim (CMT) manufacturing", "Reluctance of traditional mill owners to adopt unproven IoT."],
    growthDrivers: ["EU GSP+ export status compliance requirements", "Global fast fashion shift toward sustainable/recycled textiles."]
  },

  "Manufacturing and Industrial Automation": {
    id: "manufacturing-automation",
    name: "Manufacturing and Industrial Automation",
    category: "Heavy & Light Engineering",
    clusters: ["Port Qasim Industrial Area (Automotive Zone)", "SITE Industrial Area", "Korangi Industrial Area", "Hub Industrial Estate"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Indus Motor Company (Toyota)", "Pak Suzuki Motor Company", "Atlas Honda Karachi", "Siemens Pakistan", "Pel / Pak Elektron", "Agha Steel Industries", "Amreli Steels", "Dawlance (Arcelik)"],
    majorProblems: [
      "High dependence on imported Programmable Logic Controllers (PLCs), CNC controllers, and robotics parts",
      "Frequent machinery breakdowns due to erratic voltage fluctuations",
      "Under-automated assembly lines leading to variable quality and workplace safety incidents",
      "High scrap and rejection rates in precision metal die casting and stamping"
    ],
    customerSegments: ["Automotive tier-1 & tier-2 vendors", "Home appliance manufacturers", "Steel rebar re-rolling mills", "Packaging machinery builders"],
    relevantSolutions: ["Low-cost indigenous PLC & SCADA controllers", "Vibration-based predictive maintenance sensors", "Robotic welding & pick-and-place arms", "Machine vision quality sorting systems"],
    costReductionOpportunities: "Reducing machine downtime, scrap reduction, energy efficiency in furnaces and electric motors.",
    importSubstitution: "Extremely High: Substituting Japanese/German automation modules with ruggedized local embedded systems.",
    collaborationPotential: "High: PAAPAM (Pakistan Association of Automotive Parts & Accessories Manufacturers), NEDUET Mechanical & Industrial Engineering.",
    adoptionBarriers: ["High capital risk if assembly line halts", "Lack of field-tested reliability certifications (CE/UL)."],
    growthDrivers: ["Indigenization targets set by Engineering Development Board (EDB)", "Localization drive by auto assemblers to mitigate PKR depreciation."]
  },

  "Chemicals and Industrial Materials": {
    id: "chemicals-materials",
    name: "Chemicals and Industrial Materials",
    category: "Process Industries",
    clusters: ["Port Qasim Chemical Zone", "SITE Industrial Area", "Landhi Industrial Area"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Engro Polymer & Chemicals (PVC Manufacturer)", "Lucky Core Industries (formerly ICI Pakistan)", "Descon Oxychem", "Berger Paints Pakistan", "Kansai Paint", "Buxly Paints"],
    majorProblems: [
      "Hazardous chemical waste handling and emission control in urban industrial zones",
      "Import of petrochemical monomers and specialty additives subject to dollar exchange shocks",
      "Corrosion of industrial infrastructure due to Karachi's coastal saline humidity",
      "High energy consumption in exothermic and distillation processes"
    ],
    customerSegments: ["Paint & coating manufacturers", "Plastics and PVC pipe extruders", "Detergent and surfactant formulators", "Industrial construction contractors"],
    relevantSolutions: ["Anti-corrosive coastal nano-coatings", "Bio-based surfactants from indigenous plant oils", "Catalytic efficiency improvers", "VOC recovery and carbon capture modules"],
    costReductionOpportunities: "Catalyst recycling, waste heat recovery, formulation reformulation using local mineral fillers.",
    importSubstitution: "Very High: Local synthesis of pigments, anti-foaming agents, and specialty adhesives.",
    collaborationPotential: "High: Karachi University Department of Chemistry, NED Chemical Engineering.",
    adoptionBarriers: ["Explosion and chemical safety hazards", "High minimum scale required for chemical synthesis plants."],
    growthDrivers: ["Demand from construction, automotive, and packaging industries across Sindh."]
  },

  "Food Processing and Beverages": {
    id: "food-beverages",
    name: "Food Processing and Beverages",
    category: "Consumer Goods & Processing",
    clusters: ["Korangi Industrial Area", "SITE Industrial Area", "Port Qasim Agro-Industrial Zone", "Landhi"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["National Foods Limited", "Shan Foods Limited", "English Biscuit Manufacturers (EBM / Peek Freans)", "Ismail Industries (Candyland / Bisconni)", "Continental Biscuits (LU)", "Tapal Tea", "Mehran Spice & Food", "Dalda Foods"],
    majorProblems: [
      "Post-harvest spoilage and microbiological contamination in spice, grain, and dairy supply chains",
      "Rising cost of food-grade flexible multilayer packaging and barrier foils",
      "Stringent export compliance with FDA, EU, and Halal certification standards for spice and ready-to-eat exports",
      "Cold chain gaps during transport from rural Sindh into Karachi wholesale markets"
    ],
    customerSegments: ["Large FMCG spice & confectionery exporters", "Karachi bakery and snack chains", "Edible oil refineries", "Beverage bottling plants"],
    relevantSolutions: ["Non-thermal sterilization tech (UV/Ozone)", "Biodegradable food packaging films", "Cold chain telematics and humidity tracking", "Rapid aflatoxin and allergen testing strips"],
    costReductionOpportunities: "Automated optical sorting of grains and spices, waste heat recapture in baking ovens.",
    importSubstitution: "High: Substituting imported preservatives, natural flavourings, and high-barrier biopolymer films.",
    collaborationPotential: "Very High: PCSIR Karachi, Sindh Food Authority (SFA), KU Department of Food Science & Technology.",
    adoptionBarriers: ["Strict food safety regulations (SFA, PSQCA)", "Consumer sensory acceptance."],
    growthDrivers: ["Surging demand for packaged hygienic foods among Karachi's 18M+ urban population", "Double-digit growth in packaged recipe mix exports to diaspora."]
  },

  "Fisheries, Seafood Processing, and the Blue Economy": {
    id: "fisheries-blue-economy",
    name: "Fisheries, Seafood Processing, and the Blue Economy",
    category: "Maritime & Marine Economy",
    clusters: ["Karachi Fish Harbour (West Wharf)", "Korangi Fish Harbour", "Ibrahim Hyderi Coastal Belt", "Manora Deep Sea Zone"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Pakistan Fisheries Exporters Association members", "M.A. Seafoods", "R.F. Enterprise", "Ocean Fresh Seafoods", "Sindh Fisheries Department cooperatives"],
    majorProblems: [
      "Severe post-catch loss (up to 35%) due to inadequate onboard crushed ice and poor wooden boat sanitation",
      "Overfishing and use of destructive plastic nets (Guja / Katra nets) depleting Arabian Sea fish stocks",
      "EU seafood export bans/restrictions triggered by unhygienic harbour conditions and trace heavy metal residues",
      "Almost zero utilization of fish processing waste (skins, scales, viscera) currently dumped into the sea"
    ],
    customerSegments: ["Seafood processing and freezing plants", "Deep-sea trawler operators", "Artisanal fishing fleets", "Marine cosmetic/fertilizer extractors"],
    relevantSolutions: ["Solar-powered boat refrigeration & ice generation", "Extraction of marine collagen and chitosan from fish scales & shrimp shells", "Eco-friendly biodegradable fishing gear", "Cold-chain IoT trace monitors for export consignment verification"],
    costReductionOpportunities: "Conversion of fish offal into high-protein fish meal and bio-fertilizer for poultry and agriculture.",
    importSubstitution: "High: Local production of marine collagen for pharma and gelatin alternatives.",
    collaborationPotential: "High: Marine Fisheries Department (MFD), KU Centre of Excellence in Marine Biology.",
    adoptionBarriers: ["Traditional mindset of fishing community", "Unregulated harbour governance structures."],
    growthDrivers: ["Global seafood demand", "Maritime Blue Economy initiatives launched by Pakistan Navy and Ministry of Maritime Affairs."]
  },

  "Ports, Shipping, Maritime Services, and Logistics": {
    id: "ports-logistics",
    name: "Ports, Shipping, Maritime Services, and Logistics",
    category: "Logistics & Transport",
    clusters: ["Karachi Port Trust (KPT / Kemari / West Wharf)", "Port Qasim Authority (PQA)", "Mauripur Truck Stand", "National Highway Logistics Corridor"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Karachi Port Trust (KPT)", "Port Qasim Authority", "South Asia Pakistan Terminals (Hutchison SAPT)", "QICT / DP World", "Pakistan National Shipping Corporation (PNSC)", "TCS Logistics", "M&P Express Logistics", "Trax Logistics"],
    majorProblems: [
      "Severe truck congestion along Mauripur Road and Northern Bypass causing multi-hour container delays",
      "Dredging siltation management and high marine vessel turnaround times at berths",
      "Container pilferage, fuel theft, and lack of real-time multi-modal tracking between port and inland dry ports",
      "Manual customs clearance bottlenecks and paper-heavy bills of lading documentation"
    ],
    customerSegments: ["Terminal operators (SAPT, QICT, KICT)", "Freight forwarders & customs clearing agents", "Fleet trucking companies", "Third-party logistics (3PL) providers"],
    relevantSolutions: ["Port gate automation and optical character recognition (OCR) container scanners", "Fleet fuel management telematics & anti-siphoning sensors", "Digital bills of lading & smart customs documentation", "Route optimization algorithms avoiding Karachi traffic chokepoints"],
    costReductionOpportunities: "Reducing demurrage charges, fuel consumption reduction by 12-18%, automated gate turnaround.",
    importSubstitution: "Medium: Indigenous port operations management software, local smart tracking hardware.",
    collaborationPotential: "High: All Pakistan Shipping Association (APSA), Chartered Institute of Logistics and Transport (CILT Karachi).",
    adoptionBarriers: ["Inter-agency coordination (Customs, KPT, Traffic Police)", "Unionized dockworker resistance."],
    growthDrivers: ["Karachi handling 90%+ of Pakistan's international trade", "CPEC western route connections", "Cross-border transit trade to Central Asian Republics."]
  },

  "Retail, Wholesale, and E-commerce": {
    id: "retail-ecommerce",
    name: "Retail, Wholesale, and E-commerce",
    category: "Commerce & Consumer",
    clusters: ["Jodia Bazaar (Largest wholesale market in Pakistan)", "Bolton Market", "Tariq Road & Saddar Retail Hubs", "Clifton/Gulshan E-commerce Warehouses"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Daraz Pakistan (Alibaba Group)", "Chase Up", "Imtiaz Super Market (Retail Giant)", "Naheed Supermarket", "D-Mart", "Cheetay Logistics / Pandamart", "Airlift (historical learnings)"],
    majorProblems: [
      "High rate of Cash-on-Delivery (COD) returns (RTO rates of 20-30%) eroding e-commerce margins",
      "Jodia Bazaar wholesale trading operates on unrecorded paper ledgers (Khatta) with high bad debt risk",
      "Inventory miscounts and stockouts in sprawling retail supermarkets",
      "Last-mile delivery motorcycle accidents and poor navigation in non-standardized Karachi street addresses"
    ],
    customerSegments: ["Large supermarket chains (Imtiaz, Chase Up)", "Online retail marketplaces", "Jodia Bazaar wholesale distributors", "Kiryana mom-and-pop stores"],
    relevantSolutions: ["Predictive AI for COD return risk scoring", "Voice-enabled Urdu digital Khatta bookkeeping for merchants", "RFID/Computer Vision automated inventory shelf scanners", "Pakistan-specific algorithmic address geocoding and parsing"],
    costReductionOpportunities: "Cutting RTO delivery costs, automated stock replenishment reducing working capital lockup.",
    importSubstitution: "High: Localized point-of-sale (POS) and warehouse management software (WMS) replacing Shopify/Magento enterprise plugins.",
    collaborationPotential: "High: Karachi Chamber of Commerce and Industry (KCCI), Pakistan E-commerce Association.",
    adoptionBarriers: ["Cash economy preference among traditional wholesalers to avoid tax scrutiny", "Fragmented postal code system."],
    growthDrivers: ["Smartphone penetration in Karachi exceeding 70%", "Imtiaz & Chase Up rapid hypermarket expansion across mega-city."]
  },

  "Construction and Real Estate": {
    id: "construction-real-estate",
    name: "Construction and Real Estate",
    category: "Built Environment",
    clusters: ["DHA City & Bahria Town Karachi expansion zones", "Scheme 33", "Northern Bypass development", "Clifton High-rise Waterfront"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Lucky Cement Limited", "Power Cement", "Agha Steel", "Amreli Steels", "Habib Construction Services", "Paragon Constructors", "Emaar Pakistan", "Bahria Town Karachi"],
    majorProblems: [
      "Severe shortage of clean construction river sand and rampant illegal sand mining in Malir River",
      "High concrete degradation and rebar corrosion caused by Karachi's coastal saline marine air",
      "Building energy inefficiency with high cooling heat loads requiring excessive air-conditioning",
      "Construction site accidents, poor structural compliance, and seismic vulnerability"
    ],
    customerSegments: ["Real estate developers", "Structural engineering consultancies", "Pre-cast concrete yards", "Architectural firms"],
    relevantSolutions: ["Recycled construction & demolition aggregate materials", "Corrosion-resistant geopolymer concrete formulations", "Thermal insulation panels made from agricultural waste (rice husk / bagasse)", "IoT structural health vibration sensors for high-rises"],
    costReductionOpportunities: "Lowering structural cooling energy costs by 25-40%, reducing cement curing water consumption.",
    importSubstitution: "High: Domestic manufacture of waterproof admixtures, structural sealants, and fireproof cladding.",
    collaborationPotential: "High: Association of Builders and Developers of Pakistan (ABAD), NED Civil Engineering Department.",
    adoptionBarriers: ["Strict building codes (SBCA - Sindh Building Control Authority)", "Contractor reluctance to adopt unconventional materials."],
    growthDrivers: ["Karachi vertical housing policy", "Major mega-infrastructure flyover and BRT corridor construction."]
  },

  "Energy, Renewable Energy, and Energy Efficiency": {
    id: "energy-renewables",
    name: "Energy, Renewable Energy, and Energy Efficiency",
    category: "Infrastructure & Utilities",
    clusters: ["K-Electric Licensed Territory (Karachi + Hub)", "Jhimpir Wind Corridor (supplying Karachi)", "Port Qasim Power Zone", "Korangi & SITE Solar Rooftops"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["K-Electric Limited", "Hub Power Company (HUBCO)", "Engro Energy", "Reon Energy", "Zephyr Power", "Shams Power", "Orient Energy Systems"],
    majorProblems: [
      "High electricity tariffs (PKR 50-70/kWh) crippling industrial competitiveness in SITE and Korangi",
      "Power factor penalties and severe voltage drops during peak summer months",
      "Industrial grid instability and transformer overloading due to unmanaged heavy induction motors",
      "Slow net-metering approval cycles and grid reverse-power limitations"
    ],
    customerSegments: ["Industrial estate factory owners", "Commercial shopping plazas", "K-Electric distribution engineers", "Residential solar adopters"],
    relevantSolutions: ["AI industrial peak load shaving & power factor optimizers", "Low-cost local battery energy storage management systems (BMS)", "Solar panel dust/soot cleaning automation tailored for Karachi's arid climate", "Microgrid controllers for hybrid diesel-solar-grid setups"],
    costReductionOpportunities: "Reducing monthly industrial electricity bills by 20-35%, cutting diesel generator runtime during outages.",
    importSubstitution: "Critical: Indigenous solar inverter monitoring hardware, lithium battery pack assembly, and capacitor banks.",
    collaborationPotential: "High: K-Electric Innovation Department, Renewable & Alternative Energy Association of Pakistan (REAP).",
    adoptionBarriers: ["High upfront capital investment for battery storage", "K-Electric regulatory grid interconnection guidelines."],
    growthDrivers: ["Surging industrial electricity tariffs forcing 100% of factories to seek captive solar/efficiency solutions."]
  },

  "Water, Sanitation, and Environmental Services": {
    id: "water-sanitation",
    name: "Water, Sanitation, and Environmental Services",
    category: "Civic & Environmental Utilities",
    clusters: ["Karachi Water & Sewerage Corporation (KW&SC)", "Hub Dam Supply Line", "SITE Combined Effluent Treatment Plant", "Korangi Creek Effluent Zone"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Karachi Water & Sewerage Corporation (KW&SC)", "Sindh Solid Waste Management Board (SSWMB)", "FWO Bulk Water Projects", "Private Tanker Mafia Operators", "Pak Oasis Water Tech"],
    majorProblems: [
      "Karachi receives less than 50% of its daily water demand of 1,200 MGD, creating a thriving tanker black market",
      "Over 400 MGD of untreated municipal and heavy industrial toxic effluent dumped daily into Arabian Sea via Lyari and Malir rivers",
      "Severe pipeline leakages and unmetered illegal water line punctures",
      "Groundwater in industrial areas is brackish, saline, and contaminated with heavy metals (chromium, lead)"
    ],
    customerSegments: ["Municipal utility (KW&SC)", "Textile & leather tanneries requiring clean process water", "Commercial housing societies (DHA, Bahria)", "Industrial RO plant operators"],
    relevantSolutions: ["Low-cost brackish water reverse osmosis (RO) membrane antiscalants", "Acoustic IoT pipe leak detection sensors", "Industrial effluent bio-remediation using microalgae/enzymes", "Smart water metering and automated tanker tracking valves"],
    costReductionOpportunities: "Reusing 70%+ of industrial wastewater, avoiding costly commercial water tanker purchases (PKR 5,000-10,000 per tanker).",
    importSubstitution: "Extremely High: Domestic synthesis of water purification coagulants, filter media, and UV disinfection units.",
    collaborationPotential: "Urgent Priority: KW&SC, Sindh Environmental Protection Agency (SEPA), NED Water Resources Research Center.",
    adoptionBarriers: ["Public water governance disputes", "Lack of enforcement of SEPA environmental fines."],
    growthDrivers: ["Acute water scarcity in SITE and Korangi", "Supreme Court Water Commission mandates on effluent treatment."]
  },

  "Agriculture-related Value Chains Serving Karachi": {
    id: "agri-value-chains",
    name: "Agriculture-related Value Chains Serving Karachi",
    category: "Agri-Tech & Peri-Urban Supply",
    clusters: ["Sabzi Mandi (Super Highway New Vegetable & Fruit Market)", "Malir Peri-Urban Agricultural Belt", "Bhains Colony (Landhi Cattle Colony - Largest in Asia)", "Gadap Farms"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Karachi Milk Wholesalers Association", "Sabzi Mandi Commission Agents Guild", "Fauji Fresh n Freeze", "K&N's Foods Karachi", "Engro Fertilizers distribution"],
    majorProblems: [
      "Landhi Cattle Colony (Bhains Colony) produces 8,000+ tons of daily cattle manure dumped untreated into Korangi Creek",
      "Post-harvest rot in tomato, onion, and mango consignments arriving from rural Sindh at Sabzi Mandi",
      "Lack of cold storage and price manipulation by middleman commission agents (Arthi system)",
      "High livestock feed costs leading to adulterated milk and excessive antibiotic usage"
    ],
    customerSegments: ["Bhains Colony dairy farm owners (over 400,000 cattle)", "Super Highway Sabzi Mandi commission agents", "Poultry feed mills", "Commercial urban hydroponic growers"],
    relevantSolutions: ["Biogas and organic bio-fertilizer conversion systems for Bhains Colony cattle dung", "Solar cold storage rooms for Sabzi Mandi perishable produce", "Rapid milk adulteration detection strips (urea, hydrogen peroxide, detergent)", "Hydroponic and vertical fodder production systems"],
    costReductionOpportunities: "Generating electricity from dairy manure, cutting fresh fodder transport costs from rural Sindh.",
    importSubstitution: "High: Indigenous animal feed supplements, probiotic silage additives, and crop biostimulants.",
    collaborationPotential: "High: Sindh Agriculture University Tandojam (Karachi extension), PCSIR Laboratories Karachi.",
    adoptionBarriers: ["Informal cash-based dairy cartels in Bhains Colony", "Lack of literacy among farm labour."],
    growthDrivers: ["Karachi consumes over 5 million litres of fresh milk daily", "Soaring prices of cooking vegetables and meat."]
  },

  "Education and Skills Development": {
    id: "education-skills",
    name: "Education and Skills Development",
    category: "Human Capital & EdTech",
    clusters: ["Karachi University Campus precinct", "NEDUET / Dow Medical Strip", "IBA City & Main Campuses", "Orangi & Lyari Technical Training Centers"],
    verifiedDate: "February 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["The Citizens Foundation (TCF)", "Beaconhouse / City School networks", "Institute of Business Administration (IBA)", "NED Academy", "Aman Tech Vocational Center", "Saylani Mass IT Training (SMIT)"],
    majorProblems: [
      "Massive youth unemployment coexisting with corporate complaints of unemployable university graduates",
      "Outdated rote-learning curricula lacking practical industrial problem-solving skills",
      "High student-to-teacher ratios in public schools across Karachi's dense districts",
      "High vocational training equipment costs limiting hands-on CNC, welding, and medical lab training"
    ],
    customerSegments: ["Private school networks", "Vocational training institutes (TEVTA / NAVTTC / Aman Tech)", "Corporate HR departments", "Underprivileged youth"],
    relevantSolutions: ["Urdu-localized AI tutoring agents for STEM subjects", "VR/AR industrial machinery and surgical simulation training", "Automated coding assessment and skills verification platforms", "Gamified vocational learning apps for low-bandwidth 4G smartphones"],
    costReductionOpportunities: "Reducing physical lab equipment overhead through virtual labs, scaling teacher training remotely.",
    importSubstitution: "High: Developing indigenous LMS and testing software replacing expensive Coursera/Canvas enterprise subscriptions.",
    collaborationPotential: "Very High: Sindh TEVTA, TCF Innovation Team, Karachi University Faculty of Education.",
    adoptionBarriers: ["Limited digital literacy in public schools", "Fragmented provincial curriculum oversight."],
    growthDrivers: ["Youth bulge in Karachi (over 60% population under 30)", "Surge in freelance remote work aspirations."]
  },

  "Waste Management and Recycling": {
    id: "waste-recycling",
    name: "Waste Management and Recycling",
    category: "Circular Economy",
    clusters: ["Sindh Solid Waste Management Board (SSWMB) Zones", "Shershah Scrap & Machinery Market", "Mehmoodabad Plastic Shredding Cluster", "Jam Chakro Landfill", "Gond Pass Landfill"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Sindh Solid Waste Management Board (SSWMB)", "Changyi Kangjie (Chinese waste concessionaire)", "Ganso (Waste concessionaire)", "Shershah Recyclers Guild", "Green Earth Recycling Karachi"],
    majorProblems: [
      "Karachi generates 13,000+ tons of municipal solid waste daily; over 40% remains uncollected or burnt openly in drains",
      "Hazardous hospital waste mixed with domestic waste, posing biohazard risks to informal scavengers",
      "Severe plastic clogging of Karachi's 40+ stormwater drains (nullahs) causing catastrophic urban flooding",
      "Informal recycling in Shershah relies on toxic open-flame burning and hazardous acid extraction for e-waste"
    ],
    customerSegments: ["Municipal waste contractors", "Shershah scrap merchants", "Plastic bottle recyclers (rPET)", "Cement plants using refuse-derived fuel (RDF)"],
    relevantSolutions: ["Automated optical/magnetic scrap metal and plastic sorting conveyors", "Refuse-derived fuel (RDF) pelletizers for cement kilns", "Safe hydrometallurgical e-waste precious metal recovery modules", "Recycled plastic construction blocks & urban pavers"],
    costReductionOpportunities: "Replacing expensive fossil coal in cement kilns with processed RDF, monetizing clean segregated PET flakes for export.",
    importSubstitution: "High: Domestic manufacture of waste balers, shredders, and pyrolytic fuel converters.",
    collaborationPotential: "High: SSWMB, Karachi Metropolitan Corporation (KMC), WWF-Pakistan Karachi.",
    adoptionBarriers: ["Entrenched informal waste-picker cartels", "Lack of municipal source-segregation enforcement."],
    growthDrivers: ["Urban flooding fears driving drain clearance", "Global export demand for food-grade recycled rPET resin."]
  },

  "Tourism, Hospitality, and Creative Industries": {
    id: "tourism-creative",
    name: "Tourism, Hospitality, and Creative Industries",
    category: "Culture, Media & Hospitality",
    clusters: ["Clifton Beach & Sea View Strip", "Saddar Colonial Heritage District", "Karachi Arts Council / Media Corridor (I.I. Chundrigar)", "Port Grand Food Precinct"],
    verifiedDate: "January 2026",
    verificationStatus: "Verified Karachi Industry Baseline",
    keyCompanies: ["Mövenpick Hotel Karachi", "Pearl Continental (PC) Karachi", "Avari Towers", "Port Grand Management", "Hum Network", "ARY Digital Network", "Geo TV Network"],
    majorProblems: [
      "Decaying historical British colonial heritage buildings in Saddar and Old Town due to neglect and salt air",
      "High food waste and energy consumption in large banquet halls and beach resorts",
      "Lack of standardized digital booking and tourist navigation for Karachi's coastal and culinary attractions",
      "High production costs for CGI, VFX, and audio post-production in local film and TV serial industries"
    ],
    customerSegments: ["5-star hotels & corporate catering banquets", "Media houses & broadcast TV channels", "Heritage conservation trusts", "Domestic coastal tourists"],
    relevantSolutions: ["AI generative audio-visual dubbing and VFX tools for Pakistani drama productions", "Smart hotel energy & commercial kitchen food waste management systems", "Augmented reality digital heritage walking tours of Old Karachi", "Coastal eco-tourism waste tracking along Hawke's Bay and Sandspit"],
    costReductionOpportunities: "Reducing commercial banquet food wastage, automated video localization for international syndication.",
    importSubstitution: "High: Developing indigenous digital asset management and Urdu transcription tools replacing Western software.",
    collaborationPotential: "Medium-High: Heritage Foundation of Pakistan, Arts Council of Pakistan Karachi.",
    adoptionBarriers: ["Security perceptions for international visitors", "Lack of municipal maintenance of heritage zones."],
    growthDrivers: ["Karachi's status as the media & entertainment capital of Pakistan", "Booming weekend coastal and culinary tourism."]
  }
};

// Export to window for browser runtime
if (typeof window !== "undefined") {
  window.KARACHI_INDUSTRY_TAXONOMY = KARACHI_INDUSTRY_TAXONOMY;
}
