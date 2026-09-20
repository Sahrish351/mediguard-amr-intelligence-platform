import React from 'react';
import { Lock, ShieldCheck, Database, KeyRound, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export const SecurityPrivacyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">Enterprise Healthcare Trust</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Security, Multi-Tenancy & Data Governance
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Healthcare data requires uncompromising isolation. MediGuard enforces tenant separation, patient pseudonymization, cryptographic audit trails, and server-side secret boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">PostgreSQL Row-Level Security</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-tenancy is enforced at the database kernel level through Supabase PostgreSQL RLS policies. Organization A can NEVER access or mutate Organization B's records, even if frontend routes are bypassed.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Patient Pseudonymization</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Personal Identifying Information (CNIC, names, residential addresses) is strictly excluded from global surveillance analytics. Patients are represented exclusively via secure tokens (e.g. PAT-88192-A).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Server-Side Secret Isolation</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gemini private API keys and database service credentials are strictly isolated on server-side proxies and edge execution runtimes. Secrets are never bundled or transmitted to the client browser.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Append-Only Audit Trails</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every clinical prescription, pharmacy dispensing event, batch status modification, and alert dismissal is cryptographically timestamped in an append-only audit registry.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Prompt-Injection Hardening</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI queries validate input structures and enforce rigid system instructions, preventing user-entered patient notes or microbiology comments from hijacking the analytical model.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">Regulatory Alignment</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Engineered to conform with ISO 27001 data protection standards, HIPAA-ready technical safeguards, and national drug regulatory authority GS1 tracking protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

