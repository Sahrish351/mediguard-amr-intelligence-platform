import React from 'react';
import { Microscope, BookOpen, BarChart3, ShieldCheck, CheckCircle2, ArrowRight, Table, Layers, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResearchInsightsPage: React.FC = () => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <span>SCIENTIFIC EPIDEMIOLOGY & METHODOLOGY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Surveillance Methodology & Standards
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          MediGuard enforces strict epidemiological conventions so clinicians and public health analysts can distinguish true biological signals from sampling noise.
        </p>
      </section>

      {/* 4 Core Pillars of Epidemiological Rigor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Strict Denominator Discipline</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In microbiological surveillance, reporting a percentage without a transparent sample size is statistically invalid. MediGuard enforces explicit denominators across every view:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
              Resistance Rate (%) = (Non-Duplicate Resistant Isolates / Total Valid Tested Isolates) * 100
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Small isolate pools (&lt; 30 samples) are explicitly labeled as <em>preliminary surveillance findings</em>, preventing over-interpretation of statistical fluctuations.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Microscope className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Duplicate Elimination Protocol (CLSI M39-A4)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hospitalized ICU patients often undergo serial daily blood or sputum cultures during prolonged admissions. Including repeat identical isolates falsely inflates resistance figures.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-teal-800">
              Deduplication Rule: Only the first isolate per patient species encounter is indexed
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              This adheres strictly to CLSI M39-A4 guidelines for cumulative institutional antibiogram construction.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">WHO AWaRe Classification Standards</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To contain antimicrobial resistance, the World Health Organization classifies antibiotics into three stewardship tiers:
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <strong>Access (Target &ge; 60%):</strong> First-line narrow-spectrum agents with low resistance potential (e.g., Amoxicillin).
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <strong>Watch:</strong> Higher resistance risk agents indicated only for specific acute conditions (e.g., Ceftriaxone, Ciprofloxacin).
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                <strong>Reserve:</strong> Last-resort antibiotics reserved exclusively for confirmed multidrug-resistant pathogens (e.g., Colistin, Linezolid).
              </div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">WHONET Interoperability & Breakpoint Tables</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              MediGuard AST entries map seamlessly to standard WHONET schema formats, supporting both automated disk diffusion millimeter zones and quantitative microdilution MIC ranges.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-indigo-800">
              Standards: CLSI M100-ED33, EUCAST v14.0, and WHO GLASS exports
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enables regional reference labs to cross-validate local institutional antibiograms with global surveillance repositories.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimers & Governance Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-2">
          <h4 className="font-bold font-heading text-sm flex items-center gap-2">
            <span>Clinical Boundaries & Decision-Support Notice</span>
          </h4>
          <p className="leading-relaxed">
            MediGuard is an epidemiological surveillance and decision-support platform designed to surface population-level resistance patterns. It does not provide medical diagnosis, prescribe pharmaceutical treatment, or replace certified clinical judgment. All datasets showcased in this platform are synthetic demonstration records.
          </p>
        </div>
      </section>
    </div>
  );
};
