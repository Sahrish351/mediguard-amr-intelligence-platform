import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, ArrowRight, Menu, X, Activity, CheckCircle2, Lock, Sparkles, FileText, Globe } from 'lucide-react';
import { DemoBanner } from '@/components/common/DemoBanner';
import { useAuth } from '@/context/AuthContext';
import { getWorkspacePathForRole } from '@/types';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, currentRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const workspacePath = getWorkspacePathForRole(currentRole?.slug);

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/research', label: 'Research & Methodology' },
    { to: '/security', label: 'Security & Privacy' },
    { to: '/resources', label: 'Resources & FAQ' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans selection:bg-sky-500 selection:text-white">
      {/* Universal Demo & Non-Diagnostic Disclaimer */}
      <DemoBanner />

      {/* Public Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 via-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                MediGuard
                <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200 font-mono font-semibold">
                  INTELLIGENCE
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight">
                Medication Safety & AMR Surveillance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 border border-sky-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={workspacePath}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm shadow-sky-600/25 transition-all flex items-center gap-1.5"
              >
                <span>My Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'text-sky-700 bg-sky-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-center text-xs font-semibold shadow-sm"
              >
                Sign In to Clinical Workspace
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Public Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Enterprise Public Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">MediGuard</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              An enterprise healthcare surveillance platform connecting medication safety, pharmacy dispensing, and microbiology laboratory data to detect antimicrobial resistance patterns earlier.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WHO AWaRe & CLSI M100 Alignment</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-3 font-heading text-xs uppercase tracking-wider">
              Surveillance
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/how-it-works" className="hover:text-sky-600 transition-colors">Microbiology Antibiograms</Link></li>
              <li><Link to="/how-it-works" className="hover:text-sky-600 transition-colors">WHO AWaRe Utilization</Link></li>
              <li><Link to="/how-it-works" className="hover:text-sky-600 transition-colors">Batch Verification & Recalls</Link></li>
              <li><Link to="/how-it-works" className="hover:text-sky-600 transition-colors">Deterministic Signal Detection</Link></li>
              <li><Link to="/research" className="hover:text-sky-600 transition-colors">Epidemiological Forecasting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-3 font-heading text-xs uppercase tracking-wider">
              Workspaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/solutions" className="hover:text-sky-600 transition-colors">Physicians & Prescribers</Link></li>
              <li><Link to="/solutions" className="hover:text-sky-600 transition-colors">Clinical Pharmacists</Link></li>
              <li><Link to="/solutions" className="hover:text-sky-600 transition-colors">Microbiology Laboratories</Link></li>
              <li><Link to="/solutions" className="hover:text-sky-600 transition-colors">Stewardship Committees</Link></li>
              <li><Link to="/solutions" className="hover:text-sky-600 transition-colors">Epidemiology Analysts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-3 font-heading text-xs uppercase tracking-wider">
              Governance & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/security" className="hover:text-sky-600 transition-colors">PostgreSQL Row-Level Security</Link></li>
              <li><Link to="/security" className="hover:text-sky-600 transition-colors">Patient Pseudonymization</Link></li>
              <li><Link to="/security" className="hover:text-sky-600 transition-colors">Immutable Audit Logs</Link></li>
              <li><Link to="/resources" className="hover:text-sky-600 transition-colors">Clinical Boundaries Notice</Link></li>
              <li><Link to="/resources" className="hover:text-sky-600 transition-colors">Methodology & FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MediGuard Platform. Synthetic Demonstration Data — Not Real Patient Data.
          </div>
          <div className="flex items-center gap-4">
            <span>HIPAA-Ready Architecture</span>
            <span>•</span>
            <span>CLSI / EUCAST Breakpoints</span>
            <span>•</span>
            <span>ISO 27001 Aligned Controls</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
