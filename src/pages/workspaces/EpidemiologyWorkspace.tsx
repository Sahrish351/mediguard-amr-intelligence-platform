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
  Layers,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const EpidemiologyWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const regions = api.getRegions();
  const organisms = api.getOrganisms();
  const reports = api.getReports(currentOrg.id);

  // Longitudinal Resistance Trend Data (12-month multi-pathogen)
  const longitudinalTrendData = [
    { month: 'Oct', cre: 24, mrsa: 31, esbl: 38, vre: 12 },
    { month: 'Nov', cre: 25, mrsa: 30, esbl: 39, vre: 13 },
    { month: 'Dec', cre: 26, mrsa: 32, esbl: 41, vre: 12 },
    { month: 'Jan', cre: 28, mrsa: 33, esbl: 40, vre: 14 },
    { month: 'Feb', cre: 29, mrsa: 31, esbl: 43, vre: 15 },
    { month: 'Mar', cre: 31, mrsa: 32, esbl: 44, vre: 14 },
    { month: 'Apr', cre: 33, mrsa: 34, esbl: 46, vre: 16 },
  ];

  // Pathogen Distribution in Tested Cultures
  const pathogenDistributionData = [
    { name: 'K. pneumoniae', isolates: 840, resistant: 350 },
    { name: 'E. coli', isolates: 1120, resistant: 490 },
    { name: 'A. baumannii', isolates: 420, resistant: 270 },
    { name: 'S. aureus', isolates: 680, resistant: 218 },
    { name: 'P. aeruginosa', isolates: 390, resistant: 110 },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-3 py-1 rounded-full bg-sky-50 border border-sky-200">
              POPULATION &amp; AMR INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Macro-Surveillance Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
            Epidemiologist: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Catchment Zone: National Network • Aggregated Multicenter Cohort (N=2,840 Validated Cultures)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/app/amr-heatmap"
            className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Interactive AMR Heatmap</span>
          </Link>
          <Link
            to="/app/reports"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Dossier</span>
          </Link>
        </div>
      </div>

      {/* 2. KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Monitored Regions</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{regions.length} Catchments</div>
          <div className="text-[11px] text-slate-500">Facility geospatial mapping active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Network Resistance</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">23.4%</div>
          <div className="text-[11px] text-rose-600 font-medium">+1.8% vs prior 6-month baseline</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Priority Pathogens</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Microscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{organisms.length} Tracked</div>
          <div className="text-[11px] text-amber-600 font-medium">WHO GLASS Tier 1 alignment</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Published Reports</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <FileBarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{reports.length} Dossiers</div>
          <div className="text-[11px] text-emerald-600 font-medium">Ready for ministerial submission</div>
        </div>
      </div>

      {/* 3. Recharts: Longitudinal Resistance Trend & Pathogen Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Multi-Pathogen Resistance Trend LineChart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                Multi-Pathogen Resistance Vectors (12-Month)
              </h3>
              <p className="text-xs text-slate-500">
                Resistance rates across critical WHO priority bacterial phenotypes.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
              CLSI M100 S/I/R
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={longitudinalTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="cre" name="CRE (%)" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="esbl" name="ESBL (%)" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="mrsa" name="MRSA (%)" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="vre" name="VRE (%)" stroke="#7C3AED" strokeWidth={1.5} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pathogen Distribution BarChart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                Pathogen Culture Volume &amp; Resistance
              </h3>
              <p className="text-xs text-slate-500">
                Isolates tested vs confirmed resistant strains.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
              N=3,450
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pathogenDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="isolates" name="Total Isolates" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resistant" name="Resistant" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Regional Catchment Surveillance & Threat Index */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                  Regional Catchment Surveillance &amp; Threat Index
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
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0284C7]" />
                      <span>{r.name}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        r.status === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">
                    {r.resistance_rate}%
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {r.total_facilities} connected facilities
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 90-Day Predictive Surge Trajectory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
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
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
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
              className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
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
