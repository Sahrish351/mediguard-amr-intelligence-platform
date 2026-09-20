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
} from 'lucide-react';
import { SeverityBadge } from '@/components/common/Badge';

export const SurveillanceWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const alerts = api.getAlerts(currentOrg.id);
  const investigations = api.getInvestigations(currentOrg.id);

  const criticalAlerts = alerts.filter(a => a.severity === 'Critical');
  const highAlerts = alerts.filter(a => a.severity === 'High');

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200">
              CLINICAL SURVEILLANCE & ALERT TRIAGE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Incident Response Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Surveillance Officer: {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitoring Node: {currentOrg.name} • Deterministic Mathematical Alert Engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/alerts"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Triage Active Alerts</span>
          </Link>
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
          <div className="text-[11px] text-slate-500">Continuous 30-day baseline</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Critical Severity</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{criticalAlerts.length} Critical</div>
          <div className="text-[11px] text-rose-600 font-medium">Requires immediate response</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Investigations</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{investigations.length} In Progress</div>
          <div className="text-[11px] text-slate-500">Collaborative notes active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Resolution Ratio</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">85.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Mandatory justification enforced</div>
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
                <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <SeverityBadge severity={a.severity} />
                      <span className="font-bold text-slate-900 text-sm font-heading">{a.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{a.status}</span>
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
                <div key={inv.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {inv.notes?.[0]?.note || 'Multidisciplinary case ongoing.'}
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
        </div>
      </div>
    </div>
  );
};
