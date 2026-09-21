import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
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
  ThermometerSnowflake,
  QrCode,
  FileText,
  BadgeAlert,
  Send,
  Eye,
  Calendar,
  AlertOctagon,
  Clock,
  HeartPulse,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';

export const HomePage: React.FC = () => {
  // Interactive Product Showcase state
  const [activeTab, setActiveTab] = useState<'command' | 'amr' | 'meds' | 'lab' | 'ai'>('command');

  // Interactive Role Showcase state
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  // 9 Healthcare Roles Data
  const roleCards = [
    {
      role: 'Doctor / Prescriber',
      icon: Stethoscope,
      accent: 'border-sky-200 hover:border-sky-400 bg-sky-50/50',
      tag: 'Clinical Prescribing',
      path: '/doctor',
      desc: 'Formulary-aligned prescribing, automated AWaRe categorization, and real-time resistance alerts directly at point of care.',
      capabilities: ['Fast dosage calculators', 'Reserve antibiotic flags', 'Patient antimicrobial history'],
    },
    {
      role: 'Clinical Pharmacist',
      icon: Pill,
      accent: 'border-teal-200 hover:border-teal-400 bg-teal-50/50',
      tag: 'Medication Safety',
      path: '/pharmacist',
      desc: 'Batch verification barcode lookup, cold-chain temperature telemetry, stock deduction, and 14-day repeat dispensing warning intercepts.',
      capabilities: ['GS1 batch barcode scan', 'Quarantine recall alerts', 'Non-negative stock protection'],
    },
    {
      role: 'Laboratory Scientist',
      icon: Microscope,
      accent: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/50',
      tag: 'Diagnostics & AST',
      path: '/laboratory',
      desc: 'Culture accessioning, automated CLSI M100 & EUCAST MIC breakpoint interpretations, and instant resistance surge escalation.',
      capabilities: ['Automated AST entry', 'Priority pathogen radar', 'Antibiogram generation'],
    },
    {
      role: 'Stewardship Lead',
      icon: Shield,
      accent: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/50',
      tag: 'WHO AWaRe Oversight',
      path: '/stewardship',
      desc: 'Audit & feedback interventions, Days of Therapy (DOT) analytics, prescriber peer benchmarking, and WHO 60% Access target adherence.',
      capabilities: ['WHO 60% Access tracker', 'Prescriber compliance matrix', 'Closed-loop audit notes'],
    },
    {
      role: 'Epidemiologist',
      icon: LineChart,
      accent: 'border-cyan-200 hover:border-cyan-400 bg-cyan-50/50',
      tag: 'Population Health',
      path: '/epidemiology',
      desc: 'Macro resistance heatmaps, critical pathogen curves, outbreak cluster anomaly detection, and predictive surge forecasting.',
      capabilities: ['Geospatial resistance map', 'Pathogen prevalence trend', 'Early anomaly forecasting'],
    },
    {
      role: 'Surveillance Officer',
      icon: Activity,
      accent: 'border-amber-200 hover:border-amber-400 bg-amber-50/50',
      tag: 'Signal Center',
      path: '/surveillance',
      desc: 'Triage deterministic safety signals, coordinate multidisciplinary investigations, and monitor clinical resolution times.',
      capabilities: ['Deterministic signal triage', 'Case investigation dispatcher', 'Mandatory dismissal logging'],
    },
    {
      role: 'Organization Admin',
      icon: Building2,
      accent: 'border-blue-200 hover:border-blue-400 bg-blue-50/50',
      tag: 'Governance',
      path: '/organization',
      desc: 'Multi-facility tenant management, clinical user credentialing, RBAC permission assignment, and data completeness health checks.',
      capabilities: ['Facility network manager', 'Healthcare user provisioning', 'Data quality audit dashboard'],
    },
    {
      role: 'Platform Administrator',
      icon: Server,
      accent: 'border-slate-300 hover:border-slate-500 bg-slate-100/60',
      tag: 'Enterprise Command',
      path: '/admin',
      desc: 'Cross-tenant surveillance telemetry, HL7 FHIR connectors, background ETL jobs, and immutable PostgreSQL security audit logs.',
      capabilities: ['Global health overview', 'HL7 / FHIR connectors', 'Append-only audit trail'],
    },
    {
      role: 'Scientific Researcher',
      icon: FileSearch,
      accent: 'border-purple-200 hover:border-purple-400 bg-purple-50/50',
      tag: 'Evidence & Discovery',
      path: '/researcher',
      desc: 'De-identified aggregate AMR longitudinal datasets, GLASS-compatible antibiograms, scientific methodology, and CSV exports.',
      capabilities: ['De-identified datasets', 'Longitudinal AST trends', 'Raw CSV research export'],
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 py-4 text-left">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>NEXT-GEN HEALTHCARE INTELLIGENCE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 tracking-tight leading-[1.12]">
              Medication Safety.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700">
                Antimicrobial Intelligence.
              </span>{' '}
              Better Surveillance.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              MediGuard is an enterprise clinical surveillance platform uniting doctor prescribing, pharmacy batch verification, and microbiology laboratory AST into an automated, closed-loop defense against counterfeit medications and superbug resistance.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/solutions"
                className="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Explore MediGuard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/login"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <Lock className="w-4 h-4 text-sky-400" />
                <span>View Platform Workspaces</span>
              </Link>
            </div>

            {/* Quick Micro-Certifications */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>WHO AWaRe 2024</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CLSI M100 / EUCAST</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PostgreSQL RLS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Composite Hero Visual with Clinical Photography & Floating UI Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative gradient glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

              {/* Main Clinical Hospital Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10 bg-slate-900 aspect-[4/3]">
                <img
                  src={CLINICAL_IMAGES.heroDoctorReviewingData}
                  alt="Doctor reviewing clinical surveillance telemetry"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Subtle Image Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-slate-800 border border-white/40 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Mayo Memorial • Active Clinical Floor</span>
                </div>
              </div>

              {/* Floating Card 1: Top Right - Critical Alert Telemetry */}
              <div className="absolute -top-6 -right-4 sm:-right-6 max-w-xs p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-rose-200/90 shadow-xl shadow-rose-900/5 space-y-1.5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span className="text-[11px] font-bold text-rose-800 font-heading">
                      SURVEILLANCE SIGNAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                    CRITICAL
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  Carbapenem Resistance Surge detected in ICU Specimen
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Isolate: K. pneumoniae</span>
                  <span className="font-mono text-rose-700 font-bold">MIC &gt; 16 mg/L</span>
                </div>
              </div>

              {/* Floating Card 2: Bottom Left - Live Medication Batch Verification */}
              <div className="absolute -bottom-8 -left-4 sm:-left-6 max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    GS1 BATCH TELEMETRY
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Meropenem 1g IV (Meronem)</div>
                  <div className="text-[11px] text-slate-500 font-mono">Lot #MER-2023-X91 • Stock: 399 Units</div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-500">WHO AWaRe Tier:</span>
                  <AWaReBadge category="Reserve" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED HEALTHCARE INTELLIGENCE (Platform Metrics Strip)               */}
      {/* ========================================================================= */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              ENGINEERED FOR CLINICAL SCALE • VALIDATED ARCHITECTURE
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">25+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 font-heading">Data Domains</div>
              <p className="text-xs text-slate-500 leading-snug">
                From EHR prescriptions and LIS specimens to GS1 batch cold chain and audit trails.
              </p>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 font-mono">9</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 font-heading">Healthcare Roles</div>
              <p className="text-xs text-slate-500 leading-snug">
                Isolated workspaces tailored for prescribers, pharmacists, microbiologists, and directors.
              </p>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 font-mono">&lt; 1.2s</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 font-heading">Real-Time Detection</div>
              <p className="text-xs text-slate-500 leading-snug">
                Deterministic rule engine intercepts repeat dispensing and reserve spikes instantly.
              </p>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">100%</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 font-heading">Tenant Isolation</div>
              <p className="text-xs text-slate-500 leading-snug">
                Enforced by PostgreSQL Row-Level Security ensuring strict zero cross-facility data leakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE HEALTHCARE PROBLEM                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 max-w-2xl">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 inline-block">
            THE ANTIMICROBIAL CRISIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            Why Traditional Healthcare Systems Miss Critical Resistance Signals
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Antimicrobial resistance does not begin in isolation. It emerges across disconnected hospital siloes where doctors lack antibiograms, pharmacies dispense without batch verification, and laboratories operate disconnected from electronic health records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {/* Problem 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Medication Misuse &amp; Spikes
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empiric broad-spectrum antibiotics and Reserve-tier medications are prescribed without rapid microbiological sensitivity confirmation, accelerating selective bacterial resistance.
            </p>
            <div className="text-[11px] font-mono font-bold text-rose-700 pt-2 border-t border-slate-100">
              WHO Target: &ge;60% Access Tier
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Silent Resistance Growth
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Carbapenem-Resistant Enterobacterales (CRE) and MRSA strains quietly circulate across inpatient wards without automated spatial cluster alerts reaching infection control teams in time.
            </p>
            <div className="text-[11px] font-mono font-bold text-amber-700 pt-2 border-t border-slate-100">
              +4.8% Monthly CRE Acceleration
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Fragmented Laboratory Data
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Microbiology susceptibility tests (MIC / disk diffusion) remain trapped in proprietary LIS databases, delayed from prescribers who make urgent bedside therapeutic decisions.
            </p>
            <div className="text-[11px] font-mono font-bold text-sky-700 pt-2 border-t border-slate-100">
              48-72h Average Informatics Lag
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Delayed Outbreak Detection
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              By the time quarterly paper antibiograms are assembled, localized pathogen outbreaks have already infected dozens of patients, causing extended hospitalizations and fatalities.
            </p>
            <div className="text-[11px] font-mono font-bold text-indigo-700 pt-2 border-t border-slate-100">
              Zero Proactive Early Warnings
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE MEDIGUARD CLOSED-LOOP SOLUTION                                     */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800">
              THE CLOSED-LOOP SURVEILLANCE PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">
              One Unified Data Stream from Prescription to Regional Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              MediGuard closes the clinical loop by continuously connecting 7 interconnected stages.
            </p>
          </div>

          {/* Pipeline Flow Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { step: '01', title: 'Prescription', icon: Stethoscope, tag: 'EHR / CPOE' },
              { step: '02', title: 'Dispensing', icon: Pill, tag: 'Batch Barcode' },
              { step: '03', title: 'Laboratory', icon: Microscope, tag: 'Culture & AST' },
              { step: '04', title: 'Resistance', icon: BarChart3, tag: 'CLSI M100' },
              { step: '05', title: 'Signals', icon: AlertTriangle, tag: 'Deterministic' },
              { step: '06', title: 'Investigation', icon: FileSearch, tag: 'Multi-Role' },
              { step: '07', title: 'Intelligence', icon: Sparkles, tag: 'Gemini Copilot' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 hover:border-sky-500/80 transition-all group"
              >
                <div className="text-[10px] font-mono text-sky-400 font-bold">STAGE {s.step}</div>
                <div className="w-10 h-10 rounded-xl bg-slate-700/60 text-sky-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-white font-heading">{s.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">{s.tag}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>End-to-End Clinical Verification:</strong> Every prescription deducts inventory, matches laboratory cultures, and generates auditable forensic records across all 25 tables.
              </span>
            </div>
            <Link
              to="/how-it-works"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shrink-0 transition-colors"
            >
              Explore 6-Stage Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PLATFORM OVERVIEW (6 Capabilities)                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            FULL-SPECTRUM INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            Six Enterprise Healthcare Defense Pillars
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Everything your hospital network, laboratory chain, or public health agency needs to detect resistance, safeguard medication inventory, and enforce antimicrobial stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Medication Safety & Batch Registry',
              desc: 'Verify manufacture lots, detect counterfeit packaging, track cold-chain temperature deviations, and trigger instant quarantine recalls.',
              image: CLINICAL_IMAGES.pharmacyDispensing,
              badge: 'GS1 Barcode Verified',
            },
            {
              title: 'AMR Surveillance & Geospatial Radar',
              desc: 'Real-time spatial resistance density across hospital wards and geographic regions with denominator-controlled isolate testing.',
              image: CLINICAL_IMAGES.epidemiologyMonitoringCenter,
              badge: 'Spatial Denominator Math',
            },
            {
              title: 'Microbiology Laboratory Bench',
              desc: 'Digital specimen accessioning with integrated CLSI M100 and EUCAST susceptibility breakpoint interpretations and MIC logging.',
              image: CLINICAL_IMAGES.microbiologyLab,
              badge: 'CLSI M100 & EUCAST',
            },
            {
              title: 'Antimicrobial Stewardship Center',
              desc: 'Automate WHO AWaRe 60% Access target monitoring, calculate Days of Therapy (DOT), and deliver prescriber audit & feedback.',
              image: CLINICAL_IMAGES.doctorPrescribingStethoscope,
              badge: 'WHO AWaRe 60% Target',
            },
            {
              title: 'Clinical Signal & Investigation Triage',
              desc: 'Deterministic rules flag repeat prescriptions within 14 days and reserve antibiotic spikes, dispatching multidisciplinary investigations.',
              image: CLINICAL_IMAGES.heroHospitalCommand,
              badge: 'Mandatory Justification',
            },
            {
              title: 'Grounded AI Clinical Copilot',
              desc: 'Google Gemini AI proxy analyzes authorized hospital telemetry to provide grounded, structured epidemiological insights with non-diagnostic boundaries.',
              image: CLINICAL_IMAGES.globalResearchGenomics,
              badge: 'Grounded Gemini 3.5',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col group"
            >
              <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-slate-800 shadow-xs">
                  {card.badge}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-2">
                    {card.desc}
                  </p>
                </div>
                <Link
                  to="/solutions"
                  className="pt-2 text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRODUCT SHOWCASE (Interactive Tabs Mockup)                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            INTERACTIVE PLATFORM EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            Explore MediGuard’s Specialized Workspaces
          </h2>
          <p className="text-sm text-slate-600">
            Click across core modules to preview live clinical telemetry, decision support, and surveillance controls.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pb-6">
          {[
            { id: 'command', label: 'Global Command Center', icon: Activity },
            { id: 'amr', label: 'AMR Heatmap & Surveillance', icon: Globe },
            { id: 'meds', label: 'Medication Safety & Batches', icon: Pill },
            { id: 'lab', label: 'Microbiology Laboratory AST', icon: Microscope },
            { id: 'ai', label: 'Gemini AI Surveillance Copilot', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mockup Showcase Frame */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10">
          {/* Simulated Mac/Browser Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="pl-2 font-mono text-[11px] text-slate-500">
                app.mediguard.health/{activeTab}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL RLS Active • Facility: Mayo Memorial</span>
            </div>
          </div>

          {/* Dynamic Tab Content Display */}
          <div className="pt-6 min-h-[360px]">
            {activeTab === 'command' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-mono">Active Surveillance Signals</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">4 Signals</div>
                    <div className="text-[10px] text-rose-600 font-bold">1 Critical • 2 High</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-mono">Hospital Resistance Density</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">27.4%</div>
                    <div className="text-[10px] text-amber-600 font-bold">+1.2% above baseline</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-mono">WHO Access Antibiotic Ratio</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">68.2%</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Compliant (&ge;60%)</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] text-slate-500 font-mono">Verified Batch Inventory</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">98.9%</div>
                    <div className="text-[10px] text-sky-600 font-bold">0 Recalled dispensed</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Active Incident Dispatch Queue</span>
                    <span className="font-mono text-sky-600">Updated Real-Time</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="font-bold text-slate-900">Carbapenem-Resistant Enterobacterales (CRE) in ICU-Bed-04</span>
                      </div>
                      <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Triage Dispatched</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="font-bold text-slate-900">High-Risk Repeat Antibiotic Dispensing within 14 Days (Azithromycin)</span>
                      </div>
                      <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Pharmacist Review</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amr' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
                    <div className="text-[11px] text-rose-700 font-mono font-bold">CRITICAL PRIORITY</div>
                    <div className="text-xl font-bold text-slate-900">Acinetobacter baumannii</div>
                    <div className="text-xs text-rose-800 font-mono">Carbapenem Resistance: 64.2%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
                    <div className="text-[11px] text-rose-700 font-mono font-bold">CRITICAL PRIORITY</div>
                    <div className="text-xl font-bold text-slate-900">Klebsiella pneumoniae</div>
                    <div className="text-xs text-rose-800 font-mono">ESBL / Carbapenem Resistance: 41.8%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <div className="text-[11px] text-amber-700 font-mono font-bold">HIGH PRIORITY</div>
                    <div className="text-xl font-bold text-slate-900">Staphylococcus aureus (MRSA)</div>
                    <div className="text-xs text-amber-800 font-mono">Methicillin Resistance: 32.1%</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">Interactive Geographic Antibiogram Matrix</span>
                    <p className="text-[11px] text-slate-500">Conforms to CLSI M100 and WHO GLASS surveillance standards.</p>
                  </div>
                  <Link to="/app/amr-heatmap" className="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-xs">
                    View Live Heatmap
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'meds' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">GS1 Digital Link Batch Verification</span>
                    <p className="text-[11px] text-slate-500">Scanned barcode verifies manufacturer, serial, and temperature integrity.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">Cold Chain Stable: 4.2°C</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="text-slate-500 font-mono text-[11px]">Batch #MER-2023-X91</div>
                    <div className="font-bold text-slate-900">Meropenem 1g Powder for Injection</div>
                    <div className="text-emerald-600 font-mono font-bold">Status: Verified • Expiry: Dec 2026</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="text-slate-500 font-mono text-[11px]">Batch #AZI-2024-SUSP</div>
                    <div className="font-bold text-slate-900">Azithromycin 500mg Oral Tablet</div>
                    <div className="text-rose-600 font-mono font-bold">Status: Quarantined • Recall Alert Active</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lab' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-slate-400 font-mono text-[11px]">SPECIMEN ACCESSION</div>
                    <div className="font-bold text-slate-900 font-mono">SPC-2026-09021</div>
                    <div className="text-slate-600">Blood Culture • ICU Ward 3</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-slate-400 font-mono text-[11px]">ISOLATED ORGANISM</div>
                    <div className="font-bold text-slate-900 italic">Escherichia coli</div>
                    <div className="text-rose-700 font-bold">Gram-negative bacilli</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-slate-400 font-mono text-[11px]">CLSI INTERPRETATION</div>
                    <div className="font-bold text-slate-900">Ciprofloxacin: Resistant (R)</div>
                    <div className="text-slate-600 font-mono">MIC: &gt; 4 &mu;g/mL</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold text-indigo-950">Grounded Gemini Surveillance Telemetry Query</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200 font-bold">
                    Scope: Mayo Memorial • 42 Cultures
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-white border border-indigo-100 text-slate-800">
                    <strong>User Clinical Question:</strong> "Analyze recent carbapenem resistance in Mayo Memorial ICU isolates."
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-900 text-indigo-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-sky-300 text-[11px] font-mono font-bold">
                      <span>COPILOT ANALYSIS (DECISION SUPPORT ONLY):</span>
                    </div>
                    <p className="text-xs leading-relaxed text-indigo-100">
                      Preliminary surveillance findings indicate 3 isolates of <em>K. pneumoniae</em> demonstrated meropenem resistance (MIC &gt; 16 mg/L) across ICU beds 02, 04, and 07 over the past 14 days. Environmental swab investigation is advised. Non-diagnostic.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DEDICATED AI COPILOT SECTION                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-indigo-900/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>SERVERLESS GOOGLE GEMINI INTEGRATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-heading leading-snug">
                Grounded Clinical AI for Rapid Epidemiological Interpretation
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                MediGuard’s AI Copilot does not invent medical facts. Connected directly to your authorized facility records through a secure server-side proxy, it synthesizes microbiological sensitivity patterns, WHO AWaRe guidelines, and batch anomalies in plain clinical language.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bounded to authenticated hospital data scope</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict non-diagnostic clinical boundaries enforced</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Server-side API proxy: Zero client-side key leakage</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/app/ai-assistant"
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Grounded AI Assistant</span>
                </Link>
              </div>
            </div>

            {/* Visual Chat Mockup */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-800/60 backdrop-blur-md shadow-xl space-y-3 text-xs">
                {/* User Message */}
                <div className="flex gap-2.5 items-start justify-end">
                  <div className="p-3 rounded-2xl rounded-tr-xs bg-sky-600 text-white max-w-sm">
                    How is our hospital network performing against the WHO AWaRe 60% Access antibiotic target this quarter?
                  </div>
                </div>

                {/* AI Assistant Grounded Response */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-800 border border-slate-700 text-slate-200 space-y-2 max-w-md">
                    <div className="text-[10px] font-mono text-indigo-400 flex items-center justify-between border-b border-slate-700 pb-1">
                      <span>SCOPE: 1,420 PRESCRIBED COURSES • PUNJAB NETWORK</span>
                      <span className="text-emerald-400">Grounded</span>
                    </div>
                    <p className="text-xs leading-relaxed">
                      Your network currently maintains a <strong>68.2% Access antibiotic prescribing ratio</strong>, exceeding the WHO minimum threshold of 60%. However, Mayo Memorial Hospital pediatric ward has recorded a +14% surge in Reserve-tier cephalosporin prescriptions over the past 10 days.
                    </p>
                    <div className="p-2 rounded-lg bg-slate-900/60 text-[11px] text-amber-300 font-mono">
                      Stewardship recommendation: Audit pediatric respiratory infection indications.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. AMR INTELLIGENCE & CRITICAL PATHOGENS                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 inline-block">
              WHO PRIORITY PATHOGEN RADAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
              Real-Time Resistance Tracking Across Critical Bacterial Taxa
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              MediGuard tracks resistance trajectories according to WHO Priority Pathogen lists. Continuous data ingestion correlates susceptibility breakpoints with patient clinical outcomes.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">Carbapenem-Resistant Enterobacterales (CRE)</div>
                  <div className="text-[11px] text-slate-500">Target: Zero hospital-acquired spread</div>
                </div>
                <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                  Critical Priority
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">Methicillin-Resistant S. aureus (MRSA)</div>
                  <div className="text-[11px] text-slate-500">Active ward screening &amp; nasal PCR tracking</div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  High Priority
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs">Vancomycin-Resistant Enterococci (VRE)</div>
                  <div className="text-[11px] text-slate-500">Contact isolation compliance alerts</div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  High Priority
                </span>
              </div>
            </div>

            <Link
              to="/app/amr-heatmap"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-500"
            >
              <span>Explore full Antibiogram Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100">
              <img
                src={CLINICAL_IMAGES.petriDishCulture}
                alt="Microbiology petri dish culture isolate"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">CLSI M100 Disk Diffusion &amp; E-Test Alignment</span>
                  <span className="font-mono text-emerald-600 font-bold">Verified Reference Engine</span>
                </div>
                <p className="text-xs text-slate-500">
                  Zone diameter and minimum inhibitory concentration (MIC) values are automatically mapped against current CLSI M100 interpretive categories (Susceptible, Intermediate, Resistant).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. MEDICATION SAFETY & BATCH INTEGRITY                                     */}
      {/* ========================================================================= */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
              PHARMACEUTICAL INTEGRITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
              Preventing Counterfeit Dispensing &amp; Stock Outliers
            </h2>
            <p className="text-sm text-slate-600">
              Every pharmaceutical unit administered to patients is verified against manufacturing registries and storage sensors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                GS1 DataMatrix Verification
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scan pharmaceutical barcodes to verify manufacturing licenses, active pharmaceutical ingredients (API), and recall databases before dispensing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                Cold-Chain Temperature Telemetry
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Continuous IoT sensor logging prevents the administration of temperature-degraded antibiotics that have lost bioavailability.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <BadgeAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                14-Day Repeat Dispensing Radar
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated deterministic alerts flag duplicate antibiotic courses dispensed to the same pseudonymous patient within a 14-day therapeutic window.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. HEALTHCARE ROLES (9 Dedicated Role Workspaces)                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            AUTHENTICATED ROLE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            Tailored Workspaces for Every Healthcare Stakeholder
          </h2>
          <p className="text-sm text-slate-600">
            MediGuard eliminates generic dashboards. Every user logs into a specialized clinical environment with role-specific KPIs, workflows, and strict privilege boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCards.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${r.accent}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-800">
                      <Icon className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {r.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {r.role}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1.5">
                      {r.desc}
                    </p>
                  </div>

                  <div className="pt-2 space-y-1.5 border-t border-slate-200/60">
                    {r.capabilities.map((c, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={r.path}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 text-xs font-bold text-center transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. HOW MEDIGUARD WORKS (5-Step Clinical Workflow)                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            IMPLEMENTATION BLUEPRINT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            How MediGuard Operates in Five Sequential Steps
          </h2>
          <p className="text-sm text-slate-600">
            Designed for non-disruptive integration into existing hospital informatics systems.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-10 pl-6 sm:pl-10">
          {[
            {
              step: '01',
              title: 'Electronic Prescription Ingestion',
              desc: 'Hospital EHR / CPOE systems push antimicrobial orders into MediGuard. Formulary engines cross-reference ICD-10 indication and categorize against WHO AWaRe.',
            },
            {
              step: '02',
              title: 'Pharmacy Barcode Batch Clearance',
              desc: 'Pharmacists scan GS1 DataMatrix barcodes at dispensing stations. Batches are checked against recall databases, and inventory stock floors are immutably decremented.',
            },
            {
              step: '03',
              title: 'Microbiology Laboratory AST Accessioning',
              desc: 'Diagnostic benches record disk diffusion zones or automated MIC readings. CLSI M100 rules automatically interpret breakpoints and identify multi-drug resistant isolates.',
            },
            {
              step: '04',
              title: 'Automated Deterministic Signal Triage',
              desc: 'If reserve antibiotic spikes, repeat dispensing patterns, or CRE pathogens appear, deterministic algorithms alert stewardship teams without human delay.',
            },
            {
              step: '05',
              title: 'Multidisciplinary Investigation & Intelligence',
              desc: 'Infection preventionists and clinical pharmacists document clinical findings in collaborative workspaces, while Gemini AI synthesizes aggregate epidemiological trends.',
            },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-white border-2 border-sky-600 text-sky-600 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. SECURITY & TRUST (Enterprise Security Architecture)                    */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800">
              HEALTHCARE GRADE CYBERSECURITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">
              Built on PostgreSQL Row-Level Security &amp; Forensic Auditing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Every byte of clinical telemetry is protected by enterprise isolation safeguards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">PostgreSQL Row-Level Security</h3>
              <p className="text-slate-300 leading-relaxed">
                Database queries are cryptographically restricted to the authenticated organization's tenancy. Cross-tenant leakage is impossible at the database engine level.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">Strict Role-Based Access (RBAC)</h3>
              <p className="text-slate-300 leading-relaxed">
                Prescribers cannot view administrative telemetry, pharmacists are restricted to dispensing registries, and lab scientists access specimen consoles exclusively.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">Pseudonymous Patient Hashing</h3>
              <p className="text-slate-300 leading-relaxed">
                Patient records utilize SHA-256 pseudonymous accession identifiers (e.g. PAT-90823-X). No unencrypted personal health numbers are exposed to analytics modules.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">Append-Only Audit Trails</h3>
              <p className="text-slate-300 leading-relaxed">
                Every sensitive clinical event (prescribing, batch verification, signal dismissal) is immutably logged with actor timestamps and cryptographic before/after diffs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">Serverless Gemini API Proxy</h3>
              <p className="text-slate-300 leading-relaxed">
                AI queries execute strictly on serverless backends (`/api/ai/chat`). Client-side JavaScript bundles contain zero private API keys or service role tokens.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white font-heading">Stock Floor Safety Bounds</h3>
              <p className="text-slate-300 leading-relaxed">
                Inventory algorithms enforce strict non-negative quantity boundaries, preventing corrupted negative stock counts across hospital pharmacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. RESEARCH & STANDARDS ALIGNMENT                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 inline-block">
            GLOBAL EVIDENCE STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 tracking-tight">
            Built in Harmonization with International Guidelines
          </h2>
          <p className="text-sm text-slate-600">
            MediGuard conforms to clinical consensus guidelines established by global health authorities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { name: 'WHO AWaRe', sub: 'Access, Watch, Reserve Classification 2024' },
            { name: 'CLSI M100', sub: 'Clinical & Laboratory Standards Institute' },
            { name: 'EUCAST', sub: 'European Committee on AST Breakpoints' },
            { name: 'WHO GLASS', sub: 'Global AMR Surveillance System' },
            { name: 'GS1 Standards', sub: 'Healthcare Barcode Verification' },
          ].map((std, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <div className="text-sm font-bold text-slate-900 font-heading">{std.name}</div>
              <div className="text-[10px] text-slate-500">{std.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. GLOBAL VISION ("From local signals to global health intelligence")    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-sky-50 border border-sky-200 p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-sky-800 font-bold uppercase tracking-wider">
              OUR GLOBAL HEALTH MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900">
              From Local Signals to Global Health Intelligence.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When a laboratory in Lahore isolates a resistant strain, when a clinic in Karachi intercepts a recalled batch, and when an ICU in Islamabad optimizes stewardship — MediGuard connects every datapoint into a resilient global defense against the silent pandemic of AMR.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. FINAL CALL TO ACTION (Large Premium CTA)                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight">
              Build a Safer Medication Ecosystem with MediGuard.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Join forward-thinking hospital networks, microbiological laboratories, and public health ministries operating with real-time AMR intelligence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-600/25 transition-all"
            >
              Explore Platform Workspaces
            </Link>
            <Link
              to="/resources"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              Request Institutional Demo
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-slate-400 font-mono relative z-10">
            Compliant with WHO AWaRe • Real PostgreSQL RLS • 9 Dedicated Roles
          </div>
        </div>
      </section>
    </div>
  );
};
