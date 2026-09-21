import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Stethoscope,
  Pill,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Info,
  Calendar,
  Activity,
  Sparkles,
  TrendingUp,
  Check,
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';

export const DoctorWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const [searchMed, setSearchMed] = useState('');
  const [patientRef, setPatientRef] = useState('PAT-90823-X');
  const [selectedIndication, setSelectedIndication] = useState('Community-Acquired Pneumonia (CAP)');
  const [selectedMedId, setSelectedMedId] = useState('med-1');
  const [orderCreatedNotice, setOrderCreatedNotice] = useState(false);

  const prescriptions = api.getPrescriptions(currentOrg.id);
  const medicines = api.getMedicines();
  const alerts = api.getAlerts(currentOrg.id).filter(a => a.severity === 'Critical' || a.severity === 'High');

  // Filtered medication reference search
  const filteredMeds = medicines.filter(m =>
    m.generic_name.toLowerCase().includes(searchMed.toLowerCase()) ||
    m.brand_name.toLowerCase().includes(searchMed.toLowerCase())
  ).slice(0, 5);

  const handleCreateFastOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const med = medicines.find(m => m.id === selectedMedId) || medicines[0];
    api.createPrescription(currentOrg.id, {
      facility_id: 'fac-1',
      prescriber_id: currentUser.id,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              CLINICAL PRESCRIBING WORKSTATION
            </span>
            <span className="text-xs text-slate-400 font-mono">• Point-of-Care Surveillance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Good morning, {currentUser?.full_name?.startsWith('Dr') ? currentUser.full_name : `Dr. ${currentUser.full_name}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Active Facility: {currentOrg.name} • CLSI M100 Guidance Active • Non-diagnostic decision support
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Consult AI Copilot</span>
          </Link>
        </div>
      </div>

      {/* 2. KPIs: Today's Prescriptions, Pending Reviews, Stewardship Signals, Recent Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Today's Prescriptions</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{prescriptions.length} Courses</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% with pseudonymous IDs</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Pending Culture Reviews</span>
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">3 Awaiting AST</div>
          <div className="text-[11px] text-cyan-700 font-medium">Microbiology lab accessioning</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Stewardship Signals</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">72.4% Access</div>
          <div className="text-[11px] text-emerald-600 font-medium">&gt; 60% WHO Target Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Recent Alert Intercepts</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{alerts.length} Signals</div>
          <div className="text-[11px] text-amber-600 font-medium">Repeat fill / reserve alerts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Prescription Workspace, Medication Search & Recent Prescriptions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Prescription Order Workspace */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-mono text-xs focus:outline-hidden focus:border-sky-500"
                    placeholder="PAT-90823-X"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Clinical Indication</label>
                  <select
                    value={selectedIndication}
                    onChange={(e) => setSelectedIndication(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Community-Acquired Pneumonia (CAP)">Community-Acquired Pneumonia (CAP)</option>
                    <option value="Hospital-Acquired Pneumonia (HAP/VAP)">Hospital-Acquired Pneumonia (HAP/VAP)</option>
                    <option value="Complicated Urinary Tract Infection">Complicated Urinary Tract Infection</option>
                    <option value="Skin & Soft Tissue Infection (SSTI)">Skin &amp; Soft Tissue Infection (SSTI)</option>
                    <option value="Severe Sepsis / Septic Shock">Severe Sepsis / Septic Shock</option>
                    <option value="Empiric Febrile Neutropenia">Empiric Febrile Neutropenia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Antimicrobial Agent</label>
                  <select
                    value={selectedMedId}
                    onChange={(e) => setSelectedMedId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:outline-hidden focus:border-sky-500 font-medium"
                  >
                    {medicines.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.brand_name} ({m.generic_name}) — {m.strength}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audit logging &amp; non-negative stock check applied at pharmacy dispensing.</span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sign &amp; Order Prescription</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Drug Formulary & Medication Search */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Antimicrobial Reference &amp; AWaRe Formulary
                </h3>
                <p className="text-xs text-slate-500">
                  Search by generic name or brand to verify spectrum, route, and stewardship category.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchMed}
                onChange={(e) => setSearchMed(e.target.value)}
                placeholder="Search formulary (e.g. Meropenem, Augmentin, Amikacin)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2 pt-1">
              {filteredMeds.map((med) => (
                <div key={med.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/60 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{med.brand_name}</span>
                      <span className="text-slate-500">({med.generic_name})</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{med.strength} • {med.dosage_form} • {med.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AWaReBadge category={med.awarre_category as any} />
                  </div>
                </div>
              ))}
            </div>
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

        {/* Right 4 Cols: Stewardship Advisory, Prescription Trends & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stewardship Feedback Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sky-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Stewardship Advisory Feedback
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your hospital ICU is currently experiencing increased <em>K. pneumoniae</em> resistance to 3rd-generation cephalosporins.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <strong>Clinical Practice Guidance:</strong>
              <p>Consider requesting automated blood culture prior to initiating empiric Carbapenem therapy in febrile neutropenic patients.</p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Issued by Antimicrobial Stewardship Committee • Dr. Tariq Mehmood
            </div>
          </div>

          {/* Prescription Trends Insight */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>Prescription Trends (30d)</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">+6.2% Access</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Access Antibiotics (Amoxicillin, etc.)</span>
                <span className="font-mono font-bold text-emerald-700">72.4%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Watch Antibiotics (Ceftriaxone, etc.)</span>
                <span className="font-mono font-bold text-amber-700">21.8%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span>Reserve Antibiotics (Meropenem, etc.)</span>
                <span className="font-mono font-bold text-rose-700">5.8%</span>
              </div>
            </div>
          </div>

          {/* Active Clinical Prescribing Alerts */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Prescribing Alerts</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">{alerts.length} Total</span>
            </div>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate">{a.title}</span>
                    <span className="text-[10px] font-mono font-bold text-rose-600">{a.severity}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
