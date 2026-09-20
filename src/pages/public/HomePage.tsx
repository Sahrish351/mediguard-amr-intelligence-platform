import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Activity,
  Microscope,
  Pill,
  AlertTriangle,
  FileSearch,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Database,
  TrendingUp,
  Layers,
  ChevronRight,
  Server,
  Zap,
  BarChart3,
  Search,
  Check,
  Stethoscope,
  Users,
  LineChart,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';

export const HomePage: React.FC = () => {
  // Interactive role selector state
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState<'command' | 'amr' | 'lab' | 'pharmacy' | 'ai'>('command');

  const rolesData = [
    {
      title: 'Clinical Leadership',
      role: 'Chief Medical Officer / Clinical Director',
      challenge: 'Fragmented view of facility-wide antibiotic utilization and emerging pathogen clusters.',
      solution: 'Executive command center with institutional resistance indicators and early risk detection.',
      kpis: ['Cross-facility compliance %', 'Reserve antibiotic surge rate', 'Time-to-containment'],
      route: '/organization',
      badge: 'Executive Governance',
    },
    {
      title: 'Microbiology Laboratory',
      role: 'Principal Microbiologist',
      challenge: 'Manual transcription delays between culture testing, CLSI breakpoint interpretation, and clinician notification.',
      solution: 'Automated AST accessioning bench with EUCAST/CLSI rules and instant alert escalation.',
      kpis: ['MIC breakpoint accuracy', 'Specimen turnaround time', 'Priority CRE isolate flags'],
      route: '/laboratory',
      badge: 'Diagnostics & AST',
    },
    {
      title: 'Pharmacy Operations',
      role: 'Clinical Pharmacist',
      challenge: 'Preventing dispensing of compromised batches, counterfeit medicine, and unapproved repeat courses.',
      solution: 'Real-time batch verification, cold-chain temperature telemetry, and 14-day repeat dispensing radar.',
      kpis: ['Batch verification %', 'Temperature excursion alerts', 'Repeat antibiotic intercepts'],
      route: '/pharmacist',
      badge: 'Medication Safety',
    },
    {
      title: 'Antimicrobial Stewardship',
      role: 'Infection Preventionist / Stewardship Lead',
      challenge: 'Tracking WHO AWaRe compliance and identifying non-indicated broad-spectrum prescribing.',
      solution: 'Prescriber peer benchmarking, Days of Therapy (DOT) analysis, and guided intervention workflows.',
      kpis: ['Access vs Reserve ratio', 'Prescriber adherence score', 'Stewardship interventions'],
      route: '/stewardship',
      badge: 'AWaRe Stewardship',
    },
    {
      title: 'Epidemiology & Public Health',
      role: 'Surveillance Epidemiologist',
      challenge: 'Aggregating resistance patterns across disjointed regional facilities with proper denominator math.',
      solution: 'Geospatial AMR heatmap, critical pathogen surveillance, and predictive surge forecasting.',
      kpis: ['Regional resistance rate', 'Cluster anomaly detection', 'Longitudinal trend slopes'],
      route: '/epidemiology',
      badge: 'Population Health',
    },
    {
      title: 'Healthcare Data Teams',
      role: 'Health Informatics Specialist',
      challenge: 'Ensuring multi-tenant HIPAA compliance, FHIR R4 standard alignment, and tamper-evident audit logs.',
      solution: 'PostgreSQL Row-Level Security, pseudonymized patient records, and immutable event logging.',
      kpis: ['Tenant isolation integrity', 'Data completeness score', 'Append-only audit volume'],
      route: '/admin',
      badge: 'Informatics & Security',
    },
  ];

  return (
    <div className="space-y-24 py-6">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
              <span>GLOBAL MEDICATION SAFETY & AMR INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
              Turn Healthcare Data Into{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Earlier Safety Signals.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              MediGuard bridges doctor prescriptions, pharmacy dispensing, medicine batch verification, and microbiology laboratory antibiograms into one unified, explainable surveillance platform to identify concerning resistance patterns earlier.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/login"
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/how-it-works"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm shadow-2xs transition-all"
              >
                See How It Works
              </Link>
            </div>

            {/* Quick Validation Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-left">
              <div>
                <span className="text-xs text-slate-500 font-medium">Breakpoint Standards</span>
                <div className="text-base font-bold text-slate-900 mt-0.5">CLSI & EUCAST</div>
                <span className="text-[11px] text-slate-400">Quantitative AST</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">WHO Framework</span>
                <div className="text-base font-bold text-emerald-600 mt-0.5">AWaRe 3-Tier</div>
                <span className="text-[11px] text-slate-400">Access • Watch • Reserve</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Detection Engine</span>
                <div className="text-base font-bold text-sky-700 mt-0.5">Deterministic</div>
                <span className="text-[11px] text-slate-400">Rule-based anomaly checks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Healthcare Intelligence Composite */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 space-y-5 overflow-hidden">
              {/* Background Medical Grid Graphic */}
              <div className="absolute inset-0 bg-medical-grid opacity-30 pointer-events-none" />

              {/* Header Badge */}
              <div className="relative flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-heading">
                      Live Clinical Telemetry
                    </span>
                    <span className="text-[10px] text-slate-400">Regional Surveillance Node #01</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE
                </span>
              </div>

              {/* Simulated Surveillance Indicator Cards */}
              <div className="relative space-y-3">
                {/* Metric 1: Resistance Surge */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Carbapenem-Resistant K. pneumoniae</div>
                      <div className="text-[11px] text-slate-500">Blood specimen isolates (N=143)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-rose-600 font-mono">+18.4%</div>
                    <div className="text-[10px] text-slate-400">Surge alert</div>
                  </div>
                </div>

                {/* Metric 2: Medication Usage Volume */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Antimicrobial Dispensing Radar</div>
                      <div className="text-[11px] text-slate-500">WHO Access / Watch / Reserve</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 font-mono">12.8K</div>
                    <div className="text-[10px] text-slate-400">Doses tracked</div>
                  </div>
                </div>

                {/* Metric 3: Active Healthcare Facilities */}
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Connected Clinical Network</div>
                      <div className="text-[11px] text-slate-500">Hospitals, Laboratories & Pharmacies</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-teal-700 font-mono">24 Facilities</div>
                    <div className="text-[10px] text-emerald-600 font-medium">Synchronized</div>
                  </div>
                </div>
              </div>

              {/* Visual Data Spectrum Pill */}
              <div className="relative pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Lock className="w-3 h-3 text-slate-400" />
                  PostgreSQL Row-Level Security
                </span>
                <span className="font-mono text-slate-400 text-[10px]">
                  ID: SVR-NODE-PK26
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & CREDIBILITY SECTION */}
      <section className="border-y border-slate-200/80 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 font-heading">
            Built for multidisciplinary teams working across
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-2">
            {[
              { name: 'Hospital Systems', icon: Building2 },
              { name: 'Pharmacy Operations', icon: Pill },
              { name: 'Clinical Laboratories', icon: Microscope },
              { name: 'Stewardship Teams', icon: Shield },
              { name: 'Public Health', icon: Globe },
              { name: 'Epidemiology', icon: LineChart },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-sky-200 transition-colors">
                <item.icon className="w-5 h-5 text-slate-600 mb-1.5" />
                <span className="text-xs font-semibold text-slate-800">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM: FRAGMENTED HEALTHCARE SAFETY SIGNALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <span>THE CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Healthcare Safety Signals Are Often Fragmented.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In traditional hospital operations, each department operates in isolation. By the time an outbreak or multidrug-resistant surge is noticed manually, days or weeks of preventable exposure have already passed.
          </p>
        </div>

        {/* Visual Storytelling Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
          {[
            { step: '01', title: 'Doctor Prescribing', desc: 'Prescription written in EHR without current resistance context', icon: Stethoscope },
            { step: '02', title: 'Pharmacy Dispensing', desc: 'Medication dispensed without real-time batch recall status', icon: Pill },
            { step: '03', title: 'Laboratory Culture', desc: 'Specimen cultured with manual turnaround times', icon: Microscope },
            { step: '04', title: 'Resistance AST', desc: 'AST results stored in siloed laboratory information systems', icon: Activity },
            { step: '05', title: 'Delayed Surveillance', desc: 'Infection prevention receives monthly retrospect summaries', icon: FileSearch },
            { step: '06', title: 'Delayed Response', desc: 'Investigation begins after preventable transmission occurs', icon: AlertTriangle },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2 text-left relative group">
              <span className="text-[10px] font-mono font-bold text-slate-400 block">{item.step}</span>
              <item.icon className="w-5 h-5 text-slate-600 group-hover:text-sky-600 transition-colors" />
              <h3 className="text-xs font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* The Connection Bridge */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 text-white text-center shadow-lg shadow-sky-600/10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-100">
            THE MEDIGUARD PARADIGM
          </span>
          <h3 className="text-2xl font-bold font-heading">
            MediGuard connects the signal.
          </h3>
          <p className="text-xs text-sky-100 max-w-xl mx-auto">
            Correlating doctor prescribing, pharmacy batch tracking, and laboratory AST susceptibility data into one real-time deterministic surveillance engine.
          </p>
        </div>
      </section>

      {/* 4. PLATFORM ARCHITECTURE: 5 CORE LAYERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
            <span>MODULAR ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            End-to-End Surveillance Architecture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Five synchronized operational layers engineered to ensure clinical data integrity, denominator discipline, and prompt multidisciplinary response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              layer: '01',
              title: 'Medication Intelligence',
              desc: 'Batch verification, cold-chain sensor status, and counterfeit recall checks.',
              icon: Pill,
              tag: 'Safety',
            },
            {
              layer: '02',
              title: 'Laboratory & Microbiology',
              desc: 'WHONET-compatible specimen accessioning with CLSI/EUCAST breakpoint interpretation.',
              icon: Microscope,
              tag: 'Diagnostics',
            },
            {
              layer: '03',
              title: 'AMR Surveillance',
              desc: 'Geospatial heatmap, critical pathogen tracking, and denominator-grounded statistics.',
              icon: Activity,
              tag: 'Surveillance',
            },
            {
              layer: '04',
              title: 'Investigation & Response',
              desc: 'Structured triage workspace with evidence correlation and mandatory dismissal rationale.',
              icon: FileSearch,
              tag: 'Governance',
            },
            {
              layer: '05',
              title: 'AI-Powered Copilot',
              desc: 'Secure server-side Gemini proxy delivering non-prescriptive epidemiological summaries.',
              icon: Sparkles,
              tag: 'AI Support',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all space-y-3 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-600">{item.layer}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {item.tag}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
                PRODUCT SHOWCASE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                Specialized Clinical Workstations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Inspect how MediGuard renders complex microbiological and pharmaceutical datasets with clarity.
              </p>
            </div>

            {/* Showcase Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'command', label: 'Command Center' },
                { key: 'amr', label: 'AMR Heatmap' },
                { key: 'lab', label: 'Microbiology Bench' },
                { key: 'pharmacy', label: 'Medication Safety' },
                { key: 'ai', label: 'AI Copilot' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveProductTab(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeProductTab === tab.key
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Showcase Preview Panel */}
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 space-y-6">
            {activeProductTab === 'command' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono">WORKSPACE: /app/command-center</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAM
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Total Cultures Analyzed</span>
                    <div className="text-2xl font-bold text-white font-mono mt-1">2,840</div>
                    <span className="text-[10px] text-emerald-400">+12% vs last quarter</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Critical AMR Alerts</span>
                    <div className="text-2xl font-bold text-rose-400 font-mono mt-1">7 Active</div>
                    <span className="text-[10px] text-rose-400">3 requiring triage</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400">AWaRe Access Ratio</span>
                    <div className="text-2xl font-bold text-sky-400 font-mono mt-1">68.4%</div>
                    <span className="text-[10px] text-slate-400">Target &gt;= 60.0%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Active Facilities</span>
                    <div className="text-2xl font-bold text-teal-400 font-mono mt-1">24 Nodes</div>
                    <span className="text-[10px] text-teal-400">0 connectivity drops</span>
                  </div>
                </div>
              </div>
            )}

            {activeProductTab === 'amr' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono">WORKSPACE: /app/amr-heatmap (Pathogen vs Antibiotic Matrix)</span>
                  <span className="text-xs text-slate-400">Breakpoint: CLSI M100-ED33</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2">Organism</th>
                        <th className="py-2">Ampicillin</th>
                        <th className="py-2">Ceftriaxone</th>
                        <th className="py-2">Meropenem</th>
                        <th className="py-2">Colistin</th>
                        <th className="py-2">Vancomycin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      <tr>
                        <td className="py-2 font-semibold text-white">Klebsiella pneumoniae</td>
                        <td className="py-2 text-rose-400 font-mono">92.4% (R)</td>
                        <td className="py-2 text-rose-400 font-mono">68.1% (R)</td>
                        <td className="py-2 text-amber-400 font-mono">24.6% (R)</td>
                        <td className="py-2 text-emerald-400 font-mono">3.2% (R)</td>
                        <td className="py-2 text-slate-500 font-mono">N/A</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Escherichia coli</td>
                        <td className="py-2 text-rose-400 font-mono">81.0% (R)</td>
                        <td className="py-2 text-amber-400 font-mono">42.3% (R)</td>
                        <td className="py-2 text-emerald-400 font-mono">4.1% (R)</td>
                        <td className="py-2 text-emerald-400 font-mono">1.0% (R)</td>
                        <td className="py-2 text-slate-500 font-mono">N/A</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold text-white">Staphylococcus aureus</td>
                        <td className="py-2 text-rose-400 font-mono">88.5% (R)</td>
                        <td className="py-2 text-slate-500 font-mono">N/A</td>
                        <td className="py-2 text-slate-500 font-mono">N/A</td>
                        <td className="py-2 text-slate-500 font-mono">N/A</td>
                        <td className="py-2 text-emerald-400 font-mono">0.4% (R)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeProductTab === 'lab' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono">WORKSPACE: /app/laboratory (Microbiology Bench)</span>
                  <span className="text-emerald-400 font-mono">Queue Status: 12 Specimens Ready</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">Specimen Accession</span>
                    <div className="font-mono font-bold text-white">SPC-2026-0819 (Blood Culture)</div>
                    <div className="text-slate-400 text-[11px]">Patient: PT-8291 (Pseudonymized) • ICU Ward A</div>
                    <div className="text-amber-400 text-[11px] pt-1">Isolated: Klebsiella pneumoniae • Gram-negative</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400">AST Verification</span>
                    <div className="font-mono font-bold text-white">Meropenem MIC: &gt;= 16 ug/mL</div>
                    <div className="text-slate-400 text-[11px]">CLSI Breakpoint Interpretation: <span className="text-rose-400 font-bold">Resistant (R)</span></div>
                    <div className="text-rose-400 text-[11px] pt-1 font-semibold">⚠️ Alert Dispatched: Critical CRE Signal</div>
                  </div>
                </div>
              </div>
            )}

            {activeProductTab === 'pharmacy' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono">WORKSPACE: /app/batches (Medication & Batch Safety)</span>
                  <span className="text-sky-400 font-mono">Cold-Chain Sensors: 2-8°C Active</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-bold">VERIFIED BATCH</span>
                    <div className="font-mono font-bold text-white mt-1">MER-2023-X91</div>
                    <div className="text-[11px] text-slate-400">Meropenem 1g IV • 420 units</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-rose-400 font-bold">RECALLED BATCH</span>
                    <div className="font-mono font-bold text-white mt-1">AZI-2024-SUSP</div>
                    <div className="text-[11px] text-slate-400">Azithromycin 200mg • Quarantined</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold">REPEAT RADAR</span>
                    <div className="font-mono font-bold text-white mt-1">PT-9102 Alert</div>
                    <div className="text-[11px] text-slate-400">2nd Fluoroquinolone in 10 days</div>
                  </div>
                </div>
              </div>
            )}

            {activeProductTab === 'ai' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono">WORKSPACE: /app/ai-assistant (Server-Side Grounded Copilot)</span>
                  <span className="text-violet-400 font-mono">Proxy: Google Gemini Beta</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-2">
                  <div className="font-semibold text-white">Query: "Explain recent Meropenem resistance increase in ICU"</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    "Between Q2 and Q3, Meropenem resistance in K. pneumoniae isolates from ICU Ward A increased from 18.2% to 26.7% across 143 validated cultures. All 8 resistant isolates exhibited high MIC values (&gt;= 16 ug/mL). Non-prescriptive recommendation: Review environmental swabs and patient contact precautions."
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1 font-mono">
                    Telemetry: Analyzed 143 cultures • Scope: MediGuard Network • Non-diagnostic decision support
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. DEDICATED AI COPILOT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 space-y-8 border border-indigo-900/50 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SERVER-SIDE GROUNDED GEMINI COPILOT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Ask the Data. Understand the Signal.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              MediGuard equips clinical epidemiologists and stewardship leads with an explainable AI assistant that directly inspects authorized facility surveillance metrics without ever exposing sensitive credentials to the browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Conversation Simulation */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-slate-800 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  U
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 text-xs text-slate-200">
                  Why did resistance to meropenem increase in our hospital this quarter?
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  AI
                </div>
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-200 space-y-3">
                  <div className="font-semibold text-indigo-300">Surveillance Summary:</div>
                  <p className="text-slate-300 leading-relaxed">
                    Resistance increased from 18.2% to 26.7% among 143 tested isolates. The surge is concentrated primarily in Intensive Care Unit specimens collected between August 12 and September 18.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-900/60 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Identified Pathogen:</span>
                      <span className="font-semibold text-white">Klebsiella pneumoniae</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Dominant Specimen:</span>
                      <span className="font-semibold text-white">Blood Culture (71%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence & Scope Inspector */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950/60 border border-slate-800 p-6 space-y-4 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
                Evidence & Data Scope Telemetry
              </h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Grounded Data Scope:</strong> Derived exclusively from validated laboratory specimens in Mayo Memorial Hospital.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Denominator Integrity:</strong> Explicit calculation against 143 isolates (never estimated).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Deterministic Verification:</strong> Alert rule #rule-cre-surge-01 triggered correlation automatically.</span>
                </li>
              </ul>

              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/50 text-[11px] text-indigo-300 leading-normal">
                🛡️ <strong>Clinical Safety Boundary:</strong> AI provides surveillance decision support. It does not diagnose patients or prescribe medical treatment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE ROLE-BASED PLATFORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
            <span>TAILORED FOR CLINICAL STAKEHOLDERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Dedicated Workspaces for Every Healthcare Role
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Unlike generic healthcare dashboards, MediGuard provisions role-specific tools, terminology, and permissions for each member of the clinical safety continuum.
          </p>
        </div>

        {/* Role Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {rolesData.map((role, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRoleIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeRoleIndex === idx
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{role.title}</span>
            </button>
          ))}
        </div>

        {/* Active Role Card Showcase */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                {rolesData[activeRoleIndex].badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                {rolesData[activeRoleIndex].role}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-slate-900 block">Operational Challenge:</span>
                  <span className="text-slate-600">{rolesData[activeRoleIndex].challenge}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">MediGuard Workspace Solution:</span>
                  <span className="text-slate-600">{rolesData[activeRoleIndex].solution}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase text-slate-400 block mb-2 font-mono">
                  Role-Specific Workflows & KPIs:
                </span>
                <div className="flex flex-wrap gap-2">
                  {rolesData[activeRoleIndex].kpis.map((kpi, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      ✓ {kpi}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Enter {rolesData[activeRoleIndex].title} Workspace
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Provisioned with strict role-based access control, specialized telemetry, and audit logging.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all w-full"
              >
                <span>Launch Clinical Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS: 5-STEP VISUAL PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span>SURVEILLANCE WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            How MediGuard Operates
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From initial specimen accessioning to multi-disciplinary outbreak investigation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Collect', desc: 'Prescription orders, pharmacy dispense logs, and laboratory AST isolates ingested securely.', icon: Database },
            { step: '02', title: 'Connect', desc: 'Data normalized across WHO AWaRe tiers, CLSI M100 breakpoints, and batch registries.', icon: Layers },
            { step: '03', title: 'Detect', desc: 'Deterministic surveillance algorithms continuously detect resistance surges and anomalies.', icon: Zap },
            { step: '04', title: 'Investigate', desc: 'Clinical multidisciplinary team examines correlated evidence and notes in real time.', icon: FileSearch },
            { step: '05', title: 'Understand', desc: 'Grounded AI synthesis and epidemiological reports communicate actionable findings.', icon: Sparkles },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-left shadow-2xs hover:border-sky-300 transition-colors">
              <span className="text-xs font-mono font-bold text-sky-600">{item.step}</span>
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <item.icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. ENTERPRISE SECURITY & COMPLIANCE ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              SECURITY & COMPLIANCE ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Healthcare-Grade Trust & Tenant Isolation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Engineered from the ground up for strict regulatory compliance, multi-tenant isolation, and data governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Lock className="w-6 h-6 text-sky-400" />
              <h3 className="text-sm font-bold text-white font-heading">PostgreSQL Row-Level Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Database-enforced tenant boundaries prevent Organization A from querying or mutating Organization B data under any circumstance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Shield className="w-6 h-6 text-teal-400" />
              <h3 className="text-sm font-bold text-white font-heading">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Granular privilege gates. Physicians prescribe, pharmacists dispense, and microbiologists access laboratory benches. Zero privilege escalation.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Server className="w-6 h-6 text-emerald-400" />
              <h3 className="text-sm font-bold text-white font-heading">Append-Only Audit Trails</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monotonically increasing immutable log entries record every sensitive prescription, dispense, AST result, and signal dismissal for forensic accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-6">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 text-white p-10 sm:p-14 space-y-6 shadow-xl shadow-sky-600/10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Experience the Future of Healthcare Surveillance
          </h2>
          <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Join medical leaders, clinical microbiologists, and stewardship teams across national healthcare networks detecting AMR signals earlier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <span>Launch Clinical Workspace</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
            </Link>
            <Link
              to="/solutions"
              className="px-8 py-3.5 rounded-xl bg-sky-800/60 hover:bg-sky-800 text-white font-semibold text-sm border border-sky-400/30 transition-all"
            >
              Explore Solutions by Role
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
