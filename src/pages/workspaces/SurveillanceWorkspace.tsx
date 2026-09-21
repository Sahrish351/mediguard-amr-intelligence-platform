import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Activity,
  AlertTriangle,
  FileSearch,
  CheckCircle2,
  Clock,
  UserCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  BarChart3,
  Layers,
  Radio,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { SeverityBadge } from '@/components/common/Badge';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

const signalVelocityData = [
  { day: 'Mon', detected: 8, resolved: 6, critical: 2 },
  { day: 'Tue', detected: 11, resolved: 9, critical: 3 },
  { day: 'Wed', detected: 9, resolved: 7, critical: 1 },
  { day: 'Thu', detected: 15, resolved: 11, critical: 4 },
  { day: 'Fri', detected: 13, resolved: 12, critical: 2 },
  { day: 'Sat', detected: 6, resolved: 8, critical: 1 },
  { day: 'Sun', detected: 5, resolved: 6, critical: 0 },
];

const alertCategoryData = [
  { category: 'Outbreak Clustering', count: 6, fill: '#ef4444' },
  { category: 'Prescribing Velocity', count: 9, fill: '#f59e0b' },
  { category: 'Repeat Dispensing', count: 5, fill: '#0284c7' },
  { category: 'Batch Discrepancy', count: 3, fill: '#6366f1' },
];

export const SurveillanceWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const alerts = api.getAlerts(currentOrg.id);
  const investigations = api.getInvestigations(currentOrg.id);

  const criticalAlerts = alerts.filter(a => a.severity === 'Critical');
  const highAlerts = alerts.filter(a => a.severity === 'High');

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs bg-gradient-to-r from-white via-rose-50/40 to-slate-50 text-slate-900">
        <div className="absolute top-0 right-0 w-96 h-full opacity-10 pointer-events-none overflow-hidden">
          <img
            src={CLINICAL_IMAGES.commandCenter}
            alt="Surveillance Command Center"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-rose-600 animate-pulse" />
                REAL-TIME CLINICAL SURVEILLANCE RADAR
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Deterministic Alert Engine • 30-Day Baselines Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Surveillance Incident Desk — {currentUser?.full_name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Continuous multi-facility surveillance combining microbiology isolate phenotyping, antibiotic prescription velocity surges, and contaminated batch lot anomaly signals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/app/alerts"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Triage Active Alerts</span>
            </Link>
            <Link
              to="/app/investigations"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Investigation Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Surveillance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Total Signals</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{alerts.length} Detected</div>
          <div className="text-[11px] text-slate-500">Continuous rolling baseline</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Critical Severity</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{criticalAlerts.length} High Priority</div>
          <div className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-rose-500" />
            <span>Immediate clinical review</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Active Investigations</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{investigations.length} In-Flight</div>
          <div className="text-[11px] text-slate-500">Collaborative case notes</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Resolution Ratio</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">85.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Mandatory sign-off logged</div>
        </div>
      </div>

      {/* Analytics Row: 7-Day Signal Surge Velocity & Category Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Signal Velocity Area Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Signal Detection & Resolution Velocity (7-Day)
              </h3>
              <p className="text-xs text-slate-500">
                New signals detected versus triage sign-offs completed by surveillance officers.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              Alerts / Day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signalVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="detected" name="Signals Detected" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorDetected)" />
                <Area type="monotone" dataKey="resolved" name="Signals Resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signal Category Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Surveillance Signal Typology
              </h3>
              <p className="text-xs text-slate-500">
                Active alerts categorized by detection algorithm.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={alertCategoryData}
                margin={{ top: 10, right: 20, left: 35, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="category" type="category" stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" name="Active Signals" radius={[0, 6, 6, 0]}>
                  {alertCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Alert Triage Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Active Clinical Surveillance Signals
                </h3>
                <p className="text-xs text-slate-500">
                  Deterministic alerts correlated with microbiology AST and medication dispensing.
                </p>
              </div>
              <Link to="/app/alerts" className="text-xs font-semibold text-rose-700 hover:text-rose-600 flex items-center gap-1">
                <span>Alert Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 5).map((a) => (
                <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <SeverityBadge severity={a.severity} />
                      <span className="font-bold text-slate-900 text-sm font-heading">{a.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{a.status}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 font-mono">
                    <span>Observed: {a.observed_value} (Baseline: {a.baseline_value})</span>
                    <span className="text-rose-600 font-bold">+{a.change_percent}% Surge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active Case Investigations */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-sky-600" />
              <span>Investigation Case Queue</span>
            </h3>
            <div className="space-y-2 text-xs">
              {investigations.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {inv.notes?.[0]?.note || 'Multidisciplinary incident review in progress.'}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/app/investigations"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open Investigation Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Audit Disclaimer Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-teal-50/50 text-slate-800 border border-emerald-200/80 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-bold font-mono text-[11px] uppercase tracking-wider text-emerald-900">
                Audited Decision Flow
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              All dismissals, escalations, and interventions require cryptographic identity confirmation and written clinical rationale per ISO 15189 governance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

