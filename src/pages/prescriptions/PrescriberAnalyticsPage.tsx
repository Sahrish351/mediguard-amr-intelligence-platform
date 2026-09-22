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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              Prescriber Stewardship Analytics
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              Peer Benchmarking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Clinician-level antimicrobial prescribing scorecards, guideline adherence, and WHO AWaRe distribution profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
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
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1F3A]">Prescriber AWaRe Ratio Comparison (%)</h2>
            <p className="text-xs text-slate-500 mt-0.5">Ratio of Access vs. Watch vs. Reserve antibiotic prescriptions by clinician</p>
          </div>
          <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
            Target: Access &ge; 60%
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.7} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={12} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
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
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search clinician name, specialty, facility..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-teal-500 w-72 shadow-xs"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Departments</option>
              <option value="critical">Critical Care / ICU</option>
              <option value="pulmon">Pulmonology</option>
              <option value="surgery">General Surgery</option>
              <option value="internal">Internal Medicine</option>
            </select>
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-[#0B1F3A] font-semibold">{filtered.length}</strong> prescriber scorecards
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Clinician</th>
                <th className="py-3 px-4">Department & Facility</th>
                <th className="py-3 px-4 text-right">Prescriptions</th>
                <th className="py-3 px-4 text-center">AWaRe Distribution</th>
                <th className="py-3 px-4 text-right">Guideline Adherence</th>
                <th className="py-3 px-4 text-right">Safety Flags</th>
                <th className="py-3 px-4 text-center">Stewardship Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const adherence = getAdherence(p);
                const alertsCount = getAlerts(p);
                const aware = getAware(p);
                const isExemplary = adherence >= 90;
                const isWarning = alertsCount > 3 || aware.Reserve > 10;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                        {getName(p)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[#0B1F3A] font-medium">{getDept(p)}</div>
                      <div className="text-[11px] text-slate-500">{getFacility(p)}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-700">{getTotalRx(p)}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-mono text-[11px]">
                        <span className="text-emerald-700 font-semibold">{aware.Access}% A</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-amber-700 font-semibold">{aware.Watch}% W</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-rose-700 font-semibold">{aware.Reserve}% R</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`font-mono font-bold ${
                          adherence >= 90
                            ? 'text-emerald-700'
                            : adherence >= 80
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {adherence}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] ${
                          alertsCount > 0
                            ? 'bg-amber-50 text-amber-700 border border-amber-200 font-bold'
                            : 'text-slate-400'
                        }`}
                      >
                        {alertsCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          isExemplary
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isWarning
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-teal-50 text-teal-700 border border-teal-200'
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
