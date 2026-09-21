import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { MediGuardLogo } from '@/components/common/MediGuardLogo';
import {
  LayoutDashboard,
  Activity,
  Globe,
  Pill,
  PackageCheck,
  Microscope,
  AlertTriangle,
  FileSearch,
  FileBarChart2,
  Sparkles,
  ShieldCheck,
  History,
  Shield,
  Layers,
  Building2,
  Calendar,
  BarChart3,
  Stethoscope,
  Network,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
  Database,
  Lock,
  Cpu,
  RefreshCw,
  FolderOpen,
  LineChart,
  LogOut,
  User,
  FlaskConical,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { UserRoleSlug } from '@/types';

interface SidebarProps {
  onOpenAIAssistant?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: any;
  badge?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAIAssistant, isOpenMobile, onCloseMobile }) => {
  const { currentRole, currentOrg, currentUser, logout } = useAuth();
  const roleSlug = currentRole?.slug as UserRoleSlug;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Structured Enterprise Navigation per Role
  const getRoleNavItems = (): { groupName: string; items: NavItem[] }[] => {
    switch (roleSlug) {
      case 'doctor':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/doctor', label: 'Doctor Overview', icon: LayoutDashboard },
              { to: '/app/prescriptions', label: 'Prescriptions', icon: Stethoscope },
              { to: '/app/medications', label: 'Medication Formulary', icon: Pill },
              { to: '/app/aware-intelligence', label: 'Stewardship Guidance', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'AMR Susceptibility', icon: BarChart3 },
              { to: '/app/alerts', label: 'Prescription Alerts', icon: AlertTriangle, badge: 'Active' },
              { to: '/app/investigations', label: 'Clinical Investigations', icon: FileSearch },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Prescriber Scorecards', icon: FileBarChart2 },
              { to: '/research', label: 'Clinical Guidelines', icon: FolderOpen },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Profile & Security', icon: User },
              { to: '/app/settings', label: 'Workspace Settings', icon: Settings },
            ],
          },
        ];

      case 'pharmacist':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/pharmacist', label: 'Pharmacy Overview', icon: LayoutDashboard },
              { to: '/app/dispensing', label: 'Dispensing Queue', icon: PackageCheck, badge: 'Queue' },
              { to: '/app/batches', label: 'Batch Integrity & GS1', icon: Pill },
              { to: '/app/repeat-dispensing', label: 'Repeat Dispensing Radar', icon: RefreshCw },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/alerts', label: 'Safety & Recalls', icon: AlertTriangle, badge: 'Alerts' },
              { to: '/app/investigations', label: 'Adverse Event Cases', icon: FileSearch },
              { to: '/app/aware-intelligence', label: 'AWaRe Classification', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Dispensing Audits', icon: FileBarChart2 },
              { to: '/resources', label: 'Drug Interaction Manual', icon: FileText },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Dispensing Station Profile', icon: User },
              { to: '/app/settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

      case 'lab-scientist':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/laboratory', label: 'Laboratory Overview', icon: LayoutDashboard },
              { to: '/app/laboratory', label: 'Specimen Accessioning', icon: Microscope, badge: 'Queue' },
              { to: '/app/antibiogram-explorer', label: 'Antibiogram Calipers', icon: BarChart3 },
              { to: '/app/critical-pathogens', label: 'Critical Isolate Findings', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'Resistance Phenotypes', icon: FlaskConical },
              { to: '/app/alerts', label: 'Microbial Surge Signals', icon: Activity },
              { to: '/app/investigations', label: 'Outbreak Clusters', icon: FileSearch },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/data-quality', label: 'CLSI Quality Controls', icon: ShieldCheck },
              { to: '/app/reports', label: 'Cumulative Reports', icon: FileBarChart2 },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Laboratory Analyst Profile', icon: User },
              { to: '/app/settings', label: 'QC Settings', icon: Settings },
            ],
          },
        ];

      case 'stewardship-lead':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/stewardship', label: 'Stewardship Overview', icon: LayoutDashboard },
              { to: '/app/aware-intelligence', label: 'WHO AWaRe Oversight', icon: ShieldCheck },
              { to: '/app/prescribers', label: 'Peer Prescriber Benchmarks', icon: Users },
              { to: '/app/prescriptions', label: 'Antimicrobial Orders', icon: Stethoscope },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/alerts', label: 'Stewardship Alerts', icon: AlertTriangle },
              { to: '/app/investigations', label: 'Intervention Logs', icon: FileSearch },
              { to: '/app/amr-forecasting', label: 'Utilization Projections', icon: TrendingUp },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Institutional Scorecards', icon: FileBarChart2 },
              { to: '/research', label: 'AWaRe Formularies', icon: FolderOpen },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Stewardship Lead Profile', icon: User },
              { to: '/app/settings', label: 'Policy Settings', icon: Settings },
            ],
          },
        ];

      case 'epidemiologist':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/epidemiology', label: 'Epidemiology Overview', icon: LayoutDashboard },
              { to: '/app/surveillance', label: 'Surveillance Matrix', icon: Activity },
              { to: '/app/amr-heatmap', label: 'AMR Heatmap (CLSI M39)', icon: Globe },
              { to: '/app/amr-forecasting', label: '90-Day Predictive Surge', icon: TrendingUp },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/critical-pathogens', label: 'WHO Priority Pathogens', icon: AlertTriangle },
              { to: '/app/investigations', label: 'Outbreak Clusters', icon: FileSearch },
              { to: '/app/alerts', label: 'Signal Velocity Radar', icon: LineChart },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Epidemiology Dossiers', icon: FileBarChart2 },
              { to: '/research', label: 'GLASS Surveillance Data', icon: FolderOpen },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Epidemiologist Profile', icon: User },
              { to: '/app/settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

      case 'surveillance-officer':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/surveillance', label: 'Surveillance Overview', icon: LayoutDashboard },
              { to: '/app/alerts', label: 'Alert Triage Center', icon: AlertTriangle, badge: 'Live' },
              { to: '/app/investigations', label: 'Incident Investigations', icon: FileSearch },
              { to: '/app/operational', label: 'Operational Dashboard', icon: Activity },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/critical-pathogens', label: 'Pathogen Outbreak Radar', icon: Globe },
              { to: '/app/repeat-dispensing', label: 'Dispensing Deviations', icon: RefreshCw },
              { to: '/app/amr-heatmap', label: 'Antibiogram Heatmap', icon: BarChart3 },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Incident Audit Reports', icon: FileBarChart2 },
              { to: '/app/audit', label: 'Surveillance Action Log', icon: Lock },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Surveillance Officer Profile', icon: User },
              { to: '/app/settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

      case 'org-admin':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/organization', label: 'Organization Overview', icon: LayoutDashboard },
              { to: '/app/command-center', label: 'Connected Facilities', icon: Building2 },
              { to: '/app/prescribers', label: 'Clinician Directory', icon: Users },
              { to: '/app/data-quality', label: 'Data Quality Audits', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/alerts', label: 'Institutional Risk Radar', icon: AlertTriangle },
              { to: '/app/surveillance', label: 'Facility Surveillance', icon: Activity },
              { to: '/app/aware-intelligence', label: 'AWaRe Compliance', icon: Shield },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Governance Dossiers', icon: FileBarChart2 },
              { to: '/app/audit', label: 'Access & Compliance Audit', icon: Lock },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Organization Settings', icon: Settings },
              { to: '/app/settings', label: 'Tenant Security', icon: User },
            ],
          },
        ];

      case 'platform-admin':
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/admin', label: 'Global Command Center', icon: Globe },
              { to: '/app/command-center', label: 'Multi-Tenant Networks', icon: LayoutDashboard },
              { to: '/app/connectors', label: 'System Connectors (FHIR/LIS)', icon: Network },
              { to: '/app/jobs', label: 'Background Automation', icon: Cpu },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/surveillance', label: 'Global AMR Radar', icon: Activity },
              { to: '/app/alerts', label: 'System Anomaly Triggers', icon: AlertTriangle },
              { to: '/app/data-quality', label: 'WHONET Data Integrity', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/audit', label: 'Immutable Audit Trail', icon: Lock },
              { to: '/app/reports', label: 'Platform Telemetry Reports', icon: FileBarChart2 },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Platform Configuration', icon: Settings },
              { to: '/app/settings', label: 'Security & RLS Roles', icon: User },
            ],
          },
        ];

      case 'read-only':
      default:
        return [
          {
            groupName: 'WORKSPACE',
            items: [
              { to: '/researcher', label: 'Research Overview', icon: LayoutDashboard },
              { to: '/app/surveillance', label: 'Surveillance Datasets', icon: Activity },
              { to: '/app/amr-heatmap', label: 'AMR Cohort Statistics', icon: BarChart3 },
              { to: '/app/antibiogram-explorer', label: 'Antibiogram Matrix', icon: Microscope },
            ],
          },
          {
            groupName: 'CLINICAL INTELLIGENCE',
            items: [
              { to: '/app/amr-forecasting', label: 'Predictive Resistance Trends', icon: TrendingUp },
              { to: '/app/critical-pathogens', label: 'WHO Pathogen Distribution', icon: Globe },
              { to: '/research', label: 'Methodology & Guidelines', icon: FolderOpen },
            ],
          },
          {
            groupName: 'DATA & REPORTING',
            items: [
              { to: '/app/reports', label: 'Published Research Dossiers', icon: FileBarChart2 },
              { to: '/resources', label: 'Data Dictionary & Glossary', icon: FileText },
            ],
          },
          {
            groupName: 'ACCOUNT',
            items: [
              { to: '/app/settings', label: 'Research Fellow Profile', icon: User },
              { to: '/app/settings', label: 'Export Preferences', icon: Settings },
            ],
          },
        ];
    }
  };

  const navGroups = getRoleNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 text-slate-700 shadow-xs">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <MediGuardLogo size="sm" showTagline={false} to="/" />
          <span className="text-[10px] font-mono text-slate-400 pl-8 -mt-1 font-medium">
            Medication Safety & AMR Intelligence
          </span>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          WORKSPACE
        </span>
        <span className="text-[10px] font-bold text-[#0B5ED7] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 capitalize">
          {currentRole?.slug}
        </span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h4 className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              {group.groupName}
            </h4>
            <div className="space-y-0.5 pt-0.5">
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={iIdx}
                    to={item.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-50/80 text-[#0B5ED7] border border-blue-200/80 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-700" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Quick Trigger */}
      {onOpenAIAssistant && (
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={onOpenAIAssistant}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200/70 text-indigo-900 hover:from-blue-100 hover:to-indigo-100 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>Grounded AI Copilot</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-bold">
              Gemini
            </span>
          </button>
        </div>
      )}

      {/* User Profile & Logout Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-[#0B5ED7] font-bold text-xs shrink-0">
              {currentUser?.full_name?.slice(0, 2).toUpperCase() || 'CU'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                {currentUser?.full_name || 'Clinical User'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono truncate">
                {currentRole?.name || currentRole?.slug}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Sign Out Session"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-full shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-[80vw] h-full bg-white z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
