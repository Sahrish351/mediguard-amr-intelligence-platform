import React, { useState } from 'react';
import { Building2, Microscope, Pill, Stethoscope, Globe, CheckCircle2, ArrowRight, ShieldCheck, Activity, LineChart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CLINICAL_IMAGES } from '@/lib/clinicalImages';

export const SolutionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'laboratories' | 'pharmacies' | 'doctors' | 'stewardship' | 'public_health'>('hospitals');

  const solutions = {
    hospitals: {
      title: 'Hospitals & Health Systems',
      subtitle: 'Institution-wide antimicrobial stewardship, multi-facility governance, and infection prevention intelligence.',
      icon: Building2,
      badge: 'Institutional Governance',
      role: 'Chief Medical Officers & Quality Directors',
      workspacePath: '/organization',
      image: CLINICAL_IMAGES.heroHospitalCommand,
      overview: 'Transform isolated hospital departmental logs into a synchronized surveillance network capable of intercepting outbreaks before patient transmission multiplies.',
      points: [
        'Real-time cumulative hospital antibiograms updated automatically as microbiological cultures finalize.',
        'Deterministic detection of nosocomial infection clusters and high-priority pathogen surges across ICU, Surgical, and Medical wards.',
        'WHO AWaRe utilization tracking to maintain compliant (>60%) Access antibiotic prescribing ratios.',
        'Cross-facility benchmarking comparing tertiary teaching hospitals against community facilities.',
      ],
      metrics: [
        { label: 'Time to Outbreak Detection', value: '< 2 Hours', change: 'vs 14 days manual' },
        { label: 'AWaRe Compliance Tracking', value: '100% Automated', change: 'WHO 3-tier standard' },
        { label: 'Cross-Ward Visibility', value: '24/7 Live', change: 'Real-time sync' },
      ],
    },
    laboratories: {
      title: 'Microbiology Laboratories',
      subtitle: 'Digital microbiology bench, automated breakpoint interpretation, and critical AST resistance notification.',
      icon: Microscope,
      badge: 'Diagnostics & AST',
      role: 'Principal Microbiologists & Lab Scientists',
      workspacePath: '/laboratory',
      image: CLINICAL_IMAGES.microbiologyLab,
      overview: 'Accelerate AST turnaround from specimen accessioning to clinician notification while upholding strict CLSI M100 and EUCAST breakpoint interpretations.',
      points: [
        'Quantitative Minimum Inhibitory Concentration (MIC) entry with automatic S/I/R rule execution.',
        'Automated flagging of contradictory bacterial phenotypes or biologically implausible resistance profiles.',
        'De-duplication algorithms filtering repeat isolates per patient encounter to prevent biased surveillance estimates.',
        'Instantaneous automated alerts dispatched to infection prevention teams when Reserve antibiotic resistance emerges.',
      ],
      metrics: [
        { label: 'Breakpoint Standards', value: 'CLSI & EUCAST', change: 'Fully codified' },
        { label: 'Turnaround Latency', value: '-65%', change: 'Automated notification' },
        { label: 'AST Data Completeness', value: '99.4%', change: 'Validated cultures' },
      ],
    },
    pharmacies: {
      title: 'Hospital & Community Pharmacies',
      subtitle: 'Medication safety, lot and batch authenticity, temperature telemetry, and repeat fill surveillance.',
      icon: Pill,
      badge: 'Medication Safety',
      role: 'Directors of Pharmacy & Clinical Pharmacists',
      workspacePath: '/pharmacist',
      image: CLINICAL_IMAGES.pharmacyDispensing,
      overview: 'Protect patients against counterfeit, degraded, or recalled antibiotic lots while actively monitoring repeat dispensing anomalies across hospital outpatient pharmacies.',
      points: [
        'Real-time batch authenticity and expiration checks prior to medication dispensing.',
        'Instantaneous quarantine workflows for recalled, contaminated, or temperature-excursioned pharmaceutical lots.',
        'Algorithmic repeat-fill radar flagging patients receiving secondary courses of broad-spectrum antibiotics within 14 days.',
        'Automatic non-negative inventory stock deductions preventing pharmaceutical diversion and stockouts.',
      ],
      metrics: [
        { label: 'Batch Verification Rate', value: '100%', change: 'Prior to dispense' },
        { label: 'Repeat Dispensing Radar', value: '14-Day Window', change: 'Early warning' },
        { label: 'Inventory Stock Precision', value: 'Strict Floor', change: 'Never negative' },
      ],
    },
    doctors: {
      title: 'Doctors & Prescribing Physicians',
      subtitle: 'Evidence-based local resistance intelligence and guideline adherence at the point of clinical order.',
      icon: Stethoscope,
      badge: 'Clinical Prescribing',
      role: 'Attending Physicians & Intensivists',
      workspacePath: '/doctor',
      image: CLINICAL_IMAGES.doctorTabletConsultation,
      overview: 'Empower clinicians with immediate, ward-specific antimicrobial susceptibility context when prescribing empiric therapy for acute infections.',
      points: [
        'Immediate visibility into ward-specific pathogen resistance rates to guide evidence-based empiric therapy.',
        'Structured prescription ordering with clinical indication capture (Sepsis, HAP/VAP, Intra-abdominal, Complicated UTI).',
        'Stewardship alerts when selecting Watch or Reserve antibiotics where Access-category alternatives exist.',
        'Pseudonymized patient identifiers ensuring strict HIPAA and privacy protection during peer review.',
      ],
      metrics: [
        { label: 'Empiric Guideline Match', value: '+34%', change: 'Stewardship guidance' },
        { label: 'Reserve Antibiotic Overuse', value: '-28%', change: 'Advisory prompt' },
        { label: 'Prescription Privacy', value: '100%', change: 'De-identified identifiers' },
      ],
    },
    stewardship: {
      title: 'Antimicrobial Stewardship Teams',
      subtitle: 'Utilization analytics, clinician peer benchmarking, Days of Therapy (DOT) monitoring, and guided interventions.',
      icon: Activity,
      badge: 'Antimicrobial Stewardship',
      role: 'Infection Preventionists & Stewardship Leads',
      workspacePath: '/stewardship',
      image: CLINICAL_IMAGES.stewardshipReview,
      overview: 'Drive sustainable behavior change and preserve therapeutic efficacy through granular antimicrobial consumption analytics and targeted intervention tracking.',
      points: [
        'Automated calculation of Days of Therapy (DOT) and Defined Daily Doses (DDD) across clinical departments.',
        'Clinician peer benchmarking identifying variation in broad-spectrum prescribing for equivalent diagnostic codes.',
        'Closed-loop intervention documentation tracking stewardship recommendations and clinical acceptance rates.',
        'Grounded AI Copilot assisting in drafting formal stewardship committee quarterly summaries.',
      ],
      metrics: [
        { label: 'Stewardship Acceptance', value: '87.2%', change: 'Documented outcomes' },
        { label: 'DOT Calculation', value: 'Real-Time', change: 'Automated metric' },
        { label: 'Quarterly Reporting Time', value: '10 mins', change: 'vs 3 days manual' },
      ],
    },
    public_health: {
      title: 'Public Health & Epidemiology',
      subtitle: 'Macro-level population surveillance, geographic cluster mapping, and predictive outbreak forecasting.',
      icon: Globe,
      badge: 'Population Surveillance',
      role: 'Surveillance Epidemiologists & Health Ministries',
      workspacePath: '/epidemiology',
      image: CLINICAL_IMAGES.epidemiologyMonitoringCenter,
      overview: 'Synthesize multi-institutional surveillance data into actionable regional intelligence conforming to WHO GLASS standards.',
      points: [
        'Geospatial AMR heatmap tracking regional resistance shifts across urban and rural healthcare catchment zones.',
        'Surveillance for WHO Priority Pathogens including Carbapenem-Resistant Enterobacterales (CRE) and MRSA.',
        'Predictive forecasting models identifying rising resistance trajectories 6 to 12 weeks before critical thresholds.',
        'Standardized one-click report generation formatted for national epidemiological bulletins.',
      ],
      metrics: [
        { label: 'Geographic Resolution', value: 'Facility-Level', change: 'Precise geolocation' },
        { label: 'Priority Pathogens', value: 'WHO Tier 1', change: 'CRE, MRSA, VRE' },
        { label: 'Forecasting Horizon', value: '90 Days', change: 'Predictive surge' },
      ],
    },
  };

  const activeSolution = solutions[activeTab];

  return (
    <div className="space-y-20 py-8">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <span>HEALTHCARE CONTINUUM SOLUTIONS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Engineered for Every Team in Clinical Safety
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          MediGuard replaces disjointed spreadsheets and delayed memos with synchronized, role-specialized intelligence.
        </p>
      </section>

      {/* Interactive Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(Object.keys(solutions) as Array<keyof typeof solutions>).map((key) => {
            const item = solutions[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Deep-Dive Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <activeSolution.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider block">
                    {activeSolution.badge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                    {activeSolution.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeSolution.overview}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Operational Capabilities:
                </h4>
                <div className="space-y-2.5">
                  {activeSolution.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Launch {activeSolution.title} Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-400">
                  Target Persona: {activeSolution.role}
                </span>
              </div>
            </div>

            {/* Metrics & Visual Preview Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs relative">
                <img
                  src={activeSolution.image}
                  alt={activeSolution.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  {activeSolution.badge}
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Key Performance Indicators
              </h4>
              <div className="space-y-3">
                {activeSolution.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
                    <span className="text-xs text-slate-500 block">{m.label}</span>
                    <div className="text-xl font-bold text-slate-900 font-heading mt-0.5">{m.value}</div>
                    <span className="text-[11px] text-emerald-600 font-medium">{m.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Architecture Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Why Traditional Healthcare Systems Fall Short
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Comparison between conventional siloed EHR/LIMS setups and MediGuard Connected Intelligence.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="py-3 px-4">Surveillance Capability</th>
                  <th className="py-3 px-4">Conventional Disjointed Systems</th>
                  <th className="py-3 px-4 text-sky-700 bg-sky-50/50">MediGuard Enterprise Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Antibiogram Updates</td>
                  <td className="py-3 px-4 text-slate-500">Annual or quarterly static PDF exports</td>
                  <td className="py-3 px-4 font-medium text-emerald-700 bg-sky-50/30">Continuous real-time calculation per culture</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Batch Counterfeit Verification</td>
                  <td className="py-3 px-4 text-slate-500">Manual inspection after supplier alert</td>
                  <td className="py-3 px-4 font-medium text-emerald-700 bg-sky-50/30">Point-of-dispense registry lookup & cold-chain telemetry</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">AWaRe Utilization Tracking</td>
                  <td className="py-3 px-4 text-slate-500">Periodic pharmacy purchase audits</td>
                  <td className="py-3 px-4 font-medium text-emerald-700 bg-sky-50/30">Live Access/Watch/Reserve prescription surveillance</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Outbreak Anomaly Detection</td>
                  <td className="py-3 px-4 text-slate-500">Ad-hoc clinician recollection</td>
                  <td className="py-3 px-4 font-medium text-emerald-700 bg-sky-50/30">Deterministic algorithmic surge detection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Solutions CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0284C7] to-[#0D9488] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl border border-sky-400/30">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Ready to deploy MediGuard in your healthcare system?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100">
              Schedule an executive briefing or request a live demonstration tailored to your hospital network.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0B1F3A] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Request a Demo
            </Link>
            <Link
              to="/how-it-works"
              className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/30 transition-all cursor-pointer"
            >
              See Architecture &amp; Workflow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
