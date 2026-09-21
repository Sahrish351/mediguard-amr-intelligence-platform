/**
 * MediGuard Curated Clinical & Healthcare Photography Registry
 * Categorized high-resolution clinical imagery for editorial healthcare SaaS presentation.
 */

export interface ClinicalImageItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  category:
    | 'hero'
    | 'doctor'
    | 'laboratory'
    | 'microbiology'
    | 'pharmacy'
    | 'epidemiology'
    | 'technology'
    | 'ai'
    | 'hospital'
    | 'auth';
}

export const CLINICAL_IMAGE_REGISTRY: Record<string, ClinicalImageItem> = {
  // Hero Visuals
  heroComposition: {
    id: 'hero-comp',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    alt: 'Healthcare clinician monitoring advanced clinical surveillance telemetries',
    caption: 'Global Medication Safety & AMR Intelligence Operations Desk',
    category: 'hero',
  },
  heroLaboratory: {
    id: 'hero-lab',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sterile microbiology laboratory specimen testing bench',
    caption: 'Automated Microdilution and Antibiogram Susceptibility Testing',
    category: 'hero',
  },

  // Doctors & Prescribing
  doctorReviewingData: {
    id: 'doc-review',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Senior physician reviewing electronic health records and antimicrobial advisories',
    caption: 'Dr. Sarah Jenkins reviewing pathogen-directed therapy suggestions',
    category: 'doctor',
  },
  doctorTeamConsult: {
    id: 'doc-team',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    alt: 'Multidisciplinary clinical team conducting antimicrobial stewardship rounds',
    caption: 'Antimicrobial Stewardship Collaborative Case Review',
    category: 'doctor',
  },

  // Microbiology & Cultures
  microbiologyCulturePetri: {
    id: 'micro-petri',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    alt: 'Petri dish culture plate showing bacterial inhibition zones for antibiotic susceptibility',
    caption: 'Kirby-Bauer Disc Diffusion & Phenotypic Resistance Assessment',
    category: 'microbiology',
  },
  microscopeAnalysis: {
    id: 'micro-scope',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    alt: 'High-power optical microscopy examining bacterial morphology and Gram staining',
    caption: 'Rapid Gram-Negative Bacilli Identification and AST Verification',
    category: 'microbiology',
  },
  laboratoryScientistBench: {
    id: 'lab-bench',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Certified medical technologist accessioning blood culture specimens in cleanroom',
    caption: 'Automated Blood Culture Specimen Processing Laboratory',
    category: 'laboratory',
  },

  // Pharmacy & Batch Safety
  pharmacyVialsPackaging: {
    id: 'pharm-vials',
    url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pharmaceutical vials and cold-chain antibiotic packaging awaiting batch verification',
    caption: 'GS1 Serialization and Cold-Chain Anti-Counterfeit Verification',
    category: 'pharmacy',
  },
  pharmacistReviewingMeds: {
    id: 'pharm-review',
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hospital clinical pharmacist dispensing critical intravenous antimicrobials',
    caption: 'Closed-Loop Dispensing and Non-Negative Stock Floor Protection',
    category: 'pharmacy',
  },

  // Epidemiology & Surveillance
  epidemiologyMapAnalytics: {
    id: 'epi-analytics',
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Epidemiological geospatial heatmaps and multidrug-resistant pathogen surveillance graphs',
    caption: 'Macro-Surveillance Regional Resistance Index & Outbreak Cluster Detection',
    category: 'epidemiology',
  },
  publicHealthCenter: {
    id: 'public-health',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern hospital command center monitoring regional pathogen vectors',
    caption: 'WHO GLASS & National Health Security Monitoring Network',
    category: 'epidemiology',
  },

  // AI & Technology
  aiHealthcareTelemetry: {
    id: 'ai-telemetry',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    alt: 'Secure data center computing infrastructure for real-time clinical surveillance AI',
    caption: 'Serverless Edge LLM Execution with Cryptographic Organization Scoping',
    category: 'ai',
  },
  aiBioAnalytics: {
    id: 'ai-bio',
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    alt: 'Neural network data streams analyzing bacterial genome sequences',
    caption: 'Grounded Gemini AI Copilot Query Engine for Phenotypic Predictions',
    category: 'ai',
  },

  // Authentication & Brand
  authHeroVisual: {
    id: 'auth-hero',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sterile surgical and clinical operations environment representing medical safety',
    caption: 'Enterprise Healthcare Intelligence • Multi-Tenant Isolated Infrastructure',
    category: 'auth',
  },
};

// Direct convenience mapping
export const CLINICAL_IMAGES = {
  hero: CLINICAL_IMAGE_REGISTRY.heroComposition.url,
  heroLab: CLINICAL_IMAGE_REGISTRY.heroLaboratory.url,
  doctor: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  doctorTeam: CLINICAL_IMAGE_REGISTRY.doctorTeamConsult.url,
  microbiology: CLINICAL_IMAGE_REGISTRY.microbiologyCulturePetri.url,
  microscope: CLINICAL_IMAGE_REGISTRY.microscopeAnalysis.url,
  laboratory: CLINICAL_IMAGE_REGISTRY.laboratoryScientistBench.url,
  pharmacy: CLINICAL_IMAGE_REGISTRY.pharmacyVialsPackaging.url,
  pharmacist: CLINICAL_IMAGE_REGISTRY.pharmacistReviewingMeds.url,
  epidemiology: CLINICAL_IMAGE_REGISTRY.epidemiologyMapAnalytics.url,
  publicHealth: CLINICAL_IMAGE_REGISTRY.publicHealthCenter.url,
  aiTelemetry: CLINICAL_IMAGE_REGISTRY.aiHealthcareTelemetry.url,
  aiBio: CLINICAL_IMAGE_REGISTRY.aiBioAnalytics.url,
  auth: CLINICAL_IMAGE_REGISTRY.authHeroVisual.url,

  // Backward compatible aliases
  doctorTabletConsultation: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  doctorPrescribingStethoscope: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  scientistMicroscope: CLINICAL_IMAGE_REGISTRY.microscopeAnalysis.url,
  heroHospitalCommand: CLINICAL_IMAGE_REGISTRY.publicHealthCenter.url,
  microbiologyLab: CLINICAL_IMAGE_REGISTRY.laboratoryScientistBench.url,
  pharmacyDispensing: CLINICAL_IMAGE_REGISTRY.pharmacistReviewingMeds.url,
  stewardshipReview: CLINICAL_IMAGE_REGISTRY.doctorTeamConsult.url,
  epidemiologyMonitoringCenter: CLINICAL_IMAGE_REGISTRY.epidemiologyMapAnalytics.url,
  petriDishCulture: CLINICAL_IMAGE_REGISTRY.microbiologyCulturePetri.url,
  globalResearchGenomics: CLINICAL_IMAGE_REGISTRY.aiBioAnalytics.url,
  heroDoctorReviewingData: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
};

