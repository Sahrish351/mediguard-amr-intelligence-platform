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
} from 'lucide-react';

export const OrganizationAdminWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const facilities = api.getFacilities(currentOrg.id);
  const users = api.getUsers();
  const dataQualityIssues = api.getDataQualityIssues(currentOrg.id);

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              ORGANIZATION INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Institutional Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            {currentOrg.name} — Administrative Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tenant ID: {currentOrg.id} • Region: {currentOrg.region}, {currentOrg.country} • RLS Multi-Tenant Isolation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/settings"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Settings className="w-4 h-4" />
            <span>Organization Settings</span>
          </Link>
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
          <div className="text-[11px] text-emerald-600 font-medium">RBAC permission verified</div>
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
          <div className="text-[11px] text-amber-600 font-medium">Quality assurance review</div>
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
                <div key={fac.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{fac.name}</span>
                    <span className="text-slate-500 block text-[11px]">{fac.address || fac.area} • {fac.type.toUpperCase()}</span>
                  </div>
                  <div className="text-right">
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">Tenant Isolation Status:</span>
                <span className="text-emerald-700 font-mono text-[11px]">✓ Row-Level Security Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
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

