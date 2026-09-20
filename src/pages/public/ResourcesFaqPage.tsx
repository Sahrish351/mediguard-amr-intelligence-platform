import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileCode2, MessageSquare, Send, CheckCircle2, Search, BookOpen, Download, FileText } from 'lucide-react';

export const ResourcesFaqPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      category: 'surveillance',
      q: 'Is MediGuard a clinical diagnosis or e-prescribing system?',
      a: 'No. MediGuard is strictly an epidemiological surveillance, safety monitoring, and clinical decision-support platform. It does not diagnose individual patients, does not write medical orders, and never automatically alters doctor treatment regimens.',
    },
    {
      category: 'surveillance',
      q: 'How does MediGuard prevent false alarms and duplicate alerts?',
      a: 'The deterministic alert engine applies multi-factor deduplication checking entity ID, signal type, detection rule version, and cooldown windows. If an anomaly persists, observed metrics are updated on the existing alert record rather than generating redundant alert fatigue.',
    },
    {
      category: 'microbiology',
      q: 'What laboratory guidelines and breakpoints are supported?',
      a: 'MediGuard supports both CLSI (Clinical and Laboratory Standards Institute) M100 and EUCAST (European Committee on Antimicrobial Susceptibility Testing) standards, capturing both qualitative (S/I/R) interpretations and numeric Minimum Inhibitory Concentration (MIC) titers.',
    },
    {
      category: 'ai',
      q: 'How does the Gemini AI Assistant ensure clinical safety?',
      a: 'The AI assistant is strictly grounded on authorized institutional data context. It enforces deterministic system guardrails: it cannot diagnose, prescribe, invent citations, or claim that surveillance signals prove outbreak causality. All calls are routed securely through a server-side proxy without client key exposure.',
    },
    {
      category: 'security',
      q: 'Can Organization A see data from Organization B?',
      a: 'Never. Multi-tenancy is enforced through PostgreSQL Row Level Security (RLS) policies scoped by organization_id. Cross-tenant access is structurally prevented at the database kernel level, even if client URLs are manipulated.',
    },
    {
      category: 'medication',
      q: 'How are medicine batches and cold-chain integrity verified?',
      a: 'Batches are cross-referenced against GS1 regulatory barcode records, manufacturer expiry timelines, and cold-chain storage sensor telemetry. If a lot is expired, recalled, or exhibits temperature excursions, it is automatically flagged with immediate inventory quarantine warnings.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-20 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <span>KNOWLEDGE HUB & SUPPORT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Resources & Frequently Answered Questions
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Comprehensive guidance regarding surveillance methodology, data security, laboratory standards, and clinical governance.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search methodology, CLSI rules, security..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Category Pills & FAQ Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: FAQs */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex flex-wrap gap-2 pb-2">
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'surveillance', label: 'Surveillance & Alerts' },
                { id: 'microbiology', label: 'Microbiology & AST' },
                { id: 'medication', label: 'Medication Safety' },
                { id: 'ai', label: 'AI Copilot' },
                { id: 'security', label: 'Security & RLS' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 font-heading hover:bg-slate-50/50"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Guides & Contact */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Reference Documentation</span>
              </h3>
              <div className="space-y-2.5">
                {[
                  { title: 'CLSI M100 Breakpoint Engine Guide', size: 'PDF • 1.4 MB' },
                  { title: 'WHO AWaRe Formulary Integration Spec', size: 'PDF • 840 KB' },
                  { title: 'FHIR R4 MedicationRequest Connector', size: 'JSON • Schema' },
                  { title: 'Multi-Tenant Security Architecture Dossier', size: 'PDF • 2.1 MB' },
                ].map((doc, dIdx) => (
                  <div key={dIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-sky-50/50 hover:border-sky-200 transition-all cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">{doc.title}</span>
                      <span className="text-[10px] text-slate-400">{doc.size}</span>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Inquiry Form */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-600" />
                <span>Institutional Surveillance Inquiry</span>
              </h3>
              {contactSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Inquiry received. Our health informatics team will connect shortly.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <input
                    type="text"
                    placeholder="Institutional Email"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="Describe your health system or regional network requirements..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
