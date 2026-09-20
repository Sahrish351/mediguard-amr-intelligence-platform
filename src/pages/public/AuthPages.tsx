import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Pill,
  Microscope,
  FileSearch,
  Activity,
  LineChart,
  ShieldCheck,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { UserRoleSlug } from '@/types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsPersona, isLoading } = useAuth();

  const [email, setEmail] = useState('sarah.doc@mediguard.org');
  const [password, setPassword] = useState('clinical-secure-2026');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDemoPersonas, setShowDemoPersonas] = useState(true);

  const fromPath = (location.state as any)?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const result = await login(email, password);
    if (result.success) {
      navigate(fromPath || result.workspacePath, { replace: true });
    } else {
      setErrorMessage(result.error || 'Invalid credentials or unassigned role.');
    }
  };

  const handleLaunchPersona = async (roleSlug: UserRoleSlug) => {
    setErrorMessage(null);
    const result = await loginAsPersona(roleSlug);
    if (result.success) {
      navigate(result.workspacePath, { replace: true });
    }
  };

  const demoPersonas = [
    { role: 'doctor' as UserRoleSlug, name: 'Dr. Sarah Farooq', title: 'Physician / Prescriber', path: '/doctor', icon: Stethoscope },
    { role: 'pharmacist' as UserRoleSlug, name: 'Zainab Qureshi', title: 'Clinical Pharmacist', path: '/pharmacist', icon: Pill },
    { role: 'lab-scientist' as UserRoleSlug, name: 'Dr. Asad Ullah', title: 'Laboratory Microbiologist', path: '/laboratory', icon: Microscope },
    { role: 'stewardship-lead' as UserRoleSlug, name: 'Ayesha Malik', title: 'Stewardship Professional', path: '/stewardship', icon: Shield },
    { role: 'epidemiologist' as UserRoleSlug, name: 'Bilal Hassan', title: 'Epidemiology Analyst', path: '/epidemiology', icon: LineChart },
    { role: 'surveillance-officer' as UserRoleSlug, name: 'Surveillance Officer', title: 'Infection Preventionist', path: '/surveillance', icon: Activity },
    { role: 'org-admin' as UserRoleSlug, name: 'Dr. Tariq Mehmood', title: 'Organization Admin', path: '/organization', icon: Building2 },
    { role: 'platform-admin' as UserRoleSlug, name: 'Platform Admin', title: 'Global Platform Admin', path: '/admin', icon: Lock },
    { role: 'read-only' as UserRoleSlug, name: 'Dr. Maria Khan', title: 'Research Scientist', path: '/researcher', icon: FileSearch },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/5 overflow-hidden">
        {/* Left Column: Scientific Healthcare Intelligence Brand & Quotes */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />

          <div className="relative space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight font-heading">MediGuard</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase tracking-wider">
                CLINICAL AUTHENTICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading leading-snug">
                Securing Medication Decisions Across Global Networks.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Authenticate with institutional credentials to access your designated healthcare workspace, active telemetry, and surveillance alerts.
              </p>
            </div>
          </div>

          <div className="relative pt-8 space-y-4 border-t border-slate-800/80">
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PostgreSQL RLS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CLSI M100 AST</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WHO AWaRe 3-Tier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Encrypted Transit</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono">
              Aligned with ISO 27001 Controls & FHIR R4 Standards.
            </p>
          </div>
        </div>

        {/* Right Column: Clean Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 bg-white">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-slate-500">
              Enter your credentials or test with predefined clinical roles.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white text-xs transition-colors"
                  placeholder="name@hospital.org"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-semibold">Security Password</label>
                <Link to="/forgot-password" className="text-sky-600 hover:text-sky-500 text-[11px] font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white text-xs transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Verifying...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Persona Launcher Strip */}
          <div className="pt-4 border-t border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Demo Persona Quick Access
              </span>
              <button
                type="button"
                onClick={() => setShowDemoPersonas(!showDemoPersonas)}
                className="text-[11px] text-sky-600 hover:text-sky-500 font-medium"
              >
                {showDemoPersonas ? 'Hide' : 'Show'}
              </button>
            </div>

            {showDemoPersonas && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {demoPersonas.map((p) => (
                  <button
                    key={p.role}
                    type="button"
                    onClick={() => handleLaunchPersona(p.role)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-200/80 hover:border-sky-200 text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-slate-600 group-hover:text-sky-600">
                      <p.icon className="w-3.5 h-3.5" />
                      <span className="font-bold text-[11px] text-slate-900 block truncate">{p.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">{p.title}</span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-[10px] text-slate-400 text-center">
              DEMO / SYNTHETIC DATA — Selecting a persona authenticates that clinical user session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, organizations, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleSlug, setRoleSlug] = useState<UserRoleSlug>('doctor');
  const [orgId, setOrgId] = useState(organizations[0]?.id || 'org-1');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = await register(email, password, fullName, roleSlug, orgId);
    if (res.success) {
      navigate(res.workspacePath);
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white mx-auto shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Register Organization Account</h1>
          <p className="text-xs text-slate-500">
            Join the MediGuard healthcare intelligence surveillance network
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name & Credential</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Dr. Jane Doe, MD"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane.doe@hospital.org"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Professional Clinical Role</label>
            <select
              value={roleSlug}
              onChange={(e) => setRoleSlug(e.target.value as UserRoleSlug)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
            >
              <option value="doctor">Doctor / Prescribing Physician</option>
              <option value="pharmacist">Clinical Pharmacist</option>
              <option value="lab-scientist">Microbiology Laboratory Scientist</option>
              <option value="stewardship-lead">Infection Control / Stewardship Lead</option>
              <option value="epidemiologist">Epidemiology Analyst</option>
              <option value="surveillance-officer">Clinical Surveillance Officer</option>
              <option value="org-admin">Organization Administrator</option>
              <option value="read-only">Health Systems Researcher</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Healthcare Organization</label>
            <select
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
            >
              {organizations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all"
          >
            {isLoading ? 'Creating Account...' : 'Complete Institutional Registration'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 hover:text-sky-500 font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white mx-auto shadow-sm">
          <KeyRound className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Password Recovery</h1>
          <p className="text-xs text-slate-500">
            Enter your institutional email to receive secure recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 text-left">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recovery Link Dispatched</span>
            </div>
            <p>
              If an account is associated with <strong>{email}</strong>, a secure reset link has been dispatched. Check your institutional inbox.
            </p>
            <div className="pt-2">
              <Link to="/login" className="text-xs font-semibold text-emerald-700 underline">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hospital.org"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all"
            >
              Send Reset Instructions
            </button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-slate-500 hover:text-slate-800">
                Cancel and return to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
