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
  Building2,
  Calendar,
  Pill,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

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

  // DOT (Days of Therapy per 1,000 Patient-Days) monthly trend
  const dotTrendData = [
    { month: 'Nov', accessDOT: 410, watchDOT: 180, reserveDOT: 45 },
    { month: 'Dec', accessDOT: 425, watchDOT: 175, reserveDOT: 42 },
    { month: 'Jan', accessDOT: 430, watchDOT: 168, reserveDOT: 40 },
    { month: 'Feb', accessDOT: 450, watchDOT: 155, reserveDOT: 35 },
    { month: 'Mar', accessDOT: 465, watchDOT: 150, reserveDOT: 32 },
    { month: 'Apr', accessDOT: 480, watchDOT: 142, reserveDOT: 28 },
  ];

  const awareDistribution = [
    { name: 'Access', target: 60, actual: Number(awareStats.accessPercentage) || 68, fill: '#16A34A' },
    { name: 'Watch', target: 30, actual: Number(awareStats.watchPercentage) || 24, fill: '#D97706' },
    { name: 'Reserve', target: 10, actual: Number(awareStats.reservePercentage) || 8, fill: '#DC2626' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Workspace Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              ANTIMICROBIAL STEWARDSHIP CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">• WHO AWaRe &amp; DOT Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
            Stewardship Lead: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Health Network: {currentOrg.name} • Institutional Target: Maintain ≥60% Access Antibiotic Prescribing Ratio
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/app/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Stewardship Copilot</span>
          </Link>
          <Link
            to="/app/aware"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AWaRe Formularies</span>
          </Link>
        </div>
      </div>

      {/* 2. Stewardship 5 KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">AWaRe Ratio</span>
            <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] font-mono">{awareStats.accessPercentage}% Access</div>
          <div className="text-[10px] text-emerald-600 font-medium">WHO target: ≥60%</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Days of Therapy</span>
            <div className="p-1.5 rounded-xl bg-sky-50 text-sky-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] font-mono">480 DOT</div>
          <div className="text-[10px] text-slate-500">Per 1,000 pt-days</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Consumption</span>
            <div className="p-1.5 rounded-xl bg-teal-50 text-teal-700">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] font-mono">142 DDD</div>
          <div className="text-[10px] text-teal-700 font-medium">Defined daily doses</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Interventions</span>
            <div className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] font-mono">{investigations.length} Cases</div>
          <div className="text-[10px] text-amber-700 font-medium">Active audit &amp; feedback</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Prescriber Bench</span>
            <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] font-mono">88.4%</div>
          <div className="text-[10px] text-indigo-700 font-medium">Peer compliance index</div>
        </div>
      </div>

      {/* 3. Recharts: Days of Therapy (DOT) Trend & AWaRe Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* DOT Trend Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                Days of Therapy (DOT / 1,000 Patient-Days)
              </h3>
              <p className="text-xs text-slate-500">
                Longitudinal utilization trend tracking transition from Watch/Reserve to Access agents.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              DOT Target Reached
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dotTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="accessDOT" name="Access DOT" stroke="#16A34A" fill="#16A34A" fillOpacity={0.5} />
                <Area type="monotone" dataKey="watchDOT" name="Watch DOT" stroke="#D97706" fill="#D97706" fillOpacity={0.4} />
                <Area type="monotone" dataKey="reserveDOT" name="Reserve DOT" stroke="#DC2626" fill="#DC2626" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AWaRe Comparison BarChart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                WHO AWaRe 2024 Alignment
              </h3>
              <p className="text-xs text-slate-500">
                Target ratio vs institutional actual prescribing percentage.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-[#0D9488] border border-teal-200">
              WHO 60%
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={awareDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="target" name="WHO Target %" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual %" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Clinician Peer Benchmarking & Active Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Prescriber Performance */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                  Prescriber Antimicrobial Compliance Benchmarking
                </h3>
                <p className="text-xs text-slate-500">
                  Peer ranking based on WHO AWaRe alignment and indication documentation.
                </p>
              </div>
              <Link to="/app/prescribers" className="text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1">
                <span>View All Prescribers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Clinician</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Total Courses</th>
                    <th className="py-2.5 px-3">Access Tier Ratio</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {prescriberAnalytics.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-[#0B1F3A]">{p.doctor_name || p.prescriber_name}</td>
                      <td className="py-3 px-3 text-slate-500">{p.facility || p.facility_name}</td>
                      <td className="py-3 px-3 font-mono font-medium">{p.prescriptions_count || p.total_prescriptions}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-700">{p.compliance_score}%</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.compliance_score >= 85 ? 'Exemplary' : 'Under Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active Stewardship Interventions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-sky-600" />
              <span>Intervention Queue</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {investigations.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {inv.notes?.[0]?.note || 'Audit & feedback advisory in review.'}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/app/investigations"
              className="w-full py-2.5 rounded-xl bg-[#0B5ED7] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Manage Stewardship Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
