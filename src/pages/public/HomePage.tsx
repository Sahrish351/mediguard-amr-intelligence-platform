import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Activity,
  Microscope,
  Pill,
  AlertTriangle,
  FileSearch,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Database,
  TrendingUp,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>GLOBAL HEALTHCARE SURVEILLANCE PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            See medication safety signals <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              before they become bigger problems.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            MediGuard bridges doctor prescriptions, pharmacy dispensing, medicine & batch verification, and microbiology laboratory antibiograms into one explainable surveillance command center.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/app"
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center gap-2"
            >
              <span>Enter Clinical Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/how-it-works"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
            >
              Explore Surveillance Workflow
            </Link>
          </div>

          {/* KPI Snapshot Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 text-left">
            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">Antibiogram Breakpoints</span>
              <div className="text-xl font-bold font-mono text-white mt-1">CLSI & EUCAST</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Quantitative MIC & S/I/R rules</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">WHO AWaRe Compliance</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">3-Tier Standard</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Access • Watch • Reserve categorization</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">Alert Engine</span>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">Deterministic</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Rule-based anomaly detection</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">Data Architecture</span>
              <div className="text-xl font-bold font-mono text-sky-400 mt-1">Multi-Tenant RLS</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Strict organization isolation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM OF FRAGMENTED DATA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 lg:p-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">The Fragmented Data Problem</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
              Why antimicrobials and resistance data are historically disconnected.
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              In most healthcare systems, prescriptions live in EHRs, dispensing is trapped in pharmacy databases, medicine batch provenance is in supply chain spreadsheets, and antibiograms remain isolated in laboratory information systems (LIS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Blind Empirical Prescribing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Doctors prescribe broad-spectrum Watch antibiotics without visibility into emerging hospital clonal resistance spikes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Pill className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Unverified Batch Contamination</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expired or recalled antibiotic lots remain active in clinical inventory due to disconnected pharmacy supply registries.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Microscope className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Delayed Outbreak Recognition</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Microbiology AST culture results take weeks to synthesize into cumulative antibiograms, missing early infection control intervention windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CONNECTED SURVEILLANCE PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-teal-400 font-semibold uppercase tracking-wider">End-to-End Intelligence Pipeline</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How MediGuard Unifies Clinical Data
          </h2>
          <p className="text-slate-400 text-xs">
            Connecting real healthcare workflows into one cohesive, auditable surveillance feedback loop
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-sky-400 font-bold">STAGE 01</span>
            <h3 className="text-sm font-semibold text-white">Doctor Prescribing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clinical encounters captured with indication categories and pseudonymous patient identifiers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-sky-400 font-bold">STAGE 02</span>
            <h3 className="text-sm font-semibold text-white">Pharmacy Dispensing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dispensing linked to lot barcodes, inventory deduction, and repeat dispensing monitors.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-sky-400 font-bold">STAGE 03</span>
            <h3 className="text-sm font-semibold text-white">Microbiology AST</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolates tested against CLSI/EUCAST breakpoints with quantitative MIC values and S/I/R profiles.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-sky-400 font-bold">STAGE 04</span>
            <h3 className="text-sm font-semibold text-white">Deterministic Rules</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated mathematical thresholds detect statistically meaningful surges against historical baselines.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-sky-400 font-bold">STAGE 05</span>
            <h3 className="text-sm font-semibold text-white">Investigation & AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Collaborative workspaces, grounded Gemini explanations, and publishable dossiers.
            </p>
          </div>
        </div>
      </section>

      {/* 4. GROUNDED AI INTELLIGENCE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-purple-950/30 via-[#0F172A] to-[#0F172A] border border-purple-500/30 rounded-2xl p-8 lg:p-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>GROUNDED GEMINI INTELLIGENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
                Explainable surveillance reasoning, never clinical black boxes.
              </h2>
            </div>
            <Link
              to="/app/ai-assistant"
              className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors self-start md:self-auto"
            >
              Open AI Surveillance Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-3 bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                What MediGuard AI Does:
              </h3>
              <ul className="space-y-2 list-disc list-inside text-slate-400">
                <li>Explains mathematical root causes for deterministic safety alerts</li>
                <li>Calculates relative vs absolute percentage point shifts against baselines</li>
                <li>Audits hospital formulary compliance against the WHO 60% Access target</li>
                <li>Suggests non-prescriptive epidemiological investigation audit questions</li>
                <li>Cites exact denominators, sample sizes, and data scope limitations</li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-900/80 p-5 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" />
                What MediGuard AI NEVER Does:
              </h3>
              <ul className="space-y-2 list-disc list-inside text-slate-400">
                <li>Does NOT provide medical diagnoses or individual prognosis</li>
                <li>Does NOT prescribe medications or adjust clinical dosages</li>
                <li>Does NOT claim surveillance signals prove outbreak causality</li>
                <li>Never exposes private server API keys to client-side browsers</li>
                <li>Never overrides deterministic institutional stewardship policies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to inspect the live surveillance platform?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Explore the command center with synthetic demo data, test deterministic alerts, and evaluate grounded AI intelligence.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/app"
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center gap-2"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
          >
            Sign In with Test Role
          </Link>
        </div>
      </section>
    </div>
  );
};

