import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Globe,
  TrendingUp,
  Microscope,
  Activity,
  AlertTriangle,
  Download,
  BarChart3,
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileBarChart2,
} from 'lucide-react';

export const EpidemiologyWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const regions = api.getRegions();
  const organisms = api.getOrganisms();
  const reports = api.getReports(currentOrg.id);

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              POPULATION & AMR INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Macro-Surveillance Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Epidemiologist: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Catchment Zone: National Network • Aggregated Multicenter Cohort (N=2,840 Cultures)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/amr-heatmap"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Interactive AMR Heatmap</span>
          </Link>
        </div>
      </div>

      {/* Epidemiology KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Monitored Regions</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{regions.length} Catchments</div>
          <div className="text-[11px] text-slate-500">Facility geospatial mapping active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Network Resistance Rate</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">23.4%</div>
          <div className="text-[11px] text-rose-600 font-medium">+1.8% vs prior 6-month baseline</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Priority Pathogens</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Microscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{organisms.length} Tracked</div>
          <div className="text-[11px] text-amber-600 font-medium">WHO GLASS alignment tier</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Published Reports</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <FileBarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{reports.length} Dossiers</div>
          <div className="text-[11px] text-emerald-600 font-medium">Ready for ministerial submission</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Regional Surveillance Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Regional Catchment Surveillance & Threat Index
                </h3>
                <p className="text-xs text-slate-500">
                  Population-level bacterial resistance scores and facility concentrations.
                </p>
              </div>
              <Link to="/app/command-center" className="text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1">
                <span>Command Center Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {regions.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{r.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      r.status === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-slate-900 font-mono">
                    {r.resistance_rate}%
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {r.total_facilities} connected facilities
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forecasting Insight */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>90-Day Predictive Surge Trajectory</span>
              </h3>
              <Link to="/app/amr-forecasting" className="text-xs font-semibold text-sky-600">
                View Forecast Models
              </Link>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Temporal analysis models project a potential <strong>+4.2% increase</strong> in Carbapenem resistance among ICU <em>K. pneumoniae</em> isolates over the next 8 weeks if contact precaution protocols remain baseline.
            </p>
          </div>
        </div>

        {/* Right 4 Cols: Dossiers & Action */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileBarChart2 className="w-4 h-4 text-sky-600" />
              <span>Surveillance Reports</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {reports.map((rep) => (
                <div key={rep.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="font-bold text-slate-900 block">{rep.title}</span>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{rep.created_at?.split('T')[0]}</span>
                    <span className="text-emerald-600 font-bold">{rep.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/app/reports"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Export Surveillance Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
