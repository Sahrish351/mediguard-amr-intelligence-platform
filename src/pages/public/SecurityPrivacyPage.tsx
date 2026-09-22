import React from 'react';
import {
  Lock,
  ShieldCheck,
  Database,
  KeyRound,
  EyeOff,
  FileText,
  CheckCircle2,
  Server,
  Shield,
  FileCheck,
  ArrowRight,
  Check,
  Cpu,
  Sparkles,
  Network,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

export const SecurityPrivacyPage: React.FC = () => {
  const securityPillars = [
    {
      title: 'PostgreSQL Row-Level Security (RLS)',
      desc: 'Multi-tenancy is cryptographically isolated at the database kernel level through Supabase PostgreSQL RLS policies. Organization A can NEVER query, see, or mutate Organization B records.',
      icon: Database,
      badge: 'Database Kernel Level',
    },
    {
      title: 'Patient Pseudonymization & Hashing',
      desc: 'Identifying patient fields are tokenized into SHA-256 accession tokens (e.g. PAT-90823-X). Clinical analytics, surveillance heatmaps, and AI copilot interactions process solely de-identified records.',
      icon: EyeOff,
      badge: 'HIPAA & GDPR Privacy',
    },
    {
      title: 'Serverless AI Key Isolation',
      desc: 'Gemini private API keys and database service roles execute exclusively within serverless edge proxy endpoints (`/api/ai/chat`). Public client JavaScript bundles contain zero private credentials.',
      icon: KeyRound,
      badge: 'Zero Public Secrets',
    },
    {
      title: 'Append-Only Forensic Audit Trails',
      desc: 'Sensitive clinical actions — prescription orders, pharmacy dispensing, batch status transitions, and alert dismissals — are immutably logged with actor timestamps and cryptographic before/after diffs.',
      icon: Lock,
      badge: 'Forensic Auditability',
    },
    {
      title: 'Granular Role-Based Access (RBAC)',
      desc: 'Physicians prescribe, pharmacists dispense, laboratory microbiologists log AST isolates, and administrators manage platform health. Strict route guards block lateral privilege elevation.',
      icon: ShieldCheck,
      badge: 'Least Privilege Model',
    },
    {
      title: 'Non-Negative Inventory Floor Bounds',
      desc: 'Mathematical algorithms enforce strict inventory stock floors during pharmacy dispensing, preventing corrupted negative stock counts or unauthorized inventory overwrites.',
      icon: Server,
      badge: 'Mathematical Bounds',
    },
  ];

  const complianceStandards = [
    {
      name: 'HIPAA Security Rule (45 CFR Part 164)',
      status: 'Technical Safeguards Aligned',
      detail: 'Role-based access controls, automatic session timeout, audit controls, and end-to-end data encryption in transit & at rest.',
    },
    {
      name: 'GDPR Article 32 Security of Processing',
      status: 'Pseudonymization Enforced',
      detail: 'Cryptographic patient accession hashing and strict institutional multi-tenant database isolation.',
    },
    {
      name: 'ISO/IEC 27001 ISMS Alignment',
      status: 'Operational Controls',
      detail: 'Segregation of clinical duties across 9 healthcare roles with least-privilege credential boundaries.',
    },
    {
      name: 'Zero-Secret Public Bundle Architecture',
      status: 'Continuous CI/CD Scanned',
      detail: 'Automated Git secret auditing ensures zero Gemini API keys or service role tokens are packaged into production assets.',
    },
  ];

  return (
    <div className="space-y-20 py-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <span>HEALTHCARE CYBERSECURITY &amp; COMPLIANCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F3A] tracking-tight font-heading leading-tight">
            Security, Multi-Tenancy &amp; Clinical Governance
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Healthcare telemetry requires uncompromising cryptographic isolation. MediGuard enforces database-level tenant separation, patient pseudonymization, append-only forensic audit trails, and server-side secret protection.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-2xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Request Security Whitepaper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/how-it-works"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs shadow-2xs transition-all"
            >
              Explore Architecture
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3] relative">
            <img
              src={CLINICAL_IMAGES.aiTelemetry}
              alt="Healthcare cybersecurity operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs text-xs text-slate-800 space-y-1">
              <span className="font-mono font-bold text-teal-700 text-[10px] uppercase">
                POSTGRESQL ROW-LEVEL SECURITY
              </span>
              <p className="font-bold text-[#0B1F3A]">Cryptographically isolates tenant records across all 25 relational tables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture Flow */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D9488] font-bold">
            SECURITY ARCHITECTURE PIPELINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B1F3A]">
            Six-Layer Cryptographic Defense Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every query and clinical mutation traverses an unbroken chain of authorization checks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 01</div>
            <div className="font-bold text-[#0B1F3A] text-sm">User</div>
            <div className="text-slate-500 text-[11px]">Credentials &amp; MFA</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 02</div>
            <div className="font-bold text-[#0B1F3A] text-sm">Authentication</div>
            <div className="text-slate-500 text-[11px]">Supabase GoTrue JWT</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 03</div>
            <div className="font-bold text-[#0B1F3A] text-sm">RBAC</div>
            <div className="text-slate-500 text-[11px]">9 Role Workspace Guards</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 04</div>
            <div className="font-bold text-[#0B1F3A] text-sm">Org Boundary</div>
            <div className="text-slate-500 text-[11px]">Tenant Scope Context</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 05</div>
            <div className="font-bold text-[#0B1F3A] text-sm">Supabase RLS</div>
            <div className="text-slate-500 text-[11px]">Postgres Engine Filter</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[10px] font-mono text-teal-700 font-bold">STEP 06</div>
            <div className="font-bold text-[#0B1F3A] text-sm">Audit Layer</div>
            <div className="text-slate-500 text-[11px]">Append-Only Forensic Log</div>
          </div>
        </div>
      </section>

      {/* 6 Security Safeguards */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            DEFENSE-IN-DEPTH
          </span>
          <h2 className="text-3xl font-bold font-heading text-[#0B1F3A]">
            Six Enterprise Security Safeguards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0D9488] shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-heading">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliance Standards Alignment */}
      <section className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            REGULATORY CONFORMANCE MATRIX
          </span>
          <h3 className="text-2xl font-bold text-[#0B1F3A] font-heading">
            Adherence to International Healthcare Security Standards
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {complianceStandards.map((std, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0B1F3A] font-heading text-sm">{std.name}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {std.status}
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed pt-1">{std.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#0B1F3A]">
          Verify Cryptographic Multi-Tenancy on MediGuard
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Our automated test harness validates cross-tenant PostgreSQL isolation, role guards, and immutable audit trails.
        </p>
        <div className="pt-2">
          <Link
            to="/register"
            className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-2 shadow-md shadow-teal-600/10 cursor-pointer"
          >
            <span>Request Security &amp; Compliance Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
