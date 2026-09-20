import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileCode2, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ResourcesFaqPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Is MediGuard a clinical diagnosis or e-prescribing system?',
      a: 'No. MediGuard is explicitly an epidemiological surveillance, safety monitoring, and clinical decision-support platform. It does not diagnose individual patients, does not write medical orders, and never automatically alters doctor treatment regimens.',
    },
    {
      q: 'How does MediGuard prevent false alarms and duplicate alerts?',
      a: 'The deterministic alert engine applies multi-factor deduplication checking entity ID, signal type, detection rule version, and cooldown windows. If a pattern persists, observed metrics are updated on the existing alert rather than generating redundant noise.',
    },
    {
      q: 'What laboratory guidelines and breakpoints are supported?',
      a: 'MediGuard supports both CLSI (Clinical and Laboratory Standards Institute) M100 and EUCAST (European Committee on Antimicrobial Susceptibility Testing) standards, capturing both qualitative (S/I/R) interpretations and numeric Minimum Inhibitory Concentration (MIC) titers.',
    },
    {
      q: 'How does the Gemini AI Assistant ensure clinical safety?',
      a: 'The AI assistant is strictly grounded on authorized institutional data context. It enforces deterministic system guardrails: it cannot diagnose, prescribe, invent citations, or claim that surveillance signals prove outbreak causality.',
    },
    {
      q: 'Can Organization A see data from Organization B?',
      a: 'Never. Multi-tenancy is enforced through PostgreSQL Row Level Security (RLS) policies scoped by organization_id. Cross-tenant access is structurally prevented at the database level.',
    },
    {
      q: 'How are medicine batches verified?',
      a: 'Batches are cross-referenced against GS1 regulatory barcode records and internal quality control receipts. If a lot is expired, recalled, or exhibits packaging anomalies, it is flagged as Suspicious or Expired with immediate inventory quarantine warnings.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">Support & Documentation</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions & Inquiries
        </h1>
        <p className="text-slate-400 text-sm">
          Everything you need to understand regarding surveillance methodology, data security, and platform integration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: FAQs */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-sm font-mono font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0F172A] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs font-semibold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Institutional Contact Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              Institutional Surveillance Inquiry
            </h3>
            <p className="text-xs text-slate-400">
              Contact our surveillance architecture team to discuss laboratory integration or regional health deployments.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-sm font-semibold text-white">Inquiry Received</div>
              <p className="text-xs text-slate-400">Our health informatics team will connect with your institution within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Tariq Mehmood"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Institutional Email *</label>
                <input
                  type="email"
                  required
                  placeholder="tariq@hospital-network.org"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Organization / Health System *</label>
                <input
                  type="text"
                  required
                  placeholder="Mayo Memorial Hospital Network"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Surveillance Inquiries & Requirements:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your facility beds, laboratory throughput, or surveillance goals..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit Institutional Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

