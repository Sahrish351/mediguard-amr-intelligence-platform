import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Medicine, MedicineBatch } from '@/types';
import { AWaReBadge, BatchBadge } from '@/components/common/Badge';
import { formatDate } from '@/lib/formatters';
import { Modal } from '@/components/common/Modal';
import { Pill, ShieldCheck, AlertTriangle, Search, Filter, CheckCircle2 } from 'lucide-react';

export const MedicationsPage: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'catalog' | 'batches'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<MedicineBatch | null>(null);
  const [newStatus, setNewStatus] = useState<MedicineBatch['verification_status']>('Verified');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [verificationSource, setVerificationSource] = useState('GS1 Regulatory Check');

  const medicines = api.getMedicines(currentOrg.id);
  const batches = api.getBatches();

  const filteredMedicines = medicines.filter(
    (m) =>
      m.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.therapeutic_class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBatches = batches.filter(
    (b) =>
      b.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.medicine?.generic_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    api.verifyBatch(
      selectedBatch.id,
      newStatus,
      currentUser.id,
      `${verificationSource}: ${verificationNotes}`
    );

    setSelectedBatch(null);
    setVerificationNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            Medications & Batch Integrity Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulary catalog, ATC classification, and pharmaceutical batch regulatory verification
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-xs">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Formulary Catalog ({medicines.length})
          </button>
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'batches'
                ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Batch Verification ({batches.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search generic, brand, batch number..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#0B1F3A] placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* TAB 1: MEDICINES CATALOG */}
      {activeTab === 'catalog' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] uppercase border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Generic Name / Brand</th>
                  <th className="px-4 py-3">Classification</th>
                  <th className="px-4 py-3">AWaRe Category</th>
                  <th className="px-4 py-3">Dosage & Route</th>
                  <th className="px-4 py-3">Manufacturer</th>
                  <th className="px-4 py-3">ATC Code</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMedicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#0B1F3A]">{med.generic_name}</div>
                      <div className="text-[11px] text-teal-700 font-mono font-medium">{med.brand_name}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{med.therapeutic_class}</div>
                      {med.antibiotic_class && (
                        <div className="text-[10px] text-slate-400 font-mono">{med.antibiotic_class}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <AWaReBadge category={med.awarre_category} />
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-mono text-[11px]">
                      {med.strength} • {med.dosage_form} ({med.route})
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {med.manufacturer}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                      {med.atc_code || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {med.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BATCH INTEGRITY & VERIFICATION */}
      {activeTab === 'batches' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] uppercase border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Batch Number</th>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Manufacture / Expiry</th>
                  <th className="px-4 py-3">Current Stock</th>
                  <th className="px-4 py-3">Verification Status</th>
                  <th className="px-4 py-3">Notes & Source</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredBatches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-bold text-[#0B1F3A]">
                      {b.batch_number}
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <div className="text-[#0B1F3A] font-semibold">{b.medicine?.generic_name}</div>
                      <div className="text-[11px] text-slate-500">{b.medicine?.brand_name}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-[11px]">
                      <div>Mfg: {formatDate(b.manufacture_date)}</div>
                      <div className={new Date(b.expiry_date) < new Date() ? 'text-rose-600 font-bold' : ''}>
                        Exp: {formatDate(b.expiry_date)}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-teal-700">
                      {b.current_quantity} units
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <BatchBadge status={b.verification_status} />
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-500 text-[11px] max-w-xs truncate">
                      {b.notes || b.verification_source || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-sans">
                      <button
                        onClick={() => {
                          setSelectedBatch(b);
                          setNewStatus(b.verification_status);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Verify / Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VERIFY BATCH MODAL */}
      <Modal
        isOpen={!!selectedBatch}
        onClose={() => setSelectedBatch(null)}
        title={`Verify Medicine Batch: ${selectedBatch?.batch_number}`}
        subtitle={`${selectedBatch?.medicine?.generic_name} (${selectedBatch?.medicine?.brand_name})`}
      >
        <form onSubmit={handleVerifySubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Verification Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
            >
              <option value="Verified">Verified (Conforms to regulatory QC standards)</option>
              <option value="Pending">Pending Verification</option>
              <option value="Suspicious">Suspicious (Packaging defect or discrepancy detected)</option>
              <option value="Expired">Expired (Quarantine immediately)</option>
              <option value="Recalled">Recalled (Manufacturer / Regulatory recall)</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Verification Source:</label>
            <input
              type="text"
              value={verificationSource}
              onChange={(e) => setVerificationSource(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              placeholder="e.g. National Regulatory Authority GS1 Portal"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Clinical QC Notes / Evidence:</label>
            <textarea
              rows={3}
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              placeholder="Document visual seal inspection, cold-chain temperature verification, or discrepancy findings..."
              required
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedBatch(null)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold shadow-xs cursor-pointer"
            >
              Save Verification Audit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
