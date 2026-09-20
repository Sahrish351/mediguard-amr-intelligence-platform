import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  PackageCheck,
  Pill,
  AlertTriangle,
  ShieldCheck,
  Thermometer,
  Calendar,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { BatchBadge, AWaReBadge } from '@/components/common/Badge';

export const PharmacistWorkspace: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const [selectedFacility, setSelectedFacility] = useState('fac-1');
  const [batchSearch, setBatchSearch] = useState('');

  const batches = api.getBatches(selectedFacility);
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const dispensingRecords = api.getDispensing(currentOrg.id);
  const alerts = api.getAlerts(currentOrg.id).filter(a => a.signal_type === 'repeat_dispensing' || a.signal_type === 'batch_issue');

  const filteredBatches = batches.filter(b =>
    b.batch_number.toLowerCase().includes(batchSearch.toLowerCase()) ||
    b.medicine?.brand_name.toLowerCase().includes(batchSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
              MEDICATION SAFETY & DISPENSING CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">• Clinical Pharmacy Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Pharmacy Workspace — {currentUser?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Dispensing Station: Regional Pharmacy Hub 01 • Cold-Chain Sensor Network (2-8°C Active)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/app/dispensing"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Process Dispensing Queue</span>
          </Link>
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Pending Orders</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {prescriptions.filter(p => p.status === 'active').length} Active
          </div>
          <div className="text-[11px] text-slate-500">Ready for verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Batches Verified</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {batches.filter(b => b.verification_status === 'Verified').length} / {batches.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">100% GS1 Barcode Match</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Cold-Chain Status</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">4.2°C</div>
          <div className="text-[11px] text-emerald-600 font-medium">Optimal Storage Range (2-8°C)</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase font-heading">Repeat Fill Radar</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono">{alerts.length} Flagged</div>
          <div className="text-[11px] text-amber-600 font-medium">&lt; 14 days interval threshold</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Batch Verification & Inventory */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Active Pharmaceutical Lots & Batch Integrity
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time counterfeit detection, manufacturing recall status, and stock levels.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={batchSearch}
                  onChange={(e) => setBatchSearch(e.target.value)}
                  placeholder="Search lot or drug..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-teal-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Batch Lot</th>
                    <th className="py-2.5 px-3">Medication</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3">Stock Units</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBatches.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.batch_number}</td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{b.medicine?.brand_name}</div>
                        <div className="text-[11px] text-slate-500">{b.medicine?.generic_name}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600">{b.expiry_date}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-900">{b.current_quantity}</td>
                      <td className="py-3 px-3">
                        <BatchBadge status={b.verification_status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Dispensing Records */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Recent Dispensing Audits
                </h3>
                <p className="text-xs text-slate-500">
                  Timestamped fulfillment records with stock deduction.
                </p>
              </div>
              <Link to="/app/dispensing" className="text-xs font-semibold text-teal-600 hover:text-teal-500 flex items-center gap-1">
                <span>View Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {dispensingRecords.slice(0, 4).map((d) => (
                <div key={d.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{d.id}</span>
                    <span className="text-slate-500 block text-[11px]">Prescription: {d.prescription_id}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{d.quantity} Units</span>
                    <span className="text-[10px] text-emerald-600 block">Deducted from stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Cold Chain Telemetry & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-teal-700">
              <Thermometer className="w-5 h-5" />
              <h3 className="text-sm font-bold font-heading text-slate-900">
                Cold-Chain Storage Telemetry
              </h3>
            </div>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2 text-center">
              <span className="text-[11px] font-mono uppercase text-teal-700 font-semibold">Sensor SENS-COLD-01</span>
              <div className="text-3xl font-bold font-mono text-teal-900">4.2 °C</div>
              <span className="text-xs text-teal-700 font-medium">Refrigerated Safe Zone (2°C - 8°C)</span>
            </div>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p>• Backup power active on central refrigeration unit.</p>
              <p>• Zero temperature excursion recorded in last 30 days.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Pharmaceutical Alerts</span>
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <span className="font-bold text-rose-900 block">Quarantined Batch Alert</span>
                <p className="text-[11px] text-rose-700">Lot AZI-2024-SUSP has been withdrawn. Dispensing blocked.</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 block">14-Day Repeat Antibiotic Course</span>
                <p className="text-[11px] text-amber-700">Patient PT-9102 flagged for consecutive broad-spectrum fill.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
