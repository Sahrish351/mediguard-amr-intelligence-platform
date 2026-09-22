import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { SeverityBadge, BatchBadge, AWaReBadge } from '@/components/common/Badge';
import { formatDate, formatResistanceRate } from '@/lib/formatters';
import { Link } from 'react-router-dom';
import {
  Pill,
  Activity,
  AlertTriangle,
  AlertCircle,
  PackageX,
  ShieldCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export const OverviewDashboard: React.FC = () => {
  const { currentOrg } = useAuth();

  // Filters
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('30d');

  const facilities = api.getFacilities(currentOrg.id);
  const alerts = api.getAlerts(currentOrg.id);
  const astResults = api.getSusceptibilityResults(currentOrg.id);
  const batches = api.getBatches();
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const dispensing = api.getDispensing(currentOrg.id);
  const dataQuality = api.getDataQualityIssues(currentOrg.id);

  // Compute live surveillance metrics
  const totalTested = astResults.length;
  const resistantCount = astResults.filter((r) => r.interpretation === 'R').length;
  const resistanceRate = totalTested > 0 ? ((resistantCount / totalTested) * 100).toFixed(1) : '0';

  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical');
  const expiredOrSuspiciousBatches = batches.filter(
    (b) => b.verification_status === 'Expired' || b.verification_status === 'Suspicious'
  );

  // Trend chart data (Last 6 months surveillance)
  const monthlyAmrTrendData = [
    { month: 'Apr', eColi: 32.1, klebsiella: 41.2, pAeruginosa: 28.5 },
    { month: 'May', eColi: 34.0, klebsiella: 42.5, pAeruginosa: 29.1 },
    { month: 'Jun', eColi: 35.8, klebsiella: 44.0, pAeruginosa: 31.0 },
    { month: 'Jul', eColi: 36.2, klebsiella: 46.3, pAeruginosa: 30.8 },
    { month: 'Aug', eColi: 38.5, klebsiella: 52.1, pAeruginosa: 33.4 },
    { month: 'Sep', eColi: 41.2, klebsiella: 64.2, pAeruginosa: 35.0 },
  ];

  // WHO AWaRe antibiotic consumption distribution
  const awareUtilizationData = [
    { name: 'Mayo Memorial Hospital', Access: 420, Watch: 680, Reserve: 85 },
    { name: 'Allama Iqbal Complex', Access: 380, Watch: 510, Reserve: 40 },
    { name: 'Regional Pharmacy 01', Access: 510, Watch: 440, Reserve: 15 },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Surveillance Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
            Clinical Surveillance Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Active monitoring of antimicrobial resistance, medication dispensing signals, and batch integrity
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              aria-label="Filter by Facility"
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Network Facilities ({facilities.length})</option>
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-2xs">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              aria-label="Filter by Time Range"
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days (Current Baseline)</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last 12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* 6 Key Clinical KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Resistance Rate"
          value={`${resistanceRate}%`}
          subtitle={`(${resistantCount}/${totalTested} tested)`}
          change={{ value: '+4.2%', isIncrease: true, isNegativeSentiment: true, periodText: 'vs 6-mo baseline' }}
          icon={Activity}
          variant="critical"
          tooltip="Calculated from non-duplicate clinical microbiology isolates"
        />

        <StatCard
          title="Active Alerts"
          value={alerts.length}
          subtitle={`${alerts.filter((a) => a.status === 'New').length} new unreviewed`}
          change={{ value: '+1 signal', isIncrease: true, isNegativeSentiment: true }}
          icon={AlertTriangle}
          variant="warning"
        />

        <StatCard
          title="Critical Signals"
          value={criticalAlerts.length}
          subtitle="Prompt investigation needed"
          icon={AlertCircle}
          variant={criticalAlerts.length > 0 ? 'critical' : 'default'}
        />

        <StatCard
          title="Prescriptions"
          value={prescriptions.length}
          subtitle="Monitored encounters"
          change={{ value: '+12%', isIncrease: true }}
          icon={Pill}
        />

        <StatCard
          title="Unverified / Expired"
          value={expiredOrSuspiciousBatches.length}
          subtitle="Batch flags"
          icon={PackageX}
          variant={expiredOrSuspiciousBatches.length > 0 ? 'warning' : 'default'}
        />

        <StatCard
          title="Data Quality"
          value={`${Math.max(0, 100 - dataQuality.length * 8)}%`}
          subtitle={`${dataQuality.length} open issues`}
          icon={ShieldCheck}
        />
      </div>

      {/* Main Visualizations: Resistance Trends & Antibiotic Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Resistance Trend Over Time (WHITE BACKGROUND) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B1F3A] font-heading">Antimicrobial Resistance Trends (% Resistant)</h2>
              <p className="text-xs text-slate-500">Monthly resistance rate across WHO critical priority pathogens</p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">CLSI M100 Benchmark</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAmrTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="klebGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="ecoliGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px', color: '#0B1F3A', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="klebsiella" name="Klebsiella pneumoniae (Surge)" stroke="#ef4444" strokeWidth={2} fill="url(#klebGradient)" />
                <Area type="monotone" dataKey="eColi" name="Escherichia coli" stroke="#0284C7" strokeWidth={2} fill="url(#ecoliGradient)" />
                <Area type="monotone" dataKey="pAeruginosa" name="Pseudomonas aeruginosa" stroke="#10b981" strokeWidth={1.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 pt-2">
            <span>* Signal detected: K. pneumoniae ceftriaxone resistance rose +38.7%</span>
            <span>Sample N = 480 isolates</span>
          </div>
        </div>

        {/* WHO AWaRe Classification Bar Chart (WHITE BACKGROUND) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B1F3A] font-heading">Antibiotic Utilization by Facility</h2>
              <p className="text-xs text-slate-500">WHO AWaRe categorization (Access vs Watch vs Reserve)</p>
            </div>
            <AWaReBadge category="Watch" />
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={awareUtilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickFormatter={(v) => v.split(' ')[0]} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '12px', color: '#0B1F3A', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Access" fill="#10b981" radius={[4, 4, 0, 0]} name="Access (1st line)" />
                <Bar dataKey="Watch" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Watch (High risk)" />
                <Bar dataKey="Reserve" fill="#ef4444" radius={[4, 4, 0, 0]} name="Reserve (Last resort)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-mono border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>Stewardship Target: Access &gt;= 60%</span>
            <span className="text-amber-600 font-bold">Current: 37.1% (Watch heavy)</span>
          </div>
        </div>
      </div>

      {/* Triage Queue: Active Surveillance Alerts Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-[#0B1F3A] font-heading">Active Surveillance Signals &amp; Triage Queue</h2>
          </div>
          <Link
            to="/app/alerts"
            className="text-xs text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1 font-bold transition-colors cursor-pointer"
          >
            <span>View All Signals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#F7FAFC] text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200 font-bold">
              <tr>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Signal / Alert Title</th>
                <th className="px-4 py-3">Observed Value</th>
                <th className="px-4 py-3">Baseline</th>
                <th className="px-4 py-3">Change</th>
                <th className="px-4 py-3">Detected</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alerts.slice(0, 4).map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#0B1F3A] max-w-md">{alert.title}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-sm">{alert.description}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {alert.observed_value}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500">
                    {alert.baseline_value}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-rose-600">
                    +{alert.change_percent}%
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                    {formatDate(alert.detected_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to="/app/investigations"
                      className="px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0284C7] border border-sky-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Investigate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Split Row: Batch Integrity & Recent Dispensing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flagged Batches */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageX className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-[#0B1F3A] font-heading">Medicine Batch Verification Queue</h2>
            </div>
            <Link to="/app/medications" className="text-xs text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1 font-bold">
              <span>View Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {batches.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{b.batch_number}</span>
                    <BatchBadge status={b.verification_status} />
                  </div>
                  <span className="text-xs text-slate-600 mt-0.5 font-medium">{b.medicine?.generic_name} ({b.medicine?.brand_name})</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-800">{b.current_quantity} units</span>
                  <div className="text-[11px] text-slate-500 font-mono">Exp: {formatDate(b.expiry_date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Realtime Clinical Dispensing Stream */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-[#0B1F3A] font-heading">Recent Pharmacy Dispensing Records</h2>
            </div>
            <Link to="/app/dispensing" className="text-xs text-[#0284C7] hover:text-[#0369A1] flex items-center gap-1 font-bold">
              <span>View Dispensing</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {dispensing.slice(0, 4).map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{d.medicine?.generic_name}</span>
                    <span className="font-mono text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      {d.patient_reference}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5">Pharmacist: {d.pharmacist?.full_name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#0284C7]">{d.quantity} units</span>
                  <div className="text-[11px] text-slate-400 font-mono">{formatDate(d.dispensed_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
