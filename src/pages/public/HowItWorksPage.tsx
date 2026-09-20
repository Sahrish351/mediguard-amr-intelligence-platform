import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, FileText, PackageCheck, Microscope, AlertTriangle, FileSearch, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Clinical Encounter & Prescription Capture',
      desc: 'Clinicians enter prescriptions linked to encounter references and indication categories (Respiratory, Sepsis, UTI, etc.). Crucially, patient identity is tokenized into pseudonymous references (e.g. PAT-88192-A) before surveillance indexing.',
      icon: FileText,
      role: 'Physician / Prescriber',
    },
    {
      num: '02',
      title: 'Pharmacy Dispensing & Batch Verification',
      desc: 'Pharmacists fulfill authorized orders by scanning medicine lots. The system checks manufacturer cold-chain status and expiry dates in real time, deducting inventory stock and monitoring for abnormal repeat refill patterns.',
      icon: PackageCheck,
      role: 'Clinical Pharmacist',
    },
    {
      num: '03',
      title: 'Microbiology Culturing & Antibiogram Profiling',
      desc: 'Laboratory scientists log positive cultures, pathogen identification, and antibiotic susceptibility testing (AST). Both quantitative MIC and qualitative S/I/R interpretations are validated against CLSI and EUCAST guidelines.',
      icon: Microscope,
      role: 'Microbiologist',
    },
    {
      num: '04',
      title: 'Deterministic Surveillance & Signal Detection',
      desc: 'Deterministic mathematical engines evaluate dispensing volumes, resistance rates, and batch statuses against 30-day and 6-month historical baselines. Statistically significant surges trigger explainable alerts with severity classifications.',
      icon: AlertTriangle,
      role: 'Surveillance Engine',
    },
    {
      num: '05',
      title: 'Epidemiological Investigation & Action',
      desc: 'Infection prevention and antimicrobial stewardship teams triage alerts in collaborative workspaces. Corroborating microbiology evidence is linked, notes are logged, and findings are published in surveillance dossiers.',
      icon: FileSearch,
      role: 'Stewardship Committee',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">Architecture & Methodology</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How MediGuard Connects Surveillance Intelligence
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          MediGuard does not operate as an isolated silo. It creates an auditable bridge across hospital departments, from the bedside prescription to public health epidemiology dossiers.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">Stage {s.num}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400 font-mono">{s.role}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <div className="shrink-0 font-mono text-2xl font-bold text-slate-700">
                {s.num}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-sky-600/20"
        >
          <span>Launch Surveillance Command Center</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

