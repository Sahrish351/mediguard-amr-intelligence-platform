import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { BatchBadge } from '@/components/common/Badge';
import { StatCard } from '@/components/common/StatCard';
import { formatDate } from '@/lib/formatters';
import {
  Package,
  PackageCheck,
  PackageX,
  AlertTriangle,
  Thermometer,
  ShieldAlert,
  Search,
  CheckCircle2,
  Filter,
  FileDown,
  Lock,
  RefreshCw,
  QrCode,
} from 'lucide-react';

export const BatchRegistryPage: React.FC = () => {
  const { currentOrg, currentUser, can } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBatchForQuarantine, setSelectedBatchForQuarantine] = useState<any | null>(null);
  const [quarantineReason, setQuarantineReason] = useState('');

  const batches = api.getBatches();
  const medicines = api.getMedicines();

  // Metrics
  const totalLots = batches.length;
  const verifiedLots = batches.filter((b) => b.verification_status === 'Verified').length;
  const expiringLots = batches.filter((b) => b.verification_status === 'Expiring Soon').length;
  const quarantinedLots = batches.filter(
    (b) => b.verification_status === 'Suspicious' || b.verification_status === 'Recalled'
  ).length;

  const filteredBatches = batches.filter((b) => {
    const med = medicines.find((m) => m.id === b.medicine_id);
    const mfg = b.manufacturer || med?.manufacturer || '';
    const matchesSearch =
      b.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mfg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (med && med.generic_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || b.verification_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleQuarantine = () => {
    if (!selectedBatchForQuarantine || !quarantineReason) return;

    // Update batch verification status to Suspicious
    api.verifyBatch(
      selectedBatchForQuarantine.id,
      'Suspicious',
      currentUser?.id || 'usr-1',
      `Quarantined by ${currentUser?.full_name}: ${quarantineReason}`
    );

    setSelectedBatchForQuarantine(null);
    setQuarantineReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Batch Integrity & Cold-Chain Registry</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">
              GS1 Datamatrix Verification
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Lot-level safety tracking, cold-chain temperature telemetry, expiry surveillance, and rapid quarantine recall controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Lot Manifest
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Verified Lots"
          value={verifiedLots}
          subtitle="GS1 barcode verified"
          icon={PackageCheck}
          color="emerald"
        />
        <StatCard
          title="Expiring Within 90 Days"
          value={expiringLots}
          subtitle="FIFO dispensing prioritization active"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Quarantined / Recalled"
          value={quarantinedLots}
          subtitle="Safety lock enabled"
          icon={ShieldAlert}
          color={quarantinedLots > 0 ? 'rose' : 'slate'}
        />
        <StatCard
          title="Cold-Chain Adherence"
          value="99.4%"
          subtitle="Real-time sensor logs (2°C - 8°C)"
          icon={Thermometer}
          color="sky"
        />
      </div>

      {/* Filter and Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search batch number, manufacturer, or drug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 w-72"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Verification Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Expiring Soon">Expiring Soon Only</option>
              <option value="Expired">Expired</option>
              <option value="Suspicious">Suspicious / Quarantined</option>
              <option value="Recalled">Recalled</option>
            </select>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong>{filteredBatches.length}</strong> batch lots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Batch Number / Lot</th>
                <th className="py-3 px-4 font-semibold">Medication</th>
                <th className="py-3 px-4 font-semibold">Manufacturer</th>
                <th className="py-3 px-4 font-semibold">Expiry Date</th>
                <th className="py-3 px-4 font-semibold text-right">Available Qty</th>
                <th className="py-3 px-4 font-semibold text-center">Cold Chain</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredBatches.map((b) => {
                const med = medicines.find((m) => m.id === b.medicine_id);
                const isColdChain = med?.dosage_form.includes('Injection') || med?.generic_name.includes('Colistin');

                return (
                  <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-white flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-sky-400" />
                        {b.batch_number}
                      </div>
                      <div className="text-[10px] text-slate-500">Mfg: {formatDate(b.manufacture_date || b.manufacturing_date)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{med?.generic_name || 'Unknown Drug'}</div>
                      <div className="text-[11px] text-slate-400">{med?.brand_name}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{b.manufacturer || med?.manufacturer || 'Certified Pharma'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono ${
                          b.verification_status === 'Expired'
                            ? 'text-rose-400 font-bold'
                            : b.verification_status === 'Expiring Soon'
                            ? 'text-amber-400 font-semibold'
                            : 'text-slate-300'
                        }`}
                      >
                        {formatDate(b.expiry_date)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-white">
                      {b.current_quantity.toLocaleString()} / {b.initial_quantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isColdChain ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                          <Thermometer className="w-3 h-3 text-cyan-400" />
                          4.2°C (Norm)
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Room Temp</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <BatchBadge status={b.verification_status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      {b.verification_status !== 'Suspicious' && b.verification_status !== 'Recalled' ? (
                        <button
                          onClick={() => setSelectedBatchForQuarantine(b)}
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline"
                        >
                          Quarantine Lot
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Quarantined</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quarantine Modal */}
      {selectedBatchForQuarantine && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Initiate Batch Quarantine</h3>
            </div>

            <p className="text-xs text-slate-300">
              You are placing batch <strong className="font-mono text-white">{selectedBatchForQuarantine.batch_number}</strong> on immediate safety hold.
              This will block this lot from being dispensed by any pharmacy in the network.
            </p>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">Mandatory Quarantine Reason:</label>
              <textarea
                value={quarantineReason}
                onChange={(e) => setQuarantineReason(e.target.value)}
                placeholder="e.g. Temperature excursion detected in cold storage; suspected counterfeit packaging; manufacturer recall notice..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 h-24 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedBatchForQuarantine(null);
                  setQuarantineReason('');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleQuarantine}
                disabled={!quarantineReason.trim()}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-50 transition-colors"
              >
                Confirm Safety Quarantine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
