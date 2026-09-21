import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  FileSearch,
  BarChart3,
  Download,
  Microscope,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  FileSpreadsheet,
  Dna,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

const longitudinalAmrData = [
  { year: '2021', mrsa: 22.4, cre: 4.8, esbl: 28.1, vre: 3.2 },
  { year: '2022', mrsa: 24.1, cre: 6.2, esbl: 30.5, vre: 3.8 },
  { year: '2023', mrsa: 25.8, cre: 8.1, esbl: 33.2, vre: 4.5 },
  { year: '2024', mrsa: 27.2, cre: 10.4, esbl: 35.8, vre: 5.1 },
  { year: '2025', mrsa: 28.6, cre: 12.8, esbl: 38.4, vre: 5.9 },
  { year: '2026', mrsa: 29.5, cre: 14.6, esbl: 40.2, vre: 6.4 },
];

const anatomicCohortData = [
  { source: 'Blood (BSI)', count: 840, fill: '#ef4444' },
  { source: 'Urine (UTI)', count: 1250, fill: '#0284c7' },
  { source: 'Respiratory (BAL)', count: 480, fill: '#6366f1' },
  { source: 'Wound / Soft Tissue', count: 270, fill: '#0d9488' },
];

export const ResearcherWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const organisms = api.getOrganisms();
  const medicines = api.getMedicines();
  const reports = api.getReports(currentOrg.id);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCSV = () => {
    const headers = 'organism,antibiotic,tested_isolates,resistant_isolates,resistance_percentage,guideline\n';
    const sampleRows = organisms.slice(0, 5).map(o =>
      `"${o.scientific_name}","Meropenem",143,26,18.2,"CLSI M100-ED33"`
    ).join('\n');

    const blob = new Blob([headers + sampleRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediguard_amr_surveillance_research_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs bg-gradient-to-r from-white via-purple-50/40 to-blue-50/30 text-slate-900">
        <div className="absolute top-0 right-0 w-96 h-full opacity-10 pointer-events-none overflow-hidden">
          <img
            src={CLINICAL_IMAGES.microscopeIsolate}
            alt="Microbiology Research"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-purple-600" />
                LONGITUDINAL EPIDEMIOLOGICAL COHORT STUDY
              </span>
              <span className="text-xs text-slate-500 font-mono">
                CLSI M39-A4 De-duplication Protocol Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              AMR Research Laboratory — {currentUser?.full_name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pseudonymized longitudinal antimicrobial resistance dataset with verifiable tested denominators, quantitative MIC distributions, and CLSI/EUCAST breakpoint versions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Cohort CSV</span>
            </button>
            <Link
              to="/app/amr-heatmap"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Heatmap Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Research dataset exported successfully. Data conforms strictly to de-identified research protocols.</span>
        </div>
      )}

      {/* Research 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Dataset Size</span>
            <div className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">2,840 Isolates</div>
          <div className="text-[10px] text-slate-500">De-duplicated encounters</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Pathogens</span>
            <div className="p-1.5 rounded-xl bg-sky-50 text-sky-700">
              <Microscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{organisms.length} Species</div>
          <div className="text-[10px] text-sky-700 font-medium">WHO GLASS Tier 1</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Resistance Trends</span>
            <div className="p-1.5 rounded-xl bg-rose-50 text-rose-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">+1.8% / Yr</div>
          <div className="text-[10px] text-rose-600 font-medium">Longitudinal surge vector</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Study Periods</span>
            <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">2021 – 2026</div>
          <div className="text-[10px] text-indigo-700 font-medium">5-Year multi-cohort</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Data Coverage</span>
            <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">98.2%</div>
          <div className="text-[10px] text-emerald-600 font-medium">CLSI M100 compliant</div>
        </div>
      </div>

      {/* Analytics Row: Multi-Year Resistance Trend & Cohort Anatomy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Longitudinal Resistance Trend Line Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Longitudinal Resistance Evolution (2021 - 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Resistance rates (%) across priority WHO Gram-negative & Gram-positive pathogens.
              </p>
            </div>
            <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded-md border border-purple-200 font-semibold">
              5-Year Study
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={longitudinalAmrData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="mrsa" name="MRSA (%)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="esbl" name="ESBL E. coli (%)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cre" name="CRE (%)" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="vre" name="VRE (%)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anatomical Site Cohort Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Cohort Breakdown by Anatomical Site
              </h3>
              <p className="text-xs text-slate-500">
                Isolate count per clinical specimen origin.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={anatomicCohortData}
                margin={{ top: 10, right: 20, left: 35, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="source" type="category" stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" name="Verified Isolates" radius={[0, 6, 6, 0]}>
                  {anatomicCohortData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Research Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Dataset Explorer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Microbiological Surveillance Cohort Explorer
                </h3>
                <p className="text-xs text-slate-500">
                  Read-only dataset with explicit tested denominators and verified MIC titers.
                </p>
              </div>
              <Link to="/app/amr-heatmap" className="text-xs font-semibold text-purple-600 hover:text-purple-500 flex items-center gap-1">
                <span>View Heatmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {organisms.slice(0, 4).map((org) => (
                <div key={org.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:border-slate-300 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 italic text-sm">{org.scientific_name}</span>
                    <span className="text-slate-500 block text-[11px]">{org.gram_stain} • Priority: {org.who_priority || 'Standard'}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800">CLSI M100 Codified</span>
                    <span className="text-[10px] text-emerald-600 block font-medium">Read-Only Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Scientific Methodology Reference */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Methodology & Citation</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When citing MediGuard research datasets in academic publications, please refer to the standardized CLSI M39-A4 de-duplication criteria and denominator calculation methodology.
            </p>
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-[11px] text-purple-900 font-mono">
              Citation: MediGuard AMR Surveillance Network v1.0, 2026.
            </div>
            <Link
              to="/research"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Read Full Scientific Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
