import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  UserCircle2,
  Bell,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Lock,
  HelpCircle,
  Settings,
  Check,
  Globe,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenAIAssistant?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAIAssistant, onToggleSidebar, isMobileSidebarOpen }) => {
  const { currentOrg, currentUser, currentRole, organizations, switchOrganization, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const orgRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile Toggle & Inline Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <div className="hidden sm:block truncate">
          <Breadcrumbs />
        </div>
      </div>

      {/* Center: Tenant Organization Switcher */}
      <div className="relative" ref={orgRef}>
        <button
          onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
          aria-label="Switch Healthcare Facility Tenant"
        >
          <Building2 className="w-3.5 h-3.5 text-[#0B5ED7]" />
          <span className="truncate max-w-[140px] sm:max-w-[220px] font-bold text-[#0F172A]">
            {currentOrg.name}
          </span>
          <span className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200">
            RLS Active
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {orgDropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3.5 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Assigned Healthcare Tenants
            </div>
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => {
                  switchOrganization(org.id);
                  setOrgDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-left transition-colors ${
                  org.id === currentOrg.id
                    ? 'bg-blue-50/70 text-[#0B5ED7] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs truncate">{org.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{org.region}, {org.country}</div>
                </div>
                {org.id === currentOrg.id && (
                  <Check className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: AI Copilot trigger, Help, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Grounded AI Copilot Trigger */}
        {onOpenAIAssistant && (
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 border border-indigo-200/80 text-xs font-bold transition-all shadow-2xs"
            title="Open Grounded Clinical Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        )}

        {/* Knowledge & Help Guide */}
        <Link
          to="/resources"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200/80 transition-colors hidden sm:flex"
          aria-label="Clinical Methodology & Guidelines"
          title="Clinical Methodology & Guidelines"
        >
          <HelpCircle className="w-4 h-4" />
        </Link>

        {/* Notifications Alert Bell */}
        <Link
          to="/app/alerts"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200/80 transition-colors"
          aria-label="View Clinical Alerts"
          title="Active Surveillance Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </Link>

        {/* Profile Avatar & Menu Popover */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-left"
            aria-label="User Account Menu"
          >
            <div className="flex flex-col text-right hidden md:block">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.full_name || 'Clinical User'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono capitalize">
                {currentRole?.name || currentRole?.slug}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-[#0B5ED7] font-bold text-xs">
              {currentUser?.full_name?.slice(0, 2).toUpperCase() || 'CU'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2.5 border-b border-slate-100 space-y-0.5">
                <p className="font-bold text-slate-900 text-xs">{currentUser?.full_name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-50 text-[#0B5ED7] border border-blue-200 font-semibold">
                  {currentRole?.name}
                </div>
              </div>

              <div className="px-2 py-1">
                <Link
                  to="/app/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <UserCircle2 className="w-4 h-4 text-slate-400" />
                  <span>Profile Credentials</span>
                </Link>
                <Link
                  to="/app/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Workspace Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
