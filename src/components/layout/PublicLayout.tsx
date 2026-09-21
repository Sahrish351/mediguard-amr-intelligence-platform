import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, Shield, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { DemoBanner } from '@/components/common/DemoBanner';
import { MediGuardLogo } from '@/components/common/MediGuardLogo';
import { useAuth } from '@/context/AuthContext';
import { getWorkspacePathForRole } from '@/types';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, currentRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const workspacePath = getWorkspacePathForRole(currentRole?.slug);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Platform' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/research', label: 'Research' },
    { to: '/security', label: 'Security' },
    { to: '/resources', label: 'Resources' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans selection:bg-sky-500 selection:text-white">
      {/* Universal Demo & Non-Diagnostic Disclaimer Banner */}
      <DemoBanner />

      {/* Sticky Top Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Real MediGuard Brand Logo */}
          <MediGuardLogo size="md" showTagline={false} to="/" />

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-sky-700 bg-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={workspacePath}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 hover:translate-y-[-1px]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to={workspacePath}
                  className="w-full py-3 rounded-xl bg-sky-600 text-white text-center text-sm font-bold shadow-xs"
                >
                  Enter Assigned Workspace
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-center text-sm font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-center text-sm font-bold shadow-xs"
                  >
                    Get Started with MediGuard
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-hidden">
        <Outlet />
      </main>

      {/* Enterprise Healthcare SaaS Footer */}
      <footer className="w-full border-t border-slate-200 bg-white text-slate-600 pt-16 pb-12 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
              <MediGuardLogo size="lg" showTagline={true} />
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Next-generation clinical surveillance platform uniting medication safety, antimicrobial stewardship, and microbiology intelligence into an automated, closed-loop healthcare defense system.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono font-medium">Surveillance Telemetry Live • 25+ Tables Active</span>
              </div>
            </div>

            {/* Column 1: Product */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Product
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="hover:text-sky-600 transition-colors">
                    Platform Overview
                  </Link>
                </li>
                <li>
                  <Link to="/app/amr-heatmap" className="hover:text-sky-600 transition-colors">
                    AMR Intelligence
                  </Link>
                </li>
                <li>
                  <Link to="/app/batches" className="hover:text-sky-600 transition-colors">
                    Medication Safety
                  </Link>
                </li>
                <li>
                  <Link to="/app/laboratory" className="hover:text-sky-600 transition-colors">
                    Laboratory AST Console
                  </Link>
                </li>
                <li>
                  <Link to="/app/ai-assistant" className="hover:text-sky-600 transition-colors flex items-center gap-1.5">
                    <span>AI Copilot</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-mono text-[9px] font-bold">
                      GEMINI
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Solutions
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/doctor" className="hover:text-sky-600 transition-colors">
                    For Prescribers
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacist" className="hover:text-sky-600 transition-colors">
                    For Pharmacists
                  </Link>
                </li>
                <li>
                  <Link to="/laboratory" className="hover:text-sky-600 transition-colors">
                    For Laboratories
                  </Link>
                </li>
                <li>
                  <Link to="/stewardship" className="hover:text-sky-600 transition-colors">
                    For Stewardship Leads
                  </Link>
                </li>
                <li>
                  <Link to="/epidemiology" className="hover:text-sky-600 transition-colors">
                    For Epidemiologists
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Governance */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Resources
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/research" className="hover:text-sky-600 transition-colors">
                    Scientific Methodology
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-sky-600 transition-colors">
                    Security &amp; RLS Architecture
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-sky-600 transition-colors">
                    WHO AWaRe &amp; CLSI Standards
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-sky-600 transition-colors">
                    Platform FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-sky-600 transition-colors">
                    Implementation Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="font-medium text-slate-800">© 2026 MediGuard Intelligence</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>All rights reserved.</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] font-bold">
                SYNTHETIC DEMO TELEMETRY — NOT REAL PATIENT DATA
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link to="/security" className="hover:text-slate-800">
                Security
              </Link>
              <span>•</span>
              <Link to="/resources" className="hover:text-slate-800">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/login" className="hover:text-slate-800">
                Portal Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
