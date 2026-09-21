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
  Network,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';
import { Button, SectionHeader, Metric } from '@/components/design-system';

export const HomePage: React.FC = () => {
  // Interactive Product Showcase state (6 tabs)
  const [activeTab, setActiveTab] = useState<
    'command' | 'meds' | 'lab' | 'amr' | 'investigation' | 'ai'
  >('command');

  // Interactive Global Intelligence Region state
  const [selectedRegion, setSelectedRegion] = useState<'pakistan' | 'southAsia' | 'global'>('pakistan');

  // 9 Dedicated Healthcare Roles Data with Categorized Clinical Photography
  const roleCards = [
    {
      role: 'Doctor / Prescriber',
      icon: Stethoscope,
      accent: 'border-sky-200 hover:border-sky-400 bg-sky-50/40',
      tag: 'Clinical Prescribing',
      path: '/doctor',
      image: CLINICAL_IMAGES.doctor,
      whatTheySee: 'EHR prescription entries, patient antimicrobial history, AWaRe classification, bed-level AST advisories.',
      whatTheyCanDo: 'Generate rapid evidence-based prescriptions, verify formulary dosing, view prior antibiotic exposure.',
      previewText: 'Active prescribing workstation with automated formulary safety checks.',
    },
    {
      role: 'Clinical Pharmacist',
      icon: Pill,
      accent: 'border-teal-200 hover:border-teal-400 bg-teal-50/40',
      tag: 'Medication Safety',
      path: '/pharmacist',
      image: CLINICAL_IMAGES.pharmacist,
      whatTheySee: 'Live dispensing queue, GS1 serial numbers, cold-chain temperature deviations, stock floor alerts.',
      whatTheyCanDo: 'Scan & verify medicine batches, intercept 14-day repeat dispensing, trigger immediate recall quarantines.',
      previewText: 'Closed-loop dispensing queue with GS1 DataMatrix anti-counterfeit scanning.',
    },
    {
      role: 'Laboratory Scientist',
      icon: Microscope,
      accent: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40',
      tag: 'Diagnostics & AST',
      path: '/laboratory',
      image: CLINICAL_IMAGES.laboratory,
      whatTheySee: 'Specimen accessioning queue, Gram-stain morphology, disk diffusion zone diameters, E-test MIC titers.',
      whatTheyCanDo: 'Log phenotypic AST results, apply automated CLSI M100 / EUCAST rules, escalate critical pathogen isolates.',
      previewText: 'Digital microbiology bench with quantitative broth microdilution interpretation.',
    },
    {
      role: 'Stewardship Lead',
      icon: Shield,
      accent: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40',
      tag: 'WHO AWaRe Oversight',
      path: '/stewardship',
      image: CLINICAL_IMAGES.doctorTeam,
      whatTheySee: 'Hospital-wide AWaRe 60% Access target, Days of Therapy (DOT), Prescriber compliance benchmarking.',
      whatTheyCanDo: 'Issue closed-loop audit & feedback advisories, restrict Reserve-tier agents, track institutional interventions.',
      previewText: 'Antimicrobial stewardship dashboard benchmarked against WHO 2024 targets.',
    },
    {
      role: 'Epidemiologist',
      icon: LineChart,
      accent: 'border-cyan-200 hover:border-cyan-400 bg-cyan-50/40',
      tag: 'Population Health',
      path: '/epidemiology',
      image: CLINICAL_IMAGES.epidemiology,
      whatTheySee: 'Regional geospatial heatmaps, multi-center resistance curves, emerging pathogen cluster alerts.',
      whatTheyCanDo: 'Model 90-day predictive surge trajectories, isolate outbreak clusters, export GLASS-compatible dossiers.',
      previewText: 'Catchment zone macro-surveillance with denominator-disciplined resistance math.',
    },
    {
      role: 'Surveillance Officer',
      icon: Activity,
      accent: 'border-amber-200 hover:border-amber-400 bg-amber-50/40',
      tag: 'Signal Center',
      path: '/surveillance',
      image: CLINICAL_IMAGES.publicHealth,
      whatTheySee: 'Real-time safety signals, deterministic alarm triggers, triage urgency scores, pending investigations.',
      whatTheyCanDo: 'Triage clinical signals, assign multidisciplinary investigation teams, enforce mandatory dismissal justification.',
      previewText: 'Incident-response investigation workspace with deterministic telemetry rules.',
    },
    {
      role: 'Organization Admin',
      icon: Building2,
      accent: 'border-blue-200 hover:border-blue-400 bg-blue-50/40',
      tag: 'Governance',
      path: '/organization',
      image: CLINICAL_IMAGES.heroLab,
      whatTheySee: 'Connected hospital facilities, staff credentialing directory, WHONET / CLSI data quality audits.',
      whatTheyCanDo: 'Manage facility network onboarding, assign role-based credentials, configure tenant governance policies.',
      previewText: 'Multi-facility healthcare governance hub with cryptographic tenant isolation.',
    },
    {
      role: 'Platform Administrator',
      icon: Server,
      accent: 'border-slate-300 hover:border-slate-500 bg-slate-100/60',
      tag: 'Enterprise Command',
      path: '/admin',
      image: CLINICAL_IMAGES.aiTelemetry,
      whatTheySee: 'Multi-tenant database engine, HL7 FHIR connectors, background ETL jobs, immutable audit logs.',
      whatTheyCanDo: 'Monitor platform uptime, verify cryptographic audit logs, inspect serverless AI proxy execution.',
      previewText: 'Global infrastructure console with monotonic PostgreSQL audit log verification.',
    },
    {
      role: 'Scientific Researcher',
      icon: FileSearch,
      accent: 'border-purple-200 hover:border-purple-400 bg-purple-50/40',
      tag: 'Evidence & Discovery',
      path: '/researcher',
      image: CLINICAL_IMAGES.microbiology,
      whatTheySee: 'Pseudonymized longitudinal AST datasets, multicenter isolate cohorts, CLSI M39-A4 antibiograms.',
      whatTheyCanDo: 'Analyze non-human-identifiable resistance trends, download standardized research CSVs, inspect methodology.',
      previewText: 'De-identified scientific AMR data portal with read-only cryptographic integrity.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 py-4 text-left">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Headline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
              <span>GLOBAL MEDICATION SAFETY + AMR INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-[1.12]">
              See medication risk.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#0B1F3A]">
                Understand resistance.
              </span>{' '}
              Act before it spreads.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              MediGuard connects hospital prescribing, pharmacy batch verification, and microbiology laboratory diagnostics into a unified, closed-loop surveillance platform powered by grounded clinical AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/solutions"
                className="px-6 py-3.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-md shadow-sky-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/register"
                className="px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <Lock className="w-4 h-4 text-sky-400" />
                <span>Request a Demo</span>
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
                <span>PostgreSQL RLS Multi-Tenant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Editorial Healthcare Image with Overlay Floating Intelligence Cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative gradient glow */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

              {/* Main Clinical Hospital Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10 bg-slate-900 aspect-[4/3]">
                <img
                  src={CLINICAL_IMAGES.hero}
                  alt="Doctor reviewing clinical surveillance telemetry"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Live Telemetry Pulse Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-slate-800 border border-white/40 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-ping" />
                  <span>Real-Time Surveillance Stream • Active</span>
                </div>
              </div>

              {/* Floating Intelligence Card 1: Top Right - AMR Risk & Critical Signals */}
              <div className="absolute -top-6 -right-3 sm:-right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 space-y-2 max-w-[200px] animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">AMR RISK</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </div>
                <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">32.8%</div>
                <div className="text-[10px] text-rose-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+4.2% regional surge</span>
                </div>
              </div>

              {/* Floating Intelligence Card 2: Bottom Left - Verified Batches & Critical Signals */}
              <div className="absolute -bottom-8 -left-3 sm:-left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 space-y-2 min-w-[220px]">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-slate-400 uppercase">VERIFIED BATCHES</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    GS1 OK
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-[#0B1F3A] font-mono">18,420</div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block">SIGNALS</span>
                    <span className="font-bold text-rose-600">07 Critical</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">SOURCES</span>
                    <span className="font-bold text-[#0D9488]">124 Feeds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Below Hero: "Designed for / Trusted by" Strip */}
        <div className="pt-16 pb-4 text-center border-t border-slate-200/80 mt-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 pb-6 font-bold">
            DESIGNED FOR &amp; DEPLOYED ACROSS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm font-bold text-slate-600 font-heading">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0284C7]" />
              <span>Hospitals &amp; Health Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <Microscope className="w-4 h-4 text-[#0D9488]" />
              <span>Microbiology Laboratories</span>
            </div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#0284C7]" />
              <span>Hospital &amp; Retail Pharmacies</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6366F1]" />
              <span>Public Health Authorities</span>
            </div>
            <div className="flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-purple-600" />
              <span>Research Institutions</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM                                                            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 inline-block">
            THE CRITICAL HEALTHCARE GAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-tight">
            Healthcare data is everywhere.<br />
            Healthcare intelligence is not.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Hospitals generate millions of prescription logs, dispensing records, and laboratory cultures. But because systems operate in isolation, clinicians cannot see emerging resistance surges in time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Problem Block 1: Medication Safety */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A] font-heading">Medication Safety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Counterfeit and degraded antibiotic batches bypass verification, while repeat dispensing within 14 days goes undetected across pharmacies.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-mono text-slate-400">IMPACT METRIC</div>
              <div className="text-xl font-bold font-mono text-rose-600">1 in 10</div>
              <div className="text-[11px] text-slate-500">Medical products substandard in developing nations (WHO)</div>
            </div>
          </div>

          {/* Problem Block 2: Antibiotic Resistance */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A] font-heading">Antibiotic Resistance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empiric overuse of Reserve-tier antimicrobials breeds Carbapenem-Resistant Enterobacterales (CRE) and MRSA without stewardship oversight.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-mono text-slate-400">IMPACT METRIC</div>
              <div className="text-xl font-bold font-mono text-amber-600">1.27M</div>
              <div className="text-[11px] text-slate-500">Direct global deaths attributable to bacterial AMR annually</div>
            </div>
          </div>

          {/* Problem Block 3: Fragmented Data */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A] font-heading">Fragmented Data</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EHR prescriptions, pharmacy ERP stocks, and microbiology LIS instruments remain locked in disconnected, incompatible database silos.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-mono text-slate-400">IMPACT METRIC</div>
              <div className="text-xl font-bold font-mono text-[#0284C7]">72 Hours</div>
              <div className="text-[11px] text-slate-500">Average time lag between culture isolate and clinician review</div>
            </div>
          </div>

          {/* Problem Block 4: Delayed Detection */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1F3A] font-heading">Delayed Detection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hospital outbreak signals are discovered weeks late during manual retrospective reviews, rather than through live deterministic telemetry.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="text-[11px] font-mono text-slate-400">IMPACT METRIC</div>
              <div className="text-xl font-bold font-mono text-[#6366F1]">0 Warnings</div>
              <div className="text-[11px] text-slate-500">Proactive real-time alerts provided by legacy hospital software</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MEDIGUARD SOLUTION: HORIZONTAL LIFECYCLE                               */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-[#0D9488] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800">
              CLOSED-LOOP ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              One intelligence layer across the entire medication lifecycle.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              From the clinician’s initial electronic order to regional epidemiological reporting, every milestone is verified in real time.
            </p>
          </div>

          {/* Horizontal Lifecycle Connected Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { step: '01', title: 'Prescription', icon: Stethoscope, tag: 'EHR / CPOE' },
              { step: '02', title: 'Dispensing', icon: Pill, tag: 'Pharmacy Queue' },
              { step: '03', title: 'Batch Verification', icon: QrCode, tag: 'GS1 Serialization' },
              { step: '04', title: 'Laboratory', icon: Microscope, tag: 'Culture & AST' },
              { step: '05', title: 'Resistance Detection', icon: BarChart3, tag: 'CLSI M100' },
              { step: '06', title: 'Investigation', icon: FileSearch, tag: 'Triage & Notes' },
              { step: '07', title: 'Public Health', icon: Globe, tag: 'Macro-Surveillance' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 hover:border-[#0D9488] transition-all group relative"
              >
                <div className="text-[10px] font-mono text-[#0D9488] font-bold">STAGE {s.step}</div>
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
              <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0" />
              <span>
                <strong>Guaranteed Clinical Closed Loop:</strong> Inventory cannot fall below zero, specimens are mapped to CLSI breakpoints, and deterministic signals require mandatory clinical justification before dismissal.
              </span>
            </div>
            <Link
              to="/how-it-works"
              className="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs shrink-0 transition-colors"
            >
              Explore 7-Stage Pipeline
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PLATFORM SHOWCASE (6 Tabs)                                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            PLATFORM SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
            High-Fidelity Workstations for Clinical Operations
          </h2>
          <p className="text-sm text-slate-600">
            Navigate across the core intelligence modules powering modern hospital networks and antimicrobial surveillance.
          </p>
        </div>

        {/* 6 Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 pb-6">
          {[
            { id: 'command', label: 'Clinical Command Center', icon: Activity },
            { id: 'meds', label: 'Medication Safety', icon: Pill },
            { id: 'lab', label: 'Microbiology Laboratory', icon: Microscope },
            { id: 'amr', label: 'AMR Intelligence', icon: BarChart3 },
            { id: 'investigation', label: 'Investigation Workspace', icon: FileSearch },
            { id: 'ai', label: 'AI Copilot', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1F3A] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0D9488]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mock Showcase Frame */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 text-left">
          {/* Browser Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="pl-2 font-mono text-[11px] text-slate-500">
                https://app.mediguard.health/workspace/{activeTab}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Tenant RLS Secure • Mayo Memorial Hospital</span>
            </div>
          </div>

          {/* Dynamic Tab Body */}
          <div className="min-h-[380px]">
            {activeTab === 'command' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <Metric label="Active Signals" value="07" subtext="3 Critical • 4 High" accentColor="rose" />
                  <Metric label="Network Resistance" value="23.4%" subtext="+1.8% vs 6-mo baseline" accentColor="amber" />
                  <Metric label="WHO Access Ratio" value="68.2%" subtext="Target ≥60% Compliant" accentColor="teal" />
                  <Metric label="Batch Verification" value="99.4%" subtext="Zero recalls dispensed" accentColor="blue" />
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Deterministic Alert Triage Queue</span>
                    <span className="text-sky-600 font-mono">Live Stream</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        <span className="font-bold text-slate-900">Carbapenem-Resistant Enterobacterales (CRE) in ICU Bed-04</span>
                      </div>
                      <span className="font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
                        CRITICAL TRIAGE
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="font-bold text-slate-900">14-Day Repeat Antibiotic Dispensing Alert: Azithromycin 500mg</span>
                      </div>
                      <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                        PHARMACIST REVIEW
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meds' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">LOT #MER-2023-X91</div>
                    <div className="font-bold text-slate-900 text-sm">Meropenem 1g IV (Meronem)</div>
                    <div className="text-emerald-600 text-xs font-mono font-bold">Status: Verified • Cold Chain: 4.1°C</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">LOT #CIP-2024-B12</div>
                    <div className="font-bold text-slate-900 text-sm">Ciprofloxacin 500mg Tablets</div>
                    <div className="text-emerald-600 text-xs font-mono font-bold">Status: Verified • Stock: 1,420 Units</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-rose-200 bg-rose-50/30 space-y-1">
                    <div className="text-[11px] font-mono text-rose-500">LOT #REC-2024-SUSP</div>
                    <div className="font-bold text-slate-900 text-sm">Ceftriaxone 1g Injectable</div>
                    <div className="text-rose-600 text-xs font-mono font-bold">Status: Quarantined • Recall Alert Active</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">GS1 DataMatrix &amp; Non-Negative Inventory Floor Protection</span>
                    <p className="text-slate-500 text-[11px]">System mathematically rejects negative stock decrements upon pharmacy dispensing.</p>
                  </div>
                  <Link to="/pharmacist" className="px-4 py-2 rounded-xl bg-[#0B1F3A] text-white font-bold text-xs">
                    Open Safety Center
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'lab' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">ACCESSION #SPC-2026-881</div>
                    <div className="font-bold text-slate-900 text-sm">Blood Culture • ICU Ward</div>
                    <div className="text-slate-600 text-xs font-mono">Organism: K. pneumoniae</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">AST BREAKPOINT INTERPRETATION</div>
                    <div className="font-bold text-rose-700 text-sm">Meropenem: Resistant (R)</div>
                    <div className="text-slate-600 text-xs font-mono">MIC &gt; 16 &mu;g/mL (CLSI M100-ED33)</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">WHO GLASS CLASSIFICATION</div>
                    <div className="font-bold text-[#0B1F3A] text-sm">Critical Priority Pathogen</div>
                    <div className="text-emerald-700 text-xs font-mono font-bold">Automated Alert Dispatched</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Quantitative E-Test &amp; Microdilution Interpretation Engine</span>
                    <p className="text-slate-500 text-[11px]">Built-in disk diffusion millimeter calipers and automated MIC interpretive criteria.</p>
                  </div>
                  <Link to="/laboratory" className="px-4 py-2 rounded-xl bg-[#0D9488] text-white font-bold text-xs">
                    Open Microbiology Bench
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'amr' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="text-[10px] font-mono font-bold text-rose-700">WHO CRITICAL PRIORITY</div>
                    <div className="text-lg font-bold text-slate-900">Acinetobacter baumannii</div>
                    <div className="text-xs text-rose-800 font-mono font-bold">Carbapenem Resistance: 64.2%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="text-[10px] font-mono font-bold text-rose-700">WHO CRITICAL PRIORITY</div>
                    <div className="text-lg font-bold text-slate-900">Klebsiella pneumoniae</div>
                    <div className="text-xs text-rose-800 font-mono font-bold">ESBL / Carbapenem Resistance: 41.8%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="text-[10px] font-mono font-bold text-amber-700">WHO HIGH PRIORITY</div>
                    <div className="text-lg font-bold text-slate-900">Staphylococcus aureus (MRSA)</div>
                    <div className="text-xs text-amber-800 font-mono font-bold">Methicillin Resistance: 32.1%</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Interactive Catchment Zone Antibiogram Matrix</span>
                    <p className="text-slate-500 text-[11px]">Conforms to CLSI M39-A4 cumulative antibiogram rules and WHO GLASS protocols.</p>
                  </div>
                  <Link to="/epidemiology" className="px-4 py-2 rounded-xl bg-[#0284C7] text-white font-bold text-xs">
                    View Regional Heatmap
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'investigation' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Investigation #INV-2026-092: ICU Cluster Evaluation</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      In Progress
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Multidisciplinary review initiated following 3 isolates of Carbapenem-Resistant <em>K. pneumoniae</em> across neighboring ICU beds within 72 hours.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-slate-500">
                    <div>Lead: Dr. Farooq (Stewardship)</div>
                    <div>Floor: Critical Care Unit</div>
                    <div>Action: Environmental Swabs Dispatched</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Mandatory clinical justification logged before any alert dismissal.</span>
                  <Link to="/surveillance" className="text-[#0284C7] font-bold">
                    View Investigation Workspace &rarr;
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold font-heading text-sm">Google Gemini Grounded Surveillance Copilot</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/80 border border-indigo-700 text-indigo-300">
                    Serverless Edge Proxy
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 text-[10px] font-mono block">USER QUERY:</span>
                    <span className="font-semibold text-slate-100">"Why did resistance to ceftriaxone increase this quarter?"</span>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-900/60 border border-indigo-700/80 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300">
                      <span>EVIDENCE: 4 REPORTING FACILITIES • 124 AST ISOLATES</span>
                      <span className="text-emerald-400 font-bold">CONFIDENCE: 94%</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-200">
                      Resistance to ceftriaxone increased from <strong>21.4% to 31.8%</strong> across 4 reporting facilities. The primary vector is ESBL-producing <em>E. coli</em> in outpatient urinary isolates. Recommended action: Audit empiric third-generation cephalosporin prescribing in emergency triage.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DEDICATED AI COPILOT SECTION                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#020617] text-white p-8 sm:p-12 lg:p-16 border border-indigo-900/60 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-900/70 border border-indigo-700/70 text-indigo-300 text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>GROUNDED CLINICAL AI ENGINE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight">
                Synthesize surveillance trends in natural language.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                MediGuard’s AI Copilot does not hallucinate medical facts. Directly wired to your hospital’s authorized AST cultures and dispensing telemetry through an isolated serverless API proxy, it delivers actionable epidemiological clarity.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strictly scoped to authenticated hospital tenant data</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent evidence sources, confidence intervals &amp; trend vectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero server-side secret key exposure to client browser</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800/80 text-[11px] text-indigo-200">
                <strong>Surveillance Notice:</strong> AI provides surveillance decision support and does not diagnose patients or replace licensed clinical antimicrobial stewardship committees.
              </div>
            </div>

            {/* Example Conversation Box */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-indigo-800/60 backdrop-blur-md shadow-2xl space-y-4 text-xs">
                {/* User Message */}
                <div className="flex gap-2.5 items-start justify-end">
                  <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#0284C7] text-white max-w-sm text-xs font-medium">
                    "Why did resistance to ceftriaxone increase this quarter?"
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl rounded-tl-xs bg-slate-800/90 border border-slate-700 text-slate-200 space-y-3 max-w-md">
                    <div className="text-[10px] font-mono text-indigo-300 flex items-center justify-between border-b border-slate-700 pb-2">
                      <span>DATA SCOPE: 4 FACILITIES (N=124 ISOLATES)</span>
                      <span className="text-emerald-400 font-bold">CONFIDENCE: 94%</span>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-100">
                      Resistance to ceftriaxone increased from <strong>21.4% to 31.8%</strong> across 4 reporting facilities.
                    </p>

                    <div className="space-y-1 text-[11px] text-slate-300">
                      <div><strong>Primary Driver:</strong> Plasmid-mediated CTX-M ESBL production in <em>E. coli</em>.</div>
                      <div><strong>Temporal Trend:</strong> Consistent upward vector (+2.6% monthly average).</div>
                      <div><strong>Suggested Action:</strong> Audit empiric cephalosporin orders in surgical triage and evaluate amoxicillin-clavulanate alternatives.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ROLE ECOSYSTEM (9 Dedicated Role Cards)                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1 rounded-full bg-sky-50 border border-sky-200 inline-block">
            STAKEHOLDER WORKSPACES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
            Nine specialized workspaces.<br />Zero generic dashboards.
          </h2>
          <p className="text-base text-slate-600">
            Every healthcare professional logs directly into an environment tailored to their clinical responsibilities and credentialed role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCards.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={r.image}
                    alt={r.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 shadow-xs">
                    {r.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-bold font-heading">{r.role}</h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#0B1F3A] block">What They See:</span>
                      <p className="text-slate-600 leading-relaxed">{r.whatTheySee}</p>
                    </div>
                    <div className="pt-1">
                      <span className="font-bold text-[#0B1F3A] block">What They Can Do:</span>
                      <p className="text-slate-600 leading-relaxed">{r.whatTheyCanDo}</p>
                    </div>
                  </div>

                  <Link
                    to={r.path}
                    className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white text-xs font-bold text-center transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <span>Open {r.role.split('/')[0]} Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GLOBAL INTELLIGENCE & SURVEILLANCE RADAR                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                REGIONAL SURVEILLANCE INTELLIGENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading mt-2">
                Geospatial Resistance Surveillance Radar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Cross-facility pathogen concentration indicators mapped across surveillance catchments.
              </p>
            </div>

            {/* Region Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedRegion('pakistan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === 'pakistan' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Pakistan
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion('southAsia')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === 'southAsia' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                South Asia
              </button>
              <button
                type="button"
                onClick={() => setSelectedRegion('global')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === 'global' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Global GLASS
              </button>
            </div>
          </div>

          {/* Radar Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>PUNJAB CENTRAL ZONE</span>
                <span className="text-rose-600 font-bold">HIGH RISK</span>
              </div>
              <div className="text-2xl font-bold text-[#0B1F3A] font-mono">31.4% CRE</div>
              <p className="text-xs text-slate-600">8 Connected Tertiary Hospitals • 1,240 Isolates Tested</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>SINDH COASTAL CORRIDOR</span>
                <span className="text-amber-600 font-bold">ELEVATED</span>
              </div>
              <div className="text-2xl font-bold text-[#0B1F3A] font-mono">24.8% MRSA</div>
              <p className="text-xs text-slate-600">5 Diagnostic Laboratories • 890 Isolates Tested</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>FEDERAL CAPITAL DISTRICT</span>
                <span className="text-emerald-600 font-bold">STABLE</span>
              </div>
              <div className="text-2xl font-bold text-[#0B1F3A] font-mono">14.2% VRE</div>
              <p className="text-xs text-slate-600">4 Clinical Centers • 510 Isolates Tested</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold">DEMO / SYNTHETIC DATA:</span>
              <span>All displayed figures represent synthetic surveillance metrics designed for platform demonstration.</span>
            </div>
            <Link to="/epidemiology" className="font-bold text-amber-900 underline shrink-0 pl-2">
              Explore Surveillance Heatmap
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ENTERPRISE CYBERSECURITY & RLS ARCHITECTURE                            */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800">
              HEALTHCARE-GRADE CYBERSECURITY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading">
              Cryptographic Tenant Isolation &amp; Auditability
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed from the ground up for strict regulatory compliance, zero data leakage, and immutable forensic accountability.
            </p>
          </div>

          {/* Architecture Visualization Chain */}
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-6">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider text-center">
              END-TO-END SECURITY BOUNDARY FLOW
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-sky-400 font-mono">USER</div>
                <div className="text-slate-400 text-[11px]">OAuth / Email</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-indigo-400 font-mono">AUTH</div>
                <div className="text-slate-400 text-[11px]">JWT Session</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-teal-400 font-mono">RBAC</div>
                <div className="text-slate-400 text-[11px]">9 Role Guards</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-emerald-400 font-mono">TENANCY</div>
                <div className="text-slate-400 text-[11px]">Org Boundary</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-amber-400 font-mono">POSTGRES RLS</div>
                <div className="text-slate-400 text-[11px]">Engine Filter</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <div className="font-bold text-purple-400 font-mono">AUDIT LOG</div>
                <div className="text-slate-400 text-[11px]">Append-Only</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-white text-sm">PostgreSQL Row-Level Security</h3>
              <p className="text-slate-300 leading-relaxed">
                Database queries are cryptographically restricted to the authenticated organization's tenancy. Cross-tenant leakage is mathematically impossible at the database engine level.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-white text-sm">Role-Based Access Control (RBAC)</h3>
              <p className="text-slate-300 leading-relaxed">
                Prescribers cannot view administrative telemetry, pharmacists are restricted to dispensing registries, and lab scientists access specimen consoles exclusively.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-2">
              <h3 className="font-bold text-white text-sm">Serverless Gemini Edge Proxy</h3>
              <p className="text-slate-300 leading-relaxed">
                AI queries execute strictly through server-side serverless endpoints (`/api/ai/chat`). Client-side bundles contain zero private API keys or service tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CALL TO ACTION                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-[#0B1F3A] text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-medical-grid opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Turn fragmented healthcare data into actionable intelligence.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Join healthcare systems, regional microbiology laboratories, and antimicrobial stewardship programs operating with real-time MediGuard telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Request a Demo
            </Link>
            <Link
              to="/solutions"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Explore MediGuard
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-slate-400 font-mono relative z-10">
            Compliant with WHO AWaRe • Real PostgreSQL RLS • 9 Dedicated Roles • © 2026 MediGuard
          </div>
        </div>
      </section>
    </div>
  );
};
