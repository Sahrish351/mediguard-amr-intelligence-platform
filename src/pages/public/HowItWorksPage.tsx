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
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Clinical Encounter & Prescription Capture',
      desc: 'Clinicians enter prescriptions linked to encounter references and indication categories (Respiratory, Sepsis, Complicated UTI). Patient identity is tokenized into pseudonymous references (e.g. PT-88192-A) prior to surveillance indexing.',
      icon: FileText,
      role: 'Physician / Prescriber',
      output: 'Structured Prescription Order & Indication Payload',
      standard: 'FHIR R4 MedicationRequest Alignment',
    },
    {
      num: '02',
      title: 'Pharmacy Dispensing & Batch Verification',
      desc: 'Pharmacists fulfill authorized orders by scanning medicine lots against regulatory registries. The platform checks manufacturer recall lists, cold-chain temperature excursion logs, and enforces strict non-negative inventory deductions.',
      icon: PackageCheck,
      role: 'Clinical Pharmacist',
      output: 'Verified Lot Record & Inventory Decrement',
      standard: 'GS1 Barcode & Cold-Chain Telemetry (2-8°C)',
    },
    {
      num: '03',
      title: 'Microbiology Culturing & Antibiogram Profiling',
      desc: 'Laboratory scientists log positive cultures, pathogen identification, and antibiotic susceptibility testing (AST). Both quantitative MIC and qualitative S/I/R interpretations are validated against CLSI and EUCAST guidelines.',
      icon: Microscope,
      role: 'Microbiology Scientist',
      output: 'Isolate AST Profile with CLSI Interpretation',
      standard: 'CLSI M100-ED33 & EUCAST v14.0',
    },
    {
      num: '04',
      title: 'Deterministic Surveillance & Signal Detection',
      desc: 'Deterministic mathematical engines evaluate dispensing volumes, resistance rates, and batch statuses against 30-day and 6-month historical baselines. Statistically significant surges trigger explainable alerts with severity classifications.',
      icon: AlertTriangle,
      role: 'Deterministic Alert Engine',
      output: 'Evidence-Linked Surveillance Alert',
      standard: 'Mathematical Moving Average & Z-Score Anomaly',
    },
    {
      num: '05',
      title: 'Epidemiological Investigation & Action',
      desc: 'Infection prevention and antimicrobial stewardship teams triage alerts in collaborative workspaces. Corroborating microbiology evidence is linked, notes are logged, and findings are published in surveillance dossiers.',
      icon: FileSearch,
      role: 'Stewardship Committee',
      output: 'Documented Case Resolution & Stewardship Policy',
      standard: 'Monotonically Appended Immutable Audit Trail',
    },
  ];

  return (
    <div className="space-y-20 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <span>SYSTEM ARCHITECTURE & WORKFLOW</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          How MediGuard Connects Surveillance Intelligence
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          MediGuard does not operate as an isolated silo. It creates an auditable bridge across hospital departments, from bedside prescribing to public health epidemiology dossiers.
        </p>
      </section>

      {/* 5 Sequential Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-mono font-bold text-lg shrink-0">
                  {s.num}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-sky-700 uppercase px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                      {s.role}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Standard: {s.standard}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Output Tag */}
              <div className="lg:w-72 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                  Stage Output & Artifact
                </span>
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{s.output}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Data Governance & Isolation Blueprint */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              DATA GOVERNANCE & PRIVACY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Denominator Discipline & HIPAA Compliance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Surveillance calculations must reflect clinical truth without compromising patient privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <Lock className="w-5 h-5 text-sky-400" />
              <h4 className="text-sm font-bold text-white font-heading">Patient Pseudonymization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct patient identifiers are hashed and tokenized into pseudonymized clinical references (e.g., PT-9921) before epidemiological indexing.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <Cpu className="w-5 h-5 text-teal-400" />
              <h4 className="text-sm font-bold text-white font-heading">Explicit Denominators</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resistance rates always report explicit sample counts (e.g., 18.4% [26/141 isolates]), strictly following CLSI guideline recommendations.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white font-heading">Non-Diagnostic Boundaries</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                MediGuard delivers surveillance decision support. The platform does not prescribe medication or issue diagnostic medical advice.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              <span>Explore Clinical Workspaces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
