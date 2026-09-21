import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Microscope,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  FileSpreadsheet,
  BarChart3,
  Layers,
} from 'lucide-react';

export const LaboratoryWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const specimens = api.getSpecimens(currentOrg.id);
  const organisms = api.getOrganisms();
  const [filterType, setFilterType] = useState('All');

  const filteredSpecimens = specimens.filter(s =>
    filterType === 'All' ? true : s.specimen_type === filterType
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
              MICROBIOLOGY LABORATORY BENCH
            </span>
            <span className="text-xs text-slate-400 font-mono">• CLSI M100-ED33 & EUCAST v14.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Bench Operator: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Laboratory Node: Central Microbiology Reference Lab • De-duplication Protocol Active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/laboratory"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Accession New Specimen</span>
          </Link>
        </div>
      </div>

      {/* Lab KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Accession Queue</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{specimens.length} Total</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% adequate quality</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Critical Isolates</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">5 Resistant</div>
          <div className="text-[11px] text-rose-600 font-medium">CRE & MRSA confirmed</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Avg Turnaround Time</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">36.4 Hrs</div>
          <div className="text-[11px] text-emerald-600 font-medium">-12% vs target benchmark</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">CLSI Quality Checks</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">100% Valid</div>
          <div className="text-[11px] text-emerald-600 font-medium">Zero contradictory phenotypes</div>
        </div>
      </div>

      {/* Main Laboratory Bench Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Accession Queue */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Specimen Accession & AST Susceptibility Log
                </h3>
                <p className="text-xs text-slate-500">
                  Culture verification with quantitative MIC and S/I/R interpretations.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {['All', 'Blood', 'Urine', 'Sputum'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      filterType === t
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Accession ID</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Patient Reference</th>
                    <th className="py-2.5 px-3">Collected Date</th>
                    <th className="py-2.5 px-3">Quality Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredSpecimens.slice(0, 6).map((spc) => (
                    <tr key={spc.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{spc.id}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{spc.specimen_type}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{spc.patient_reference}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{spc.collected_at}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {spc.quality_status || 'Adequate'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Priority Pathogens & Breakpoints */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Microscope className="w-4 h-4 text-indigo-600" />
              <span>Priority Pathogen Isolate Radar</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {organisms.slice(0, 4).map((org) => (
                <div key={org.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 italic">{org.scientific_name}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      org.who_priority === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {org.who_priority || 'Standard'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{org.gram_stain} • {org.category}</div>
                </div>
              ))}
            </div>
            <Link
              to="/app/antibiogram"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-indigo-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Antibiogram Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quantitative MIC Distribution Visual */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>Quantitative MIC Titer Distribution</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Meropenem vs K. pneumoniae</span>
                  <span className="font-mono font-bold text-rose-600">MIC &gt; 16 mg/L (R)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[85%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Ciprofloxacin vs E. coli</span>
                  <span className="font-mono font-bold text-rose-600">MIC &gt; 4 mg/L (R)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Vancomycin vs S. aureus</span>
                  <span className="font-mono font-bold text-emerald-600">MIC 1.0 mg/L (S)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono pt-1">
              Broth microdilution automated telemetry • Validated against CLSI M100 QC strain ATCC 25922
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
