import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Stethoscope,
  Pill,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  User,
  Activity,
  Plus,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const DoctorWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const medicines = api.getMedicines();
  const alerts = api.getAlerts(currentOrg.id);

  const [selectedIndication, setSelectedIndication] = useState('Sepsis / Septic Shock');
  const [patientRef, setPatientRef] = useState('PAT-88192-X');
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || '');
  const [orderCreatedNotice, setOrderCreatedNotice] = useState(false);
  const [searchMed, setSearchMed] = useState('');

  // 7-day prescribing trend data
  const prescribingTrendData = [
    { day: 'Mon', access: 14, watch: 6, reserve: 2 },
    { day: 'Tue', access: 18, watch: 5, reserve: 1 },
    { day: 'Wed', access: 16, watch: 7, reserve: 3 },
    { day: 'Thu', access: 21, watch: 4, reserve: 1 },
    { day: 'Fri', access: 19, watch: 8, reserve: 2 },
    { day: 'Sat', access: 12, watch: 3, reserve: 0 },
    { day: 'Sun', access: 15, watch: 4, reserve: 1 },
  ];

  const awareDistributionData = [
    { category: 'Access (Target ≥60%)', percentage: 72, fill: '#16A34A' },
    { category: 'Watch (Surveillance)', percentage: 22, fill: '#D97706' },
    { category: 'Reserve (Restricted)', percentage: 6, fill: '#DC2626' },
  ];

  const filteredMeds = medicines.filter(
    (m) =>
      m.brand_name.toLowerCase().includes(searchMed.toLowerCase()) ||
      m.generic_name.toLowerCase().includes(searchMed.toLowerCase())
  );

  const handleCreateFastOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const med = medicines.find((m) => m.id === selectedMedId) || medicines[0];
    api.createPrescription(currentOrg.id, {
      facility_id: 'fac-1',
      prescriber_id: currentUser?.id || 'usr-1',
      patient_reference: patientRef,
      encounter_reference: `ENC-${Date.now().toString().slice(-4)}`,
      clinical_indication: selectedIndication,
      status: 'active',
      items: [
        {
          id: `item-${Date.now()}`,
          prescription_id: '',
          medicine_id: med.id,
          medicine: med,
          dose: med.strength || '500mg',
          frequency: 'q8h (Every 8 hours)',
          duration_days: 7,
          quantity: 1,
          route: med.route || 'Oral',
        },
      ],
    });
    setOrderCreatedNotice(true);
    setTimeout(() => setOrderCreatedNotice(false), 4000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header Greeting & Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              CLINICAL PRESCRIBING WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Point-of-Care Surveillance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Good morning, Dr. {currentUser?.full_name?.replace(/^Dr\.?\s*/i, '') || 'Sarah'}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Here is your antimicrobial prescribing overview for today.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} • {currentOrg.name}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#prescription-form"
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Prescription</span>
          </a>
          <Link
            to="/app/prescriptions"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-2xs"
          >
            Patient History
          </Link>
          <Link
            to="/app/alerts"
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all shadow-2xs"
          >
            Review Alerts
          </Link>
        </div>
      </div>

      {/* 2. KPIs: Active Prescriptions, Patients Today, Stewardship Flags, Pending Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Active Prescriptions</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">{prescriptions.length} Active</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% tokenized patient privacy</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Patients Today</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">18 Inpatients</div>
          <div className="text-[11px] text-slate-500">ICU &amp; General Medical Wards</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Stewardship Flags</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">3 Flags</div>
          <div className="text-[11px] text-amber-700 font-medium">Watch tier review advisory</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Pending Reviews</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">2 Pending</div>
          <div className="text-[11px] text-teal-700 font-medium">Culture AST correlation pending</div>
        </div>
      </div>

      {/* 3. Charts: 7-Day Prescribing Trend & AWaRe Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 7-Day Prescribing Trend */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Antibiotic Prescribing Trend</h3>
              <p className="text-xs text-slate-500">Daily antimicrobial courses stratified by WHO AWaRe tier.</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
              Weekly Volume
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prescribingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '11px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="access" name="Access Tier" stackId="1" stroke="#16A34A" fill="#16A34A" fillOpacity={0.6} />
                <Area type="monotone" dataKey="watch" name="Watch Tier" stackId="1" stroke="#D97706" fill="#D97706" fillOpacity={0.6} />
                <Area type="monotone" dataKey="reserve" name="Reserve Tier" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AWaRe Distribution & Guidance */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">AWaRe Distribution</h3>
              <p className="text-xs text-slate-500">WHO target: Maintain ≥60% in Access category.</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              COMPLIANT
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {awareDistributionData.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.category}</span>
                  <span className="font-mono font-bold text-slate-900">{item.percentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Main Workflows: Create Prescription & Medication Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Prescription Form & Recent Prescriptions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Prescription Order Workspace */}
          <div id="prescription-form" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  <span>Clinical Prescription Order Workspace</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Enter new antimicrobial course with automated WHO AWaRe classification and formulary guidance.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                EHR / CPOE Ready
              </span>
            </div>

            {orderCreatedNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prescription course recorded and queued for pharmacy batch verification.</span>
              </div>
            )}

            <form onSubmit={handleCreateFastOrder} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pseudonymous Patient ID</label>
                  <input
                    type="text"
                    value={patientRef}
                    onChange={(e) => setPatientRef(e.target.value)}
                    required
                    placeholder="PAT-90823-X"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Clinical Indication</label>
                  <select
                    value={selectedIndication}
                    onChange={(e) => setSelectedIndication(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-sky-500"
                  >
                    <option>Sepsis / Septic Shock</option>
                    <option>Hospital-Acquired Pneumonia (HAP/VAP)</option>
                    <option>Complicated Intra-Abdominal Infection</option>
                    <option>Complicated Urinary Tract Infection</option>
                    <option>Skin and Soft Tissue Infection (SSTI)</option>
                    <option>Surgical Prophylaxis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Antimicrobial</label>
                  <select
                    value={selectedMedId}
                    onChange={(e) => setSelectedMedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-hidden focus:border-sky-500"
                  >
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.brand_name} ({m.generic_name}) - {m.strength}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Includes automatic 14-day duplicate prescription and inventory stock floor safeguards.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sign &amp; Order Prescription</span>
                </button>
              </div>
            </form>
          </div>

          {/* Recent Active Prescriptions Table */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recent Prescription Orders
                </h3>
                <p className="text-xs text-slate-500">
                  Active antimicrobial courses across facility wards.
                </p>
              </div>
              <Link to="/app/prescriptions" className="text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1">
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Patient Token</th>
                    <th className="py-2.5 px-3">Medication</th>
                    <th className="py-2.5 px-3">Indication</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {prescriptions.slice(0, 5).map((rx) => (
                    <tr key={rx.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-mono font-semibold text-slate-900">{rx.id}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{rx.patient_reference}</td>
                      <td className="py-3 px-3 font-medium text-slate-900">
                        {rx.items?.[0]?.medicine?.brand_name || 'Antimicrobial Agent'}
                      </td>
                      <td className="py-3 px-3 text-slate-600">{rx.clinical_indication || 'Unspecified'}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {rx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Medication Lookup & Stewardship Guidance */}
        <div className="lg:col-span-4 space-y-6">
          {/* Medication Formulary Search */}
          <div id="medication-search" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <Search className="w-4 h-4 text-sky-600" />
              <span>Medication Formulary Search</span>
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchMed}
                onChange={(e) => setSearchMed(e.target.value)}
                placeholder="Search formulary (e.g. Meropenem, Ciprofloxacin)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2 pt-1 max-h-64 overflow-y-auto">
              {filteredMeds.slice(0, 6).map((med) => (
                <div key={med.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/60 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{med.brand_name}</span>
                      <span className="text-slate-500">({med.generic_name})</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{med.strength} • {med.dosage_form}</span>
                  </div>
                  <AWaReBadge category={med.awarre_category as any} />
                </div>
              ))}
            </div>
          </div>

          {/* Stewardship Insights & Alerts */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sky-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Stewardship Advisory Feedback
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your hospital ICU is currently monitoring <em>K. pneumoniae</em> resistance to 3rd-generation cephalosporins.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <strong>Clinical Practice Guidance:</strong>
              <p>Consider requesting automated blood culture prior to initiating empiric Carbapenem therapy in febrile patients.</p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Issued by Antimicrobial Stewardship Committee • Dr. Tariq Mehmood
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
