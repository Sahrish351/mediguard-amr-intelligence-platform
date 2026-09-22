import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { formatDate } from '@/lib/formatters';
import {
  Activity,
  Microscope,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  FileDown,
  Stethoscope,
  Package,
  Calendar,
  Filter,
  ArrowUpRight,
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
} from 'recharts';

export const OperationalDashboard: React.FC = () => {
  const { currentOrg } = useAuth();
  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d'>('7d');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');

  const facilities = api.getFacilities(currentOrg.id);
  const specimens = api.getSpecimens(currentOrg.id);
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const dispensing = api.getDispensing(currentOrg.id);
  const alerts = api.getAlerts(currentOrg.id);
  const batches = api.getBatches();

  // Metrics
  const totalCultures = specimens.length;
  const pendingCultures = specimens.filter((s) => s.quality_status === 'Adequate').length;
  const totalDispensed = dispensing.length;
  const pendingDispense = prescriptions.filter((p) => p.status === 'active').length;
  const quarantinedBatches = batches.filter(
    (b) => b.verification_status === 'Suspicious' || b.verification_status === 'Recalled'
  ).length;

  const avgTurnaroundHours = 26.4;

  // Mock Throughput Trend
  const throughputData = [
    { day: 'Mon', specimensReceived: 42, culturesCompleted: 38, avgTatHours: 24.1 },
    { day: 'Tue', specimensReceived: 48, culturesCompleted: 44, avgTatHours: 26.5 },
    { day: 'Wed', specimensReceived: 56, culturesCompleted: 50, avgTatHours: 28.2 },
    { day: 'Thu', specimensReceived: 51, culturesCompleted: 49, avgTatHours: 25.8 },
    { day: 'Fri', specimensReceived: 62, culturesCompleted: 58, avgTatHours: 27.4 },
    { day: 'Sat', specimensReceived: 35, culturesCompleted: 32, avgTatHours: 23.0 },
    { day: 'Sun', specimensReceived: 28, culturesCompleted: 26, avgTatHours: 22.5 },
  ];

  // Facility-wise breakdown
  const facilityOperationalStats = facilities.map((f) => {
    const fLab = specimens.filter((s) => s.laboratory_id === f.id);
    const fRx = prescriptions.filter((p) => p.facility_id === f.id);
    const fAlerts = alerts.filter((a) => a.facility_id === f.id && a.status === 'Open');

    return {
      id: f.id,
      name: f.name,
      type: f.type,
      totalSpecimens: fLab.length,
      activePrescriptions: fRx.length,
      openAlerts: fAlerts.length,
      slaAdherence: fAlerts.length > 2 ? 87.5 : 96.2,
      status: fAlerts.some((a) => a.severity === 'Critical') ? 'Critical Attention' : 'Normal Operations',
    };
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Operational Dashboard
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time diagnostic throughput, laboratory turnaround time (TAT), dispensing queues, and facility SLA adherence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs shadow-xs">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                timeframe === 'today' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                timeframe === '7d' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                timeframe === '30d' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
          </div>

          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Facilities</option>
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Brief
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Diagnostic Turnaround (TAT)"
          value={`${avgTurnaroundHours}h`}
          subtitle="Target: < 36h from specimen accession"
          icon={Clock}
          color="sky"
        />
        <StatCard
          title="Specimens Processed"
          value={totalCultures}
          subtitle={`${pendingCultures} awaiting AST completion`}
          icon={Microscope}
          color="teal"
        />
        <StatCard
          title="Pending Dispensing"
          value={pendingDispense}
          subtitle="Awaiting pharmacist validation"
          icon={Stethoscope}
          color="amber"
        />
        <StatCard
          title="Dispensed This Period"
          value={totalDispensed}
          subtitle="100% batch-verified lots"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Batch Quarantine Rate"
          value={quarantinedBatches}
          subtitle="Active safety holds"
          icon={Package}
          color={quarantinedBatches > 0 ? 'rose' : 'slate'}
        />
      </div>

      {/* Throughput & Turnaround Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1F3A]">Daily Specimen Throughput vs. Completed Cultures</h2>
              <p className="text-xs text-slate-500 mt-0.5">Laboratory accession volume versus validated antimicrobial reports</p>
            </div>
            <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
              Avg 48/day
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.7} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="specimensReceived" name="Specimens Accessioned" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="culturesCompleted" name="AST Validated" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1F3A]">Turnaround Time Trend (TAT)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Specimen draw to AST report release</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Within SLA
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.7} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="h" domain={[15, 35]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
                />
                <Line
                  type="monotone"
                  dataKey="avgTatHours"
                  name="Avg TAT (hours)"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ fill: '#f59e0b', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Facility Operational Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1F3A]">Facility Operational Telemetry</h2>
            <p className="text-xs text-slate-500 mt-0.5">Active diagnostic workloads, prescription queues, and SLA adherence across clinical nodes</p>
          </div>
          <Link
            to="/app/surveillance"
            className="text-xs text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1 font-semibold"
          >
            View Surveillance Matrix <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Facility Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Specimens Handled</th>
                <th className="py-3 px-4 text-right">Active Prescriptions</th>
                <th className="py-3 px-4 text-right">Open Alerts</th>
                <th className="py-3 px-4 text-right">SLA Adherence</th>
                <th className="py-3 px-4 text-center">Operational Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facilityOperationalStats.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 capitalize">{item.type}</td>
                  <td className="py-3 px-4 text-right font-mono font-medium text-slate-700">{item.totalSpecimens}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">{item.activePrescriptions}</td>
                  <td className="py-3 px-4 text-right font-mono">
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${
                        item.openAlerts > 0
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.openAlerts}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">
                    {item.slaAdherence}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === 'Critical Attention'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Critical Attention' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/app/alerts"
                      className="text-xs text-[#0284C7] hover:text-[#0369A1] font-semibold"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Workstation Pipelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Processing Queue */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2">
              <Microscope className="w-4 h-4 text-teal-600" />
              Microbiology Laboratory Queue
            </h3>
            <span className="text-xs font-mono text-slate-500">Next batch in 14m</span>
          </div>
          <div className="space-y-2.5">
            {specimens.slice(0, 4).map((spc) => (
              <div
                key={spc.id}
                className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                    <span>{spc.specimen_type}</span>
                    <span className="text-slate-300">|</span>
                    <span className="font-mono text-slate-600">{spc.patient_reference}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Quality: <span className="text-emerald-700 font-semibold">{spc.quality_status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono text-[10px] font-semibold">
                    Accessioned
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{formatDate(spc.collected_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy Dispensing Monitor */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2">
              <Package className="w-4 h-4 text-teal-600" />
              Pharmacy Verification Pipeline
            </h3>
            <span className="text-xs font-mono text-slate-500">GS1 Lot Verification Active</span>
          </div>
          <div className="space-y-2.5">
            {prescriptions.slice(0, 4).map((rx) => (
              <div
                key={rx.id}
                className="p-3 bg-slate-50/70 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                    <span className="font-mono text-teal-700">{rx.patient_reference}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-700">{rx.clinical_indication || rx.diagnosis_icd10 || 'Bacterial Infection'}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Items: {rx.items?.length || 1} antimicrobial formulation(s)
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] font-semibold ${
                      rx.status === 'active'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {rx.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{formatDate(rx.prescription_date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
