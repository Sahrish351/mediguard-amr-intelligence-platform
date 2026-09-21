import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Building2,
  Users,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  Database,
  CheckCircle2,
  FileBarChart2,
  Settings,
  TrendingUp,
  Landmark,
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
  AreaChart,
  Area,
} from 'recharts';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

const facilityComplianceData = [
  { name: 'General Hosp', compliance: 92, dataQuality: 98, encounters: 420 },
  { name: 'City Clinic', compliance: 84, dataQuality: 95, encounters: 280 },
  { name: 'North Lab', compliance: 97, dataQuality: 99, encounters: 350 },
  { name: 'Central Rx', compliance: 90, dataQuality: 97, encounters: 510 },
];

const monthlyEncounterTrend = [
  { month: 'Apr', encounters: 940, discrepancies: 18 },
  { month: 'May', encounters: 1120, discrepancies: 14 },
  { month: 'Jun', encounters: 1250, discrepancies: 11 },
  { month: 'Jul', encounters: 1380, discrepancies: 8 },
  { month: 'Aug', encounters: 1490, discrepancies: 6 },
  { month: 'Sep', encounters: 1560, discrepancies: 4 },
];

export const OrganizationAdminWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const facilities = api.getFacilities(currentOrg.id);
  const users = api.getUsers();
  const dataQualityIssues = api.getDataQualityIssues(currentOrg.id);

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner with Clinical Photography */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={CLINICAL_IMAGES.doctorConsultation}
            alt="Healthcare Administration"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-300 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-500/40 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-sky-400" />
                INSTITUTIONAL GOVERNANCE & MULTI-FACILITY OVERSIGHT
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Tenant: {currentOrg.id} • RLS Boundary Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              {currentOrg.name} — Administrative Command
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Consolidated institutional administration across hospitals, microbiology reference laboratories, and clinical pharmacies with automated WHONET data quality and RBAC credentialing.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/app/settings"
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg"
            >
              <Settings className="w-4 h-4" />
              <span>Tenant Settings</span>
            </Link>
            <Link
              to="/app/data-quality"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-colors flex items-center gap-1.5"
            >
              <span>Data Quality</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Organization KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Connected Facilities</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{facilities.length} Active</div>
          <div className="text-[11px] text-slate-500">Hospitals, Labs & Pharmacies</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Credentialed Staff</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{users.length} Users</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% RBAC permission verified</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Data Quality Score</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">98.6%</div>
          <div className="text-[11px] text-emerald-600 font-medium">WHONET & CLSI conforming</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Active Discrepancies</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{dataQualityIssues.length} Pending</div>
          <div className="text-[11px] text-amber-600 font-medium">Under QA review</div>
        </div>
      </div>

      {/* Analytics Row: Multi-Facility Compliance & Encounter Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Multi-Facility Comparison Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Facility Performance & Guideline Compliance
              </h3>
              <p className="text-xs text-slate-500">
                Stewardship guideline adherence (%) and laboratory data completeness (%) by facility.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              Q3 Benchmark
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityComplianceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="compliance" name="Stewardship Compliance (%)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dataQuality" name="Data Quality Score (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6-Month Ingestion Volume & Discrepancies */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                6-Month Patient Influx & Data Integrity
              </h3>
              <p className="text-xs text-slate-500">
                Tracking monthly throughput vs residual data errors.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyEncounterTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="encounters" name="Monthly Encounters" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorEnc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Facilities & Departments List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Monitored Facilities & Operational Units
                </h3>
                <p className="text-xs text-slate-500">
                  Facilities operating within the {currentOrg.name} tenant boundary.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {facilities.map((fac) => (
                <div key={fac.id} className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors px-2 rounded-xl">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{fac.name}</span>
                    <span className="text-slate-500 block text-[11px]">{fac.address || fac.area} • {fac.type.toUpperCase()}</span>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-500">{fac.area || 'Regional Sector'}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {fac.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Data Quality Audit Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Institutional Compliance</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Tenant Isolation Status:</span>
                <span className="text-emerald-700 font-mono text-[11px] font-medium">✓ Row-Level Security Enforced</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Audit Trail Registry:</span>
                <span className="text-slate-700 font-mono text-[11px]">Append-Only Log Active</span>
              </div>
            </div>
            <Link
              to="/app/data-quality"
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Data Quality Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

