import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileCode2, MessageSquare, Send, CheckCircle2, Search, BookOpen, Download, FileText, ArrowRight, ShieldCheck, Database, Pill, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResourcesFaqPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      category: 'surveillance',
      q: 'Is MediGuard a clinical diagnosis or e-prescribing system?',
      a: 'No. MediGuard is strictly an epidemiological surveillance, safety monitoring, and clinical decision-support platform. It does not diagnose individual patients, does not write medical orders, and never automatically alters doctor treatment regimens. It surfaces population-level resistance patterns to assist healthcare professionals.',
    },
    {
      category: 'surveillance',
      q: 'How does MediGuard prevent false alarms and duplicate alerts?',
      a: 'The deterministic alert engine applies multi-factor deduplication checking entity ID, signal type, detection rule version, and cooldown windows. If an anomaly persists, observed metrics are updated on the existing alert record rather than generating redundant alert fatigue for clinicians.',
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

  const glossaryItems = [
    { term: 'MIC (Minimum Inhibitory Concentration)', def: 'The lowest concentration of an antimicrobial agent that inhibits visible growth of a microorganism.' },
    { term: 'AWaRe Classification', def: 'WHO stewardship tool categorizing antibiotics into Access, Watch, and Reserve tiers to preserve therapeutic efficacy.' },
    { term: 'CRE (Carbapenem-Resistant Enterobacterales)', def: 'A critical family of bacteria with resistance to carbapenem antibiotics, flagged as WHO Tier 1 priority.' },
    { term: 'DOT (Days of Therapy)', def: 'An aggregate stewardship metric measuring the number of days a patient receives a specific antibacterial agent.' },
    { term: 'Deduplication (CLSI M39-A4)', def: 'Protocol indexing only the first isolate per patient species encounter to avoid skewing institutional antibiograms.' },
    { term: 'Row-Level Security (RLS)', def: 'PostgreSQL database policy restricting query rows exclusively to the tenant organization linked to the active session.' },
  ];

  const docs = [
    { title: 'MediGuard Implementation Blueprint (PDF)', desc: 'Complete IT integration guide for hospital CIOs, HL7 FHIR connectors, and database setup.', size: '4.2 MB' },
    { title: 'CLSI M100 & EUCAST Breakpoint Mapping Manual', desc: 'Technical documentation detailing automatic zone diameter to S/I/R classification.', size: '2.8 MB' },
    { title: 'WHO AWaRe 2024 Formulary Index', desc: 'Complete categorization table of 260+ antimicrobial agents with stewardship targets.', size: '1.4 MB' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-24 py-8 text-left">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold">
          <span>KNOWLEDGE HUB, DOCUMENTATION &amp; FAQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Resources &amp; Frequently Answered Questions
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Comprehensive guidance regarding surveillance methodology, data security, laboratory standards, and clinical governance.
        </p>
      </section>

      {/* Downloadable Documentation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              OFFICIAL CLINICAL DOCUMENTATION
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Technical Guidelines &amp; Manuals
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {docs.map((doc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="text-slate-400 font-mono text-[11px]">{doc.size}</span>
                  <span className="text-sky-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-bold font-heading text-slate-900">
            Answers for Healthcare Leaders
          </h2>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinical topics, RLS, CLSI guidelines, AI safety..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-900 shadow-2xs focus:outline-hidden focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'surveillance', label: 'Surveillance' },
              { id: 'microbiology', label: 'Microbiology' },
              { id: 'ai', label: 'Gemini AI' },
              { id: 'security', label: 'Security & RLS' },
              { id: 'medication', label: 'Medication Safety' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-heading font-bold text-slate-900 text-sm">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Medical AMR Glossary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              CLINICAL DEFINITIONS &amp; CONCEPTS
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Antimicrobial Surveillance Glossary
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossaryItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                <div className="font-bold text-slate-900 font-heading">{item.term}</div>
                <p className="text-slate-600 leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Contact Consultation Box */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900 font-heading">Need Technical Consultation?</h3>
            <p className="text-xs text-slate-500">
              Submit your hospital network requirements to receive deployment sizing and integration specifications.
            </p>
          </div>

          {contactSubmitted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inquiry received. A healthcare informatics specialist will contact your institutional email.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-3 text-xs text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Dr. Tariq Mehmood"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Institutional Email</label>
                  <input
                    type="email"
                    placeholder="tariq@hospital.org"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hospital / Agency Name</label>
                <input
                  type="text"
                  placeholder="Mayo Memorial Hospital Network"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
              >
                Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
