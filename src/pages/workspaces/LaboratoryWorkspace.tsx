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
  FlaskConical,
  Dna,
  TrendingDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

const dailyAccessionData = [
  { day: 'Mon', blood: 34, urine: 52, sputum: 21, tat: 38.2 },
  { day: 'Tue', blood: 41, urine: 65, sputum: 26, tat: 37.1 },
  { day: 'Wed', blood: 38, urine: 58, sputum: 19, tat: 36.4 },
  { day: 'Thu', blood: 46, urine: 72, sputum: 28, tat: 35.8 },
  { day: 'Fri', blood: 44, urine: 69, sputum: 24, tat: 35.0 },
  { day: 'Sat', blood: 28, urine: 43, sputum: 16, tat: 36.9 },
  { day: 'Sun', blood: 22, urine: 35, sputum: 12, tat: 37.5 },
];

const astBreakdownData = [
  { drug: 'Meropenem', susceptible: 74, intermediate: 8, resistant: 18 },
  { drug: 'Ceftriaxone', susceptible: 52, intermediate: 11, resistant: 37 },
  { drug: 'Ciprofloxacin', susceptible: 59, intermediate: 6, resistant: 35 },
  { drug: 'Vancomycin', susceptible: 92, intermediate: 4, resistant: 4 },
  { drug: 'Colistin', susceptible: 96, intermediate: 1, resistant: 3 },
  { drug: 'Piperacillin/Tazo', susceptible: 68, intermediate: 10, resistant: 22 },
];

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
      {/* 1. Header Greeting & Clinical Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-white via-teal-50/40 to-blue-50/30 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
              CLSI M100-ED33 & EUCAST v14.0 BENCH
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Dna className="w-3.5 h-3.5 text-teal-600" />
              Automated Microdilution & Kirby-Bauer AST
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">
            Microbiology Laboratory — {currentUser?.full_name || 'Lead Microbiologist'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time specimen accessioning, broth microdilution quantitative MIC titration, and antimicrobial resistance phenotype reporting with algorithmic de-duplication.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/app/laboratory"
            className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shadow-teal-700/20"
          >
            <Plus className="w-4 h-4" />
            <span>Accession New Specimen</span>
          </Link>
          <Link
            to="/app/antibiogram-explorer"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5"
          >
            <span>Antibiogram Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="text-2xl font-bold text-slate-900 font-mono">{specimens.length} In-Flight</div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% adequate specimen quality</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Critical Isolates (Alert)</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">5 High-Priority</div>
          <div className="text-[11px] text-rose-600 font-medium">CRE, MRSA & VRE confirmed</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Avg Turnaround Time</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">36.4 Hours</div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-12% vs WHO guideline target (48h)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">QC ATCC Verification</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">Pass (100%)</div>
          <div className="text-[11px] text-emerald-600 font-medium">E. coli ATCC 25922 within range</div>
        </div>
      </div>

      {/* Analytics Row: 7-Day Accession Volume & Susceptibility Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Accession & TAT Trend */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                7-Day Specimen Accession Volume & Turnaround Time
              </h3>
              <p className="text-xs text-slate-500">
                Tracking daily influx by specimen category and average time to final susceptibility confirmation.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              Rolling 7D
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyAccessionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="blood" name="Blood Culture" fill="#0284c7" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="urine" name="Urine" fill="#0d9488" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="sputum" name="Sputum / BAL" fill="#6366f1" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Antimicrobial Susceptibility Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Antimicrobial Susceptibility Profiles
              </h3>
              <p className="text-xs text-slate-500">
                Susceptible vs Intermediate vs Resistant percentage across core anti-infectives.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={astBreakdownData}
                margin={{ top: 5, right: 20, left: 25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
                <YAxis dataKey="drug" type="category" stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="susceptible" name="Susceptible (%)" fill="#10b981" stackId="s" />
                <Bar dataKey="intermediate" name="Intermediate (%)" fill="#f59e0b" stackId="s" />
                <Bar dataKey="resistant" name="Resistant (%)" fill="#ef4444" stackId="s" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Laboratory Bench Tables & Isolates */}
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
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      filterType === t
                        ? 'bg-teal-600 text-white shadow-xs'
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
                  <tr className="border-b border-slate-200 text-slate-500 font-mono bg-slate-50/70">
                    <th className="py-3 px-3">Accession ID</th>
                    <th className="py-3 px-3">Specimen Type</th>
                    <th className="py-3 px-3">Patient Ref</th>
                    <th className="py-3 px-3">Collection Timestamp</th>
                    <th className="py-3 px-3">Quality Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredSpecimens.slice(0, 6).map((spc) => (
                    <tr key={spc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{spc.id}</td>
                      <td className="py-3.5 px-3 font-semibold text-slate-800">{spc.specimen_type}</td>
                      <td className="py-3.5 px-3 font-mono text-slate-500">{spc.patient_reference}</td>
                      <td className="py-3.5 px-3 font-mono text-slate-500">{spc.collected_at}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{spc.quality_status || 'Adequate'}</span>
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
              <Microscope className="w-4 h-4 text-teal-600" />
              <span>Priority Pathogen Radar</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {organisms.slice(0, 4).map((org) => (
                <div key={org.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 italic">{org.scientific_name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      org.who_priority === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {org.who_priority || 'Standard'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{org.gram_stain} • {org.category}</div>
                </div>
              ))}
            </div>
            <Link
              to="/app/antibiogram-explorer"
              className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Antibiogram Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Microdilution QC Card - Pristine Light Healthcare Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50/50 to-blue-50/40 border border-teal-200/80 shadow-2xs space-y-3 text-slate-800">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900 font-mono">
                CLSI Quality Control Protocol
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardized against CLSI M100 reference strains (ATCC 25922, ATCC 27853, ATCC 29213). All MIC titer wells verified prior to clinical EHR dissemination.
            </p>
            <div className="text-[11px] font-mono text-teal-700 pt-1 font-medium">
              Automated LIMS Bridge: HealthLevel7 FHIR DiagnosticReport Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
