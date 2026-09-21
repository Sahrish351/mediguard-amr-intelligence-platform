import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
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
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserRoleSlug } from '@/types';
import { MediGuardLogo } from '@/components/common/MediGuardLogo';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsPersona, isLoading } = useAuth();

  const [email, setEmail] = useState('sarah.doc@mediguard.org');
  const [password, setPassword] = useState('clinical-secure-2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showDemoPersonas, setShowDemoPersonas] = useState(true);

  const fromPath = (location.state as any)?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(fromPath || result.workspacePath, { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid institutional credentials or unassigned role.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLaunchPersona = async (roleSlug: UserRoleSlug) => {
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const result = await loginAsPersona(roleSlug);
      if (result.success) {
        navigate(result.workspacePath, { replace: true });
      }
    } finally {
      setSubmitting(false);
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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#F7FAFC]">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/5 overflow-hidden">
        {/* Left Column: Clinical Hero Visual with Gradient Overlay */}
        <div className="lg:col-span-5 relative bg-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-full">
          {/* Background Clinical Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${CLINICAL_IMAGES.doctorTabletConsultation})` }}
          />
          {/* Deep Navy/Sky Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-sky-950/85" />

          {/* Top Brand & Back to Home */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <MediGuardLogo variant="white" size="md" showTagline={false} />
              <Link
                to="/"
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors font-medium backdrop-blur-xs"
              >
                <span>← Home</span>
              </Link>
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-900/40 border border-sky-700/50 inline-block">
                CLINICAL AUTHENTICATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading leading-snug">
                Securing Medication Decisions Across Global Networks.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Enter authorized institutional credentials to load your role workspace, facility telemetry, and real-time surveillance alerts.
              </p>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 pt-8 space-y-4 border-t border-slate-800/80">
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PostgreSQL RLS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>9 Role Workspaces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Audit Monitored</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CLSI M100 Ready</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              "Unified surveillance prevents resistance before it spreads."
            </p>
          </div>
        </div>

        {/* Right Column: Clean Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 bg-white text-left">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-slate-500">
              Access your specialized clinical console with institutional credentials.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Institutional Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white text-xs transition-colors"
                  placeholder="doctor@hospital.org"
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
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white text-xs transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-xs">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span>{submitting ? 'Verifying Credentials...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </form>

          {/* Quick Demo Persona Launcher */}
          <div className="pt-4 border-t border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                  Quick Demo Personas
                </span>
                <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-mono text-[9px] font-bold">
                  9 ROLES
                </span>
              </div>
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
              DEMO / SYNTHETIC DATA — Selecting a persona loads an authorized role session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleSlug, setRoleSlug] = useState<UserRoleSlug>('doctor');
  const [orgId, setOrgId] = useState('org-1');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simple password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '', width: 'w-0' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500 text-rose-700', width: 'w-1/4' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500 text-amber-700', width: 'w-2/4' };
    if (score === 3) return { label: 'Good', color: 'bg-sky-500 text-sky-700', width: 'w-3/4' };
    return { label: 'Strong Institutional', color: 'bg-emerald-500 text-emerald-700', width: 'w-full' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const res = await register(email, password, fullName, roleSlug, orgId);
      if (res.success) {
        navigate(res.workspacePath);
      } else {
        setErrorMsg(res.error || 'Registration failed. Check network or server status.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#F7FAFC]">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/5 overflow-hidden">
        {/* Left Column: Clinical Imagery & Institutional Trust Visual */}
        <div className="lg:col-span-5 relative bg-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-full">
          {/* Background Clinical Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
            style={{ backgroundImage: `url(${CLINICAL_IMAGES.laboratory})` }}
          />
          {/* Deep Navy/Teal Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0B1F3A]/95 to-teal-950/80" />

          {/* Top Brand & Back to Home */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <MediGuardLogo variant="white" size="md" showTagline={false} />
              <Link
                to="/"
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors font-medium backdrop-blur-xs"
              >
                <span>← Home</span>
              </Link>
            </div>

            <div className="space-y-2 pt-4">
              <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-900/40 border border-teal-700/50 inline-block">
                INSTITUTIONAL ONBOARDING
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading leading-snug">
                Join the Multidisciplinary Clinical Defense Against AMR.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Register authorized institutional credentials to receive access to your facility's isolated tenant workspace, AST antibiograms, and closed-loop dispensing telemetry.
              </p>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 pt-8 space-y-4 border-t border-slate-800/80">
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Tenant Isolation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>CLSI M100 / EUCAST</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>9 Role Workspaces</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>HL7 FHIR &amp; ASTM</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              Institutional registration is cryptographically governed under PostgreSQL Row-Level Security (RLS).
            </p>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#0B1F3A] font-heading">
              Create Institutional Profile
            </h1>
            <p className="text-xs text-slate-500">
              Enter your professional credentials to provision your dedicated role workspace.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Full Name &amp; Professional Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Farooq, MD"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Institutional Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hospital.org"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password strength meter */}
            {password && (
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.width} ${strength.color.split(' ')[0]}`} />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">Security strength:</span>
                  <span className="font-semibold text-slate-700">{strength.label}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Assigned Healthcare Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={roleSlug}
                  onChange={(e) => setRoleSlug(e.target.value as UserRoleSlug)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs font-medium"
                >
                  <option value="doctor">Doctor / Prescriber</option>
                  <option value="pharmacist">Clinical Pharmacist</option>
                  <option value="lab-scientist">Laboratory Microbiologist</option>
                  <option value="stewardship-lead">Stewardship Lead</option>
                  <option value="epidemiologist">Epidemiologist</option>
                  <option value="surveillance-officer">Surveillance Officer</option>
                  <option value="org-admin">Organization Administrator</option>
                  <option value="read-only">Scientific Researcher (Read-Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Parent Health Network <span className="text-rose-500">*</span>
                </label>
                <select
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-hidden focus:border-[#0284C7] focus:bg-white text-xs font-medium"
                >
                  <option value="org-1">MediGuard National Surveillance Network</option>
                  <option value="org-2">CityCare Healthcare System (Isolated Tenant)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 pt-2"
            >
              <span>{submitting ? 'Provisioning Institutional Workspace...' : 'Complete Registration & Launch Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already have institutional credentials?{' '}
            <Link to="/login" className="font-semibold text-[#0284C7] hover:underline">
              Sign In to Role Workspace
            </Link>
          </div>
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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#F7FAFC]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
        <div className="flex items-center justify-between">
          <MediGuardLogo size="md" showTagline={false} />
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ← Home
          </Link>
        </div>

        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-bold text-[#0B1F3A] font-heading">Password Recovery</h1>
          <p className="text-xs text-slate-500">
            Enter your institutional email address to receive secure recovery instructions.
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
              <label className="block text-slate-700 font-semibold mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hospital.org"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-[#0284C7] focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs shadow-md shadow-sky-600/20 hover:shadow-lg transition-all"
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
