import React from 'react';
import { Microscope, BookOpen, BarChart3, ShieldCheck, CheckCircle2, ArrowRight, Table, Layers, FileSpreadsheet, Download, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';
import { AWaReBadge } from '@/components/common/Badge';

export const ResearchInsightsPage: React.FC = () => {
  return (
    <div className="space-y-24 py-8 text-left">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
              <span>SCIENTIFIC RIGOR &amp; STANDARDS HARMONIZATION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Evidence-Based AMR Surveillance Methodology
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              MediGuard strictly enforces international microbiological standards (CLSI M100, EUCAST, WHO AWaRe, WHO GLASS) so hospital stewardship teams and epidemiologists can distinguish true biological resistance shifts from random sampling noise.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/researcher"
                className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Launch Research Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/resources"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs shadow-2xs transition-all"
              >
                View Documentation &amp; FAQ
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3] relative">
              <img
                src={CLINICAL_IMAGES.scientistMicroscope}
                alt="Scientist reviewing microbiology isolates"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-xs text-slate-800 space-y-1">
                <span className="font-mono font-bold text-sky-700 text-[10px] uppercase">
                  CLSI M39-A4 DEDUPLICATION PROTOCOL
                </span>
                <p className="font-bold">First isolate per patient encounter indexed to eliminate repeat bias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Epidemiological Rigor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            METHODOLOGICAL FOUNDATIONS
          </span>
          <h2 className="text-3xl font-bold font-heading text-slate-900">
            Four Core Pillars of Surveillance Validity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Strict Denominator Discipline</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In microbiological surveillance, reporting a percentage without a transparent sample size is statistically invalid. MediGuard enforces explicit isolate denominators across every chart and heatmap:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
              Resistance Rate (%) = (Non-Duplicate Resistant Isolates / Total Valid Tested Isolates) * 100
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Small isolate pools (&lt; 30 samples) are explicitly labeled with warning chips as <em>preliminary surveillance findings</em>, preventing over-interpretation of statistical fluctuations.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Duplicate Elimination Protocol (CLSI M39-A4)</h3>
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
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">WHO AWaRe Classification Standards</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To contain antimicrobial resistance, the World Health Organization classifies antibiotics into three stewardship tiers:
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span><strong>Access (Target &ge; 60%):</strong> Narrow-spectrum agents (Amoxicillin, Ampicillin).</span>
                <AWaReBadge category="Access" />
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
                <span><strong>Watch:</strong> Higher resistance potential (Ceftriaxone, Ciprofloxacin).</span>
                <AWaReBadge category="Watch" />
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between">
                <span><strong>Reserve:</strong> Last-resort MDR antimicrobials (Colistin, Linezolid, Meropenem).</span>
                <AWaReBadge category="Reserve" />
              </div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">WHONET Interoperability &amp; Breakpoint Tables</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              MediGuard AST entries map seamlessly to standard WHONET schema formats, supporting both automated disk diffusion millimeter zones and quantitative microdilution MIC ranges.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-indigo-800">
              Standards: CLSI M100-ED34, EUCAST v14.0, and WHO GLASS exports
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enables regional reference labs to cross-validate local institutional antibiograms with global surveillance repositories.
            </p>
          </div>
        </div>
      </section>

      {/* CLSI M100 Reference Breakpoints Table Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                CLSI M100 Interpretive Breakpoint Table Reference (Extract)
              </h3>
              <p className="text-xs text-slate-500">
                Current clinical interpretive thresholds utilized by MediGuard’s automated laboratory engine.
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold self-start">
              CLSI M100-ED34 Validated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="py-3 px-3">Organism Group</th>
                  <th className="py-3 px-3">Antimicrobial Agent</th>
                  <th className="py-3 px-3">Susceptible (&le; mg/L)</th>
                  <th className="py-3 px-3">Intermediate (mg/L)</th>
                  <th className="py-3 px-3">Resistant (&ge; mg/L)</th>
                  <th className="py-3 px-3">WHO Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 italic font-sans">Enterobacterales</td>
                  <td className="py-3 px-3 font-sans">Meropenem</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">&le; 1</td>
                  <td className="py-3 px-3 text-amber-700">2</td>
                  <td className="py-3 px-3 text-rose-700 font-bold">&ge; 4</td>
                  <td className="py-3 px-3 font-sans text-rose-700 font-bold">Critical</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 italic font-sans">Enterobacterales</td>
                  <td className="py-3 px-3 font-sans">Ciprofloxacin</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">&le; 0.25</td>
                  <td className="py-3 px-3 text-amber-700">0.5</td>
                  <td className="py-3 px-3 text-rose-700 font-bold">&ge; 1</td>
                  <td className="py-3 px-3 font-sans text-amber-700 font-bold">High</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 italic font-sans">Staphylococcus aureus</td>
                  <td className="py-3 px-3 font-sans">Vancomycin</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">&le; 2</td>
                  <td className="py-3 px-3 text-amber-700">4 - 8</td>
                  <td className="py-3 px-3 text-rose-700 font-bold">&ge; 16</td>
                  <td className="py-3 px-3 font-sans text-rose-700 font-bold">Critical</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900 italic font-sans">Pseudomonas aeruginosa</td>
                  <td className="py-3 px-3 font-sans">Piperacillin/Tazobactam</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">&le; 16/4</td>
                  <td className="py-3 px-3 text-amber-700">--</td>
                  <td className="py-3 px-3 text-rose-700 font-bold">&ge; 32/4</td>
                  <td className="py-3 px-3 font-sans text-rose-700 font-bold">Critical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimers & Governance Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-2">
          <h4 className="font-bold font-heading text-sm flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Clinical Boundaries &amp; Decision-Support Notice</span>
          </h4>
          <p className="leading-relaxed">
            MediGuard is an epidemiological surveillance and clinical decision-support platform designed to aggregate population-level resistance patterns. It does not provide definitive medical diagnosis, prescribe pharmaceutical treatment, or replace certified physician clinical judgment. All datasets showcased in this platform are synthetic demonstration records.
          </p>
        </div>
      </section>

      {/* Research CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B5ED7] via-[#0284C7] to-[#0D9488] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl border border-sky-400/30">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Access Standardized AMR Surveillance Datasets
            </h3>
            <p className="text-xs sm:text-sm text-sky-100">
              Download CLSI-standardized de-identified research cohorts, inspect methodology whitepapers, or request academic partnership.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/researcher"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0B5ED7] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Enter Research Workspace
            </Link>
            <Link
              to="/resources"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/30 transition-all cursor-pointer"
            >
              Read Full Methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
