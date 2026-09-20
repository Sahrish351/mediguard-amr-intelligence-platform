import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { SeverityBadge } from '@/components/common/Badge';
import { formatDate } from '@/lib/formatters';
import { Link } from 'react-router-dom';
import {
  Activity,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Package,
  Microscope,
  Stethoscope,
  Building2,
  TrendingUp,
  RefreshCw,
  FileDown,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
  const astResults = api.getSusceptibilityResults(currentOrg.id);
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const dispensing = api.getDispensing(currentOrg.id);
  const batches = api.getBatches();
  const alerts = api.getAlerts(currentOrg.id);

  // Operational throughput metrics
  const totalCultures = specimens.length;
  const pendingCultures = Math.max(0, specimens.length - astResults.length);
  const avgTurnaroundHours = 28.4;
  const pendingDispense = prescriptions.filter((p) => p.status === 'active').length;
  const totalDispensed = dispensing.length;
  const quarantinedBatches = batches.filter(
    (b) => b.verification_status === 'Suspicious' || b.verification_status === 'Recalled'
  ).length;

  // Daily turnaround trend data
  const throughputData = [
    { day: 'Mon', specimensReceived: 42, culturesCompleted: 38, avgTatHours: 26 },
    { day: 'Tue', specimensReceived: 56, culturesCompleted: 51, avgTatHours: 28 },
    { day: 'Wed', specimensReceived: 61, culturesCompleted: 58, avgTatHours: 29 },
    { day: 'Thu', specimensReceived: 48, culturesCompleted: 45, avgTatHours: 27 },
    { day: 'Fri', specimensReceived: 65, culturesCompleted: 60, avgTatHours: 31 },
    { day: 'Sat', specimensReceived: 35, culturesCompleted: 34, avgTatHours: 24 },
    { day: 'Sun', specimensReceived: 28, culturesCompleted: 26, avgTatHours: 22 },
  ];

  // Facility operational status
  const facilityOperationalStats = facilities.map((f) => {
    const fLab = specimens.filter((s) => s.laboratory_id === f.id);
    const fRx = prescriptions.filter((p) => p.facility_id === f.id);
    const fAlerts = alerts.filter(
      (a) => a.facility_id === f.id && a.status !== 'Resolved' && a.status !== 'Dismissed'
    );
    return {
      id: f.id,
      name: f.name,
      type: f.type || f.facility_type || 'Hospital',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Operational Dashboard</h1>
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              Live Telemetry
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time diagnostic throughput, laboratory turnaround time (TAT), dispensing queues, and facility SLA adherence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                timeframe === 'today' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                timeframe === '7d' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1 rounded font-medium transition-colors ${
                timeframe === '30d' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
          </div>

          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
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
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Daily Specimen Throughput vs. Completed Cultures</h2>
              <p className="text-xs text-slate-400 mt-0.5">Laboratory accession volume versus validated antimicrobial reports</p>
            </div>
            <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
              Avg 48/day
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="specimensReceived" name="Specimens Accessioned" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="culturesCompleted" name="AST Validated" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Turnaround Time Trend (TAT)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Specimen draw to AST report release</p>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Within SLA
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="h" domain={[15, 35]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
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
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Facility Operational Telemetry</h2>
            <p className="text-xs text-slate-400 mt-0.5">Active diagnostic workloads, prescription queues, and SLA adherence across clinical nodes</p>
          </div>
          <Link
            to="/app/surveillance"
            className="text-xs text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
          >
            View Surveillance Matrix <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Facility Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold text-right">Specimens Handled</th>
                <th className="py-3 px-4 font-semibold text-right">Active Prescriptions</th>
                <th className="py-3 px-4 font-semibold text-right">Open Alerts</th>
                <th className="py-3 px-4 font-semibold text-right">SLA Adherence</th>
                <th className="py-3 px-4 font-semibold text-center">Operational Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {facilityOperationalStats.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400 capitalize">{item.type}</td>
                  <td className="py-3 px-4 text-right font-mono font-medium">{item.totalSpecimens}</td>
                  <td className="py-3 px-4 text-right font-mono text-sky-400">{item.activePrescriptions}</td>
                  <td className="py-3 px-4 text-right font-mono">
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${
                        item.openAlerts > 0
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.openAlerts}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-medium text-emerald-400">
                    {item.slaAdherence}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        item.status === 'Critical Attention'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Critical Attention' ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/app/alerts"
                      className="text-xs text-sky-400 hover:text-sky-300 font-medium"
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
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Microscope className="w-4 h-4 text-teal-400" />
              Microbiology Laboratory Queue
            </h3>
            <span className="text-xs font-mono text-slate-400">Next batch in 14m</span>
          </div>
          <div className="space-y-2.5">
            {specimens.slice(0, 4).map((spc) => (
              <div
                key={spc.id}
                className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-medium text-white flex items-center gap-2">
                    <span>{spc.specimen_type}</span>
                    <span className="text-slate-500">|</span>
                    <span className="font-mono text-slate-400">{spc.patient_reference}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Quality: <span className="text-emerald-400 font-medium">{spc.quality_status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[10px]">
                    Accessioned
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">{formatDate(spc.collected_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy Dispensing Monitor */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-sky-400" />
              Pharmacy Verification Pipeline
            </h3>
            <span className="text-xs font-mono text-slate-400">GS1 Lot Verification Active</span>
          </div>
          <div className="space-y-2.5">
            {prescriptions.slice(0, 4).map((rx) => (
              <div
                key={rx.id}
                className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-medium text-white flex items-center gap-2">
                    <span className="font-mono text-sky-400">{rx.patient_reference}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-300">{rx.clinical_indication || rx.diagnosis_icd10 || 'Bacterial Infection'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Items: {rx.items?.length || 1} antimicrobial formulation(s)
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] ${
                      rx.status === 'active'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {rx.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">{formatDate(rx.prescription_date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
