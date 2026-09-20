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
} from 'lucide-react';
import { AWaReBadge } from '@/components/common/Badge';

export const DoctorWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const [searchMed, setSearchMed] = useState('');
  const [selectedIndication, setSelectedIndication] = useState('All');

  const prescriptions = api.getPrescriptions(currentOrg.id);
  const medicines = api.getMedicines();
  const alerts = api.getAlerts(currentOrg.id).filter(a => a.severity === 'Critical' || a.severity === 'High');

  // Filtered medication reference search
  const filteredMeds = medicines.filter(m =>
    m.generic_name.toLowerCase().includes(searchMed.toLowerCase()) ||
    m.brand_name.toLowerCase().includes(searchMed.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
              CLINICAL PRESCRIBING WORKSPACE
            </span>
            <span className="text-xs text-slate-400 font-mono">• Dr. Prescriber Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Welcome back, {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Active Hospital: {currentOrg.name} • Ward Practice Guidelines Active (CLSI M100-ED33)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/prescriptions"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Prescription Order</span>
          </Link>
        </div>
      </div>

      {/* Clinical KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">My Active Orders</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{prescriptions.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium">100% with pseudonymous IDs</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">AWaRe Access Target</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">72.4%</div>
          <div className="text-[11px] text-emerald-600 font-medium">&gt; 60% WHO Stewardship Goal</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Reserve Antibiotics</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">2 Orders</div>
          <div className="text-[11px] text-rose-600 font-medium">Requires microbiology review</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Prescription Alerts</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{alerts.length} Active</div>
          <div className="text-[11px] text-amber-600 font-medium">Repeat fill / dosage warnings</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Recent Prescriptions & Search */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Drug Formulary Lookup */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Antimicrobial Reference & AWaRe Formulary
                </h3>
                <p className="text-xs text-slate-500">
                  Quickly check spectrum tier, indications, and recommended dosage intervals.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchMed}
                onChange={(e) => setSearchMed(e.target.value)}
                placeholder="Search by generic or brand name (e.g. Meropenem, Augmentin)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white"
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
                  Active antimicrobial courses across ward patients.
                </p>
              </div>
              <Link to="/app/prescriptions" className="text-xs font-semibold text-sky-600 hover:text-sky-500 flex items-center gap-1">
                <span>View All</span>
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

        {/* Right 4 Cols: Stewardship Advisory & Alerts */}
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
              <strong>Clinical Practice Reminder:</strong>
              <p>Consider requesting automated blood culture prior to initiating empiric Carbapenem therapy in febrile neutropenic patients.</p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Issued by Antimicrobial Stewardship Committee • Dr. Tariq Mehmood
            </div>
          </div>

          {/* Active Clinical Alerts */}
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
