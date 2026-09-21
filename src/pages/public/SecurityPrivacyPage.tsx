import React from 'react';
import { Lock, ShieldCheck, Database, KeyRound, EyeOff, FileText, CheckCircle2, Server, Shield, FileCheck, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';

export const SecurityPrivacyPage: React.FC = () => {
  const pillars = [
    {
      title: 'PostgreSQL Row-Level Security (RLS)',
      desc: 'Multi-tenancy is enforced at the database kernel level through Supabase PostgreSQL RLS policies. Organization A can NEVER access or mutate Organization B records, even if frontend controls were bypassed.',
      icon: Database,
      badge: 'Database Kernel Level',
    },
    {
      title: 'Patient Pseudonymization & Privacy',
      desc: 'Direct identifying information (CNIC, names, residential addresses) is strictly tokenized into secure pseudonymized tokens (e.g. PAT-88192-X). Epidemiological analytics operate solely on de-identified cohorts.',
      icon: EyeOff,
      badge: 'HIPAA & GDPR Privacy',
    },
    {
      title: 'Server-Side Secret Isolation',
      desc: 'Gemini private API keys and database service credentials are strictly isolated on serverless edge execution runtimes. Public client bundles contain zero private secrets or administrative tokens.',
      icon: KeyRound,
      badge: 'Zero Public Secrets',
    },
    {
      title: 'Append-Only Immutable Audit Trails',
      desc: 'Every sensitive clinical event — prescription orders, pharmacy dispensing, batch status transitions, and alert dismissals — is recorded with immutable monotonic timestamps for forensic verification.',
      icon: Lock,
      badge: 'Forensic Auditability',
    },
    {
      title: 'Granular Role-Based Access (RBAC)',
      desc: 'Physicians prescribe, pharmacists dispense, laboratory microbiologists log AST isolates, and administrators manage platform health. Privilege boundaries prevent lateral elevation across roles.',
      icon: ShieldCheck,
      badge: 'Least Privilege Model',
    },
    {
      title: 'Synthetic Demonstration Sandboxing',
      desc: 'All demonstration environments operate on synthetic clinical records with verified clinical distributions. Real hospital production deployments connect exclusively to isolated private institutional endpoints.',
      icon: Server,
      badge: 'Safe Sandboxing',
    },
  ];

  const complianceStandards = [
    { name: 'HIPAA Security Rule (45 CFR Part 164)', status: 'Technical Safeguards Aligned', detail: 'Role-based access controls, audit controls, and data encryption in transit & at rest.' },
    { name: 'GDPR Article 32 Security of Processing', status: 'Pseudonymization Enforced', detail: 'De-identified patient accession hashing and organizational isolation.' },
    { name: 'ISO/IEC 27001 ISMS Alignment', status: 'Operational Controls', detail: 'Segregation of duties across healthcare roles with strict least-privilege policies.' },
    { name: 'Zero-Secret Public Bundle Architecture', status: 'Continuous CI/CD Scanned', detail: 'Zero Gemini API keys or service role secrets exposed to browser client code.' },
  ];

  return (
    <div className="space-y-24 py-8 text-left">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
              <span>HEALTHCARE CYBERSECURITY &amp; COMPLIANCE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Security, Multi-Tenancy &amp; Clinical Governance
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Healthcare data requires uncompromising cryptographic isolation. MediGuard enforces database-level tenant separation, patient pseudonymization, append-only forensic audit trails, and server-side secret protection.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Security Whitepaper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs shadow-2xs transition-all"
              >
                Explore System Architecture
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-[4/3] relative">
              <img
                src={CLINICAL_IMAGES.heroHospitalCommand}
                alt="Hospital command operations"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-xs text-slate-800 space-y-1">
                <span className="font-mono font-bold text-emerald-700 text-[10px] uppercase">
                  POSTGRESQL ROW-LEVEL SECURITY
                </span>
                <p className="font-bold">Cryptographically isolates tenant records across all 25 relational tables.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Security Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 inline-block">
            DEFENSE-IN-DEPTH ARCHITECTURE
          </span>
          <h2 className="text-3xl font-bold font-heading text-slate-900">
            Six Enterprise Security Safeguards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliance Standards Alignment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              REGULATORY CONFORMANCE MATRIX
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Adherence to Healthcare Data Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {complianceStandards.map((std, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 font-heading">{std.name}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {std.status}
                  </span>
                </div>
                <p className="text-slate-500">{std.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-heading">Audit Your Healthcare Network with MediGuard</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Test multi-tenant isolation and verify zero credential leakage in our production test harness.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Secure Workspaces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
