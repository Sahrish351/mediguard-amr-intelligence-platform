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
  KeyRound,
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
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAIAssistant, isOpenMobile, onCloseMobile }) => {
  const { currentRole, currentOrg, currentUser, logout } = useAuth();
  const roleSlug = currentRole?.slug as UserRoleSlug;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Grouped Navigation per Role strictly following:
  // OVERVIEW -> CLINICAL -> INTELLIGENCE -> REPORTING -> SYSTEM
  const getRoleNavItems = (): { groupName: string; items: NavItem[] }[] => {
    switch (roleSlug) {
      case 'doctor':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/doctor', label: 'Doctor Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/prescriptions', label: 'Prescriptions', icon: Stethoscope },
              { to: '/app/medications', label: 'Medication Formulary', icon: Pill },
              { to: '/app/alerts', label: 'Prescription Alerts', icon: AlertTriangle, badge: 'Active' },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'AMR Surveillance', icon: BarChart3 },
              { to: '/app/investigations', label: 'Investigations', icon: FileSearch },
              { to: '/app/aware-intelligence', label: 'Stewardship Analytics', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Prescriber Reports', icon: FileBarChart2 },
              { to: '/research', label: 'Clinical Guidelines', icon: FolderOpen },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'Help & Knowledge', icon: HelpCircle },
            ],
          },
        ];

      case 'pharmacist':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/pharmacist', label: 'Pharmacy Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/dispensing', label: 'Dispensing Queue', icon: PackageCheck, badge: 'Queue' },
              { to: '/app/batches', label: 'Batch Integrity & GS1', icon: Pill },
              { to: '/app/alerts', label: 'Safety & Recalls', icon: AlertTriangle, badge: 'Alerts' },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/repeat-dispensing', label: 'Repeat Dispensing Radar', icon: RefreshCw },
              { to: '/app/investigations', label: 'Adverse Event Cases', icon: FileSearch },
              { to: '/app/aware-intelligence', label: 'AWaRe Analytics', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Dispensing Reports', icon: FileBarChart2 },
              { to: '/resources', label: 'Drug Interaction Manual', icon: FileText },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'Help & Standards', icon: HelpCircle },
            ],
          },
        ];

      case 'lab-scientist':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/laboratory', label: 'Laboratory Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/laboratory', label: 'Specimen Accessioning', icon: Microscope, badge: 'Queue' },
              { to: '/app/antibiogram-explorer', label: 'AST Calipers & MIC', icon: BarChart3 },
              { to: '/app/critical-pathogens', label: 'Critical Pathogens', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'Phenotype Heatmap', icon: FlaskConical },
              { to: '/app/investigations', label: 'Outbreak Clusters', icon: FileSearch },
              { to: '/app/alerts', label: 'Microbial Surge Signals', icon: Activity },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/data-quality', label: 'CLSI Quality Controls', icon: ShieldCheck },
              { to: '/app/reports', label: 'Cumulative Reports', icon: FileBarChart2 },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'CLSI Reference Manual', icon: HelpCircle },
            ],
          },
        ];

      case 'stewardship-lead':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/stewardship', label: 'Stewardship Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/prescriptions', label: 'Antimicrobial Orders', icon: Stethoscope },
              { to: '/app/aware-intelligence', label: 'WHO AWaRe Oversight', icon: ShieldCheck },
              { to: '/app/alerts', label: 'Formulary Alerts', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/prescribers', label: 'Prescriber Benchmarks', icon: Users },
              { to: '/app/amr-forecasting', label: 'Utilization Analytics', icon: TrendingUp },
              { to: '/app/investigations', label: 'Intervention Cases', icon: FileSearch },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Institutional Scorecards', icon: FileBarChart2 },
              { to: '/research', label: 'AWaRe Formularies', icon: FolderOpen },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'Help & Guidelines', icon: HelpCircle },
            ],
          },
        ];

      case 'epidemiologist':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/epidemiology', label: 'Epidemiology Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/surveillance', label: 'Surveillance Matrix', icon: Activity },
              { to: '/app/critical-pathogens', label: 'Priority Pathogens', icon: AlertTriangle },
              { to: '/app/alerts', label: 'Signal Velocity Radar', icon: LineChart },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'AMR Heatmap (CLSI M39)', icon: Globe },
              { to: '/app/amr-forecasting', label: '90-Day Predictive Surge', icon: TrendingUp },
              { to: '/app/investigations', label: 'Outbreak Clusters', icon: FileSearch },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Epidemiology Dossiers', icon: FileBarChart2 },
              { to: '/research', label: 'GLASS Surveillance Data', icon: FolderOpen },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'WHO Methodology', icon: HelpCircle },
            ],
          },
        ];

      case 'surveillance-officer':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/surveillance', label: 'Surveillance Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/alerts', label: 'Signal Center', icon: AlertTriangle, badge: 'Live' },
              { to: '/app/critical-pathogens', label: 'Priority Microbes', icon: Activity },
              { to: '/app/prescriptions', label: 'Monitored Orders', icon: Stethoscope },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/investigations', label: 'Active Investigations', icon: FileSearch },
              { to: '/app/amr-heatmap', label: 'Cluster Mapping', icon: Globe },
              { to: '/app/aware-intelligence', label: 'Risk Indices', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Surveillance Reports', icon: FileBarChart2 },
              { to: '/resources', label: 'Triage Guidelines', icon: FolderOpen },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Settings', icon: Settings },
              { to: '/resources', label: 'Help & Protocols', icon: HelpCircle },
            ],
          },
        ];

      case 'org-admin':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/organization', label: 'Organization Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/data-quality', label: 'Data Quality Audits', icon: ShieldCheck },
              { to: '/app/alerts', label: 'Facility Alerts', icon: AlertTriangle },
              { to: '/app/medications', label: 'Formulary Controls', icon: Pill },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/amr-heatmap', label: 'Network Surveillance', icon: Globe },
              { to: '/app/investigations', label: 'Governance Reviews', icon: FileSearch },
              { to: '/app/aware-intelligence', label: 'AWaRe Compliance', icon: BarChart3 },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Facility Analytics', icon: FileBarChart2 },
              { to: '/app/audit', label: 'Audit Trail Logs', icon: History },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Organization Settings', icon: Settings },
              { to: '/security', label: 'Security & RLS Isolation', icon: Lock },
            ],
          },
        ];

      case 'platform-admin':
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/admin', label: 'Enterprise Command', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/connectors', label: 'HL7 / FHIR Ingestion', icon: Network },
              { to: '/app/background-jobs', label: 'ETL Workers & Pipelines', icon: Cpu },
              { to: '/app/alerts', label: 'System Fault Telemetry', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/surveillance', label: 'Global Analytics', icon: Globe },
              { to: '/app/investigations', label: 'Security Incidents', icon: FileSearch },
              { to: '/app/data-quality', label: 'WHONET & CLSI Validator', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/audit', label: 'Cryptographic Audit Trail', icon: History },
              { to: '/app/reports', label: 'Uptime & Reliability', icon: FileBarChart2 },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Engine Configuration', icon: Settings },
              { to: '/security', label: 'Zero-Trust Architecture', icon: Lock },
            ],
          },
        ];

      case 'read-only':
      default:
        return [
          {
            groupName: 'OVERVIEW',
            items: [
              { to: '/researcher', label: 'Research Dashboard', icon: LayoutDashboard },
            ],
          },
          {
            groupName: 'CLINICAL',
            items: [
              { to: '/app/amr-heatmap', label: 'Antibiogram Datasets', icon: BarChart3 },
              { to: '/app/critical-pathogens', label: 'Priority Isolates', icon: Microscope },
              { to: '/app/aware-intelligence', label: 'Consumption Trends', icon: Pill },
            ],
          },
          {
            groupName: 'INTELLIGENCE',
            items: [
              { to: '/app/amr-forecasting', label: 'Longitudinal Trends', icon: TrendingUp },
              { to: '/app/investigations', label: 'Cluster Publications', icon: FileSearch },
              { to: '/research', label: 'Methodology & Standards', icon: FolderOpen },
            ],
          },
          {
            groupName: 'REPORTING',
            items: [
              { to: '/app/reports', label: 'Research Exports', icon: FileBarChart2 },
              { to: '/resources', label: 'Scientific Data Dictionaries', icon: FileText },
            ],
          },
          {
            groupName: 'SYSTEM',
            items: [
              { to: '/app/settings', label: 'Export Preferences', icon: Settings },
              { to: '/resources', label: 'Help Center', icon: HelpCircle },
            ],
          },
        ];
    }
  };

  const navGroups = getRoleNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E2E8F0] text-slate-700 shadow-2xs">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <MediGuardLogo size="sm" showTagline={false} to="/" />
          <span className="text-[10px] font-mono text-slate-400 pl-8 -mt-1 font-medium">
            Medication Safety &amp; AMR Intelligence
          </span>
        </div>
      </div>

      {/* Workspace Identity Bar */}
      <div className="px-4 py-2.5 bg-[#F7FAFC] border-b border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          WORKSPACE
        </span>
        <span className="text-[10px] font-bold text-[#0D9488] font-mono px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 capitalize">
          {currentRole?.slug}
        </span>
      </div>

      {/* Grouped Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
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
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-teal-50 text-[#0B1F3A] font-bold shadow-2xs border border-teal-200/80'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0D9488]' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {item.badge}
                          </span>
                        )}
                      </>
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
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-indigo-900 hover:bg-indigo-100/70 transition-all shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Grounded AI Copilot</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-bold">
              Gemini
            </span>
          </button>
        </div>
      )}

      {/* User Profile, Role, Organization & Logout Footer */}
      <div className="p-3 border-t border-slate-100 bg-[#F7FAFC]">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0D9488] font-bold text-xs shrink-0">
                {currentUser?.full_name?.slice(0, 2).toUpperCase() || 'CU'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-[#0B1F3A] truncate leading-tight">
                  {currentUser?.full_name || 'Clinical User'}
                </p>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  {currentRole?.name || currentRole?.slug}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign Out Session"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="px-2 py-1 rounded-md bg-white border border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between truncate">
            <span className="font-mono text-slate-400 truncate">Tenant:</span>
            <span className="font-semibold text-slate-700 truncate ml-1">{currentOrg.name}</span>
          </div>
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
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-64 max-w-[80vw] h-full bg-white z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
