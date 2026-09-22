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
import { Metric } from '@/components/design-system';

export const HomePage: React.FC = () => {
  // Interactive Product Showcase state (6 tabs)
  const [activeTab, setActiveTab] = useState<
    'command' | 'meds' | 'lab' | 'amr' | 'investigation' | 'ai'
  >('command');

  // Interactive Microbiology Pathogen state
  const [selectedPathogen, setSelectedPathogen] = useState<'kp' | 'ab' | 'pa' | 'sa'>('kp');

  // 9 Dedicated Healthcare Roles Data with Editorial Clinical Photography
  const roleCards = [
    {
      role: 'Doctor / Prescriber',
      icon: Stethoscope,
      tag: 'Clinical Prescribing',
      path: '/doctor',
      image: CLINICAL_IMAGES.doctor,
      whatTheySee: 'EHR prescription entries, patient antimicrobial history, WHO AWaRe classification, bed-level AST advisories.',
      whatTheyCanDo: 'Generate evidence-based prescriptions, verify formulary dosing, view prior antibiotic exposure.',
      whyItMatters: 'Prevents empiric Reserve antibiotic overuse before microbiology susceptibility cultures finalize.',
    },
    {
      role: 'Clinical Pharmacist',
      icon: Pill,
      tag: 'Medication Safety',
      path: '/pharmacist',
      image: CLINICAL_IMAGES.pharmacist,
      whatTheySee: 'Live dispensing queue, GS1 serial numbers, cold-chain temperature deviations, stock floor alerts.',
      whatTheyCanDo: 'Scan & verify medicine batches, intercept 14-day repeat dispensing, trigger immediate recall quarantines.',
      whyItMatters: 'Guarantees authenticated batches reach patients and prevents dangerous multi-pharmacy duplicate therapy.',
    },
    {
      role: 'Laboratory Scientist',
      icon: Microscope,
      tag: 'Diagnostics & AST',
      path: '/laboratory',
      image: CLINICAL_IMAGES.laboratory,
      whatTheySee: 'Specimen accessioning queue, Gram-stain morphology, disk diffusion zone diameters, E-test MIC titers.',
      whatTheyCanDo: 'Log phenotypic AST results, apply automated CLSI M100 / EUCAST rules, escalate critical pathogen isolates.',
      whyItMatters: 'Transforms raw culture isolates into structured susceptibility data within minutes of incubation.',
    },
    {
      role: 'Stewardship Lead',
      icon: Shield,
      tag: 'WHO AWaRe Oversight',
      path: '/stewardship',
      image: CLINICAL_IMAGES.doctorTeam,
      whatTheySee: 'Hospital-wide AWaRe 60% Access target, Days of Therapy (DOT), Prescriber compliance benchmarking.',
      whatTheyCanDo: 'Issue closed-loop audit & feedback advisories, restrict Reserve-tier agents, track institutional interventions.',
      whyItMatters: 'Aligns institutional consumption with WHO benchmarks and slows selective antimicrobial pressure.',
    },
    {
      role: 'Epidemiologist',
      icon: LineChart,
      tag: 'Population Health',
      path: '/epidemiology',
      image: CLINICAL_IMAGES.epidemiology,
      whatTheySee: 'Regional geospatial heatmaps, multi-center resistance curves, emerging pathogen cluster alerts.',
      whatTheyCanDo: 'Model 90-day predictive surge trajectories, isolate outbreak clusters, export GLASS-compatible dossiers.',
      whyItMatters: 'Provides denominator-disciplined resistance math to detect community-wide transmission waves early.',
    },
    {
      role: 'Surveillance Officer',
      icon: Activity,
      tag: 'Signal Center',
      path: '/surveillance',
      image: CLINICAL_IMAGES.publicHealth,
      whatTheySee: 'Real-time safety signals, deterministic alarm triggers, triage urgency scores, pending investigations.',
      whatTheyCanDo: 'Triage clinical signals, assign multidisciplinary investigation teams, enforce mandatory dismissal justification.',
      whyItMatters: 'Ensures zero critical clinical alarms are swept aside without documented clinical accountability.',
    },
    {
      role: 'Organization Admin',
      icon: Building2,
      tag: 'Governance',
      path: '/organization',
      image: CLINICAL_IMAGES.heroLab,
      whatTheySee: 'Connected hospital facilities, staff credentialing directory, WHONET / CLSI data quality audits.',
      whatTheyCanDo: 'Manage facility network onboarding, assign role-based credentials, configure tenant governance policies.',
      whyItMatters: 'Maintains strict tenant privacy and multi-facility compliance across distributed healthcare systems.',
    },
    {
      role: 'Platform Administrator',
      icon: Server,
      tag: 'Enterprise Command',
      path: '/admin',
      image: CLINICAL_IMAGES.aiTelemetry,
      whatTheySee: 'Multi-tenant database engine, HL7 FHIR connectors, background ETL jobs, immutable audit logs.',
      whatTheyCanDo: 'Monitor platform uptime, verify cryptographic audit logs, inspect serverless AI proxy execution.',
      whyItMatters: 'Guarantees zero-trust database security and cryptographic accountability for enterprise health IT.',
    },
    {
      role: 'Scientific Researcher',
      icon: FileSearch,
      tag: 'Evidence & Discovery',
      path: '/researcher',
      image: CLINICAL_IMAGES.microbiology,
      whatTheySee: 'Pseudonymized longitudinal AST datasets, multicenter isolate cohorts, CLSI M39-A4 antibiograms.',
      whatTheyCanDo: 'Analyze non-human-identifiable resistance trends, download standardized research CSVs, inspect methodology.',
      whyItMatters: 'Empowers academic and clinical researchers with clean, standardized, non-PHI antimicrobial data.',
    },
  ];

  // Microbiology pathogen data
  const pathogenDetails = {
    kp: {
      name: 'Klebsiella pneumoniae',
      classification: 'WHO Critical Priority (Carbapenem-Resistant / ESBL)',
      mechanism: 'Plasmid-mediated KPC & NDM-1 Carbapenemases',
      isolates: 342,
      susceptibilities: [
        { drug: 'Meropenem', status: 'Resistant', mic: '> 16 μg/mL', rate: '41.8% Resistant', color: 'text-rose-600' },
        { drug: 'Ceftriaxone', status: 'Resistant', mic: '> 64 μg/mL', rate: '68.4% Resistant', color: 'text-rose-600' },
        { drug: 'Amikacin', status: 'Intermediate', mic: '16 μg/mL', rate: '18.2% Intermediate', color: 'text-amber-600' },
        { drug: 'Colistin', status: 'Susceptible', mic: '0.5 μg/mL', rate: '94.6% Susceptible', color: 'text-emerald-600' },
      ],
      stewardshipAction: 'Reserve-tier escalation restricted; initiate patient contact precautions and rectal screening.',
    },
    ab: {
      name: 'Acinetobacter baumannii',
      classification: 'WHO Critical Priority (CRAB)',
      mechanism: 'OXA-23 and OXA-51-like β-Lactamases + Porin Loss',
      isolates: 218,
      susceptibilities: [
        { drug: 'Meropenem', status: 'Resistant', mic: '> 32 μg/mL', rate: '64.2% Resistant', color: 'text-rose-600' },
        { drug: 'Imipenem', status: 'Resistant', mic: '> 32 μg/mL', rate: '61.5% Resistant', color: 'text-rose-600' },
        { drug: 'Tigecycline', status: 'Intermediate', mic: '4 μg/mL', rate: '22.0% Intermediate', color: 'text-amber-600' },
        { drug: 'Polymyxin B', status: 'Susceptible', mic: '1 μg/mL', rate: '91.8% Susceptible', color: 'text-emerald-600' },
      ],
      stewardshipAction: 'Environmental swabbing in ICU; mandatory cohort isolation and antimicrobial audit.',
    },
    pa: {
      name: 'Pseudomonas aeruginosa',
      classification: 'WHO High Priority (Difficult-to-Treat Resistance)',
      mechanism: 'AmpC Overexpression + OprD Porin Deficiency + Efflux Pumps',
      isolates: 189,
      susceptibilities: [
        { drug: 'Piperacillin-Tazobactam', status: 'Resistant', mic: '> 64 μg/mL', rate: '38.6% Resistant', color: 'text-rose-600' },
        { drug: 'Ceftazidime', status: 'Intermediate', mic: '16 μg/mL', rate: '24.1% Intermediate', color: 'text-amber-600' },
        { drug: 'Cefepime', status: 'Resistant', mic: '> 32 μg/mL', rate: '35.4% Resistant', color: 'text-rose-600' },
        { drug: 'Ceftolozane-Tazobactam', status: 'Susceptible', mic: '2 μg/mL', rate: '88.3% Susceptible', color: 'text-emerald-600' },
      ],
      stewardshipAction: 'Infection prevention plumbing review; confirm susceptibility before definitive therapy.',
    },
    sa: {
      name: 'Staphylococcus aureus (MRSA)',
      classification: 'WHO High Priority (Methicillin-Resistant)',
      mechanism: 'mecA Gene Encoding PBP2a with Low β-Lactam Affinity',
      isolates: 412,
      susceptibilities: [
        { drug: 'Oxacillin', status: 'Resistant', mic: '> 4 μg/mL', rate: '32.1% Resistant', color: 'text-rose-600' },
        { drug: 'Cefoxitin Screen', status: 'Positive', mic: 'Zone ≤ 21mm', rate: '100% Concordant', color: 'text-rose-600' },
        { drug: 'Vancomycin', status: 'Susceptible', mic: '1.5 μg/mL', rate: '99.2% Susceptible', color: 'text-emerald-600' },
        { drug: 'Linezolid', status: 'Susceptible', mic: '2 μg/mL', rate: '99.8% Susceptible', color: 'text-emerald-600' },
      ],
      stewardshipAction: 'Screen nasal colonization on admission; de-escalate vancomycin once MSSA confirmed.',
    },
  };

  return (
    <div className="space-y-24 sm:space-y-32 py-4 text-left font-sans">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Editorial, Sophisticated Layered Composition)             */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Editorial Positioning */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0B1F3A] text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
              <span className="font-bold">MEDIGUARD</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Medication Safety &amp; AMR Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-[1.12]">
              Turn fragmented healthcare data into<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#0B1F3A]">
                actionable safety intelligence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              MediGuard connects hospital prescribing, pharmacy batch verification, and microbiology laboratory diagnostics into a unified, closed-loop surveillance platform powered by grounded clinical AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#platform-showcase"
                className="px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/register"
                className="px-6 py-3.5 rounded-2xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Request a Demo</span>
              </Link>
            </div>

            {/* Credibility Micro-Badges */}
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

          {/* Right Column: Layered Visual Healthcare Composition (NO FLOATING NUMERIC CARDS) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle decorative background gradient */}
              <div className="absolute -top-12 -right-12 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

              {/* Thin scientific coordinate grid outline */}
              <div className="absolute inset-0 -m-3 border border-dashed border-slate-200/90 rounded-3xl pointer-events-none" />

              {/* Main Clinical Hospital Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-100 aspect-[4/3]">
                <img
                  src={CLINICAL_IMAGES.hero}
                  alt="Doctor reviewing clinical surveillance telemetry"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />

                {/* Top Glass Telemetry Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 text-slate-800 text-xs font-mono shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold">CLINICAL SURVEILLANCE NODE</span>
                  </div>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">CLSI M100 • EUCAST 2024</span>
                </div>

                {/* Bottom Glass Telemetry Ribbon with animated pulse & flow */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-semibold">
                    <span className="text-[#0D9488] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 animate-pulse text-[#0D9488]" />
                      Closed-Loop Telemetry Stream
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                      Active Interoperability
                    </span>
                  </div>
                  {/* Pipeline flow vector */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-600 pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>EHR Prescriptions</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>GS1 Dispensing</span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>Microdilution AST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. TRUST / CREDIBILITY STRIP                                            */}
        {/* ======================================================================= */}
        <div className="pt-16 pb-4 text-center border-t border-slate-200/80 mt-12">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 pb-6 font-bold">
            DESIGNED FOR &amp; DEPLOYED ACROSS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-slate-700 font-heading">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0284C7]" />
              <span>Hospitals</span>
            </div>
            <div className="flex items-center gap-2">
              <Microscope className="w-4 h-4 text-[#0D9488]" />
              <span>Microbiology Laboratories</span>
            </div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#0284C7]" />
              <span>Pharmacies</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Antimicrobial Stewardship Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#6366F1]" />
              <span>Public Health Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-purple-600" />
              <span>Research Institutions</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE PROBLEM (Large Editorial Visual Storytelling Blocks)                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-12">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 inline-block">
            THE CRITICAL HEALTHCARE GAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-tight">
            Healthcare data is connected.<br />
            Healthcare decisions often aren't.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Hospitals generate millions of prescription logs, dispensing records, and laboratory cultures. But because clinical systems operate in isolation, clinicians cannot see emerging resistance surges in time.
          </p>
        </div>

        {/* 4 Large Editorial Storytelling Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Block 1: Medication Safety */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.pharmacy}
                alt="Medication batches awaiting serial verification"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900">
                BATCH INTEGRITY &amp; DISPENSING
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-heading">Substandard Batches &amp; Unmonitored Dispensing</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Counterfeit, degraded, or cold-chain-deviated antibiotic batches enter circulation without GS1 serialized verification. Meanwhile, repeat dispensing within 14 days goes undetected across siloed retail pharmacies.
              </p>
              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs space-y-1">
                <span className="font-mono font-bold text-rose-700 uppercase tracking-wider text-[10px] block">
                  REAL-WORLD CONSEQUENCE
                </span>
                <p className="text-rose-900 font-medium">
                  Substandard medicines fail to eradicate bacterial infections, accelerating selective pressure for resistant mutations and exposing patients to preventable toxicity.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Antibiotic Resistance */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.microbiology}
                alt="Petri dish showing antibiotic resistance inhibition zones"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900">
                ANTIMICROBIAL RESISTANCE
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-heading">Empiric Overuse Breeds Pan-Drug Resistance</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empiric overuse of broad-spectrum Reserve-tier antimicrobials breeds Carbapenem-Resistant Enterobacterales (CRE) and MRSA without stewardship oversight or rapid sensitivity guidance.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                <span className="font-mono font-bold text-amber-700 uppercase tracking-wider text-[10px] block">
                  REAL-WORLD CONSEQUENCE
                </span>
                <p className="text-amber-900 font-medium">
                  1.27 million direct global deaths annually are attributable to bacterial AMR. Critical pathogens become untreatable with standard empiric hospital formularies.
                </p>
              </div>
            </div>
          </div>

          {/* Block 3: Fragmented Clinical Data */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.doctor}
                alt="Doctor reviewing electronic health records without AST data"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900">
                SYSTEM SILOES
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-heading">Prescribing Disconnected from Laboratory AST</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                EHR prescriptions, pharmacy dispensing registries, and microbiology lab bench instruments operate on disconnected databases, with zero bidirectional feedback loops between clinicians and microbiologists.
              </p>
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs space-y-1">
                <span className="font-mono font-bold text-[#0284C7] uppercase tracking-wider text-[10px] block">
                  REAL-WORLD CONSEQUENCE
                </span>
                <p className="text-sky-900 font-medium">
                  Clinicians make critical antimicrobial therapy choices in an informational vacuum, while AST susceptibility findings take 48 to 72 hours to reach bedside decision-makers.
                </p>
              </div>
            </div>
          </div>

          {/* Block 4: Delayed Detection */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.publicHealth}
                alt="Public health surveillance operations center"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900">
                OUTBREAK SURVEILLANCE
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold font-heading">Outbreaks Discovered in Retrospective Audits</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hospital outbreak signals and emerging ward clusters are identified weeks late through retrospective paper audits, rather than through real-time deterministic surveillance alarms.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs space-y-1">
                <span className="font-mono font-bold text-[#6366F1] uppercase tracking-wider text-[10px] block">
                  REAL-WORLD CONSEQUENCE
                </span>
                <p className="text-indigo-900 font-medium">
                  Nosocomial cross-transmission in intensive care units spreads undetected across wards until multiple patient casualties have already occurred.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT MEDIGUARD ACTUALLY DOES (Visual 7-Stage Lifecycle)                 */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-teal-50/40 via-white to-sky-50/30 text-slate-900 py-20 relative overflow-hidden border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-[#0D9488] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
              CLOSED-LOOP ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-[#0B1F3A]">
              Understand the entire platform in 10 seconds.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Seven interconnected milestones ensure that every prescription, dispensed vial, and microbiology isolate is verified in real time.
            </p>
          </div>

          {/* Connected Horizontal Pipeline: PRESCRIBE -> DISPENSE -> VERIFY -> TEST -> DETECT -> INVESTIGATE -> ACT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {[
              {
                step: '01',
                title: 'PRESCRIBE',
                icon: Stethoscope,
                desc: 'Physician enters electronic order with automatic WHO AWaRe tier checks.',
              },
              {
                step: '02',
                title: 'DISPENSE',
                icon: Pill,
                desc: 'Pharmacy matches order backed by non-negative inventory floor protection.',
              },
              {
                step: '03',
                title: 'VERIFY',
                icon: QrCode,
                desc: 'GS1 DataMatrix scanning checks lot serialization & cold-chain status.',
              },
              {
                step: '04',
                title: 'TEST',
                icon: Microscope,
                desc: 'Microbiology bench accessions culture isolate with quantitative broth microdilution.',
              },
              {
                step: '05',
                title: 'DETECT',
                icon: Activity,
                desc: 'Automated CLSI M100 / EUCAST rules trigger instant alerts for resistance (CRE, MRSA).',
              },
              {
                step: '06',
                title: 'INVESTIGATE',
                icon: FileSearch,
                desc: 'Multidisciplinary team evaluates clinical signals with mandatory justification.',
              },
              {
                step: '07',
                title: 'ACT',
                icon: ShieldCheck,
                desc: 'Stewardship lead de-escalates to targeted therapy or initiates patient isolation.',
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 hover:border-[#0D9488] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#0D9488] font-bold">STAGE {s.step}</span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0D9488] transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-heading">{s.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
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
              Explore Pipeline Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MEDICATION SAFETY (Large Image + Explanation + Workflow)               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Large Visual Photography */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3] bg-slate-900 relative">
                <img
                  src={CLINICAL_IMAGES.pharmacy}
                  alt="Clinical pharmacist verifying medication serial barcodes"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 shadow-xs">
                  GS1-128 SERIALIZED • TEMPERATURE TELEMETRY (2–8°C)
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="text-[10px] font-mono text-teal-300 font-bold uppercase">POINT-OF-DISPENSE PROTECTION</div>
                  <h4 className="text-lg font-bold font-heading">Zero-Tolerance Counterfeit &amp; Excursion Radar</h4>
                </div>
              </div>
            </div>

            {/* Right: Explanation & Safety Workflow */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
                  MEDICATION SAFETY &amp; DISPENSING
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B1F3A] leading-tight">
                  Guaranteed Batch Integrity from Cold Storage to Point-of-Dispense
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Substandard or degraded antimicrobials expose patients to treatment failure and accelerate resistance mutations. MediGuard creates an automated mathematical barrier at the pharmacy counter.
                </p>
              </div>

              {/* 4-Step Safety Workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#0D9488] font-bold font-heading">
                    <QrCode className="w-4 h-4 shrink-0" />
                    <span>1. GS1 DataMatrix Scan</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    2D barcode scan cross-checks national drug code, lot number, and manufacturer expiration date.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#0284C7] font-bold font-heading">
                    <ThermometerSnowflake className="w-4 h-4 shrink-0" />
                    <span>2. Cold-Chain IoT Check</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Automated telemetry verifies storage temperature remained within strict 2–8°C bounds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold font-heading">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>3. Non-Negative Floor</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    PostgreSQL database constraints reject negative stock counts, preventing phantom inventory and diversion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-600 font-bold font-heading">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>4. Repeat Fill Radar</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Flags secondary prescriptions of Reserve/Watch antibiotics dispensed within 14 days across facilities.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/pharmacist"
                  className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <span>Open Pharmacist Safety Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-slate-400">GS1-128 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LABORATORY INTELLIGENCE (Digital Microbiology Bench)                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
                DIGITAL MICROBIOLOGY BENCH
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading mt-2">
                Quantitative Antimicrobial Susceptibility Testing (AST)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Automated interpretive breakpoint rules strictly adhering to CLSI M100-ED33 and EUCAST 2024 standards.
              </p>
            </div>

            {/* Pathogen Switcher */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 self-start sm:self-auto text-xs">
              {[
                { id: 'kp', label: 'K. pneumoniae' },
                { id: 'ab', label: 'A. baumannii' },
                { id: 'pa', label: 'P. aeruginosa' },
                { id: 'sa', label: 'S. aureus (MRSA)' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPathogen(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    selectedPathogen === p.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pathogen Deep Dive Display */}
          {(() => {
            const current = pathogenDetails[selectedPathogen];
            return (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-heading italic">{current.name}</h4>
                    <p className="text-xs text-rose-700 font-semibold">{current.classification}</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-slate-400 block">MECHANISM</span>
                    <span className="text-slate-800 font-semibold">{current.mechanism}</span>
                  </div>
                </div>

                {/* Susceptibility Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {current.susceptibilities.map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{s.drug}</span>
                        <span className={`font-mono font-bold text-[11px] ${s.color}`}>{s.status}</span>
                      </div>
                      <div className="text-xl font-extrabold text-[#0B1F3A] font-mono">{s.mic}</div>
                      <div className="text-[11px] text-slate-500 font-mono border-t border-slate-100 pt-1.5">
                        {s.rate}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stewardship Action Advisory */}
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0" />
                    <span className="text-teal-900 font-medium">
                      <strong>Recommended Stewardship Protocol:</strong> {current.stewardshipAction}
                    </span>
                  </div>
                  <Link to="/laboratory" className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs shrink-0 text-center transition-colors">
                    Open Digital Bench
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. AMR INTELLIGENCE (Catchment Heatmap & Forecasting)                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                REGIONAL SURVEILLANCE MATRIX
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading mt-2">
                Catchment Antibiograms &amp; 90-Day Predictive Surge Forecasting
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Multi-facility resistance rates cross-referenced against WHO Priority Pathogen thresholds.
              </p>
            </div>
            <Link
              to="/epidemiology"
              className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
            >
              <span>View Full Heatmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Antibiogram Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="py-3 px-3">Pathogen (WHO Priority)</th>
                  <th className="py-3 px-3">Meropenem</th>
                  <th className="py-3 px-3">Ceftriaxone</th>
                  <th className="py-3 px-3">Ciprofloxacin</th>
                  <th className="py-3 px-3">Vancomycin</th>
                  <th className="py-3 px-3">Colistin</th>
                  <th className="py-3 px-3">Trend (90d)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-slate-900 italic">
                    Klebsiella pneumoniae <span className="text-[10px] font-mono text-rose-600 font-semibold">(Critical)</span>
                  </td>
                  <td className="py-3 px-3 text-rose-700 bg-rose-50/50 font-bold">41.8% (R)</td>
                  <td className="py-3 px-3 text-rose-700 bg-rose-50/70 font-bold">68.4% (R)</td>
                  <td className="py-3 px-3 text-amber-700 bg-amber-50/40">34.2% (R)</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-emerald-700 bg-emerald-50/40 font-bold">3.1% (R)</td>
                  <td className="py-3 px-3 text-rose-600 font-bold font-sans">▲ +4.2%</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-slate-900 italic">
                    Acinetobacter baumannii <span className="text-[10px] font-mono text-rose-600 font-semibold">(Critical)</span>
                  </td>
                  <td className="py-3 px-3 text-rose-700 bg-rose-50/80 font-bold">64.2% (R)</td>
                  <td className="py-3 px-3 text-rose-700 bg-rose-50/80 font-bold">78.1% (R)</td>
                  <td className="py-3 px-3 text-rose-700 bg-rose-50/60 font-bold">58.9% (R)</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-emerald-700 bg-emerald-50/40 font-bold">4.8% (R)</td>
                  <td className="py-3 px-3 text-rose-600 font-bold font-sans">▲ +6.1%</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-slate-900 italic">
                    Pseudomonas aeruginosa <span className="text-[10px] font-mono text-rose-600 font-semibold">(Critical)</span>
                  </td>
                  <td className="py-3 px-3 text-amber-700 bg-amber-50/50 font-bold">28.4% (R)</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-amber-700 bg-amber-50/50 font-bold">29.1% (R)</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-emerald-700 bg-emerald-50/40 font-bold">1.8% (R)</td>
                  <td className="py-3 px-3 text-emerald-600 font-bold font-sans">▼ -1.1%</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-sans font-bold text-slate-900 italic">
                    Staphylococcus aureus <span className="text-[10px] font-mono text-amber-600 font-semibold">(High MRSA)</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-amber-700 bg-amber-50/40 font-bold">22.4% (R)</td>
                  <td className="py-3 px-3 text-emerald-700 bg-emerald-50/60 font-bold">0.4% (R)</td>
                  <td className="py-3 px-3 text-slate-400">--</td>
                  <td className="py-3 px-3 text-slate-500 font-sans">━ Stable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong>CLSI M39-A4 Deduplication Protocol Enforced:</strong> Strictly first isolate per patient encounter indexed.</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">WHO GLASS Submission Compliant</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLINICAL INVESTIGATION (Signal -> Evidence -> Timeline -> Investigation -> Response) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              CLOSED-LOOP CASE RESOLUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading">
              From Signal to Clinical Action: Structured Outbreak Triage
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Every critical resistance alarm triggers an unbroken chain of clinical investigation and documented accountability.
            </p>
          </div>

          {/* 5-Step Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <div className="font-mono font-bold text-rose-700 text-[10px]">01 SIGNAL</div>
              <h5 className="font-bold text-slate-900 font-heading">Deterministic Alarm</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Automated CLSI breakpoint rule detects CRE, MRSA, or 14-day repeat dispense surge.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-2">
              <div className="font-mono font-bold text-[#0284C7] text-[10px]">02 EVIDENCE</div>
              <h5 className="font-bold text-slate-900 font-heading">Data Aggregation</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Correlates quantitative MIC titer, specimen accession, patient bed, and prior prescriptions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
              <div className="font-mono font-bold text-[#6366F1] text-[10px]">03 TIMELINE</div>
              <h5 className="font-bold text-slate-900 font-heading">Forensic Mapping</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Reconstructs patient ward movement, antibiotic exposure windows, and contact cross-exposure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="font-mono font-bold text-amber-700 text-[10px]">04 INVESTIGATION</div>
              <h5 className="font-bold text-slate-900 font-heading">Multidisciplinary Review</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Infectious disease physician, pharmacist, and microbiologist conduct joint case audit.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="font-mono font-bold text-emerald-700 text-[10px]">05 RESPONSE</div>
              <h5 className="font-bold text-slate-900 font-heading">Clinical Action</h5>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Patient isolated, therapy de-escalated, and mandatory justification logged before case closure.
              </p>
            </div>
          </div>

          {/* Active Case Study Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                <span className="font-bold text-slate-900 text-sm font-heading">
                  Active Case: #INV-2026-092 — ICU Carbapenem-Resistant Cluster
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 self-start sm:self-auto">
                UNDER MULTIDISCIPLINARY REVIEW
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 font-mono text-[10px] block">PRIMARY ISOLATE</span>
                <span className="font-bold text-slate-800">K. pneumoniae (MIC &gt; 16 μg/mL Meropenem)</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] block">AFFECTED WARD</span>
                <span className="font-bold text-slate-800">Intensive Care Unit (Beds 04, 06, 09)</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] block">INVESTIGATION LEAD</span>
                <span className="font-bold text-slate-800">Dr. Sarah Farooq (Infectious Disease)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong>Forensic Note:</strong> Environmental swabs dispatched across ICU plumbing fixtures. Contact precautions initiated for 3 cohort patients. Clinicians de-escalated empiric meropenem to directed ceftazidime-avibactam therapy.
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">Zero alerts can be dismissed without a mandatory, auditable justification entry.</span>
              <Link to="/surveillance" className="text-[#0284C7] font-bold text-xs hover:underline flex items-center gap-1">
                <span>Open Surveillance Investigation Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. AI COPILOT (Dedicated Grounded AI Section)                             */}
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
              <div className="p-3.5 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 text-[11px] text-indigo-200">
                <strong>Surveillance Notice:</strong> AI provides surveillance decision support and does not diagnose patients or replace licensed clinical antimicrobial stewardship committees.
              </div>
            </div>

            {/* Example Conversation Box */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-6 rounded-3xl bg-white border border-indigo-200/90 shadow-xl space-y-4 text-xs text-slate-900">
                {/* User Message */}
                <div className="flex gap-2.5 items-start justify-end">
                  <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#0B1F3A] text-white max-w-sm text-xs font-medium shadow-xs">
                    "Why did resistance to ceftriaxone increase this quarter?"
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl rounded-tl-xs bg-indigo-50/40 border border-indigo-100 text-slate-800 space-y-3 max-w-md">
                    <div className="text-[10px] font-mono text-indigo-700 flex items-center justify-between border-b border-indigo-100 pb-2">
                      <span>DATA SCOPE: 4 FACILITIES (N=124 ISOLATES)</span>
                      <span className="text-emerald-700 font-bold">CONFIDENCE: 94%</span>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-900">
                      Resistance to ceftriaxone increased from <strong>21.4% to 31.8%</strong> across 4 reporting facilities.
                    </p>

                    <div className="space-y-1 text-[11px] text-slate-600">
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
      {/* 10. ROLE ECOSYSTEM (9 Dedicated Role Cards with Imagery)                   */}
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
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="font-bold text-[#0B1F3A] block">What They See:</span>
                      <p className="text-slate-600 leading-relaxed">{r.whatTheySee}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#0B1F3A] block">What They Can Do:</span>
                      <p className="text-slate-600 leading-relaxed">{r.whatTheyCanDo}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#0B1F3A] block">Why It Matters:</span>
                      <p className="text-teal-800 leading-relaxed font-medium">{r.whyItMatters}</p>
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
      {/* 11. SECURITY & TENANT ARCHITECTURE (Visual Architecture Flow)             */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-blue-50/20 text-slate-900 py-16 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              HEALTHCARE-GRADE CYBERSECURITY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A]">
              Cryptographic Tenant Isolation &amp; Auditability
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed from the ground up for strict regulatory compliance, zero data leakage, and immutable forensic accountability.
            </p>
          </div>

          {/* Architecture Visualization Flow: User -> Auth -> RBAC -> Boundary -> RLS -> Audit */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider text-center">
              END-TO-END SECURITY BOUNDARY FLOW
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-sky-700 font-mono">1. USER</div>
                <div className="text-slate-700 font-semibold text-xs">Credentialed</div>
                <div className="text-slate-400 text-[10px]">Institutional ID</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 font-mono">2. AUTH</div>
                <div className="text-slate-700 font-semibold text-xs">JWT Session</div>
                <div className="text-slate-400 text-[10px]">Signed Token</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-teal-700 font-mono">3. RBAC</div>
                <div className="text-slate-700 font-semibold text-xs">9 Role Guards</div>
                <div className="text-slate-400 text-[10px]">Strict Route Fence</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-700 font-mono">4. TENANCY</div>
                <div className="text-slate-700 font-semibold text-xs">Org Boundary</div>
                <div className="text-slate-400 text-[10px]">Isolated Schema</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-amber-700 font-mono">5. RLS</div>
                <div className="text-slate-700 font-semibold text-xs">PostgreSQL RLS</div>
                <div className="text-slate-400 text-[10px]">Database Kernel</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-purple-700 font-mono">6. AUDIT</div>
                <div className="text-slate-700 font-semibold text-xs">Immutable Trail</div>
                <div className="text-slate-400 text-[10px]">Append-Only Log</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">PostgreSQL Row-Level Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Database queries are cryptographically restricted to the authenticated organization's tenancy. Cross-tenant leakage is mathematically impossible at the database engine level.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC)</h3>
              <p className="text-slate-600 leading-relaxed">
                Prescribers cannot view administrative telemetry, pharmacists are restricted to dispensing registries, and lab scientists access specimen consoles exclusively.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Serverless Gemini Edge Proxy</h3>
              <p className="text-slate-600 leading-relaxed">
                AI queries execute strictly through server-side serverless endpoints (`/api/ai/chat`). Client-side bundles contain zero private API keys or service tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. RESEARCH & SCIENTIFIC FOUNDATION                                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200">
                SCIENTIFIC METHODOLOGY &amp; STANDARDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading mt-2">
                Built on Established Global Standards
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                MediGuard applies peer-reviewed epidemiological methodologies and recognized antimicrobial classifications.
              </p>
            </div>

            <Link
              to="/research"
              className="px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors self-start sm:self-auto"
            >
              Explore Research Dossiers &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-mono font-bold text-purple-700 text-sm">CLSI M100-ED33</div>
              <div className="font-bold text-slate-900">Clinical Laboratory Standards</div>
              <p className="text-slate-600 text-[11px]">Millimeter disk diffusion calipers and microdilution broth interpretation rules.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-mono font-bold text-purple-700 text-sm">EUCAST 2024</div>
              <div className="font-bold text-slate-900">European Susceptibility Testing</div>
              <p className="text-slate-600 text-[11px]">Harmonized clinical breakpoints and pharmacokinetic/pharmacodynamic dosing indices.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-mono font-bold text-purple-700 text-sm">WHO AWaRe</div>
              <div className="font-bold text-slate-900">Access, Watch &amp; Reserve</div>
              <p className="text-slate-600 text-[11px]">Formulary categorization enforcing institutional targets for 60% Access-tier utilization.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-mono font-bold text-purple-700 text-sm">WHO GLASS</div>
              <div className="font-bold text-slate-900">Global Surveillance System</div>
              <p className="text-slate-600 text-[11px]">Standardized pathogen surveillance data structures compatible with international reporting.</p>
            </div>
          </div>

          {/* Synthetic Data Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold">DEMO / SYNTHETIC DATA NOTICE:</span>
              <span>Patient records, hospital names, and AST isolates presented in this platform demo are synthetic models designed for operational validation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. INTERACTIVE CLINICAL WORKSTATION SHOWCASE (6 Live Workstations)       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-8">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
            INTERACTIVE PLATFORM SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
            Explore the operational workstations.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Switch between real clinical workstations below to observe how telemetry flows across departments in real time.
          </p>
        </div>

        {/* Browser Frame */}
        <div className="rounded-3xl border border-slate-300/80 bg-white shadow-2xl overflow-hidden text-left">
          {/* Top Window Bar */}
          <div className="px-6 py-4 bg-slate-900 text-slate-300 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-slate-400">
                app.mediguard.health/workstation
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE • HL7-FHIR LIVE
              </span>
              <span className="text-slate-400 hidden sm:inline">
                TENANT: METROPOLITAN HEALTH SYSTEM
              </span>
            </div>
          </div>

          {/* Interactive Tab Strip */}
          <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 p-2 gap-1.5 text-xs">
            {[
              { id: 'command', label: 'Platform Command', icon: Activity },
              { id: 'meds', label: 'Medication Safety', icon: Pill },
              { id: 'lab', label: 'Microbiology Bench', icon: Microscope },
              { id: 'amr', label: 'AMR Surveillance', icon: LineChart },
              { id: 'investigation', label: 'Outbreak Triage', icon: FileSearch },
              { id: 'ai', label: 'Grounded AI Copilot', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#0B1F3A] shadow-xs border border-slate-200/80'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0D9488]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Workstation Screen Contents */}
          <div className="p-6 sm:p-8 bg-white min-h-[420px]">
            {activeTab === 'command' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <Metric label="Active Facilities" value="4 Network" subtext="All systems nominal" accentColor="teal" />
                  <Metric label="Network Resistance" value="23.4%" subtext="+1.8% vs 6-mo baseline" accentColor="amber" />
                  <Metric label="WHO Access Ratio" value="68.2%" subtext="Target ≥60% Compliant" accentColor="teal" />
                  <Metric label="Batch Verification" value="99.4%" subtext="Zero recalls dispensed" accentColor="blue" />
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Deterministic Alert Triage Queue</span>
                    <span className="text-[#0284C7] font-mono">Live Stream</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="font-mono text-slate-500">[ALERT-CRE-09]</span>
                        <span className="font-semibold text-slate-900">Carbapenem-Resistant K. pneumoniae confirmed in ICU bed 06</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">12m ago</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="font-mono text-slate-500">[WARN-AWARE-04]</span>
                        <span className="font-semibold text-slate-900">Reserve tier Colistin prescription requires stewardship pre-authorization</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">34m ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link to="/surveillance" className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
                    <span>Open Live Surveillance Console</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
                    <div className="text-rose-600 text-xs font-mono font-bold">Status: Quarantined • Manufacturer Recall</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-slate-800">Pharmacy Non-Negative Floor Enforcement</div>
                  <p>
                    PostgreSQL constraint logic guarantees zero phantom dispensing. Every medication movement is tracked to lot serialization, manufacturer expiration, and real-time cold-chain IoT records.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <Link to="/pharmacist" className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
                    <span>Open Pharmacist Safety Center</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                    <div className="text-slate-600 text-xs font-mono">MIC &gt; 16 μg/mL (CLSI M100-ED33)</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">WHO GLASS CLASSIFICATION</div>
                    <div className="font-bold text-[#0B1F3A] text-sm">Critical Priority Pathogen</div>
                    <div className="text-amber-600 text-xs font-mono font-bold">Infection Control Escalate</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900">
                  <strong>Digital Calipers &amp; Broth Microdilution:</strong> Zone diameter entries automatically cross-reference CLSI M100 table breakpoints with immediate S / I / R classification and automated laboratory supervisor sign-off.
                </div>
                <div className="flex items-center justify-end">
                  <Link to="/laboratory" className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
                    <span>Open Laboratory Bench</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                    <div className="text-xs text-amber-800 font-mono font-bold">Methicillin Resistance: 22.4%</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Catchment-level antibiograms are normalized using strict CLSI M39-A4 deduplication rules (first isolate per patient encounter), preventing artificial inflation from repeat testing.
                </div>
                <div className="flex items-center justify-end">
                  <Link to="/epidemiology" className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
                    <span>Open Epidemiological Heatmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600">
                  Signals require mandatory clinical justification before any dismissal. Every closure event is appended to an immutable cryptographic audit record.
                </div>
                <div className="flex items-center justify-end">
                  <Link to="/surveillance" className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
                    <span>Open Investigation Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                    <span className="font-semibold text-slate-100">"Why did ceftriaxone resistance increase this quarter?"</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-800/80 space-y-1.5">
                    <span className="text-indigo-300 text-[10px] font-mono block">AI SYNTHESIS (N=124 ISOLATES):</span>
                    <p className="text-slate-200 leading-relaxed">
                      "Resistance in <em>E. coli</em> climbed 10.4% this quarter, driven by an uptick in plasmid-mediated CTX-M extended-spectrum beta-lactamase (ESBL) production across surgical wards. Recommend auditing prophylactic cephalosporin durations."
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-indigo-300">Grounding sources: AST cultures + dispensing orders</span>
                  <Link to="/research" className="text-xs font-bold text-indigo-300 hover:underline flex items-center gap-1">
                    <span>View Model Grounding Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. QUANTIFIED HEALTHCARE OUTCOMES & CLINICAL IMPACT                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 space-y-8 text-center">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 inline-block">
              MEASURABLE INSTITUTIONAL IMPACT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
              Quantifiable outcomes across hospital networks.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Transforming fragmented paper binders and isolated LIS databases into synchronized, measurable clinical safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-3xl font-extrabold text-[#0D9488] font-mono">42%</div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Faster Outbreak Detection</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Automated CLSI breakpoint triggers detect nosocomial clusters days before manual monthly infection audits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-3xl font-extrabold text-[#0284C7] font-mono">99.4%</div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Batch Serialization Rate</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Point-of-dispense GS1 DataMatrix scanning eliminates counterfeit, unregistered, and cold-chain breached vials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-3xl font-extrabold text-indigo-600 font-mono">68.2%</div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Access-Tier Utilization</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Hospital stewardship programs consistently exceed the WHO AWaRe 60% baseline target for Access-tier antimicrobials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="text-3xl font-extrabold text-emerald-600 font-mono">0</div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Unjustified Dismissals</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Database-enforced mandatory justification guarantees that every critical AMR alert has an assigned clinical rationale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. FINAL CALL TO ACTION (Institutional Deployment)                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0284C7] to-[#0D9488] text-white p-8 sm:p-12 lg:p-16 border border-sky-400/30 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              See the intelligence behind safer healthcare.
            </h2>
            <p className="text-sm sm:text-base text-sky-100 leading-relaxed max-w-xl mx-auto">
              Join healthcare systems, regional microbiology laboratories, and antimicrobial stewardship programs operating with real-time MediGuard telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#0B1F3A] font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Request Institutional Demo
            </Link>
            <Link
              to="/solutions"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 transition-all cursor-pointer"
            >
              Explore Platform Architecture
            </Link>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-[11px] text-sky-100 font-mono relative z-10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              WHO AWaRe Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              PostgreSQL Row-Level Security
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              CLSI M100-ED33 Standardized
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              9 Role-Protected Workspaces
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
