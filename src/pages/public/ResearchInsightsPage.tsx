import React from 'react';
import { Microscope, BookOpen, BarChart3, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResearchInsightsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">Scientific Governance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Surveillance Methodology & Standards
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          MediGuard enforces strict epidemiological conventions so clinicians and public health analysts can distinguish true biological signals from sampling noise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Strict Denominator Discipline</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            In epidemiological surveillance, reporting a percentage without a transparent sample size is statistically hazardous. MediGuard displays the tested denominator beside every metric:
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-sky-300 border border-slate-800">
            Resistance % = (Non-Duplicate Resistant Isolates / Total Tested Isolates) * 100
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Small isolate pools (&lt; 30 samples) are explicitly labeled as <em>preliminary surveillance findings</em>, preventing over-interpretation of statistical noise.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Microscope className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Duplicate Elimination Protocol</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            ICU patients often undergo serial daily blood or sputum cultures during prolonged admissions. Including repeat identical isolates falsely inflates resistance figures.
          </p>
          <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-teal-300 border border-slate-800">
            Deduplication: Only first isolate per patient species encounter is counted
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aligned with CLSI M39-A4 guidelines for cumulative hospital antibiogram construction.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">WHO AWaRe Classification</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            To contain antimicrobial resistance, the World Health Organization classifies antibiotics into three stewardship tiers:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li><strong>Access (Target &ge; 60%):</strong> Narrow-spectrum first-line agents with lower resistance potential (e.g. Amoxicillin).</li>
            <li><strong>Watch (Heavy scrutiny):</strong> Higher resistance potential, reserved for specific clinical indications (e.g. Ceftriaxone, Ciprofloxacin).</li>
            <li><strong>Reserve (Last-resort):</strong> Protected antibiotics reserved strictly for confirmed multi-drug resistant pathogens (e.g. Colistin, Linezolid).</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Non-Diagnostic Safety Positioning</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            MediGuard is an epidemiological surveillance system and clinical decision-support tool. It does not replace clinicians, diagnose individual patients, or automate treatment alterations.
          </p>
          <div className="p-3 bg-slate-900 rounded-lg text-xs text-purple-300 border border-slate-800 leading-relaxed">
            Surveillance Terminology: "Signal detected", "Pattern observed", "May warrant investigation", "Preliminary finding".
          </div>
        </div>
      </div>
    </div>
  );
};

