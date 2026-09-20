import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Shield, Lock, User, Building2, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';
import { UserRoleSlug } from '@/types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentOrg, switchRole, switchUser, users, roles } = useAuth();

  const [email, setEmail] = useState('tariq.admin@mediguard.org');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  const handleSelectPersona = (roleSlug: UserRoleSlug, userIndex: number) => {
    switchRole(roleSlug);
    if (users[userIndex]) {
      switchUser(users[userIndex].id);
      setEmail(users[userIndex].email);
    }
    navigate('/app');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-600/30">
          <Shield className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Access MediGuard Platform</h1>
        <p className="text-xs text-slate-400">
          Secure, authenticated clinical surveillance command center
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-5">
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Institutional Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Security Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-md shadow-sky-600/20"
            >
              Sign In to Command Center
            </button>
          </div>
        </form>

        {/* 1-Click Clinical Persona Fast Access */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Instant Demo Role Switcher:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleSelectPersona('doctor', 1)}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-slate-300"
            >
              <span className="font-semibold text-white block">Dr. Sarah Farooq</span>
              <span className="text-slate-500 text-[10px]">Doctor / Prescriber</span>
            </button>
            <button
              onClick={() => handleSelectPersona('pharmacist', 2)}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-slate-300"
            >
              <span className="font-semibold text-white block">Zainab Qureshi</span>
              <span className="text-slate-500 text-[10px]">Lead Pharmacist</span>
            </button>
            <button
              onClick={() => handleSelectPersona('lab-scientist', 3)}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-slate-300"
            >
              <span className="font-semibold text-white block">Dr. Asad Ullah</span>
              <span className="text-slate-500 text-[10px]">Microbiologist</span>
            </button>
            <button
              onClick={() => handleSelectPersona('stewardship-lead', 4)}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-slate-300"
            >
              <span className="font-semibold text-white block">Ayesha Malik</span>
              <span className="text-slate-500 text-[10px]">Stewardship Lead</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">Onboard Healthcare Network</h1>
        <p className="text-xs text-slate-400">
          Request multi-tenant institutional surveillance deployment
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 shadow-xl space-y-4 text-xs">
        <p className="text-slate-300 leading-relaxed">
          MediGuard employs strict multi-tenant Row Level Security. New healthcare institutions and laboratory networks require verified administrative onboarding.
        </p>
        <Link
          to="/login"
          className="block w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs text-center transition-colors"
        >
          Sign In with Existing Network Credentials
        </Link>
      </div>
    </div>
  );
};

