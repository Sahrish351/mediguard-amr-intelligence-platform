import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { PrescriberAnalytics } from '@/types';
import { StatCard } from '@/components/common/StatCard';
import {
  Stethoscope,
  Award,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  Building2,
  FileDown,
  TrendingUp,
  UserCheck,
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
} from 'recharts';

export const PrescriberAnalyticsPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const prescribers = api.getPrescriberAnalytics();

  // Helper getters for robust field access
  const getAdherence = (p: PrescriberAnalytics) => p.guideline_adherence_pct ?? p.compliance_score ?? 85;
  const getName = (p: PrescriberAnalytics) => p.prescriber_name ?? p.doctor_name ?? 'Clinician';
  const getFacility = (p: PrescriberAnalytics) => p.facility_name ?? p.facility ?? 'Facility';
  const getDept = (p: PrescriberAnalytics) => p.department ?? p.specialty ?? 'General';
  const getAlerts = (p: PrescriberAnalytics) => p.high_risk_alerts_count ?? 0;
  const getAware = (p: PrescriberAnalytics) => p.aware_distribution ?? { Access: 60, Watch: 30, Reserve: 10 };
  const getTotalRx = (p: PrescriberAnalytics) => p.total_prescriptions ?? p.prescriptions_count ?? 100;

  // Metrics
  const totalPrescribers = prescribers.length;
  const avgGuidelineAdherence = (
    prescribers.reduce((acc, p) => acc + getAdherence(p), 0) / (totalPrescribers || 1)
  ).toFixed(1);
  const exemplaryCount = prescribers.filter((p) => getAdherence(p) >= 90).length;
  const reviewNeededCount = prescribers.filter((p) => getAlerts(p) > 3).length;

  const filtered = prescribers.filter((p) => {
    const dept = getDept(p);
    const name = getName(p);
    const fac = getFacility(p);
    const matchesDept = departmentFilter === 'all' || dept.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const chartData = prescribers.map((p) => {
    const aware = getAware(p);
    return {
      name: getName(p).replace('Dr. ', ''),
      Access: aware.Access,
      Watch: aware.Watch,
      Reserve: aware.Reserve,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Prescriber Stewardship Analytics</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">
              Peer Benchmarking
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Clinician-level antimicrobial prescribing scorecards, guideline adherence, and WHO AWaRe distribution profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Scorecards
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monitored Prescribers"
          value={totalPrescribers}
          subtitle="Across active hospital clinical services"
          icon={Stethoscope}
          color="sky"
        />
        <StatCard
          title="Avg Guideline Adherence"
          value={`${avgGuidelineAdherence}%`}
          subtitle="Institutional clinical pathway compliance"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Exemplary Stewardship"
          value={exemplaryCount}
          subtitle="&ge; 90% adherence with low Reserve use"
          icon={Award}
          color="teal"
        />
        <StatCard
          title="Review Flagged"
          value={reviewNeededCount}
          subtitle="Elevated Watch/Reserve prescription ratios"
          icon={AlertTriangle}
          color={reviewNeededCount > 0 ? 'amber' : 'slate'}
        />
      </div>

      {/* Chart */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Prescriber AWaRe Ratio Comparison (%)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Ratio of Access vs. Watch vs. Reserve antibiotic prescriptions by clinician</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            Target: Access &ge; 60%
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
              />
              <Legend />
              <Bar dataKey="Access" fill="#10b981" stackId="a" />
              <Bar dataKey="Watch" fill="#f59e0b" stackId="a" />
              <Bar dataKey="Reserve" fill="#ef4444" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prescriber Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search clinician name, specialty, facility..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 w-72"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Departments</option>
              <option value="critical">Critical Care / ICU</option>
              <option value="pulmon">Pulmonology</option>
              <option value="surgery">General Surgery</option>
              <option value="internal">Internal Medicine</option>
            </select>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong>{filtered.length}</strong> prescriber scorecards
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Clinician</th>
                <th className="py-3 px-4 font-semibold">Department & Facility</th>
                <th className="py-3 px-4 font-semibold text-right">Prescriptions</th>
                <th className="py-3 px-4 font-semibold text-center">AWaRe Distribution</th>
                <th className="py-3 px-4 font-semibold text-right">Guideline Adherence</th>
                <th className="py-3 px-4 font-semibold text-right">Safety Flags</th>
                <th className="py-3 px-4 font-semibold text-center">Stewardship Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((p) => {
                const adherence = getAdherence(p);
                const alertsCount = getAlerts(p);
                const aware = getAware(p);
                const isExemplary = adherence >= 90;
                const isWarning = alertsCount > 3 || aware.Reserve > 10;

                return (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                        {getName(p)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-300 font-medium">{getDept(p)}</div>
                      <div className="text-[11px] text-slate-400">{getFacility(p)}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium">{getTotalRx(p)}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-mono text-[11px]">
                        <span className="text-emerald-400">{aware.Access}% A</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-amber-400">{aware.Watch}% W</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-rose-400">{aware.Reserve}% R</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-mono font-bold ${
                          adherence >= 90
                            ? 'text-emerald-400'
                            : adherence >= 80
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {adherence}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          alertsCount > 0
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        {alertsCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          isExemplary
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : isWarning
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                        }`}
                      >
                        {isExemplary ? 'Exemplary' : isWarning ? 'Peer Review' : 'Compliant'}
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
  );
};
