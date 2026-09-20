import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
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
  ChevronDown,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  onOpenAIAssistant?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface NavGroup {
  name: string;
  items: {
    to: string;
    label: string;
    icon: any;
    permission: string;
    badgeCount?: number;
    highlight?: boolean;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAIAssistant, isOpenMobile, onCloseMobile }) => {
  const { currentRole, can } = useAuth();

  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navGroups: NavGroup[] = [
    {
      name: 'Command Center',
      items: [
        { to: '/app', label: 'Executive Overview', icon: LayoutDashboard, permission: 'analytics.view' },
        { to: '/app/command-center', label: 'Global Command Center', icon: Globe, permission: 'analytics.view' },
        { to: '/app/operational', label: 'Operational Dashboard', icon: Activity, permission: 'analytics.view' },
      ],
    },
    {
      name: 'Surveillance & AMR',
      items: [
        { to: '/app/surveillance', label: 'Surveillance Matrix', icon: Activity, permission: 'analytics.view' },
        { to: '/app/amr-heatmap', label: 'Resistance Heatmap', icon: BarChart3, permission: 'analytics.view' },
        { to: '/app/critical-pathogens', label: 'Critical Pathogens', icon: Microscope, permission: 'analytics.view' },
        { to: '/app/amr-forecasting', label: 'Surveillance Forecasting', icon: TrendingUp, permission: 'analytics.view' },
      ],
    },
    {
      name: 'Medication & Batches',
      items: [
        { to: '/app/medications', label: 'Formulary & Batches', icon: Pill, permission: 'medicines.manage' },
        { to: '/app/aware-intelligence', label: 'WHO AWaRe Intelligence', icon: ShieldCheck, permission: 'medicines.manage' },
        { to: '/app/batches', label: 'Batch Integrity & Expiry', icon: PackageCheck, permission: 'batches.manage' },
      ],
    },
    {
      name: 'Prescriptions & Dispensing',
      items: [
        { to: '/app/prescriptions', label: 'Prescription Registry', icon: Stethoscope, permission: 'prescriptions.view' },
        { to: '/app/prescribers', label: 'Prescriber Analytics', icon: BarChart3, permission: 'prescriptions.view' },
        { to: '/app/dispensing', label: 'Pharmacy Dispensing', icon: PackageCheck, permission: 'dispensing.view' },
        { to: '/app/repeat-dispensing', label: 'Repeat Fill Monitor', icon: AlertTriangle, permission: 'dispensing.view' },
      ],
    },
    {
      name: 'Laboratory / AST',
      items: [
        { to: '/app/laboratory', label: 'Culture & AST Entry', icon: Microscope, permission: 'laboratory.view' },
        { to: '/app/antibiogram-explorer', label: 'Antibiogram Explorer', icon: Activity, permission: 'laboratory.view' },
      ],
    },
    {
      name: 'Alerts & Investigations',
      items: [
        { to: '/app/alerts', label: 'Alert Center', icon: AlertTriangle, permission: 'alerts.view', badgeCount: 4 },
        { to: '/app/investigations', label: 'Investigation Workspace', icon: FileSearch, permission: 'alerts.investigate' },
      ],
    },
    {
      name: 'AI Intelligence',
      items: [
        { to: '/app/ai-assistant', label: 'AI Surveillance Copilot', icon: Sparkles, permission: 'ai.use', highlight: true },
      ],
    },
    {
      name: 'Reports & Research',
      items: [
        { to: '/app/reports', label: 'Surveillance Reports', icon: FileBarChart2, permission: 'reports.generate' },
      ],
    },
    {
      name: 'Data & Platform',
      items: [
        { to: '/app/data-quality', label: 'Data Quality & Hygiene', icon: ShieldCheck, permission: 'quality.manage' },
        { to: '/app/connectors', label: 'Integration Connectors', icon: Network, permission: 'platform.manage' },
        { to: '/app/jobs', label: 'Background Surveillance Jobs', icon: Calendar, permission: 'platform.manage' },
        { to: '/app/audit', label: 'Audit Trail', icon: History, permission: 'audit.view' },
        { to: '/app/settings', label: 'Settings & Reference', icon: Settings, permission: 'org.manage' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-[#0B0F19] flex flex-col shrink-0 transform transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 px-4 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                MediGuard
                <span className="text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.2 rounded border border-sky-500/20 font-mono">
                  AMR
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-sans tracking-tight">
                Global Surveillance SaaS
              </span>
            </div>
          </NavLink>
        </div>

        {/* Grouped Navigation Menu */}
        <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
          {navGroups.map((group) => {
            const isCollapsed = !!collapsedGroups[group.name];
            return (
              <div key={group.name} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 font-mono hover:text-slate-300 transition-colors"
                >
                  <span>{group.name}</span>
                  {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isAllowed = can(item.permission) || currentRole.slug === 'platform-admin' || currentRole.slug === 'org-admin';
                      if (!isAllowed) return null;

                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.to === '/app'}
                          onClick={onCloseMobile}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                                : item.highlight
                                ? 'text-purple-300 hover:bg-purple-950/20 hover:text-purple-200'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2">
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                item.highlight ? 'text-purple-400' : 'text-current'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badgeCount && (
                            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                              {item.badgeCount}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer / Role status */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0B0F19]">
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Active Role</span>
              <span className="text-xs font-semibold text-slate-300 truncate">
                {currentRole.name}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
