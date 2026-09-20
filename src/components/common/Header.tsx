import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Building2, UserCircle2, Bell, Sparkles, ShieldCheck, Menu, X, LogOut, ChevronDown, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getWorkspacePathForRole } from '@/types';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenAIAssistant?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAIAssistant, onToggleSidebar, isMobileSidebarOpen }) => {
  const { currentOrg, currentUser, currentRole, organizations, switchOrganization, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile Toggle & Organization Tenant Indicator */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Tenant Organization Indicator */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 text-xs">
          <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-400 font-mono font-medium leading-none">
              INSTITUTIONAL TENANT
            </span>
            <span className="text-xs font-bold text-slate-800 truncate max-w-[160px] sm:max-w-[240px]">
              {currentOrg.name}
            </span>
          </div>
        </div>

        {/* Multi-Tenant RLS Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>RLS Enforced: {currentOrg.id === 'org-1' ? 'Org 1' : 'Org 2'}</span>
        </div>
      </div>

      {/* Right: AI Copilot trigger, In-App Notifications, User Profile & Logout */}
      <div className="flex items-center gap-3">
        {/* Grounded AI Copilot Shortcut */}
        {onOpenAIAssistant && (
          <button
            onClick={onOpenAIAssistant}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Copilot</span>
          </button>
        )}

        {/* Notification Bell */}
        <Link
          to="/app/alerts"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200/80 transition-colors"
          aria-label="View Surveillance Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </Link>

        {/* Profile Avatar & Menu Popover */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex flex-col text-right hidden md:block">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.full_name || 'Clinical User'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono capitalize">
                {currentRole?.name || currentRole?.slug}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-800 font-bold text-xs">
              {currentUser?.full_name?.slice(0, 2).toUpperCase() || 'CU'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs space-y-1">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900 text-xs">{currentUser?.full_name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200">
                  {currentRole?.name}
                </div>
              </div>

              <div className="px-2 py-1">
                <Link
                  to="/app/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <UserCircle2 className="w-4 h-4 text-slate-400" />
                  <span>Profile & Security</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-left"
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
