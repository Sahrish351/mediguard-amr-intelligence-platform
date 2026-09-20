import React from 'react';
import { Lock, ShieldCheck, Database, KeyRound, EyeOff, FileText, CheckCircle2, Server, Shield, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      desc: 'Direct identifying information (CNIC, names, residential addresses) is strictly tokenized into secure pseudonymized tokens (e.g. PT-88192-A). Epidemiological analytics operate solely on de-identified cohorts.',
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

  return (
    <div className="space-y-20 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <span>HEALTHCARE DATA GOVERNANCE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Security, Multi-Tenancy & Clinical Governance
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Healthcare data requires uncompromising isolation. MediGuard enforces database-level tenant separation, patient pseudonymization, cryptographic audit trails, and server-side secret boundaries.
        </p>
      </section>

      {/* 6 Security Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 text-left hover:shadow-md hover:border-sky-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliance Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-left max-w-2xl space-y-2">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Regulatory Standards Alignment Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Architectural implementation mapping to global healthcare and security frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block font-heading">HIPAA Security Rule</span>
              <p className="text-xs text-slate-600">Administrative, physical, and technical safeguards for protected health surveillance data.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block font-heading">ISO/IEC 27001</span>
              <p className="text-xs text-slate-600">Information security controls for cloud-hosted clinical intelligence pipelines.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block font-heading">HL7 FHIR R4</span>
              <p className="text-xs text-slate-600">Standardized resource models for MedicationRequest and DiagnosticReport payloads.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-900 block font-heading">CLSI M100-ED33</span>
              <p className="text-xs text-slate-600">Codified performance standards for antimicrobial susceptibility testing interpretation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
