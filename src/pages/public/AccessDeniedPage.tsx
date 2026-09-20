import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getWorkspacePathForRole } from '@/types';

export const AccessDeniedPage: React.FC = () => {
  const { currentUser, currentRole, currentOrg, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const attemptedPath = (location.state as any)?.attemptedPath || location.pathname;
  const workspacePath = getWorkspacePathForRole(currentRole?.slug);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/60 border border-rose-200 text-rose-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>ROLE PRIVILEGE BOUNDARY ENFORCED</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Restricted Clinical Area
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your current assigned healthcare role does not possess authorization to access{' '}
            <code className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200">
              {attemptedPath}
            </code>.
          </p>
        </div>

        {/* Identity Context Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
            <span>Authenticated Credentials</span>
            <span className="font-mono text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">User:</span>
              <span className="font-medium text-slate-800">{currentUser?.full_name || 'Healthcare Professional'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Assigned Role:</span>
              <span className="font-medium text-slate-800 capitalize">{currentRole?.name || currentRole?.slug}</span>
            </div>
            <div className="col-span-2 pt-1">
              <span className="text-slate-400 block text-[11px]">Organization:</span>
              <span className="font-medium text-slate-800">{currentOrg?.name}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to={workspacePath}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to My Workspace</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs border border-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          If you believe your role assignment should include access to this department, contact your Organization Administrator.
        </p>
      </div>
    </div>
  );
};
