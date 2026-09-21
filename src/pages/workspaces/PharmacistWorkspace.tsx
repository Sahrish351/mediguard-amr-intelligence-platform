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
  Sparkles,
  Barcode,
  Truck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
} from 'recharts';
import { BatchBadge, AWaReBadge } from '@/components/common/Badge';
import { CLINICAL_IMAGES } from '@/data/clinicalImages';

const dispensingTrendData = [
  { day: 'Mon', access: 142, watch: 68, reserve: 9 },
  { day: 'Tue', access: 156, watch: 74, reserve: 12 },
  { day: 'Wed', access: 139, watch: 62, reserve: 8 },
  { day: 'Thu', access: 168, watch: 81, reserve: 14 },
  { day: 'Fri', access: 175, watch: 88, reserve: 11 },
  { day: 'Sat', access: 98, watch: 45, reserve: 5 },
  { day: 'Sun', access: 82, watch: 38, reserve: 4 },
];

const coldChainHourlyData = [
  { time: '00:00', temp: 4.1 },
  { time: '04:00', temp: 4.3 },
  { time: '08:00', temp: 4.6 },
  { time: '12:00', temp: 4.8 },
  { time: '16:00', temp: 4.4 },
  { time: '20:00', temp: 4.2 },
  { time: 'Now', temp: 4.2 },
];

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
      {/* 1. Header Greeting & Clinical Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-white via-teal-50/40 to-sky-50/30 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
              GS1 DATA MATRIX & COLD-CHAIN TELEMETRY
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Barcode className="w-3.5 h-3.5 text-teal-600" />
              Serial Verification Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">
            Pharmacy Dispensing Hub — {currentUser?.full_name || 'Clinical Pharmacist'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time antimicrobial dispensing verification, counterfeit batch screening with GS1 barcode authentication, cold-chain IoT temperature tracking, and 14-day repeat dispensing guards.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/app/dispensing"
            className="px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shadow-teal-700/20"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Process Dispensing Queue</span>
          </Link>
          <Link
            to="/app/prescriptions"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5"
          >
            <span>Prescription Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Operational 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Dispensing Volume</span>
            <div className="p-1.5 rounded-xl bg-sky-50 text-sky-700">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
            {prescriptions.filter(p => p.status === 'active').length * 3 + 14} Units
          </div>
          <div className="text-[10px] text-slate-500">24-hour dispensing load</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Medication Inventory</span>
            <div className="p-1.5 rounded-xl bg-teal-50 text-teal-700">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
            {batches.reduce((sum, b) => sum + (b.initial_quantity || 100), 0)} Packs
          </div>
          <div className="text-[10px] text-teal-700 font-medium">{batches.length} active lots</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Expiring Batches</span>
            <div className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
            1 Lot
          </div>
          <div className="text-[10px] text-amber-700 font-medium">Expires in &lt; 90 days</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Cold-Chain Temp</span>
            <div className="p-1.5 rounded-xl bg-teal-50 text-teal-700">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">4.2°C</div>
          <div className="text-[10px] text-emerald-600 font-medium">2°C – 8°C certified band</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-heading">Repeat Dispensing</span>
            <div className="p-1.5 rounded-xl bg-rose-50 text-rose-700">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">{alerts.length} Flags</div>
          <div className="text-[10px] text-rose-600 font-medium">&lt; 14-day barrier</div>
        </div>
      </div>

      {/* Analytics Row: 7-Day Dispensing AWaRe Distribution & 24h Cold Chain Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dispensing by AWaRe Category */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                7-Day Dispensing Volume by WHO AWaRe Category
              </h3>
              <p className="text-xs text-slate-500">
                Tracking daily unit consumption between Access, Watch, and Reserve antimicrobials.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              Units Dispensed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dispensingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="access" name="Access (Green)" fill="#10b981" stackId="aw" radius={[0, 0, 0, 0]} />
                <Bar dataKey="watch" name="Watch (Amber)" fill="#f59e0b" stackId="aw" radius={[0, 0, 0, 0]} />
                <Bar dataKey="reserve" name="Reserve (Red)" fill="#ef4444" stackId="aw" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 24-Hour IoT Temperature Telemetry Line Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Cold-Chain 24h Sensor Telemetry
              </h3>
              <p className="text-xs text-slate-500">
                Chamber SENS-COLD-01 (Target: 2.0°C to 8.0°C).
              </p>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200 font-bold">
              4.2°C NOW
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={coldChainHourlyData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <ReferenceLine y={8.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Max 8°C', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={2.0} stroke="#0284c7" strokeDasharray="3 3" label={{ value: 'Min 2°C', fill: '#0284c7', fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  name="Temp (°C)"
                  stroke="#0d9488"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0d9488' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
                  <tr className="border-b border-slate-200 text-slate-500 font-mono bg-slate-50/70">
                    <th className="py-3 px-3">Batch Lot</th>
                    <th className="py-3 px-3">Medication</th>
                    <th className="py-3 px-3">Expiry Date</th>
                    <th className="py-3 px-3">Stock Units</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBatches.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{b.batch_number}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-900">{b.medicine?.brand_name}</div>
                        <div className="text-[11px] text-slate-500">{b.medicine?.generic_name}</div>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-600">{b.expiry_date}</td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-900">{b.current_quantity}</td>
                      <td className="py-3.5 px-3">
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
                <div key={d.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{d.id}</span>
                    <span className="text-slate-500 block text-[11px]">Prescription: {d.prescription_id}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">{d.quantity} Units</span>
                    <span className="text-[10px] text-emerald-600 block font-medium">Deducted from verified stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Cold Chain Telemetry & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pharmacy Alerts */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Pharmaceutical Guard Alerts</span>
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                <span className="font-bold text-rose-900 block">Quarantined Batch Alert</span>
                <p className="text-[11px] text-rose-700">Lot AZI-2024-SUSP has been recalled by manufacturer. Dispensing lock enforced across all stations.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-900 block">14-Day Repeat Course Barrier</span>
                <p className="text-[11px] text-amber-700">Patient PT-9102 flagged for consecutive broad-spectrum fill within 7 days. Escalation required.</p>
              </div>
            </div>
          </div>

          {/* GS1 Serial Verification Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50/60 to-blue-50/50 text-slate-800 border border-teal-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Barcode className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                GS1 DataMatrix Scanner
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every pack scanned checks national falsified medicine registries and expiration dates automatically before pharmacist confirmation.
            </p>
            <div className="text-[10px] font-mono text-teal-700 pt-1 font-semibold">
              Global Standards 1 (GS1) Compliance: Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
