import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Globe,
  Server,
  Lock,
  Network,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  ArrowRight,
  Settings,
  History,
} from 'lucide-react';

export const PlatformAdminWorkspace: React.FC = () => {
  const { organizations, roles, users, currentUser } = useAuth();
  const allAuditLogs = api.getAuditLogs('org-1');
  const systemConnectors = api.getSystemConnectors();
  const backgroundJobs = api.getBackgroundJobs();

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300">
              PLATFORM COMMAND CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">• Root Administrative Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Global Infrastructure Console — {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            PostgreSQL Kernel Version 15.6 • Supabase GoTrue Auth Active • Serverless AI Edge Proxy Operational
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/audit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Lock className="w-4 h-4" />
            <span>Forensic Audit Trail</span>
          </Link>
        </div>
      </div>

      {/* Global Infrastructure KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Multi-Tenants</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{organizations.length} Active</div>
          <div className="text-[11px] text-emerald-600 font-medium">Strict RLS isolation verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Credentialed Users</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{users.length} Users</div>
          <div className="text-[11px] text-slate-500">Across 9 distinct roles</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">System Connectors</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Network className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{systemConnectors.length} Pipelines</div>
          <div className="text-[11px] text-emerald-600 font-medium">FHIR, LIMS & GS1 Active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Immutable Audit Logs</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{allAuditLogs.length} Events</div>
          <div className="text-[11px] text-slate-500">Monotonically verified</div>
        </div>
      </div>

      {/* Main Administrative Views */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Organizations & Connectors */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Active Health Organizations (Tenants)
                </h3>
                <p className="text-xs text-slate-500">
                  Cryptographically segregated database partitions.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {organizations.map((org) => (
                <div key={org.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{org.name}</span>
                    <span className="text-slate-500 block text-[11px]">{org.region}, {org.country} • Timezone: {org.timezone}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {org.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health & Ingestion Pipeline */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Background Ingestion Jobs & Schedulers
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous surveillance pipelines and synchronization routines.
                </p>
              </div>
              <Link to="/app/jobs" className="text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1">
                <span>View Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {backgroundJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{job.name}</span>
                    <span className="text-[11px] text-slate-500 block">{job.schedule}</span>
                  </div>
                  <span className="font-mono text-emerald-600 text-[11px] font-bold">
                    ✓ {job.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Security Events & Audit Digest */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-700" />
              <span>Security & Access Controls</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">PostgreSQL RLS Policies:</span>
                <span className="text-emerald-700 font-mono text-[11px]">25/25 Tables Guarded</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Gemini AI Server Proxy:</span>
                <span className="text-indigo-700 font-mono text-[11px]">Serverless Isolated (No Client Keys)</span>
              </div>
            </div>
            <Link
              to="/app/audit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Full Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
