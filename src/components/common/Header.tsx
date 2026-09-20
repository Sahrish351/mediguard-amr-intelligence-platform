import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Building2, UserCircle2, Bell, Sparkles, ShieldCheck, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRoleSlug } from '@/types';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenAIAssistant?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAIAssistant, onToggleSidebar, isMobileSidebarOpen }) => {
  const { currentOrg, currentUser, currentRole, organizations, roles, switchOrganization, switchRole } = useAuth();

  return (
    <header className="h-14 border-b border-slate-800 bg-[#0F172A] px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Toggle & Organization Context */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
          <Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-mono leading-none">Tenant / Org</span>
            <select
              value={currentOrg.id}
              onChange={(e) => switchOrganization(e.target.value)}
              aria-label="Active Organization"
              className="bg-transparent border-none text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer pr-1"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id} className="bg-slate-900 text-white">
                  {org.name} ({org.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-Tenant Isolation Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RLS Scoped: {currentOrg.id === 'org-1' ? 'Org A' : 'Org B'}</span>
        </div>
      </div>

      {/* Right: Role Switcher, AI trigger, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Role Switcher for QA / Testing across 9 roles */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
          <span className="text-[10px] text-slate-500 uppercase font-mono hidden sm:inline">Role:</span>
          <select
            value={currentRole.slug}
            onChange={(e) => switchRole(e.target.value as UserRoleSlug)}
            aria-label="Active User Role"
            className="bg-transparent text-xs font-medium text-sky-300 focus:outline-none cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.slug} className="bg-slate-900 text-white">
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Grounded AI Assistant Quick Action */}
        <button
          onClick={onOpenAIAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-medium transition-all shadow-sm shadow-purple-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="hidden sm:inline">AI Surveillance Assistant</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Notifications Icon */}
        <Link
          to="/app/alerts"
          className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Active Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>

        {/* User Identity */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 rounded-full bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-300 text-xs font-bold font-mono">
            {currentUser.full_name.charAt(0)}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-medium text-slate-200 leading-tight">{currentUser.full_name}</span>
            <span className="text-[10px] text-slate-500 truncate max-w-[120px]">{currentRole.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

