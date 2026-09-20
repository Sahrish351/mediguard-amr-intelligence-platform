import React, { useState } from 'react';
import { Building2, Microscope, Pill, Stethoscope, Globe, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'laboratories' | 'pharmacies' | 'doctors' | 'public_health'>('hospitals');

  const solutions = {
    hospitals: {
      title: 'For Hospitals & Health Systems',
      subtitle: 'Institution-wide antimicrobial stewardship and infection prevention intelligence.',
      icon: Building2,
      points: [
        'Real-time cumulative hospital antibiograms updated as cultures finalize',
        'Automatic detection of nosocomial clusters and high-priority pathogen surges',
        'WHO AWaRe utilization tracking to maintain >60% Access antibiotic compliance',
        'Multi-facility departmental comparisons across ICUs, Surgical, and Medical wards',
      ],
      role: 'Clinical Surveillance Officer & CMO',
    },
    laboratories: {
      title: 'For Microbiology Laboratories',
      subtitle: 'Streamlined AST entry, quality control, and automated breakpoint interpretation.',
      icon: Microscope,
      points: [
        'Supports CLSI M100 and EUCAST breakpoint guidelines with quantitative MIC recording',
        'Automated flagging of contradictory phenotypes or impossible resistance profiles',
        'Non-duplicate isolate filtering per patient encounter to eliminate surveillance bias',
        'Real-time notification to infection control teams when Reserve resistance emerges',
      ],
      role: 'Laboratory Scientist & Lead Microbiologist',
    },
    pharmacies: {
      title: 'For Hospital & Community Pharmacies',
      subtitle: 'Supply chain integrity, lot verification, and repeat fill surveillance.',
      icon: Pill,
      points: [
        'Real-time GS1 barcode and regulatory lot verification before dispensing',
        'Automated quarantine alerts for expired, recalled, or suspicious medication batches',
        'Repeat fill anomaly algorithms to detect excessive antibiotic utilization',
        'Live inventory stock deduction with expiration countdown monitors',
      ],
      role: 'Director of Pharmacy & Clinical Pharmacists',
    },
    doctors: {
      title: 'For Doctors & Prescribers',
      subtitle: 'Evidence-based local resistance intelligence at the point of clinical care.',
      icon: Stethoscope,
      points: [
        'Immediate visibility into ward-specific pathogen resistance percentages',
        'Prescription capture with clinical indication categories (Respiratory, Sepsis, UTI)',
        'Decision-support alerts when prescribing Watch/Reserve antibiotics empiric regimens',
        'Patient pseudonymization protecting confidentiality in surveillance reviews',
      ],
      role: 'Attending Physicians & Critical Care Specialists',
    },
    public_health: {
      title: 'For Public Health & Epidemiology',
      subtitle: 'Macro-level population surveillance and inter-regional resistance comparisons.',
      icon: Globe,
      points: [
        'Geographic mapping across metropolitan areas, divisions, and provinces',
        'Longitudinal time-series analysis comparing multi-year resistance trajectories',
        'Automated generation of formal monthly and quarterly surveillance dossiers',
        'Standardized exports formatted for national DHIS-2 and WHO GLASS reporting',
      ],
      role: 'Epidemiology Analysts & Ministry Officers',
    },
  };

  const current = solutions[activeTab];
  const Icon = current.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">Stakeholder Solutions</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tailored Workspaces for Every Healthcare Role
        </h1>
        <p className="text-slate-400 text-sm">
          MediGuard configures tailored perspectives, permissions, and analytical tools suited to distinct clinical workflows.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'hospitals', label: 'Hospitals & Networks', icon: Building2 },
          { id: 'laboratories', label: 'Microbiology Labs', icon: Microscope },
          { id: 'pharmacies', label: 'Pharmacies & Supply', icon: Pill },
          { id: 'doctors', label: 'Doctors & Prescribers', icon: Stethoscope },
          { id: 'public_health', label: 'Public Health Agencies', icon: Globe },
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-[#0F172A] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Box */}
      <div className="p-8 lg:p-12 rounded-2xl bg-[#0F172A] border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase">{current.role}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{current.title}</h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{current.subtitle}</p>

          <div className="space-y-3 pt-2">
            {current.points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
            >
              <span>Explore Workspace in Live App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <span className="text-[11px] font-mono uppercase text-slate-500">Live Surveillance Telemetry</span>
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">RBAC Enforcement:</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">Row Level Security:</span>
              <span className="text-emerald-400">Tenant-Isolated</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-500">Audit Protocol:</span>
              <span className="text-sky-400">Append-Only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">AI Assistance:</span>
              <span className="text-purple-400">Grounded Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

