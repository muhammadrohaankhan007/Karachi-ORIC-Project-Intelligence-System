/**
 * Karachi University Semester Projects - Realistic Demonstration Dataset
 * Reflects authentic academic project submissions across Karachi institutions
 * (NEDUET, FAST-NUCES, IBA Karachi, University of Karachi, Dow University, SSUET, UIT).
 * Explicitly labeled as benchmark test data for system demonstration.
 */

const SAMPLE_PROJECTS_DATA = [
  {
    facultyName: "Dr. Muhammad Khurram",
    department: "Computer & Information Systems Engineering",
    studentName: "Hamza Tariq, Bilal Ahmed, Ayesha Siddiqui",
    studentRegNo: "BCS-2022-041",
    studentClass: "BS CS Final Year (Semester 8)",
    courseCode: "CS-499",
    projectTitle: "AI-Powered Computer Vision for Automated Fabric Defect Detection in High-Speed Textile Looms",
    projectAbstract: "High-speed weaving looms operating in Karachi's SITE and Korangi industrial zones suffer from substantial fabric rejections due to unspotted yarn mispicks, holes, and oil stains. Current manual inspection at final rolling stations misses up to 30% of subtle defects. This project presents a real-time computer vision system deployed on an edge NVIDIA Jetson module mounted directly onto industrial air-jet looms. We trained an optimized YOLOv8 convolutional architecture on a custom dataset of 12,000 Karachi textile mill fabric samples. The system inspects woven cloth at line speeds exceeding 60 meters/minute, flagging defects with 94.2% accuracy and triggering an automated pneumatic loom pause. Field testing was conducted on a pilot testbed at a Landhi weaving unit.",
    supervisorName: "Prof. Dr. Tariq Jamil Khan",
    existingCategory: "Computer Science - AI/ML"
  },
  {
    facultyName: "Dr. Zeeshan Haider",
    department: "Biomedical Engineering",
    studentName: "Dua Fatima, Syed Ali Raza",
    studentRegNo: "BME-2022-108",
    studentClass: "BE Biomedical (Semester 7)",
    courseCode: "BM-401",
    projectTitle: "Low-Cost Non-Invasive Continuous Hemoglobin & Jaundice Screening Device for Neonatal Clinics",
    projectAbstract: "Infant mortality and neonatal jaundice complications in peri-urban Karachi settlements (such as Orangi, Machhar Colony, and Ibrahim Hyderi) remain exacerbated by the lack of affordable point-of-care bilirubinometers. Most maternity clinics cannot afford imported $4,000 spectrophotometers. We designed and fabricated a portable, non-invasive transcutaneous bilirubin and hemoglobin screening device using multi-wavelength photoplethysmography (PPG) LEDs (460nm and 570nm) and a calibrated silicon photodiode. An onboard STM32 microcontroller computes skin yellowness index without requiring infant blood puncture. Prototype calibration against 85 clinical blood draw samples demonstrated a correlation coefficient of r=0.91 against laboratory Cobas analyzers at a unit manufacturing bill-of-materials under PKR 18,000.",
    supervisorName: "Engr. Fatima Zahra",
    existingCategory: "Biomedical Devices"
  },
  {
    facultyName: "Dr. Samina Bano",
    department: "Biotechnology & Genetic Engineering",
    studentName: "Mariam Aslam, Usama Farooq",
    studentRegNo: "BT-2023-019",
    studentClass: "BS Biotechnology (Semester 6)",
    courseCode: "BT-305",
    projectTitle: "Enzymatic Bioremediation of Toxic Chromium & Azo Dyes from Korangi Industrial Tannery Effluents",
    projectAbstract: "Untreated tannery effluents discharged into Korangi Creek contain hexavalent chromium Cr(VI) and recalcitrant azo dyes exceeding Sindh Environmental Protection Agency (SEPA) limits by over 500%. In this project, bacterial strains isolated from local mangrove mudflats in the Indus delta (Bacillus subtilis and Pseudomonas putida consortia) were acclimatized to elevated chromium concentrations. A bench-scale packed-bed microbial biofilm reactor was constructed to continuously treat raw tannery wastewater. Analytical spectrometry demonstrated 88.5% chromium reduction and 92% dye decolorization within 48 hours without producing hazardous secondary sludge. The system presents an economical alternative to expensive chemical precipitation imported coagulants.",
    supervisorName: "Dr. Abdul Rauf Shakoori",
    existingCategory: "Environmental Biotechnology"
  },
  {
    facultyName: "Dr. Rahat Shamim",
    department: "Pharmaceutics, Faculty of Pharmacy",
    studentName: "Kinza Noman, Muhammad Saad",
    studentRegNo: "PHARM-2022-064",
    studentClass: "Pharm-D Final Year (Semester 10)",
    courseCode: "PH-502",
    projectTitle: "Development and In-Vitro Dissolution Optimization of Sustained-Release Metformin HCl Bilayer Tablets Using Local Ispaghula (Plantago ovata) Mucilage Excipient",
    projectAbstract: "Karachi's dense diabetic demographic necessitates cost-effective, once-daily metformin formulations. However, commercial pharmaceutical manufacturers in Korangi and SITE rely heavily on imported hydroxypropyl methylcellulose (HPMC) polymer excipients costing thousands of dollars in foreign exchange. We extracted and purified natural mucilage polysaccharide from indigenous Pakistani Ispaghula husk as a biodegradable matrix polymer. Bilayer sustained-release tablets containing 500mg Metformin HCl were formulated via wet granulation. In-vitro USP dissolution testing in simulated gastric and intestinal fluids demonstrated steady zero-order drug release over 12 hours adhering to British Pharmacopoeia specifications.",
    supervisorName: "Prof. Dr. Ghazala Raza",
    existingCategory: "Pharmaceutical Formulations"
  },
  {
    facultyName: "Dr. Noman Arshad",
    department: "Management Sciences & Logistics",
    studentName: "Shahmir Khan, Zainab Murtaza",
    studentRegNo: "BBA-2022-215",
    studentClass: "BBA Honours (Semester 8)",
    courseCode: "MGT-492",
    projectTitle: "Algorithmic Truck Queuing and Turnaround Optimization System for Mauripur Road–Karachi Port Container Corridor",
    projectAbstract: "The Mauripur Road and West Wharf freight corridor connects the Karachi Port Trust (KPT) with nationwide dry ports, suffering from severe truck queuing delays averaging 8 to 14 hours per container pickup. This bottleneck incurs massive shipping line demurrage fees and heavy diesel idling emissions. We developed a predictive time-slot dispatching platform and mobile queuing system for fleet operators and customs clearance agents. Utilizing historical GPS breadcrumbs from 350 commercial trucks and berth unloading logs from SAPT, our integer programming model dynamically schedules gate appointments. Pilot simulation on 5 commercial trucking fleets indicated a 38% reduction in truck idling wait times and estimated fuel savings of PKR 4,200 per container trip.",
    supervisorName: "Dr. Asim Bashir",
    existingCategory: "Supply Chain & Logistics"
  },
  {
    facultyName: "Dr. Farhan Ahmed",
    department: "Computer Science",
    studentName: "Omer Sheikh, Talha Qureshi",
    studentRegNo: "CS-2022-311",
    studentClass: "BS Computer Science (Semester 8)",
    courseCode: "CS-499",
    projectTitle: "Urdu Voice-Enabled Digital Ledger and Micro-Credit Risk Scoring for Jodia Bazaar Wholesale Merchants",
    projectAbstract: "Over 80% of wholesale transactions in Karachi's Jodia Bazaar occur through paper-based informal ledgers ('Khatta'), leaving thousands of micro-traders without formal credit histories required by commercial banks. This project created 'BazaarKhata', a smartphone application featuring local Karachi Urdu and Memoni voice recognition for hands-free audio recording of debits and credits. Furthermore, an alternative credit-scoring engine evaluates transaction velocity, supplier repayment regularity, and inventory turnover to generate verifiable SME credit scores compliant with State Bank of Pakistan (SBP) SME financing guidelines. The prototype was field-trialed with 18 wholesale grocery traders in Saddar and Jodia Bazaar.",
    supervisorName: "Dr. Sajjad Haider",
    existingCategory: "Fintech"
  },
  {
    facultyName: "Dr. Imran Nasim",
    department: "Electrical & Energy Systems Engineering",
    studentName: "Waqas Mehmood, Haris Abbasi",
    studentRegNo: "EE-2022-089",
    studentClass: "BE Electrical (Semester 8)",
    courseCode: "EE-490",
    projectTitle: "IoT-Based Industrial Peak Shaving and Power Factor Monitoring Controller for SITE Manufacturing Units",
    projectAbstract: "Due to steep industrial electricity tariffs and severe K-Electric peak-hour capacity surcharges (PKR 65+/unit), medium-sized manufacturing plants face exorbitant utility bills. Moreover, inductive motor loads frequently trip plant power factors below the 0.90 SBP penalty threshold. We designed an automated industrial microgrid controller combining high-precision current-transformer energy sensors with smart automatic capacitor bank switching (APFC). The controller communicates over cellular NB-IoT to a cloud dashboard, predicting 15-minute rolling MDI (Maximum Demand Indicator) peaks and shedding non-critical cooling loads before penalty thresholds trigger. Hardware was installed on a 500kVA injection molding workshop in SITE, saving PKR 140,000 in monthly penalty billing.",
    supervisorName: "Engr. Noman Baig",
    existingCategory: "Energy Efficiency"
  },
  {
    facultyName: "Dr. Asma Siddiqui",
    department: "Food Science & Technology",
    studentName: "Rabia Tanveer, Hira Danish",
    studentRegNo: "FST-2023-044",
    studentClass: "BS Food Science (Semester 7)",
    courseCode: "FS-404",
    projectTitle: "Chitosan-Based Biodegradable Antimicrobial Active Packaging Film for Extending Shelf Life of Karachi Coastal Fish Consignments",
    projectAbstract: "Karachi Fish Harbour suffers from acute post-harvest spoilage where up to 35% of fresh fish catches are downgraded before reaching processing plants or export freezers. Conventional polyethylene wrapping offers no barrier against Pseudomonas bacteria. We extracted chitosan biopolymer from discarded shrimp shells obtained from West Wharf peeling yards and cross-linked it with natural essential oils (clove and lemongrass). The synthesized bioplastic films demonstrated high tensile strength and broad-spectrum antimicrobial inhibition against foodborne pathogens. In refrigerated shelf-life trials on white pomfret fillets, the biodegradable film delayed lipid oxidation and extended microbial shelf-life from 4 days to 11 days.",
    supervisorName: "Dr. Rashida Ali",
    existingCategory: "Food Biotechnology"
  },
  {
    facultyName: "Dr. Syed Kashif",
    department: "Software Engineering",
    studentName: "Ahmed Raza, Daniyal Sheikh",
    studentRegNo: "SE-2022-178",
    studentClass: "BS Software Engineering (Semester 8)",
    courseCode: "SE-498",
    projectTitle: "Decentralized Blockchain Drug Serialization and Anti-Counterfeit Verification for Retail Pharmacies",
    projectAbstract: "Counterfeit and unregistered prescription medications in Karachi pose an acute health hazard, with illicit drugs infiltrating retail pharmacies across dense municipal districts. We engineered 'DawaCheck', an end-to-end pharmaceutical supply chain serialization system built on a private Hyperledger Fabric network. Every production batch minted by participating Karachi pharma manufacturers (such as Getz or Searle) is encoded into secure 2D GS1 DataMatrix codes. Retail chemists and patients verify authenticity via an offline-capable mobile scanner that cryptographically validates factory cryptographic seals against the tamper-proof ledger, immediately flagging stolen or expired batches.",
    supervisorName: "Dr. Muhammad Mobin",
    existingCategory: "Cybersecurity & Blockchain"
  },
  {
    facultyName: "Dr. Nadia Pervez",
    department: "Civil & Environmental Engineering",
    studentName: "Mustafa Kamal, Zain Ul Abideen",
    studentRegNo: "CE-2022-056",
    studentClass: "BE Civil Engineering (Semester 8)",
    courseCode: "CE-480",
    projectTitle: "Eco-Friendly Geopolymer Concrete Utilizing Rice Husk Ash and Copper Slag for Saline Coastal Construction in Clifton and Gwadar",
    projectAbstract: "Karachi's coastal environment causes severe chloride and sulfate attack on reinforced concrete structures in Clifton, DHA Phase 8, and Manora, leading to premature rebar corrosion and structural spalling within 10-15 years. Furthermore, conventional Portland cement production emits heavy CO2. We formulated a 100% cement-free geopolymer concrete utilizing industrial byproducts: agricultural Rice Husk Ash (RHA) from Sindh rice mills and Copper Slag activated with alkali silicates. Compressive strength testing achieved 42 MPa at 28 days. Rapid Chloride Permeability Testing (RCPT) confirmed a 65% reduction in chloride ion penetration compared to ordinary Portland cement, providing a sustainable solution for coastal high-rises and sea walls.",
    supervisorName: "Prof. Dr. Sarosh Hashmat Lodi",
    existingCategory: "Construction Materials"
  },
  {
    facultyName: "Dr. Huma Arshad",
    department: "Biomedical Engineering",
    studentName: "Areeba Tariq, Sarah Khan",
    studentRegNo: "BME-2022-092",
    studentClass: "BE Biomedical (Semester 8)",
    courseCode: "BM-499",
    projectTitle: "Smart Upper-Limb 3D-Printed Myoelectric Prosthetic Arm with Haptic Sensory Feedback for Industrial Amputees",
    projectAbstract: "Karachi's heavy manufacturing and textile spinning units record numerous industrial limb amputation accidents annually, yet imported robotic myoelectric prosthetics cost upwards of PKR 2.5 million, remaining unaffordable for blue-collar factory workers. We created a lightweight, anthropomorphic 3D-printed transradial prosthetic hand utilizing surface electromyography (sEMG) sensors strapped to remaining forearm musculature. An embedded ESP32 microcontroller processes muscle signals via a pattern recognition filter to execute 6 intuitive grip patterns (pinch, grasp, tool hold). A vibrotactile feedback actuator in the socket alerts the user of applied grip force to prevent object crushing. The total prototype cost was under PKR 45,000.",
    supervisorName: "Engr. Kamran Hameed",
    existingCategory: "Prosthetics & Rehabilitation"
  },
  {
    facultyName: "Dr. Mansoor Ul Hassan",
    department: "Computer Science",
    studentName: "Zubair Siddiqui, Kashan Qadir",
    studentRegNo: "CS-2022-401",
    studentClass: "BS CS (Semester 7)",
    courseCode: "CS-412",
    projectTitle: "Generative AI Legal Research Agent for Sindh High Court Case Precedents and Corporate Tax Law",
    projectAbstract: "Corporate law firms and tax consultancies along I.I. Chundrigar Road spend thousands of billable hours manually cross-referencing Sindh High Court case law, Federal Board of Revenue (FBR) statutory regulatory orders (SROs), and Sindh Revenue Board (SRB) circulars. We built 'WaqeelAI', a Retrieval-Augmented Generation (RAG) agentic workflow specialized in Pakistani jurisprudence. The system indexes over 45,000 digitized Sindh High Court and Supreme Court judgments using vector embeddings. Legal researchers query the agent in plain English or Urdu to receive citation-grounded case summaries, conflicting precedents, and tax statute cross-references with zero hallucination via strict document-grounded verification.",
    supervisorName: "Dr. Jawwad Shamsi",
    existingCategory: "Generative AI"
  },
  {
    facultyName: "Dr. Rehan Inam",
    department: "Mechanical & Automotive Engineering",
    studentName: "Sufiyan Baig, Muneeb Ur Rehman",
    studentRegNo: "ME-2022-114",
    studentClass: "BE Mechanical (Semester 8)",
    courseCode: "ME-488",
    projectTitle: "Retrofit Electric Conversion Kit and Regenerative Braking Module for 70cc Motorcycles in Urban Delivery Fleets",
    projectAbstract: "Over 3 million petrol motorcycles operate in Karachi, generating massive carbon emissions and consuming high-cost imported fuel for delivery platforms (Foodpanda, Daraz, Bykea). This project engineers an affordable bolt-on electric powertrain retrofit kit replacing the conventional 70cc internal combustion engine. The kit incorporates a 1.5kW brushless DC hub motor, a customized 48V Lithium Iron Phosphate (LiFePO4) battery pack with intelligent battery management (BMS), and a regenerative braking controller. Dyno and on-road testing in Karachi traffic revealed an operational range of 75 km per single 3-hour charge at an operating cost of PKR 0.85/km compared to PKR 6.20/km on petrol.",
    supervisorName: "Dr. Maaz Akhtar",
    existingCategory: "Industrial Automation & Clean Tech"
  },
  {
    facultyName: "Dr. Saira Afzal",
    department: "Biosciences & Molecular Pathology",
    studentName: "Hafsa Naveed, Nimra Jahangir",
    studentRegNo: "BS-2023-088",
    studentClass: "BS Biosciences (Semester 7)",
    courseCode: "BS-410",
    projectTitle: "Microalgae Photobioreactor System for Carbon Capture and Biofuel Precursor Lipid Production from Power Plant Flue Gases",
    projectAbstract: "Thermal captive power plants in Karachi's Korangi and Port Qasim industrial estates discharge substantial greenhouse gas emissions. We investigated the microalgal strain Chlorella vulgaris cultivated in a closed vertical tubular photobioreactor sparged with simulated power plant flue gas (12% CO2). The microalgae demonstrated a CO2 bio-fixation rate of 1.42 g/L/day under Karachi's ambient solar irradiance. Biomass harvesting followed by ultrasonic solvent extraction yielded 28% dry weight lipid content suitable for transesterification into ASTM-standard biodiesel, while the residual de-fatted algal cake served as a high-protein aquaculture feed for shrimp farming.",
    supervisorName: "Dr. Shakeel Ahmed",
    existingCategory: "Industrial Biotechnology"
  },
  {
    facultyName: "Dr. Adeel Hashmi",
    department: "Finance & Economics",
    studentName: "Fahad Mustafa, Aiman Tariq",
    studentRegNo: "MS-2023-012",
    studentClass: "MS Finance (Semester 4)",
    courseCode: "FIN-701",
    projectTitle: "Shariah-Compliant Micro-Equity Crowdfunding Platform for Women-Led Home Enterprises in Karachi",
    projectAbstract: "Tens of thousands of home-based women entrepreneurs in Karachi (producing artisanal apparel, catering, and cosmetics) lack collateral to secure bank financing and avoid conventional interest-bearing (Riba) micro-loans. We conceptualized and prototyped 'MusharakahDirect', a digital Islamic micro-investment platform leveraging Mudarabah and Diminishing Musharakah contracts. The platform integrates with SBP Raast for instant merchant disbursements and uses WhatsApp-based transaction auditing to track revenue sharing. Legal and Shariah governance frameworks were structured alongside a risk mitigation reserve to safeguard retail investors.",
    supervisorName: "Dr. Irum Saba",
    existingCategory: "Fintech & Entrepreneurship"
  },
  {
    facultyName: "Dr. Kashif Merchant",
    department: "Computer Science",
    studentName: "Zainab Zehra, Ali Shaukat",
    studentRegNo: "CS-2022-290",
    studentClass: "BS CS (Semester 8)",
    courseCode: "CS-499",
    projectTitle: "AI Tele-Triage and Maternal Health Screening System for Lady Health Workers in Malir and Orangi",
    projectAbstract: "High maternal mortality in informal Karachi settlements stems from delayed identification of preeclampsia, gestational diabetes, and anemia during antenatal checkups conducted by Lady Health Workers (LHWs). We engineered an Android application that operates offline without mobile internet. LHWs input basic vital signs (blood pressure, urinary protein test strip photos, symptoms). An onboard lightweight machine learning model classifies high-risk pregnancies with 91.8% sensitivity, generating automated Urdu audio triage guidance and scheduling priority referral appointments at tertiary hubs (Civil Hospital or Indus Hospital) via SMS packets.",
    supervisorName: "Dr. Faisal Iradat",
    existingCategory: "Digital Health"
  },
  {
    facultyName: "Dr. Tanveer Abbas",
    department: "Pharmaceutics",
    studentName: "Naveed Alam, Sobia Pervez",
    studentRegNo: "PH-2022-133",
    studentClass: "Pharm-D (Semester 10)",
    courseCode: "PH-520",
    projectTitle: "Formulation and Clinical Efficacy Evaluation of Silver Nanoparticle Topical Hydrogel from Indigenous Aloe Vera for Diabetic Foot Ulcers",
    projectAbstract: "Diabetic foot ulcers represent one of the most common causes of lower-limb amputations across Karachi hospitals like SIUT and Civil Hospital, complicated by multi-drug resistant bacterial infections (MRSA and Pseudomonas). We synthesized green silver nanoparticles (AgNPs) utilizing leaf extracts of locally cultivated Aloe barbadensis as reducing and capping agents. The bio-synthesized AgNPs were incorporated into a Carbopol-934 hydrogel matrix. In-vitro antimicrobial assays demonstrated prominent zones of inhibition against clinical bacterial isolates. Wound healing animal model assays confirmed 85% ulcer closure within 14 days with marked reduction in exudate and inflammatory cytokines.",
    supervisorName: "Dr. Zafar Alam",
    existingCategory: "Pharmaceutical Formulations"
  },
  {
    facultyName: "Dr. Kamran Farooq",
    department: "Environmental Sciences",
    studentName: "Sanaullah, Mehak Ali",
    studentRegNo: "ENV-2023-045",
    studentClass: "BS Environmental Science (Semester 7)",
    courseCode: "ENV-402",
    projectTitle: "Decentralized Solar-Powered Electrocoagulation Water Purification Unit for Reverse Osmosis Reject Water in Lyari",
    projectAbstract: "Hundreds of reverse osmosis (RO) filtration plants installed across Karachi reject 40-50% of incoming feed water as concentrated saline brine, discarded directly into municipal drains. We designed an off-grid solar-powered electrocoagulation water purification unit utilizing sacrificial aluminum and iron electrodes. The system treats RO reject brine and brackish tube-well water, destabilizing colloidal contaminants and precipitating heavy metals and total dissolved solids (TDS). The pilot unit operates on two 300W photovoltaic panels, purifying 120 liters/hour at a treatment cost under PKR 0.40 per liter of potable WHO-compliant drinking water.",
    supervisorName: "Prof. Dr. Moazzam Ali Khan",
    existingCategory: "Water & Environmental Services"
  },
  {
    facultyName: "Dr. Salman Qureshi",
    department: "Computer Software Engineering",
    studentName: "Muzammil Hussain, Sarah Jawaid",
    studentRegNo: "SE-2022-077",
    studentClass: "BS Software Engineering (Semester 8)",
    courseCode: "SE-499",
    projectTitle: "Predictive Cash-on-Delivery (COD) Return-to-Origin (RTO) Reduction Engine for Pakistani E-Commerce Logistics",
    projectAbstract: "Karachi's e-commerce logistics sector (Daraz, Trax, TCS) suffers an average 25% Return-to-Origin (RTO) rate on Cash-on-Delivery shipments, where buyers refuse parcels upon delivery. This causes devastating losses in two-way courier shipping and dead inventory. We built an AI-driven RTO risk scoring engine trained on 450,000 anonymized delivery records across Karachi postal codes. The model extracts 34 behavioral features including address validity, customer delivery history, and order time-of-day. By flagging high-risk orders in real time, e-commerce merchants can trigger automated WhatsApp address confirmations or require nominal partial advance deposits, cutting simulated RTO losses by 31%.",
    supervisorName: "Dr. Muhammad Atif",
    existingCategory: "E-Commerce & Data Science"
  },
  {
    facultyName: "Dr. Asadullah Shaikh",
    department: "Information Technology",
    studentName: "Raheel Zafar, Fatima Noor",
    studentRegNo: "IT-2022-205",
    studentClass: "BS IT (Semester 8)",
    courseCode: "IT-490",
    projectTitle: "LoRaWAN Smart Acoustic Sensor Network for Real-Time Drinking Water Pipeline Leakage Detection for KW&SC",
    projectAbstract: "The Karachi Water and Sewerage Corporation (KW&SC) loses over 35% of bulk water supply through undetected underground pipe bursts and illegal tanker punctures along the Hub Dam and Dhabeji main conduits. We engineered an underground acoustic vibration sensor network utilizing piezoelectric sensors coupled with low-power LoRaWAN transceivers. Vibration frequency signatures of escaping high-pressure water are processed on-node using edge FFT signal analysis. Leak alerts and GPS pipeline coordinates are relayed across 8-kilometer transmission ranges to a municipal web dashboard, pinpointing leak locations within 2.5 meters accuracy and minimizing water loss.",
    supervisorName: "Dr. Irfan Hyder",
    existingCategory: "Internet of Things & Utilities"
  },
  {
    facultyName: "Dr. Naila Tabassum",
    department: "Pharmacognosy & Natural Products",
    studentName: "Masooma Batool, Daniyal Khan",
    studentRegNo: "PH-2022-098",
    studentClass: "Pharm-D (Semester 10)",
    courseCode: "PH-515",
    projectTitle: "Standardized Phytochemical Extraction and Commercial Scalability of Anti-Inflammatory Compounds from Indigenous Sindh Neem (Azadirachta indica)",
    projectAbstract: "Local cosmetic and dermatological companies in Karachi import active herbal extracts from Europe and India at inflated prices, despite the abundance of Neem trees across the Malir and Sindh belt. We established an optimized, green supercritical CO2 extraction protocol for azadirachtin and nimbin from locally harvested Neem seeds. Chromatographic fingerprinting (HPLC) established high active yield purity (96.4%). The standardized extract was formulated into a soothing dermatological cream with verified stability testing over 6 months at 40°C/75% RH. Cost-benefit analysis indicated a 60% production cost reduction compared to imported synthetic corticosteroid creams.",
    supervisorName: "Prof. Dr. Mansoor Ahmad",
    existingCategory: "Healthcare Products"
  },
  {
    facultyName: "Dr. Rizwan Qureshi",
    department: "Mechanical & Materials Engineering",
    studentName: "Owais Raza, Shahzaib Ali",
    studentRegNo: "ME-2022-040",
    studentClass: "BE Materials (Semester 8)",
    courseCode: "ME-491",
    projectTitle: "Upcycling Industrial Cotton Yarn Waste into Thermal and Acoustic Insulation Ceiling Tiles for Factory Sheds",
    projectAbstract: "Textile spinning and garment cutting factories across SITE and Korangi generate hundreds of tons of fabric clips and cotton yarn waste daily, mostly burnt or discarded in open landfills. At the same time, factory tin roof sheds generate oppressive indoor temperatures exceeding 45°C during summer, severely degrading worker productivity. We developed a compressed composite ceiling panel utilizing discarded cotton fiber shreds bonded with an eco-friendly starch-borate flame-retardant binder. Thermal conductivity testing achieved 0.038 W/m·K (matching commercial glass wool) with self-extinguishing fire resistance complying with UL-94 standards, offering factory owners cheap thermal insulation.",
    supervisorName: "Dr. Syed Amir Iqbal",
    existingCategory: "Materials & Circular Economy"
  },
  {
    facultyName: "Dr. Tehmina Kausar",
    department: "Management & Entrepreneurship",
    studentName: "Bilal Siddiqui, Mahnoor Khan",
    studentRegNo: "BBA-2022-102",
    studentClass: "BBA (Semester 8)",
    courseCode: "ENT-402",
    projectTitle: "B2B Digital Scrap Metal Marketplace and Verified Pricing Platform for Shershah Informal Recyclers",
    projectAbstract: "Karachi's Shershah scrap market is the primary clearing hub for industrial machinery, shipbreaking steel from Gadani, and factory scrap. However, lack of transparent daily price indices, predatory brokers, and opaque weighing scales deprive manufacturing enterprises of fair value while causing cash settlement disputes. We designed 'ScrapMandee', a mobile B2B marketplace connecting certified scrap-generating industrial plants (textile, automotive, construction) directly with vetted foundry re-rolling mills. The platform introduces digital weighing ticket verification, daily Karachi spot price indices for copper, aluminum, and rebar, and escrow-backed payments.",
    supervisorName: "Dr. Amber Raza",
    existingCategory: "Retail & B2B E-Commerce"
  },
  {
    facultyName: "Dr. Javed Iqbal",
    department: "Computer Science",
    studentName: "Arham Tariq, Umair Shah",
    studentRegNo: "CS-2022-388",
    studentClass: "BS CS (Semester 8)",
    courseCode: "CS-499",
    projectTitle: "AI-Powered Automated Inspection of Welded Automotive Sheet Metal Joints for Port Qasim Auto Assemblers",
    projectAbstract: "Automotive assembly plants at Port Qasim (assembling Toyota, Suzuki, and commercial trucks) inspect spot-welded chassis joints through destructive chisel testing and manual inspection, leading to scrap losses and undetected cold weld weaknesses. We developed an automated ultrasonic non-destructive testing (NDT) scanner coupled with an edge deep learning classifier. As an acoustic probe scans spot welds, high-frequency A-scans are converted to time-frequency scalograms. Our lightweight ResNet model classifies weld nugget integrity (good, undersized, burned, porosity) with 96.1% accuracy in under 1.2 seconds, enabling 100% online in-line inspection.",
    supervisorName: "Dr. Khurram Mustafa",
    existingCategory: "Manufacturing Automation"
  },
  {
    facultyName: "Dr. Shahab Uddin",
    department: "Marine Sciences & Blue Economy",
    studentName: "Junaid Akhtar, Hania Farooq",
    studentRegNo: "MAR-2023-017",
    studentClass: "BS Marine Science (Semester 7)",
    courseCode: "MAR-405",
    projectTitle: "Solar-Powered Cold Storage and IoT Salinity Monitoring for Artisanal Crab and Shrimp Farming in Korangi Creek",
    projectAbstract: "Artisanal coastal communities in Korangi Creek, Ibrahim Hyderi, and Rehri Goth face dwindling marine fish catches. High-value mud crab and penaeid shrimp aquaculture present lucrative alternative livelihoods, yet farmers suffer from severe mortality during summer salinity spikes and lack of ice storage. We engineered a floating off-grid solar-aerated nursery pond system equipped with continuous multiparameter water sensors (dissolved oxygen, salinity, temperature). Data streams via GSM to a farmer's mobile phone with automated aerator control. An integrated 200-liter DC solar refrigeration box maintains harvested crabs and shrimp at 4°C, preventing spoilage and securing 40% higher market prices.",
    supervisorName: "Dr. Rashida Qari",
    existingCategory: "Blue Economy & Aquaculture"
  }
];

if (typeof window !== "undefined") {
  window.SAMPLE_PROJECTS_DATA = SAMPLE_PROJECTS_DATA;
}
