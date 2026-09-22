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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Package className="w-5 h-5 text-teal-600" />
              Batch Integrity & Cold-Chain Registry
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              GS1 Datamatrix Verification
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lot-level safety tracking, cold-chain temperature telemetry, expiry surveillance, and rapid quarantine recall controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
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
          subtitle="FIFO prioritization active"
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
          color="teal"
        />
      </div>

      {/* Filter and Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search batch number, manufacturer, or drug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-teal-500 w-72 shadow-xs"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Verification Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Expiring Soon">Expiring Soon Only</option>
              <option value="Expired">Expired</option>
              <option value="Suspicious">Suspicious / Quarantined</option>
              <option value="Recalled">Recalled</option>
            </select>
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-[#0B1F3A] font-semibold">{filteredBatches.length}</strong> batch lots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Batch Number / Lot</th>
                <th className="py-3 px-4">Medication</th>
                <th className="py-3 px-4">Manufacturer</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4 text-right">Available Qty</th>
                <th className="py-3 px-4 text-center">Cold Chain</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBatches.map((b) => {
                const med = medicines.find((m) => m.id === b.medicine_id);
                const isColdChain = med?.dosage_form.includes('Injection') || med?.generic_name.includes('Colistin');

                return (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-[#0B1F3A] flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-teal-600" />
                        {b.batch_number}
                      </div>
                      <div className="text-[10px] text-slate-500">Mfg: {formatDate(b.manufacture_date || b.manufacturing_date)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0B1F3A]">{med?.generic_name || 'Unknown Drug'}</div>
                      <div className="text-[11px] text-slate-500">{med?.brand_name}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{b.manufacturer || med?.manufacturer || 'Certified Pharma'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono text-[11px] ${
                          b.verification_status === 'Expired'
                            ? 'text-rose-700 font-bold'
                            : b.verification_status === 'Expiring Soon'
                            ? 'text-amber-700 font-semibold'
                            : 'text-slate-600'
                        }`}
                      >
                        {formatDate(b.expiry_date)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">
                      {b.current_quantity.toLocaleString()} / {b.initial_quantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isColdChain ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                          <Thermometer className="w-3 h-3 text-teal-600" />
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
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
                        >
                          Quarantine Lot
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Quarantined</span>
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center gap-2 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#0B1F3A]">Initiate Batch Quarantine</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-rose-50/50 p-3 rounded-xl border border-rose-100">
              You are placing batch <strong className="font-mono text-[#0B1F3A]">{selectedBatchForQuarantine.batch_number}</strong> on immediate safety hold.
              This will block this lot from being dispensed by any pharmacy in the network.
            </p>

            <div>
              <label className="text-xs text-slate-700 block mb-1 font-semibold">Mandatory Quarantine Reason:</label>
              <textarea
                value={quarantineReason}
                onChange={(e) => setQuarantineReason(e.target.value)}
                placeholder="e.g. Temperature excursion detected in cold storage; suspected counterfeit packaging; manufacturer recall notice..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:border-rose-500 h-24 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  setSelectedBatchForQuarantine(null);
                  setQuarantineReason('');
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleQuarantine}
                disabled={!quarantineReason.trim()}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
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
