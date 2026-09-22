import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  FileText,
  PackageCheck,
  Microscope,
  AlertTriangle,
  FileSearch,
  Sparkles,
  CheckCircle2,
  Database,
  Layers,
  Lock,
  Activity,
  Cpu,
  Server,
  Network,
  QrCode,
  LineChart,
  Globe,
  BarChart3,
  Stethoscope,
  Pill,
} from 'lucide-react';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';
import { SectionHeader, Button } from '@/components/design-system';

export const HowItWorksPage: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'Electronic Prescription Ingestion & Indication Capture',
      desc: 'Clinicians order antimicrobials directly within hospital EHR / CPOE interfaces. Patient identifiers are immediately hashed into pseudonymous tokens (e.g. PAT-90823-X). Indication-based checks verify whether therapy is directed, empirical, or surgical prophylaxis.',
      inputs: 'EHR Order Payload, ICD-10 Diagnosis, Patient Bed, Clinical Indication',
      processing: 'SHA-256 Tokenization, WHO AWaRe 2024 Categorization, Formulary Restrictions Engine',
      outputs: 'Cryptographically Tokenized Prescription Record, AWaRe Guidance Flags',
      image: CLINICAL_IMAGES.doctor,
      badge: 'EHR / CPOE Integration',
    },
    {
      num: '02',
      title: 'Pharmacy Dispensing Queue & Stock Floor Verification',
      desc: 'The prescription streams into the pharmacy dispensing workstation. The automated system verifies formulary authorization and computes dose safety before medication is retrieved from storage.',
      inputs: 'Tokenized Prescription ID, Requested Quantity, Dispensing Pharmacist Identity',
      processing: 'Active Prescription Verification, Stock Floor Non-Negative Boundary Calculation',
      outputs: 'Dispensing Authorization Token, Dispense Queue Record',
      image: CLINICAL_IMAGES.pharmacist,
      badge: 'Pharmacy Operations',
    },
    {
      num: '03',
      title: 'GS1 DataMatrix Batch Verification & Anti-Counterfeit Audit',
      desc: 'Pharmacists scan 2D DataMatrix barcodes on pharmaceutical packaging. The engine checks manufacturer authorization, lot expiry dates, cold-chain IoT temperature logs (2-8°C), and counterfeit recall registries.',
      inputs: 'GS1 2D Barcode Scan, Lot/Batch Number, IoT Storage Temperature Telemetry',
      processing: 'National Drug Code Cross-Referencing, Expiry Threshold Check, Cold-Chain Excursion Validation',
      outputs: 'Batch Verification Certificate, Real-Time Stock Floor Decrement',
      image: CLINICAL_IMAGES.pharmacy,
      badge: 'GS1 Serialization',
    },
    {
      num: '04',
      title: 'Microbiology Culturing & Quantitative MIC Accessioning',
      desc: 'Specimens (blood, sputum, urine, cerebrospinal fluid) are accessioned at the laboratory bench. Technologists culture bacterial colonies, perform Gram staining, and test antimicrobial agents using disk diffusion or broth microdilution.',
      inputs: 'Patient Accession ID, Specimen Matrix, Organism Morphology, Gram Stain Result',
      processing: 'Colony Counter Verification, WHONET Standardized Organism Indexing',
      outputs: 'Accessioned Laboratory Specimen, Phenotypic Organism Profile',
      image: CLINICAL_IMAGES.laboratory,
      badge: 'Digital Lab Bench',
    },
    {
      num: '05',
      title: 'Automated CLSI M100 & EUCAST Breakpoint Interpretation',
      desc: 'The clinical reference engine maps raw disk diffusion inhibition zones (mm) and microdilution minimum inhibitory concentrations (MIC in μg/mL) against current CLSI M100 and EUCAST breakpoint standards.',
      inputs: 'Raw Zone Diameters (mm), MIC Titers (μg/mL), Antimicrobial Class, Organism Genus/Species',
      processing: 'Codified Breakpoint Lookup Tables, Phenotypic Contradiction Rules, De-duplication Protocol',
      outputs: 'Susceptible (S) / Intermediate (I) / Resistant (R) Result, Critical Pathogen Radar Flags',
      image: CLINICAL_IMAGES.microbiology,
      badge: 'CLSI M100 / EUCAST',
    },
    {
      num: '06',
      title: 'Deterministic Signal Triage & Multidisciplinary Investigation',
      desc: 'When critical signals trigger (CRE detection, repeat antibiotic fills within 14 days, or Reserve-tier surges), deterministic alerts fire instantly into the triage queue. Multidisciplinary teams collaborate on patient isolation and environmental swabs.',
      inputs: 'AST Resistance Interpretations, 14-Day Dispensing History, Ward Infection Baselines',
      processing: 'Deterministic Moving-Average Thresholds, Z-Score Anomaly Detection, Case Assignment Engine',
      outputs: 'Active Clinical Investigation Case, Mandatory Dismissal Justification Audit Record',
      image: CLINICAL_IMAGES.publicHealth,
      badge: 'Signal Investigation',
    },
    {
      num: '07',
      title: 'Public Health Intelligence & Macro-Surveillance Reporting',
      desc: 'Aggregated, de-identified surveillance telemetry streams into regional and national dashboards. Serverless Gemini AI synthesizes catchment patterns, and GLASS-compatible epidemiological dossiers are generated for health ministries.',
      inputs: 'Hospital Network AST Cohorts, Denominator Bed-Days, Standardized Prescribing Metrics',
      processing: 'Regional Geospatial Clustered Heatmapping, 90-Day Predictive Surge Forecasting, Gemini Edge Synthesis',
      outputs: 'Interactive AMR Geospatial Heatmap, WHO GLASS Epidemiological Submission Dossier',
      image: CLINICAL_IMAGES.epidemiology,
      badge: 'Global Surveillance',
    },
  ];

  return (
    <div className="space-y-20 py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="space-y-4 max-w-3xl">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
          THE COMPLETE SURVEILLANCE PIPELINE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-tight">
          How MediGuard Works: Seven Stages of Clinical Intelligence
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Explore the exact data ingestion, deterministic mathematical processing, and clinical governance steps transforming raw hospital transactions into population-grade resistance surveillance.
        </p>
      </section>

      {/* 7-Stage Visual Pipeline */}
      <section className="space-y-12">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Large Number & Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 relative">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-white/95 text-slate-900 font-mono font-extrabold text-sm shadow-xs">
                    STAGE {stage.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 text-white font-mono text-[10px] uppercase font-bold border border-white/20">
                    {stage.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stage Deep Dive */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#0B1F3A] leading-snug">
                {stage.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {stage.desc}
              </p>

              {/* Structured Inputs / Processing / Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                    INPUTS
                  </span>
                  <p className="text-slate-700 font-medium leading-snug">{stage.inputs}</p>
                </div>

                <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-700 block">
                    PROCESSING
                  </span>
                  <p className="text-slate-700 font-medium leading-snug">{stage.processing}</p>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-teal-700 block">
                    OUTPUTS
                  </span>
                  <p className="text-slate-700 font-medium leading-snug">{stage.outputs}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Architecture & Data Flow Breakdown */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
            INTEROPERABILITY &amp; PROTOCOLS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B1F3A]">
            Enterprise Health Data Flow Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time multi-protocol ingestion connecting heterogeneous hospital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-mono font-bold text-xs">
              FHIR
            </div>
            <h3 className="font-bold text-slate-900 text-sm">HL7 FHIR R4 Standard</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              RESTful ingestion of MedicationRequest, Encounter, and DiagnosticReport resources with automatic schema validation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-mono font-bold text-xs">
              ASTM
            </div>
            <h3 className="font-bold text-slate-900 text-sm">LIMS &amp; AST Brokering</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Direct serial and network integration with automated microbiology analyzers (VITEK, Phoenix, BD MicroScan).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
              GS1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">GS1 Serialization Radar</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Point-of-dispense 2D DataMatrix barcode verification preventing counterfeit, expired, and quarantined batches.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs">
              RLS
            </div>
            <h3 className="font-bold text-slate-900 text-sm">PostgreSQL RLS Boundary</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Cryptographic organization segregation at the database layer ensuring cross-tenant leakage is mathematically impossible.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0284C7] to-[#0D9488] text-white p-8 sm:p-12 text-center space-y-4 border border-sky-400/30 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
          Ready to deploy MediGuard across your healthcare network?
        </h2>
        <p className="text-sky-100 text-xs sm:text-sm max-w-xl mx-auto">
          Contact our clinical informatics specialists for architecture blueprints, HL7 FHIR connector documentation, and staging sandbox access.
        </p>
        <div className="pt-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0B1F3A] font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <span>Request Institutional Deployment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
