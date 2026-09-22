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
  HelpCircle,
  KeyRound,
} from 'lucide-react';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';
import { Metric } from '@/components/design-system';

export const HomePage: React.FC = () => {
  // Interactive Microbiology Pathogen state for Section 6
  const [selectedPathogen, setSelectedPathogen] = useState<'kp' | 'ab' | 'pa' | 'sa'>('kp');

  // 9 Dedicated Healthcare Roles Data with 100% Unique Photography
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
      image: CLINICAL_IMAGES.stewardship,
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
      image: CLINICAL_IMAGES.doctorTeam,
      whatTheySee: 'Connected hospital facilities, staff credentialing directory, WHONET / CLSI data quality audits.',
      whatTheyCanDo: 'Manage facility network onboarding, assign role-based credentials, configure tenant governance policies.',
      whyItMatters: 'Maintains strict tenant privacy and multi-facility compliance across distributed healthcare systems.',
    },
    {
      role: 'Platform Administrator',
      icon: Server,
      tag: 'Enterprise Command',
      path: '/admin',
      image: CLINICAL_IMAGES.security,
      whatTheySee: 'Multi-tenant database engine, HL7 FHIR connectors, background ETL jobs, immutable audit logs.',
      whatTheyCanDo: 'Monitor platform uptime, verify cryptographic audit logs, inspect serverless AI proxy execution.',
      whyItMatters: 'Guarantees zero-trust database security and cryptographic accountability for enterprise health IT.',
    },
    {
      role: 'Scientific Researcher',
      icon: FileSearch,
      tag: 'Evidence & Discovery',
      path: '/researcher',
      image: CLINICAL_IMAGES.research,
      whatTheySee: 'Pseudonymized longitudinal AST datasets, multicenter isolate cohorts, CLSI M39-A4 antibiograms.',
      whatTheyCanDo: 'Analyze non-human-identifiable resistance trends, download standardized research CSVs, inspect methodology.',
      whyItMatters: 'Empowers academic and clinical researchers with clean, standardized, non-PHI antimicrobial data.',
    },
  ];

  // Microbiology pathogen data for Section 6
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
    <div className="space-y-24 sm:space-y-32 py-4 text-left font-sans bg-[#F7FAFC]">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Simple, Clean, Editorial — Clean Clinical Photo)         */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Clear Product Positioning */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
              <span className="font-bold tracking-wide">MEDICATION SAFETY + AMR INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-[1.12]">
              Turn fragmented healthcare data into<br />
              <span className="text-[#0D9488]">actionable safety intelligence.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              MediGuard connects hospital prescribing, pharmacy batch verification, and microbiology laboratory diagnostics into a unified, closed-loop surveillance platform powered by grounded clinical AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/solutions"
                className="px-6 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/how-it-works"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>How It Works</span>
              </Link>
            </div>

            {/* Credibility Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
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

          {/* Right Column: ONE Clean Clinical Photograph (NO TEXT OVERLAY, NO TELEMETRY) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="rounded-[24px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 aspect-[4/3]">
                <img
                  src={CLINICAL_IMAGES.hero}
                  alt="Clinical healthcare team reviewing patient surveillance data"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED HEALTHCARE ECOSYSTEM STRIP                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-2xs text-center space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            DESIGNED FOR &amp; DEPLOYED ACROSS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm sm:text-base font-bold text-slate-700 font-heading">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#0284C7]" />
              <span>Hospitals</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Microscope className="w-5 h-5 text-[#0D9488]" />
              <span>Laboratories</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Pill className="w-5 h-5 text-[#0284C7]" />
              <span>Pharmacies</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-[#0D9488]" />
              <span>Public Health</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FileSearch className="w-5 h-5 text-[#6366F1]" />
              <span>Research</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE HEALTHCARE PROBLEM (4 Large Visual Areas with Photography)         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            THE CRITICAL HEALTHCARE CHALLENGE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
            Healthcare systems are operating blind.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Four interconnected systemic failures threaten patient safety, accelerate antimicrobial resistance, and overwhelm hospital stewardship programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem 1: Medication Safety */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-56 w-full relative overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.problemMedication}
                alt="Counterfeit medicine inspection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-rose-700 border border-rose-200">
                10.5% SUBSTANDARD RATE
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold font-heading text-[#0B1F3A]">Medication Safety Failures</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Substandard and counterfeit medications cause thousands of preventable deaths each year. Without serialized GS1-128 verification and IoT temperature telemetry, degraded vials are routinely administered to vulnerable patients.
              </p>
              <div className="pt-2 text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Result: Treatment failure, adverse drug reactions &amp; preventable mortality</span>
              </div>
            </div>
          </div>

          {/* Problem 2: Antibiotic Resistance */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-56 w-full relative overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.problemAMR}
                alt="Superbug bacterial resistance under microscope"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-rose-700 border border-rose-200">
                4.95M DEATHS ANNUALLY
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold font-heading text-[#0B1F3A]">Antimicrobial Resistance Surge</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over-prescribing and empirical overuse of WHO Reserve antibiotics drive rapid bacterial resistance mutations. Pathogens such as CRE and CRAB now render first-line and second-line therapeutics completely ineffective.
              </p>
              <div className="pt-2 text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Result: Multi-drug resistance &amp; untreatable nosocomial infections</span>
              </div>
            </div>
          </div>

          {/* Problem 3: Fragmented Healthcare Data */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-56 w-full relative overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.problemData}
                alt="Disjointed paper records and isolated hospital systems"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-amber-700 border border-amber-200">
                ZERO INTEROPERABILITY
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold font-heading text-[#0B1F3A]">Fragmented Healthcare Data</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hospital EHRs, pharmacy inventory ledgers, and microbiology LIS systems operate in completely isolated database silos. Prescribing clinicians cannot see real-time antibiograms when selecting empiric regimens.
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Result: Clinicians prescribing without localized susceptibility data</span>
              </div>
            </div>
          </div>

          {/* Problem 4: Delayed Surveillance */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="h-56 w-full relative overflow-hidden bg-slate-100">
              <img
                src={CLINICAL_IMAGES.problemSurveillance}
                alt="Delayed epidemiological surveillance"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-amber-700 border border-amber-200">
                WEEKS TO DETECTION
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl font-bold font-heading text-[#0B1F3A]">Delayed Outbreak Surveillance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Traditional epidemiological audits rely on retrospective monthly spreadsheets. Nosocomial cross-transmission in intensive care units spreads undetected across wards until multiple patient casualties have already occurred.
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Result: Reactive containment after outbreaks have already escalated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW MEDIGUARD CONNECTS EVERYTHING (7-Stage Closed Loop)                */}
      {/* ========================================================================= */}
      <section className="bg-white border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-[#0D9488] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
              CLOSED-LOOP ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-[#0B1F3A]">
              How MediGuard connects everything.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              An unbroken clinical pipeline linking orders, pharmacy dispensing, laboratory microbiology, and public health action.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {[
              { step: '01', title: 'Prescription', icon: Stethoscope, desc: 'Doctor enters electronic order with automatic WHO AWaRe tier checks.' },
              { step: '02', title: 'Dispensing', icon: Pill, desc: 'Pharmacy matches order backed by non-negative inventory floor protection.' },
              { step: '03', title: 'Verification', icon: QrCode, desc: 'GS1 DataMatrix scanning checks lot serialization & cold-chain status.' },
              { step: '04', title: 'Laboratory', icon: Microscope, desc: 'Microbiology bench accessions culture isolate with microdilution.' },
              { step: '05', title: 'Detection', icon: Activity, desc: 'Automated CLSI M100 / EUCAST rules trigger instant resistance alerts.' },
              { step: '06', title: 'Investigation', icon: FileSearch, desc: 'Multidisciplinary team evaluates clinical signals with mandatory justification.' },
              { step: '07', title: 'Action', icon: ShieldCheck, desc: 'Stewardship lead de-escalates therapy or initiates patient cohort isolation.' },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F7FAFC] border border-slate-200 shadow-2xs space-y-3 hover:border-[#0D9488] hover:bg-white transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#0D9488] font-bold">STAGE {s.step}</span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-heading">{s.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0" />
              <span>
                <strong>Guaranteed Clinical Closed Loop:</strong> Inventory cannot fall below zero, specimens map to CLSI breakpoints, and deterministic signals require mandatory clinical justification before dismissal.
              </span>
            </div>
            <Link
              to="/how-it-works"
              className="px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-xs shrink-0 transition-colors cursor-pointer"
            >
              Explore Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MEDICATION SAFETY (Image + Explanation + UI Visualization)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Clean Clinical Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3] bg-slate-100">
                <img
                  src={CLINICAL_IMAGES.pharmacy}
                  alt="Clinical pharmacist verifying medication serial barcodes"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Explanation & Safety Safeguards */}
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

              {/* 4-Step Safety Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#0D9488] font-bold font-heading">
                    <QrCode className="w-4 h-4 shrink-0" />
                    <span>1. GS1 DataMatrix Scan</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    2D barcode scan cross-checks national drug code, lot number, and manufacturer expiration date.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#0284C7] font-bold font-heading">
                    <ThermometerSnowflake className="w-4 h-4 shrink-0" />
                    <span>2. Cold-Chain IoT Check</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Automated telemetry verifies storage temperature remained within strict 2–8°C bounds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold font-heading">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>3. Non-Negative Floor</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    PostgreSQL database constraints reject negative stock counts, preventing phantom inventory and diversion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-1.5">
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
                  className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>Open Pharmacist Safety Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-slate-400">GS1-128 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DIGITAL MICROBIOLOGY LABORATORY (Large Image + AST Visualization)      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8 text-left">
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

            {/* Pathogen Selector */}
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
                    selectedPathogen === p.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-heading italic">{current.name}</h4>
                    <p className="text-xs text-rose-700 font-semibold">{current.classification}</p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <span className="text-slate-400 block">RESISTANCE MECHANISM</span>
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

                {/* Stewardship Protocol Box */}
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0" />
                    <span className="text-teal-950 font-medium">
                      <strong>Recommended Stewardship Protocol:</strong> {current.stewardshipAction}
                    </span>
                  </div>
                  <Link to="/laboratory" className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs shrink-0 text-center transition-colors cursor-pointer">
                    Open Digital Bench
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. AMR INTELLIGENCE (Clean Heatmap + Resistance Trends)                    */}
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
              className="px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Heatmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean Light Antibiogram Table */}
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
      {/* 8. CLINICAL INVESTIGATION (Visual Timeline: Signal -> Evidence -> Timeline -> Investigation -> Action) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-8 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              CLOSED-LOOP CASE RESOLUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading">
              From Signal to Clinical Action: Visual Triage Timeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Every critical resistance alarm triggers an unbroken chain of clinical investigation and documented accountability.
            </p>
          </div>

          {/* Visual Timeline Pipeline */}
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
          <div className="p-6 rounded-2xl bg-[#F7FAFC] border border-slate-200/90 space-y-4">
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
              <Link to="/surveillance" className="text-[#0284C7] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer">
                <span>Open Surveillance Investigation Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. GROUNDED AI COPILOT (LIGHT BACKGROUND, LIGHT INDIGO ACCENTS, NO BLACK) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-indigo-200/90 shadow-lg p-8 sm:p-12 lg:p-16 text-left relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Grounded Architecture Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#6366F1] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>GROUNDED CLINICAL AI ENGINE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] leading-tight">
                Synthesize surveillance trends in natural language.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                MediGuard’s AI Copilot does not hallucinate medical facts. Directly wired to your hospital’s authorized AST cultures and dispensing telemetry through an isolated serverless API proxy, it delivers actionable epidemiological clarity.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Strictly scoped to authenticated hospital tenant data</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Transparent evidence sources, confidence intervals &amp; trend vectors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Zero server-side secret key exposure to client browser</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900">
                <strong>Surveillance Notice:</strong> AI provides surveillance decision support and does not diagnose patients or replace licensed clinical antimicrobial stewardship committees.
              </div>
            </div>

            {/* Right: Clean Light AI Conversation Interface (NO BLACK BACKGROUND) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-6 rounded-3xl bg-[#F7FAFC] border border-indigo-100 shadow-sm space-y-4 text-xs">
                {/* User Message */}
                <div className="flex gap-2.5 items-start justify-end">
                  <div className="p-3.5 rounded-2xl rounded-tr-xs bg-[#0B1F3A] text-white max-w-sm text-xs font-medium shadow-2xs">
                    "Why did resistance to ceftriaxone increase this quarter?"
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[#6366F1] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-5 rounded-2xl rounded-tl-xs bg-white border border-slate-200 text-slate-800 space-y-3 max-w-md shadow-2xs">
                    <div className="text-[10px] font-mono text-indigo-700 flex items-center justify-between border-b border-slate-100 pb-2 font-bold">
                      <span>DATA SCOPE: 4 FACILITIES (N=124 ISOLATES)</span>
                      <span className="text-emerald-700">CONFIDENCE: 94%</span>
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
      {/* 10. ROLE ECOSYSTEM (9 Dedicated Role Cards with Unique Imagery)            */}
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
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Header with Clean Tag */}
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={r.image}
                    alt={r.role}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-slate-900 shadow-2xs">
                    {r.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-bold font-heading">{r.role}</h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-left">
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
                    className="w-full py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#142d52] text-white text-xs font-bold text-center transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
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
      {/* 11. SECURITY ARCHITECTURE (Authentication -> RBAC -> Org -> RLS -> Audit)  */}
      {/* ========================================================================= */}
      <section className="bg-white py-16 border-y border-slate-200/80">
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

          {/* 6-Stage Security Boundary Flow */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFC] border border-slate-200 shadow-2xs space-y-6 text-left">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider text-center">
              END-TO-END SECURITY BOUNDARY FLOW
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-sky-700 font-mono">1. AUTHENTICATION</div>
                <div className="text-slate-700 font-semibold text-xs">Credentialed</div>
                <div className="text-slate-400 text-[10px]">Institutional JWT</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 font-mono">2. RBAC</div>
                <div className="text-slate-700 font-semibold text-xs">9 Role Guards</div>
                <div className="text-slate-400 text-[10px]">Strict Route Fence</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-teal-700 font-mono">3. TENANCY</div>
                <div className="text-slate-700 font-semibold text-xs">Org Boundary</div>
                <div className="text-slate-400 text-[10px]">Isolated Schema</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-700 font-mono">4. RLS</div>
                <div className="text-slate-700 font-semibold text-xs">PostgreSQL RLS</div>
                <div className="text-slate-400 text-[10px]">Database Kernel</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-amber-700 font-mono">5. ENCRYPTION</div>
                <div className="text-slate-700 font-semibold text-xs">AES-256 / TLS 1.3</div>
                <div className="text-slate-400 text-[10px]">At Rest &amp; Transit</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-purple-700 font-mono">6. AUDIT</div>
                <div className="text-slate-700 font-semibold text-xs">Immutable Trail</div>
                <div className="text-slate-400 text-[10px]">Append-Only Log</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-left">
            <div className="p-6 rounded-3xl bg-[#F7FAFC] border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">PostgreSQL Row-Level Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Database queries are cryptographically restricted to the authenticated organization's tenancy. Cross-tenant leakage is mathematically impossible at the database engine level.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-[#F7FAFC] border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC)</h3>
              <p className="text-slate-600 leading-relaxed">
                Prescribers cannot view administrative telemetry, pharmacists are restricted to dispensing registries, and lab scientists access specimen consoles exclusively.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-[#F7FAFC] border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Serverless Gemini Edge Proxy</h3>
              <p className="text-slate-600 leading-relaxed">
                AI queries execute strictly through server-side serverless endpoints (`/api/ai/chat`). Client-side bundles contain zero private API keys or service tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL CALL TO ACTION (Strong Premium Light Healthcare CTA)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12 lg:p-16 text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0D9488] px-3 py-1 rounded-full bg-teal-50 border border-teal-200 inline-block">
              ENTERPRISE DEPLOYMENT READY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#0B1F3A] tracking-tight leading-tight">
              See the intelligence behind safer healthcare.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              Join healthcare systems, regional microbiology laboratories, and antimicrobial stewardship programs operating with real-time MediGuard telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0B1F3A] hover:bg-[#142d52] text-white font-bold text-sm shadow-md transition-all cursor-pointer text-center"
            >
              Request Institutional Demo
            </Link>
            <Link
              to="/solutions"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 transition-all cursor-pointer text-center"
            >
              Explore Platform Architecture
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              WHO AWaRe Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              PostgreSQL Row-Level Security
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              CLSI M100-ED33 Standardized
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              9 Role-Protected Workspaces
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
