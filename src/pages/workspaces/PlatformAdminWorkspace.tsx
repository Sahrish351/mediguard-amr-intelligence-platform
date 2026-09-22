import React, { useState } from 'react';
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
  Activity,
  Zap,
  Sparkles,
  Database,
  KeyRound,
  FileText,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const PlatformAdminWorkspace: React.FC = () => {
  const { organizations, roles, users, currentUser } = useAuth();
  const allAuditLogs = api.getAuditLogs('org-1');
  const systemConnectors = api.getSystemConnectors();
  const backgroundJobs = api.getBackgroundJobs();

  // Telemetry Chart Data for Enterprise Monitoring
  const activityData = [
    { time: '00:00', requests: 1420, latency: 42, aiQueries: 12 },
    { time: '04:00', requests: 980, latency: 38, aiQueries: 8 },
    { time: '08:00', requests: 4320, latency: 51, aiQueries: 48 },
    { time: '12:00', requests: 6890, latency: 58, aiQueries: 86 },
    { time: '16:00', requests: 5410, latency: 49, aiQueries: 64 },
    { time: '20:00', requests: 3120, latency: 44, aiQueries: 32 },
  ];

  const tenantGrowthData = [
    { month: 'Apr', tenants: 2, facilities: 6, records: 12400 },
    { month: 'May', tenants: 3, facilities: 9, records: 28900 },
    { month: 'Jun', tenants: 4, facilities: 12, records: 45200 },
    { month: 'Jul', tenants: 5, facilities: 15, records: 74100 },
    { month: 'Aug', tenants: 5, facilities: 17, records: 108400 },
    { month: 'Sep', tenants: 6, facilities: 19, records: 142800 },
  ];

  const connectorList = [
    { name: 'HL7 FHIR R4 Ingestion', protocol: 'REST / JSON', status: 'Healthy', latency: '44ms', throughput: '1,420 msgs/hr', type: 'FHIR' },
    { name: 'Microbiology LIMS Broker', protocol: 'ASTM 1394', status: 'Healthy', latency: '32ms', throughput: '480 isolates/hr', type: 'LIMS' },
    { name: 'GS1 Pharmaceutical Registry', protocol: 'DataMatrix API', status: 'Healthy', latency: '58ms', throughput: '2,890 scans/hr', type: 'GS1' },
    { name: 'DHIS2 Public Health Sync', protocol: 'OAuth2 Webhook', status: 'Standby', latency: '110ms', throughput: 'Batch sync daily', type: 'DHIS2' },
  ];

  const securityEvents = [
    { time: '10:42 AM', type: 'RLS Filter Enforcement', desc: 'Blocked unauthorized cross-tenant query from org-2 context', severity: 'Info' },
    { time: '09:15 AM', type: 'Failed Authentication', desc: 'Single incorrect password attempt on clinician portal (Rate-limited)', severity: 'Warning' },
    { time: '08:00 AM', type: 'Key Rotation Audit', desc: 'Serverless Gemini edge proxy token verified and operational', severity: 'Success' },
    { time: '06:30 AM', type: 'Automated DB Vacuum', desc: 'PostgreSQL 15.6 autovacuum and index optimization completed', severity: 'Info' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header: Greeting, Status & Quick Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B1F3A] px-3 py-1 rounded-full bg-slate-100 border border-slate-300">
              PLATFORM COMMAND CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">• Root Administrative Authority</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
            Good morning, Platform Administrator.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            System-wide overview of MediGuard infrastructure, multi-tenant databases, connectors, and security telemetry.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/organization"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-2xs"
          >
            Manage Organizations
          </Link>
          <Link
            to="/security"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-2xs"
          >
            Review Security
          </Link>
          <Link
            to="/app/audit"
            className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>View Audit Trail</span>
          </Link>
          <Link
            to="/app/settings"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="System Configuration"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. System Health Status Strip (API, Database, Authentication, AI, Connectors) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">REST API</span>
            <span className="text-sm font-bold text-[#0B1F3A]">Operational</span>
            <span className="text-[11px] text-emerald-600 block font-mono">42ms latency</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">DATABASE</span>
            <span className="text-sm font-bold text-[#0B1F3A]">PostgreSQL 15</span>
            <span className="text-[11px] text-emerald-600 block font-mono">25/25 RLS Active</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">AUTH SERVICE</span>
            <span className="text-sm font-bold text-[#0B1F3A]">GoTrue JWT</span>
            <span className="text-[11px] text-emerald-600 block font-mono">100% Verified</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">AI COPILOT</span>
            <span className="text-sm font-bold text-[#0B1F3A]">Gemini Proxy</span>
            <span className="text-[11px] text-indigo-600 block font-mono">Edge Isolated</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">CONNECTORS</span>
            <span className="text-sm font-bold text-[#0B1F3A]">4 Pipelines</span>
            <span className="text-[11px] text-[#0D9488] block font-mono">FHIR / LIMS OK</span>
          </div>
          <span className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
        </div>
      </div>

      {/* 3. Global Telemetry Overview (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Multi-Tenants</span>
            <div className="p-2 rounded-xl bg-sky-50 text-[#0284C7]">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{organizations.length} Active</div>
          <div className="text-[11px] text-emerald-600 font-medium">Strict RLS cryptographic isolation</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Credentialed Users</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-[#6366F1]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{users.length} Users</div>
          <div className="text-[11px] text-slate-500">Distributed across 9 dedicated roles</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">System Connectors</span>
            <div className="p-2 rounded-xl bg-teal-50 text-[#0D9488]">
              <Network className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{systemConnectors.length} Pipelines</div>
          <div className="text-[11px] text-emerald-600 font-medium">HL7 FHIR &amp; GS1 telemetry active</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Forensic Audit Logs</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">{allAuditLogs.length} Events</div>
          <div className="text-[11px] text-slate-500">Monotonically verified append-only</div>
        </div>
      </div>

      {/* 4. Telemetry Charts: System Activity & Tenant Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: System Activity & API Latency AreaChart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                System Ingestion Volume &amp; API Latency
              </h3>
              <p className="text-xs text-slate-500">
                Hourly throughput across FHIR endpoints and database query response time.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-[#0284C7] border border-sky-200 self-start sm:self-auto">
              24-Hour Telemetry
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
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
                <Area type="monotone" dataKey="requests" name="Requests / Hr" stroke="#0284C7" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 5 Cols: Tenant Growth & Telemetry Records BarChart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                Multi-Tenant Network Growth
              </h3>
              <p className="text-xs text-slate-500">
                Connected facilities and clinical records indexed monthly.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-[#0D9488] border border-teal-200">
              6-Month Trend
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="facilities" name="Connected Facilities" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. Connector Status Visualization (FHIR, LIMS, GS1, DHIS2) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
              <Network className="w-5 h-5 text-[#0D9488]" />
              <span>Interoperability Connector Matrix</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Real-time ingestion health across hospital EHRs, laboratory instrumentation, and pharmaceutical registries.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
            ALL CONNECTORS STABLE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connectorList.map((conn, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {conn.type}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {conn.status}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B1F3A]">{conn.name}</h4>
                <span className="text-[11px] text-slate-400 font-mono block pt-0.5">{conn.protocol}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/70 text-[10px] font-mono flex items-center justify-between text-slate-500">
                <span>Latency: {conn.latency}</span>
                <span>{conn.throughput}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Main Administrative Views (Tenants, Background Jobs, Security Events, Audit Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Active Organizations & Ingestion Jobs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tenant Organizations */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-heading">
                  Active Health Organizations (Tenants)
                </h3>
                <p className="text-xs text-slate-500">
                  Cryptographically segregated database partitions governed by PostgreSQL RLS.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {organizations.length} Tenants Active
              </span>
            </div>

            <div className="space-y-3">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/70 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-sm block">{org.name}</span>
                    <span className="text-slate-500 block text-[11px] font-mono">
                      Tenant ID: {org.id} • Region: {org.region}, {org.country} • Timezone: {org.timezone}
                    </span>
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

          {/* Background Ingestion Jobs */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#0284C7]" />
                  <span>Background Ingestion Jobs &amp; Schedulers</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Automated asynchronous ETL routines for surveillance aggregation and data hygiene.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {backgroundJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">{job.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono block">{job.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Security Events & Chronological Audit Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security & Access Controls */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Security Events &amp; Defenses</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                0 Breaches
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {securityEvents.map((evt, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-slate-700">{evt.type}</span>
                    <span className="text-slate-400">{evt.time}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{evt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Append-Only Audit Trail Timeline */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#0B1F3A] font-heading flex items-center gap-2">
                <History className="w-4 h-4 text-slate-700" />
                <span>Recent Forensic Audit Trail</span>
              </h3>
              <span className="text-[10px] font-mono font-bold text-slate-400">Append-Only</span>
            </div>

            <div className="space-y-3 text-xs">
              {allAuditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-slate-400">{log.created_at?.split('T')[1]?.slice(0, 8)}</span>
                  </div>
                  <span className="text-slate-600 text-[11px] block">
                    Entity: <code>{log.entity_type}</code> • ID: <code>{log.entity_id}</code>
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/app/audit"
              className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
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
