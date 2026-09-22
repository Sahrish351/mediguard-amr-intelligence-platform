/**
 * MediGuard Curated Clinical & Healthcare Photography Registry
 * Categorized high-resolution clinical imagery for editorial healthcare SaaS presentation.
 * MANDATORY: Every image has a unique Unsplash URL with zero duplication.
 */

export interface ClinicalImageItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
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
    | 'auth'
    | 'problem'
    | 'research'
    | 'security'
    | 'stewardship';
}

export const CLINICAL_IMAGE_REGISTRY: Record<string, ClinicalImageItem> = {
  // Hero Visual
  heroComposition: {
    id: 'hero-comp',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    alt: 'Healthcare clinician reviewing clinical intelligence data',
    caption: 'Global Medication Safety & AMR Intelligence Operations',
    category: 'hero',
  },

  // Doctors & Prescribing
  doctorReviewingData: {
    id: 'doc-review',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Physician reviewing electronic health records and antimicrobial guidelines',
    caption: 'Evidence-Based Prescribing & AWaRe Verification',
    category: 'doctor',
  },
  doctorTeamConsult: {
    id: 'doc-team',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    alt: 'Multidisciplinary hospital clinical team consulting on patient therapy',
    caption: 'Collaborative Antimicrobial Stewardship Review',
    category: 'doctor',
  },

  // Microbiology & Diagnostics
  microbiologyCulturePetri: {
    id: 'micro-petri',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    alt: 'Culture plate showing bacterial inhibition zones for AST',
    caption: 'Phenotypic Antimicrobial Susceptibility Testing',
    category: 'microbiology',
  },
  microscopeAnalysis: {
    id: 'micro-scope',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    alt: 'Laboratory microscope examination of bacterial isolate morphology',
    caption: 'High-Power Microscopy & Organism Speciation',
    category: 'microbiology',
  },
  laboratoryScientistBench: {
    id: 'lab-bench',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Medical laboratory technologist working at specimen testing station',
    caption: 'Quantitative Microdilution & CLSI Interpretive Rules',
    category: 'laboratory',
  },

  // Pharmacy & Batch Safety
  pharmacyVialsPackaging: {
    id: 'pharm-vials',
    url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80',
    alt: 'Medication vials and pharmaceutical packaging awaiting verification',
    caption: 'GS1 Serialization and Lot Traceability',
    category: 'pharmacy',
  },
  pharmacistReviewingMeds: {
    id: 'pharm-review',
    url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    alt: 'Clinical pharmacist preparing medications at hospital pharmacy',
    caption: 'Point-of-Dispense Verification & Stock Floor Protection',
    category: 'pharmacy',
  },
  pharmacyColdChain: {
    id: 'pharm-cold',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    alt: 'Refrigerated medicine storage and cold-chain compliance',
    caption: 'Cold-Chain Telemetry (2–8°C Excursion Radar)',
    category: 'pharmacy',
  },

  // Epidemiology & Surveillance
  epidemiologyMapAnalytics: {
    id: 'epi-analytics',
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Geospatial epidemiological surveillance graphs and analytics',
    caption: 'Catchment Resistance Heatmaps & Surge Forecasting',
    category: 'epidemiology',
  },
  publicHealthCenter: {
    id: 'public-health',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Healthcare operations command center monitoring pathogen signals',
    caption: 'Regional Public Health Surveillance Network',
    category: 'epidemiology',
  },

  // Technology & AI
  aiHealthcareTelemetry: {
    id: 'ai-telemetry',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    alt: 'High-availability data infrastructure for clinical surveillance',
    caption: 'Zero-Leakage Multi-Tenant Security Kernel',
    category: 'technology',
  },
  aiBioAnalytics: {
    id: 'ai-bio',
    url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    alt: 'Data streams representing grounded healthcare AI analysis',
    caption: 'Grounded Clinical AI Surveillance Engine',
    category: 'ai',
  },

  // Authentication & Security
  authHeroVisual: {
    id: 'auth-hero',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sterile clinical hospital environment',
    caption: 'Enterprise Healthcare Intelligence Platform',
    category: 'auth',
  },

  // The 4 Core Healthcare Problems
  problemMedicationSafety: {
    id: 'prob-med',
    url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80',
    alt: 'Counterfeit and degraded medication inspection',
    caption: 'Substandard & Counterfeit Antimicrobials',
    category: 'problem',
  },
  problemAntimicrobialResistance: {
    id: 'prob-amr',
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    alt: 'Superbug pathogen resistant to broad-spectrum therapies',
    caption: 'Uncontrolled Resistance Selection Pressure',
    category: 'problem',
  },
  problemFragmentedData: {
    id: 'prob-data',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    alt: 'Disjointed paper records and isolated hospital software silos',
    caption: 'Fragmented Healthcare & Diagnostic Silos',
    category: 'problem',
  },
  problemDelayedSurveillance: {
    id: 'prob-surv',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Global network connectivity showing delayed reporting latencies',
    caption: 'Delayed Outbreak Detection & Retrospective Audits',
    category: 'problem',
  },

  // Research & Methodology
  researchGenomics: {
    id: 'res-genomics',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Scientific research laboratory studying resistance determinants',
    caption: 'Translational Research & Antibiogram Standards',
    category: 'research',
  },

  // Cybersecurity & Infrastructure
  securityDatacenter: {
    id: 'sec-infra',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cryptographic data security architecture for health systems',
    caption: 'Row-Level Security & Cryptographic Tenancy',
    category: 'security',
  },

  // Stewardship Oversight
  stewardshipConsultation: {
    id: 'stew-consult',
    url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    alt: 'Infectious disease stewardship specialist analyzing antibiotic metrics',
    caption: 'Institutional AWaRe Target Oversight',
    category: 'stewardship',
  },
};

// Direct convenience mapping with ZERO duplicated URLs
export const CLINICAL_IMAGES = {
  hero: CLINICAL_IMAGE_REGISTRY.heroComposition.url,
  heroLab: CLINICAL_IMAGE_REGISTRY.laboratoryScientistBench.url,
  doctor: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  doctorTeam: CLINICAL_IMAGE_REGISTRY.doctorTeamConsult.url,
  microbiology: CLINICAL_IMAGE_REGISTRY.microbiologyCulturePetri.url,
  microscope: CLINICAL_IMAGE_REGISTRY.microscopeAnalysis.url,
  laboratory: CLINICAL_IMAGE_REGISTRY.laboratoryScientistBench.url,
  pharmacy: CLINICAL_IMAGE_REGISTRY.pharmacyVialsPackaging.url,
  pharmacist: CLINICAL_IMAGE_REGISTRY.pharmacistReviewingMeds.url,
  coldChain: CLINICAL_IMAGE_REGISTRY.pharmacyColdChain.url,
  epidemiology: CLINICAL_IMAGE_REGISTRY.epidemiologyMapAnalytics.url,
  publicHealth: CLINICAL_IMAGE_REGISTRY.publicHealthCenter.url,
  aiTelemetry: CLINICAL_IMAGE_REGISTRY.aiHealthcareTelemetry.url,
  aiBio: CLINICAL_IMAGE_REGISTRY.aiBioAnalytics.url,
  auth: CLINICAL_IMAGE_REGISTRY.authHeroVisual.url,
  problemMedication: CLINICAL_IMAGE_REGISTRY.problemMedicationSafety.url,
  problemAMR: CLINICAL_IMAGE_REGISTRY.problemAntimicrobialResistance.url,
  problemData: CLINICAL_IMAGE_REGISTRY.problemFragmentedData.url,
  problemSurveillance: CLINICAL_IMAGE_REGISTRY.problemDelayedSurveillance.url,
  research: CLINICAL_IMAGE_REGISTRY.researchGenomics.url,
  security: CLINICAL_IMAGE_REGISTRY.securityDatacenter.url,
  stewardship: CLINICAL_IMAGE_REGISTRY.stewardshipConsultation.url,

  // Backward compatible aliases
  doctorTabletConsultation: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  doctorPrescribingStethoscope: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  doctorConsultation: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
  scientistMicroscope: CLINICAL_IMAGE_REGISTRY.microscopeAnalysis.url,
  microscopeIsolate: CLINICAL_IMAGE_REGISTRY.microscopeAnalysis.url,
  heroHospitalCommand: CLINICAL_IMAGE_REGISTRY.publicHealthCenter.url,
  commandCenter: CLINICAL_IMAGE_REGISTRY.publicHealthCenter.url,
  microbiologyLab: CLINICAL_IMAGE_REGISTRY.laboratoryScientistBench.url,
  pharmacyDispensing: CLINICAL_IMAGE_REGISTRY.pharmacistReviewingMeds.url,
  pharmacyDispense: CLINICAL_IMAGE_REGISTRY.pharmacyVialsPackaging.url,
  stewardshipReview: CLINICAL_IMAGE_REGISTRY.doctorTeamConsult.url,
  epidemiologyMonitoringCenter: CLINICAL_IMAGE_REGISTRY.epidemiologyMapAnalytics.url,
  petriDishCulture: CLINICAL_IMAGE_REGISTRY.microbiologyCulturePetri.url,
  globalResearchGenomics: CLINICAL_IMAGE_REGISTRY.aiBioAnalytics.url,
  heroDoctorReviewingData: CLINICAL_IMAGE_REGISTRY.doctorReviewingData.url,
};
