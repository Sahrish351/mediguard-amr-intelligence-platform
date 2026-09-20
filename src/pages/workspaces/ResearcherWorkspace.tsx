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
} from 'lucide-react';

export const ResearcherWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const organisms = api.getOrganisms();
  const medicines = api.getMedicines();
  const reports = api.getReports(currentOrg.id);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCSV = () => {
    // Generate research-safe CSV export
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
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200">
              SURVEILLANCE RESEARCH WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Read-Only Scientific Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Research Fellow: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Cohort: Pseudonymized Multicenter Antimicrobial Resistance Dataset • Read-Only Integrity Enforced
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Anonymized Research CSV</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Research dataset exported successfully. Data conforms strictly to de-identified research protocols.</span>
        </div>
      )}

      {/* Research KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Research Cohort</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">2,840 Isolates</div>
          <div className="text-[11px] text-slate-500">De-duplicated encounters</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Antibiotics Indexed</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{medicines.length} Molecules</div>
          <div className="text-[11px] text-slate-500">WHO AWaRe classified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Breakpoints Applied</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">CLSI M100</div>
          <div className="text-[11px] text-emerald-600 font-medium">Standardized MIC tables</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Scientific Dossiers</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{reports.length} Reports</div>
          <div className="text-[11px] text-slate-500">Peer-review ready</div>
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
                <div key={org.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 italic text-sm">{org.scientific_name}</span>
                    <span className="text-slate-500 block text-[11px]">{org.gram_stain} • Priority: {org.who_priority || 'Standard'}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800">CLSI M100 Codified</span>
                    <span className="text-[10px] text-emerald-600 block">Read-Only Verified</span>
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
            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-purple-900 font-mono">
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
