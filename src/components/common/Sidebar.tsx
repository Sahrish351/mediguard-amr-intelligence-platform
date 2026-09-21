import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  const { currentRole, currentOrg } = useAuth();
  const roleSlug = currentRole?.slug as UserRoleSlug;

  // Role-Specific Navigation Definitions
  const getRoleNavItems = (): { groupName: string; items: NavItem[] }[] => {
    switch (roleSlug) {
      case 'doctor':
        return [
          {
            groupName: 'Clinical Prescribing',
            items: [
              { to: '/doctor', label: 'Doctor Dashboard', icon: LayoutDashboard },
              { to: '/app/prescriptions', label: 'Prescriptions', icon: Stethoscope },
              { to: '/app/medications', label: 'Medication Reference', icon: Pill },
              { to: '/app/aware', label: 'Stewardship Guidance', icon: ShieldCheck },
            ],
          },
          {
            groupName: 'Clinical Alerts & Reports',
            items: [
              { to: '/app/alerts', label: 'Prescription Alerts', icon: AlertTriangle, badge: 'Active' },
              { to: '/app/reports', label: 'Clinical Reports', icon: FileBarChart2 },
              { to: '/app/settings', label: 'Profile & Settings', icon: Settings },
            ],
          },
        ];

      case 'pharmacist':
        return [
          {
            groupName: 'Pharmacy Operations',
            items: [
              { to: '/pharmacist', label: 'Pharmacy Center', icon: LayoutDashboard },
              { to: '/app/dispensing', label: 'Dispensing Queue', icon: PackageCheck, badge: 'Queue' },
              { to: '/app/batches', label: 'Batch Verification', icon: Pill },
              { to: '/app/repeat-dispensing', label: 'Repeat Dispensing Radar', icon: RefreshCw },
            ],
          },
          {
            groupName: 'Safety & Inventory',
            items: [
              { to: '/app/alerts', label: 'Safety Alerts', icon: AlertTriangle },
              { to: '/app/reports', label: 'Dispensing Reports', icon: FileBarChart2 },
              { to: '/app/settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

      case 'lab-scientist':
        return [
          {
            groupName: 'Microbiology Bench',
            items: [
              { to: '/laboratory', label: 'Laboratory Bench', icon: LayoutDashboard },
              { to: '/app/laboratory', label: 'Specimen Accessioning', icon: Microscope, badge: 'Pending' },
              { to: '/app/antibiogram', label: 'Antibiogram Matrix', icon: BarChart3 },
              { to: '/app/critical-pathogens', label: 'Critical Resistance Findings', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'Quality & Governance',
            items: [
              { to: '/app/data-quality', label: 'Quality Controls (CLSI)', icon: ShieldCheck },
              { to: '/app/reports', label: 'Laboratory Reports', icon: FileBarChart2 },
              { to: '/app/settings', label: 'Settings', icon: Settings },
            ],
          },
        ];

      case 'stewardship-lead':
        return [
          {
            groupName: 'Antimicrobial Stewardship',
            items: [
              { to: '/stewardship', label: 'Stewardship Center', icon: LayoutDashboard },
              { to: '/app/aware', label: 'WHO AWaRe Intelligence', icon: ShieldCheck },
              { to: '/app/prescriptions', label: 'Prescription Orders', icon: Stethoscope },
              { to: '/app/prescribers', label: 'Clinician Benchmarking', icon: Users },
              { to: '/app/amr-heatmap', label: 'Resistance Rates', icon: BarChart3 },
            ],
          },
          {
            groupName: 'Interventions & Intelligence',
            items: [
              { to: '/app/investigations', label: 'Stewardship Interventions', icon: FileSearch, badge: 'Active' },
              { to: '/app/alerts', label: 'Surveillance Alerts', icon: AlertTriangle },
              { to: '/app/ai-assistant', label: 'AI Stewardship Copilot', icon: Sparkles, highlight: true },
              { to: '/app/reports', label: 'Quarterly Reports', icon: FileBarChart2 },
            ],
          },
        ];

      case 'epidemiologist':
        return [
          {
            groupName: 'Population & AMR Intelligence',
            items: [
              { to: '/epidemiology', label: 'Epidemiology Intelligence', icon: LayoutDashboard },
              { to: '/app/command-center', label: 'Global Command Center', icon: Globe },
              { to: '/app/amr-heatmap', label: 'Geospatial AMR Heatmap', icon: BarChart3 },
              { to: '/app/surveillance', label: 'Regional Surveillance', icon: Activity },
              { to: '/app/amr-forecasting', label: 'Resistance Forecasting', icon: TrendingUp },
              { to: '/app/critical-pathogens', label: 'WHO Priority Pathogens', icon: Microscope },
            ],
          },
          {
            groupName: 'Dossiers & Inquiries',
            items: [
              { to: '/app/investigations', label: 'Cluster Investigations', icon: FileSearch },
              { to: '/app/reports', label: 'Epidemiological Dossiers', icon: FileBarChart2 },
              { to: '/app/ai-assistant', label: 'AI Trend Copilot', icon: Sparkles, highlight: true },
            ],
          },
        ];

      case 'surveillance-officer':
        return [
          {
            groupName: 'Clinical Surveillance',
            items: [
              { to: '/surveillance', label: 'Surveillance Center', icon: LayoutDashboard },
              { to: '/app/surveillance', label: 'Active Surveillance Matrix', icon: Activity },
              { to: '/app/amr-heatmap', label: 'AMR Intelligence', icon: BarChart3 },
              { to: '/app/medications', label: 'Medication Safety', icon: Pill },
              { to: '/app/alerts', label: 'Alert Triage Center', icon: AlertTriangle, badge: 'Action' },
            ],
          },
          {
            groupName: 'Investigation & Actions',
            items: [
              { to: '/app/investigations', label: 'Case Investigations', icon: FileSearch },
              { to: '/app/reports', label: 'Surveillance Reports', icon: FileBarChart2 },
              { to: '/app/ai-assistant', label: 'AI Surveillance Copilot', icon: Sparkles, highlight: true },
            ],
          },
        ];

      case 'org-admin':
        return [
          {
            groupName: 'Organization Governance',
            items: [
              { to: '/organization', label: 'Organization Intelligence', icon: LayoutDashboard },
              { to: '/app/command-center', label: 'Facility Network', icon: Building2 },
              { to: '/app/surveillance', label: 'Surveillance Activity', icon: Activity },
              { to: '/app/alerts', label: 'Institutional Alerts', icon: AlertTriangle },
            ],
          },
          {
            groupName: 'Quality & Governance',
            items: [
              { to: '/app/reports', label: 'Governance Reports', icon: FileBarChart2 },
              { to: '/app/data-quality', label: 'Data Quality Audits', icon: ShieldCheck },
              { to: '/app/settings', label: 'Organization Settings', icon: Settings },
            ],
          },
        ];

      case 'platform-admin':
        return [
          {
            groupName: 'Platform Command Center',
            items: [
              { to: '/admin', label: 'Global Command Center', icon: Globe },
              { to: '/app/command-center', label: 'Network Operations', icon: LayoutDashboard },
              { to: '/app/connectors', label: 'System Connectors', icon: Network },
              { to: '/app/background-jobs', label: 'Background Ingestion', icon: Cpu },
            ],
          },
          {
            groupName: 'Security & Forensics',
            items: [
              { to: '/app/audit', label: 'Immutable Audit Trail', icon: Lock },
              { to: '/app/data-quality', label: 'Platform Data Quality', icon: ShieldCheck },
              { to: '/app/settings', label: 'Platform Configuration', icon: Settings },
            ],
          },
        ];

      case 'read-only':
      default:
        return [
          {
            groupName: 'Research Workspace',
            items: [
              { to: '/researcher', label: 'Research Dashboard', icon: LayoutDashboard },
              { to: '/app/surveillance', label: 'Surveillance Datasets', icon: Activity },
              { to: '/app/amr-heatmap', label: 'AMR Statistics', icon: BarChart3 },
              { to: '/app/antibiogram', label: 'Antibiogram Datasets', icon: Microscope },
              { to: '/app/amr-forecasting', label: 'Predictive Trends', icon: TrendingUp },
            ],
          },
          {
            groupName: 'Documentation & Reports',
            items: [
              { to: '/research', label: 'Scientific Methodology', icon: FolderOpen },
              { to: '/app/reports', label: 'Published Reports', icon: FileBarChart2 },
            ],
          },
        ];
    }
  };

  const navGroups = getRoleNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 text-slate-700">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
        <MediGuardLogo size="sm" showTagline={false} to="/" />
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-200/60 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
          WORKSPACE
        </span>
        <span className="text-[11px] font-bold text-sky-700 font-mono capitalize">
          {currentRole?.slug}
        </span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
              {group.groupName}
            </h4>
            <div className="space-y-0.5 pt-1">
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
                          ? 'bg-sky-50 text-sky-700 border border-sky-200/80 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-slate-900" />
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
        <div className="p-3 border-t border-slate-200/80">
          <button
            onClick={onOpenAIAssistant}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-indigo-200/70 text-indigo-900 hover:from-sky-100 hover:to-indigo-100 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Grounded AI Assistant</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-bold">
              Gemini
            </span>
          </button>
        </div>
      )}
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
