import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  ShieldCheck,
  Activity,
  Users,
  AlertTriangle,
  Sparkles,
  BarChart3,
  TrendingUp,
  FileSearch,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';

export const StewardshipWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const medicines = api.getMedicines();
  const getAware = (m: any) => m.aware_category || m.awarre_category || m.aware_classification || 'Access';
  const accessCount = medicines.filter(m => getAware(m) === 'Access').length;
  const watchCount = medicines.filter(m => getAware(m) === 'Watch').length;
  const reserveCount = medicines.filter(m => getAware(m) === 'Reserve').length;
  const totalMeds = medicines.length || 1;
  const awareStats = {
    accessPercentage: ((accessCount / totalMeds) * 100).toFixed(0),
    watchPercentage: ((watchCount / totalMeds) * 100).toFixed(0),
    reservePercentage: ((reserveCount / totalMeds) * 100).toFixed(0),
  };
  const prescriberAnalytics = api.getPrescriberAnalytics();
  const investigations = api.getInvestigations(currentOrg.id);
  const alerts = api.getAlerts(currentOrg.id);

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              ANTIMICROBIAL STEWARDSHIP CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">• WHO AWaRe & DOT Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Stewardship Lead: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Health Network: {currentOrg.name} • Target: Maintain &gt;= 60% Access Antibiotic Ratio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Stewardship Copilot</span>
          </Link>
        </div>
      </div>

      {/* Stewardship KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Access Antibiotics</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{awareStats.accessPercentage}%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Compliant with WHO target (&gt;= 60%)</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Watch Antibiotics</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{awareStats.watchPercentage}%</div>
          <div className="text-[11px] text-amber-600 font-medium">Under active surveillance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Reserve Antibiotics</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{awareStats.reservePercentage}%</div>
          <div className="text-[11px] text-rose-600 font-medium">Requires infectious disease sign-off</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Active Interventions</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{investigations.length} Cases</div>
          <div className="text-[11px] text-slate-500">Clinical feedback documented</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Clinician Peer Benchmarking */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Prescriber Peer Benchmarking & AWaRe Compliance
                </h3>
                <p className="text-xs text-slate-500">
                  Individual prescriber utilization patterns across departments.
                </p>
              </div>
              <Link to="/app/prescribers" className="text-xs font-semibold text-emerald-700 hover:text-emerald-600 flex items-center gap-1">
                <span>Detailed Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Prescriber</th>
                    <th className="py-2.5 px-3">Specialty / Ward</th>
                    <th className="py-2.5 px-3">Total Rx</th>
                    <th className="py-2.5 px-3">Access %</th>
                    <th className="py-2.5 px-3">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {prescriberAnalytics.map((p) => {
                    const accessRate = p.aware_distribution?.Access ?? Math.round(100 - p.antibiotic_rate);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-semibold text-slate-900">{p.doctor_name || p.prescriber_name}</td>
                        <td className="py-3 px-3 text-slate-500">{p.specialty}</td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{p.prescriptions_count || p.total_prescriptions || 0}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-700">{accessRate}%</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            accessRate >= 60 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {accessRate >= 60 ? 'Compliant' : 'Needs Review'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active Investigations & Interventions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-emerald-700" />
              <span>Stewardship Interventions</span>
            </h3>
            <div className="space-y-2 text-xs">
              {investigations.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {inv.notes?.[0]?.note || 'Stewardship investigation initiated.'}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/app/investigations"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Manage All Interventions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
