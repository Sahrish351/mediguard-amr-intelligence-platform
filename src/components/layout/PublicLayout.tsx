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
                className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5"
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
                  className="px-4.5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 hover:translate-y-[-1px]"
                >
                  <span>Request Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
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
                    className="w-full py-2.5 rounded-xl bg-[#0B5ED7] hover:bg-blue-700 text-white text-center text-sm font-bold shadow-xs"
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

            {/* Column 1: Platform & Solutions */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Platform & Solutions
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="hover:text-sky-600 transition-colors">
                    Platform Overview
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="hover:text-sky-600 transition-colors">
                    Clinical Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-sky-600 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-sky-600 transition-colors">
                    Research & Methodology
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-sky-600 transition-colors">
                    Security & Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-sky-600 transition-colors">
                    Resources & Standards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Stakeholders */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                For Stakeholders
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/organization" className="hover:text-sky-600 transition-colors">
                    For Organizations
                  </Link>
                </li>
                <li>
                  <Link to="/laboratory" className="hover:text-sky-600 transition-colors">
                    For Laboratories
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacist" className="hover:text-sky-600 transition-colors">
                    For Pharmacies
                  </Link>
                </li>
                <li>
                  <Link to="/researcher" className="hover:text-sky-600 transition-colors">
                    For Researchers
                  </Link>
                </li>
                <li>
                  <Link to="/doctor" className="hover:text-sky-600 transition-colors">
                    For Prescribers
                  </Link>
                </li>
                <li>
                  <Link to="/stewardship" className="hover:text-sky-600 transition-colors">
                    For Stewardship Leads
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Legal */}
            <div className="space-y-3 text-xs">
              <h4 className="font-heading font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Company & Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/resources" className="hover:text-sky-600 transition-colors">
                    About MediGuard
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-sky-600 transition-colors">
                    Contact Health Team
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-sky-600 transition-colors">
                    Request Platform Demo
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-sky-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-sky-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="hover:text-sky-600 transition-colors">
                    Data Safety & HIPAA
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="font-medium text-slate-800">© 2026 MediGuard</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span>Medication Safety & AMR Intelligence</span>
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
                Data Safety
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
