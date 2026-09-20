import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Activity, Lock, ArrowRight, Globe, Building2, Microscope, Pill, CheckCircle2 } from 'lucide-react';
import { DemoBanner } from '@/components/common/DemoBanner';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/research', label: 'Research & Methodology' },
    { to: '/security', label: 'Security & Privacy' },
    { to: '/resources', label: 'Resources & FAQ' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 antialiased font-sans selection:bg-brand-500 selection:text-white">
      {/* Universal Demo Label */}
      <DemoBanner />

      {/* Public Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
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
                Global Healthcare Intelligence
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/app"
              className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-slate-800 bg-[#070A12] text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-sky-600 flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-sm">MediGuard</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Global Medication Safety & Antimicrobial Resistance Intelligence Platform. Empowering clinical stewardship, microbiology surveillance, and outbreak prevention.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Aligned with WHO Global AMR Action Plan & CLSI M100
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 font-mono text-[11px] uppercase tracking-wider">Surveillance Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Microbiology Antibiograms</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">WHO AWaRe Utilization</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Batch Verification & Recalls</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Deterministic Signal Detection</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Epidemiological Forecasting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 font-mono text-[11px] uppercase tracking-wider">Stakeholder Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/solutions" className="hover:text-white transition-colors">Hospitals & Clinical Networks</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Microbiology Laboratories</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Hospital & Community Pharmacies</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Infection Control Officers</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Public Health Agencies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 font-mono text-[11px] uppercase tracking-wider">Governance & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/security" className="hover:text-white transition-colors">Multi-Tenant Row-Level Security</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Patient Pseudonymization</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Append-Only Auditability</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Clinical Non-Diagnostic Boundaries</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Documentation & FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MediGuard Platform. All clinical & patient data shown is synthetic demo data.
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

