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
} from 'lucide-react';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';

export const HowItWorksPage: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'Electronic Prescription Capture & AWaRe Screening',
      desc: 'Clinicians enter antibiotic orders linked to clinical encounters and ICD-10 indications (e.g. Hospital-Acquired Pneumonia, Complicated Intra-abdominal Sepsis). Patient identities are cryptographically tokenized into pseudonymous identifiers (e.g., PAT-88192-X) prior to indexing. Real-time guidance flags Watch/Reserve antimicrobials before signing.',
      icon: FileText,
      role: 'Physician / Prescriber',
      output: 'Structured Prescription Order & Indication Payload',
      standard: 'FHIR R4 MedicationRequest Alignment',
      image: CLINICAL_IMAGES.doctorPrescribingStethoscope,
    },
    {
      num: '02',
      title: 'GS1 DataMatrix Batch Clearance & Inventory Decrement',
      desc: 'Pharmacists fulfill orders by scanning pharmaceutical barcodes against national regulatory registries. The platform checks manufacturer license validity, expiry thresholds, cold-chain temperature excursion logs, and enforces strict non-negative inventory deductions to protect stock reliability.',
      icon: PackageCheck,
      role: 'Clinical Pharmacist',
      output: 'Verified Lot Record & Monotonic Stock Decrement',
      standard: 'GS1 Healthcare Barcode & Cold-Chain Telemetry (2-8°C)',
      image: CLINICAL_IMAGES.pharmacyDispensing,
    },
    {
      num: '03',
      title: 'Microbiology Culturing & Quantitative MIC Accessioning',
      desc: 'Diagnostic microbiology benches log positive culture isolates, colony counts, and antibiotic susceptibility testing (AST). Both qualitative disk diffusion zone diameters and quantitative broth microdilution MIC readings are recorded with quality-control strain logs.',
      icon: Microscope,
      role: 'Microbiology Scientist',
      output: 'Isolate AST Profile with Quality-Control Strain Check',
      standard: 'CLSI M100-ED34 & EUCAST v14.0 Guidelines',
      image: CLINICAL_IMAGES.petriDishCulture,
    },
    {
      num: '04',
      title: 'Automated CLSI M100 Breakpoint Interpretation',
      desc: 'The integrated standards engine maps recorded zone diameters and MIC values against CLSI M100 and EUCAST clinical breakpoints. Isolates are automatically classified as Susceptible (S), Intermediate (I), or Resistant (R), with instant flags for emerging priority phenotypes like CRE and MRSA.',
      icon: Cpu,
      role: 'Clinical Reference Engine',
      output: 'Standardized S / I / R Interpretive Matrix',
      standard: 'WHO Priority Pathogens (Critical & High Tier)',
      image: CLINICAL_IMAGES.scientistMicroscope,
    },
    {
      num: '05',
      title: 'Deterministic AMR Surge & Repeat Dispensing Alert Engine',
      desc: 'Mathematical surveillance algorithms evaluate laboratory resistance rates and pharmacy dispensing patterns against facility 30-day baselines. When statistically significant spikes occur or duplicate antibiotic courses are dispensed within 14 days, deterministic alerts fire instantly.',
      icon: AlertTriangle,
      role: 'Deterministic Alert Engine',
      output: 'Evidence-Linked Incident with Baseline Deviation Delta',
      standard: 'Z-Score Moving Averages & 14-Day Repeat Thresholds',
      image: CLINICAL_IMAGES.epidemiologyMonitoringCenter,
    },
    {
      num: '06',
      title: 'Multidisciplinary Stewardship Intervention & Reporting',
      desc: 'Infection preventionists, stewardship pharmacists, and clinical leads collaborate within dedicated investigation workspaces. Clinical findings are documented with mandatory dismissal justifications, while Gemini AI compiles aggregate epidemiological summaries for health authorities.',
      icon: FileSearch,
      role: 'Stewardship Committee & AI Copilot',
      output: 'Signed Investigation Dossier & WHO GLASS Export',
      standard: 'Append-Only Audit Log & WHO GLASS Format',
      image: CLINICAL_IMAGES.stewardshipReview,
    },
  ];

  const architectureLayers = [
    {
      layer: 'Layer 01: Ingestion & Interoperability',
      desc: 'Connects to EHRs via HL7 FHIR R4, LIS instruments via ASTM protocols, and pharmacy scanners via GS1 DataMatrix standards.',
      icon: Network,
    },
    {
      layer: 'Layer 02: Deterministic Rule & Analytics Engine',
      desc: 'Executes mathematical anomaly detection, WHO AWaRe categorization, and CLSI M100 susceptibility evaluations in sub-second latency.',
      icon: Cpu,
    },
    {
      layer: 'Layer 03: Multi-Tenant PostgreSQL Core',
      desc: 'All 25 relational tables enforce Row-Level Security (RLS), cryptographically isolating patient and facility data per organization.',
      icon: Database,
    },
    {
      layer: 'Layer 04: RBAC & Audit Governance',
      desc: 'Enforces least-privilege role boundaries across 9 dedicated workspaces with append-only tamper-evident forensic logging.',
      icon: Lock,
    },
    {
      layer: 'Layer 05: Grounded AI Surveillance Copilot',
      desc: 'Serverless Google Gemini API proxy delivering bounded, non-diagnostic epidemiological interpretations from authorized records.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-24 py-8 text-left">
      {/* Hero Section with Clinical Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
              <span>SYSTEM ARCHITECTURE &amp; CLINICAL WORKFLOW</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              How MediGuard Automates Healthcare Surveillance
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              MediGuard bridges the disconnect between hospital departments. Discover the six sequential stages that turn isolated bedside prescribing, pharmacy dispensing, and laboratory cultures into cohesive, real-time infection intelligence.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/solutions"
                className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>View Role Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs shadow-2xs transition-all"
              >
                Request Platform Sandbox
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-[4/3] relative">
              <img
                src={CLINICAL_IMAGES.microbiologyLab}
                alt="Microbiology laboratory bench"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md text-xs text-slate-800 space-y-1">
                <span className="font-mono font-bold text-sky-700 text-[10px] uppercase">
                  CLOSED-LOOP CLINICAL TELEMETRY
                </span>
                <p className="font-bold">Automated specimen matching with patient prescription history.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Detailed Workflow Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            THE 6 STAGES OF SURVEILLANCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            From Point-of-Care to Public Health Dossier
          </h2>
          <p className="text-sm text-slate-600">
            Every step preserves data provenance, denominator precision, and clinical accountability.
          </p>
        </div>

        <div className="space-y-8">
          {stages.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Left Step Header & Photo */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-sky-600 font-mono">
                      {s.num}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {s.role}
                    </span>
                  </div>
                  <div className="h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Center Content */}
                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Right Output Artifact */}
                <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    STAGE OUTPUT ARTIFACT
                  </span>
                  <div className="flex items-start gap-2 text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s.output}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 font-mono">
                    Standard: {s.standard}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5-Layer Platform Architecture */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800">
              MODULAR PLATFORM STACK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">
              The 5-Layer Healthcare Intelligence Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Engineered with modern separation of concerns for cloud scalability and on-premise hospital deployments.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {architectureLayers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-4 hover:border-sky-500 transition-colors text-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white font-heading">{layer.layer}</h4>
                    <p className="text-slate-300 leading-relaxed">{layer.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Experience the Closed-Loop Pipeline in Real Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Sign in with one of our preconfigured clinical personas to trace a prescription from doctor creation to laboratory culture match.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-2"
            >
              <span>Launch Demo Personas</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
