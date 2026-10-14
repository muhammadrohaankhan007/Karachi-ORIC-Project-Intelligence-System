/**
 * Subject & Specialization Classification Taxonomy
 * 5 Core Disciplines with 40+ Technical Specializations and keyword heuristics.
 * Administrator-editable in application settings.
 */

const SUBJECT_TAXONOMY = {
  "Computer Science and Information Technology": {
    code: "CSIT",
    name: "Computer Science and Information Technology",
    color: "#2563eb",
    icon: "cpu",
    specializations: {
      "Artificial Intelligence and Machine Learning": {
        keywords: ["artificial intelligence", "machine learning", "deep learning", "neural network", "computer vision", "nlp", "natural language processing", "reinforcement learning", "transformer", "yolo", "cnn", "lstm", "random forest", "clustering", "classification", "predictive model"]
      },
      "Generative AI and AI Agents": {
        keywords: ["generative ai", "large language model", "llm", "ai agent", "autonomous agent", "prompt engineering", "diffusion model", "rag", "retrieval augmented generation", "langchain", "gpt", "gemini", "fine-tuning", "vector database"]
      },
      "Software Engineering": {
        keywords: ["software engineering", "architecture", "microservices", "api", "design patterns", "ci/cd", "devops", "testing framework", "code refactoring", "agile", "version control", "backend", "full stack"]
      },
      "Mobile and Web Applications": {
        keywords: ["mobile application", "android", "ios", "react native", "flutter", "web application", "pwa", "frontend", "responsive design", "rest api", "single page application", "portal", "dashboard"]
      },
      "Cybersecurity": {
        keywords: ["cybersecurity", "information security", "encryption", "firewall", "penetration testing", "vulnerability assessment", "malware detection", "intrusion detection", "authentication", "zero trust", "phishing", "cryptography", "blockchain security"]
      },
      "Data Science and Analytics": {
        keywords: ["data science", "data analytics", "big data", "data pipeline", "business intelligence", "etl", "predictive analytics", "data visualization", "pandas", "data warehouse", "tableau", "power bi"]
      },
      "Internet of Things": {
        keywords: ["internet of things", "iot", "sensor", "arduino", "raspberry pi", "esp32", "lorawan", "rfid", "telemetry", "embedded system", "smart sensor", "zigbee", "actuator"]
      },
      "Cloud Computing": {
        keywords: ["cloud computing", "aws", "azure", "google cloud", "docker", "kubernetes", "serverless", "distributed systems", "cloud storage", "containerization", "virtualization"]
      },
      "Fintech": {
        keywords: ["fintech", "financial technology", "digital payment", "raast", "mobile wallet", "blockchain", "smart contract", "cryptocurrency", "credit scoring", "loan automation", "fraud detection", "remittance"]
      },
      "EdTech": {
        keywords: ["edtech", "educational technology", "learning management system", "lms", "e-learning", "automated grading", "virtual classroom", "student assessment", "adaptive learning", "gamified education"]
      },
      "Enterprise Automation": {
        keywords: ["enterprise automation", "erp", "robotic process automation", "rpa", "workflow automation", "business process automation", "inventory automation", "crm", "sap integration", "digital workflow"]
      }
    }
  },

  "Biomedical Engineering": {
    code: "BME",
    name: "Biomedical Engineering",
    color: "#0d9488",
    icon: "activity",
    specializations: {
      "Medical Devices": {
        keywords: ["medical device", "biomedical instrument", "infusion pump", "surgical instrument", "ventilator", "defibrillator", "biocompatible", "sterilization device", "anesthesia", "dialysis"]
      },
      "Diagnostic Equipment": {
        keywords: ["diagnostic equipment", "point of care testing", "biosensor", "blood analyzer", "glucometer", "vital signs monitor", "ecg", "eeg", "emg", "pathology diagnostic", "rapid test"]
      },
      "Rehabilitation Technology": {
        keywords: ["rehabilitation technology", "physical therapy", "stroke recovery", "gait training", "robotic exoskeleton", "neuromuscular stimulation", "mobility aid", "occupational therapy"]
      },
      "Prosthetics and Orthotics": {
        keywords: ["prosthetics", "orthotics", "bionic limb", "artificial limb", "socket design", "carbon fiber prosthetic", "myoelectric", "orthotic brace", "amputee support", "3d printed prosthetic"]
      },
      "Medical Imaging": {
        keywords: ["medical imaging", "mri", "ct scan", "ultrasound", "x-ray", "radiology", "dicom", "image segmentation", "fluoroscopy", "echocardiogram", "mammography"]
      },
      "Digital Health": {
        keywords: ["digital health", "telemedicine", "telehealth", "electronic medical record", "emr", "ehr", "remote patient monitoring", "health informatics", "clinical decision support", "mobile health", "mhealth"]
      },
      "Wearable Health Technology": {
        keywords: ["wearable health", "smartwatch health", "pulse oximeter", "continuous glucose monitor", "fitness tracker", "biometric sensor", "smart textile", "wearable patch", "fall detection"]
      },
      "Hospital Equipment": {
        keywords: ["hospital equipment", "icu equipment", "autoclave", "operating theater", "patient bed", "incubator", "calibration", "hospital asset tracking", "biomedical waste handler"]
      },
      "Assistive Technologies": {
        keywords: ["assistive technology", "visual impairment", "hearing aid", "speech synthesis", "braille", "smart wheelchair", "elderly care", "disability assistance", "accessible interface"]
      }
    }
  },

  "Biosciences": {
    code: "BIOS",
    name: "Biosciences",
    color: "#16a34a",
    icon: "dna",
    specializations: {
      "Biotechnology": {
        keywords: ["biotechnology", "fermentation", "bioreactor", "enzyme production", "bioprocess", "bioassay", "cellular biology", "protein expression", "bioactive compound"]
      },
      "Industrial Biotechnology": {
        keywords: ["industrial biotechnology", "biofuel", "bioplastics", "industrial enzymes", "biocatalysis", "microbial fermentation", "bioethanol", "bioremediation of industrial effluent"]
      },
      "Molecular Biology": {
        keywords: ["molecular biology", "dna", "rna", "pcr", "crispr", "gene editing", "genomics", "proteomics", "cloning", "sequence analysis", "primer design"]
      },
      "Agricultural Biotechnology": {
        keywords: ["agricultural biotechnology", "crop yield", "pest resistance", "drought tolerant", "plant tissue culture", "biofertilizer", "biopesticide", "seed pathology", "transgenic plant"]
      },
      "Environmental Biotechnology": {
        keywords: ["environmental biotechnology", "wastewater treatment", "bioremediation", "microbial degradation", "heavy metal bioaccumulation", "solid waste composting", "biofiltration", "algae treatment"]
      },
      "Microbiology": {
        keywords: ["microbiology", "bacteria", "fungi", "viral pathogen", "antimicrobial resistance", "amr", "culture medium", "colony counting", "gram staining", "biofilm"]
      },
      "Food Biotechnology": {
        keywords: ["food biotechnology", "probiotics", "food fermentation", "spoilage prevention", "food preservation", "nutraceuticals", "enzyme processing in food", "shelf life extension"]
      },
      "Marine Biotechnology": {
        keywords: ["marine biotechnology", "blue economy", "seaweed", "algae cultivation", "chitosan extraction", "marine bioactive", "fish processing waste utilization", "mangrove bioprospecting"]
      }
    }
  },

  "Pharmacy and Pharmaceutical Sciences": {
    code: "PHARM",
    name: "Pharmacy and Pharmaceutical Sciences",
    color: "#7c3aed",
    icon: "pill",
    specializations: {
      "Drug Discovery": {
        keywords: ["drug discovery", "molecular docking", "lead compound", "pharmacophore", "qsar", "phytochemical screening", "target binding", "natural product extraction", "medicinal chemistry"]
      },
      "Pharmaceutical Formulations": {
        keywords: ["pharmaceutical formulation", "tablet compression", "capsule", "suspension", "emulsion", "excipient", "dosage form", "topical gel", "oral disintegrating tablet", "stability testing"]
      },
      "Drug Delivery Systems": {
        keywords: ["drug delivery", "nanoparticle", "liposome", "targeted delivery", "controlled release", "transdermal patch", "microencapsulation", "biodegradable polymer carrier", "hydrogel carrier"]
      },
      "Quality Control and Testing": {
        keywords: ["quality control", "qc testing", "hplc", "spectrophotometry", "dissolution testing", "drap compliance", "assay validation", "pharmacopeia", "impurity profiling", "shelf life study"]
      },
      "Pharmaceutical Manufacturing": {
        keywords: ["pharmaceutical manufacturing", "good manufacturing practice", "gmp", "cleanroom", "sterile manufacturing", "lyophilization", "granulation", "continuous manufacturing", "active pharmaceutical ingredient", "api synthesis"]
      },
      "Pharmacovigilance": {
        keywords: ["pharmacovigilance", "adverse drug reaction", "adr", "post marketing surveillance", "drug safety", "patient safety monitoring", "regulatory reporting", "drap reporting"]
      },
      "Digital Pharmacy": {
        keywords: ["digital pharmacy", "e-pharmacy", "online prescription", "prescription verification", "telepharmacy", "pharmaceutical inventory management", "drug interaction checker"]
      },
      "Healthcare Products": {
        keywords: ["healthcare product", "nutraceutical", "cosmeceutical", "herbal medicine", "dietary supplement", "topical antiseptic", "dermatological product", "wellness formulation"]
      }
    }
  },

  "Business and Management Sciences": {
    code: "BMS",
    name: "Business and Management Sciences",
    color: "#ea580c",
    icon: "trending-up",
    specializations: {
      "Business Process Innovation": {
        keywords: ["business process innovation", "operational efficiency", "process reengineering", "lean six sigma", "kaizen", "cost reduction", "quality management", "change management"]
      },
      "Supply Chain and Logistics": {
        keywords: ["supply chain", "logistics", "inventory management", "fleet management", "cold chain", "warehouse management", "port logistics", "freight forwarding", "procurement", "last mile delivery"]
      },
      "Entrepreneurship": {
        keywords: ["entrepreneurship", "startup", "business model canvas", "venture capital", "angel investment", "incubation", "product market fit", "commercialization strategy", "seed funding"]
      },
      "Financial Technology": {
        keywords: ["financial technology", "islamic finance", "sukuk", "microfinance", "digital banking", "wealth management", "credit risk assessment", "algorithmic trading", "sme financing"]
      },
      "Marketing Technology": {
        keywords: ["marketing technology", "martech", "customer relationship management", "digital marketing", "customer churn", "social media analytics", "brand sentiment", "conversion optimization"]
      },
      "Human Resource Technology": {
        keywords: ["human resource technology", "hr tech", "talent acquisition", "employee attrition", "performance appraisal", "applicant tracking system", "workplace productivity", "employee engagement"]
      },
      "Retail and E-commerce": {
        keywords: ["retail and e-commerce", "omnichannel", "b2b marketplace", "consumer behavior", "point of sale", "merchandising", "e-commerce logistics", "cash on delivery", "quick commerce"]
      },
      "Sustainability and Social Enterprise": {
        keywords: ["sustainability", "social enterprise", "esg", "environmental social governance", "circular economy", "green finance", "corporate social responsibility", "csr", "sustainable development goals", "sdg"]
      }
    }
  }
};

if (typeof window !== "undefined") {
  window.SUBJECT_TAXONOMY = SUBJECT_TAXONOMY;
}
