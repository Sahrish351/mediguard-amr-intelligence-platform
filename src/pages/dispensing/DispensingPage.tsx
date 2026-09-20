import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { DispensingRecord, Prescription, MedicineBatch } from '@/types';
import { formatDate } from '@/lib/formatters';
import { BatchBadge, AWaReBadge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { PackageCheck, Plus, Search, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DispensingPage: React.FC = () => {
  const { currentOrg, currentUser, can } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);

  // Form State
  const [selectedRxId, setSelectedRxId] = useState('');
  const [selectedMedId, setSelectedMedId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [dispenseQty, setDispenseQty] = useState(10);
  const [patientRef, setPatientRef] = useState('');
  const [facilityId, setFacilityId] = useState('');
  const [dispensingNotes, setDispensingNotes] = useState('');

  const facilities = api.getFacilities(currentOrg.id);
  const prescriptions = api.getPrescriptions(currentOrg.id);
  const medicines = api.getMedicines(currentOrg.id);
  const batches = api.getBatches();
  const dispensing = api.getDispensing(currentOrg.id);

  // Available batches for selected medicine
  const availableBatches = batches.filter((b) => !selectedMedId || b.medicine_id === selectedMedId);
  const chosenBatch = batches.find((b) => b.id === selectedBatchId);

  const filteredDispensing = dispensing.filter(
    (d) =>
      d.patient_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.medicine?.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.batch?.batch_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRxSelect = (rxId: string) => {
    setSelectedRxId(rxId);
    const rx = prescriptions.find((p) => p.id === rxId);
    if (rx) {
      setPatientRef(rx.patient_reference);
      setFacilityId(rx.facility_id);
      if (rx.items && rx.items.length > 0) {
        const firstItem = rx.items[0];
        if (firstItem) {
          setSelectedMedId(firstItem.medicine_id);
          setDispenseQty(firstItem.quantity);
          const matchBatch = batches.find((b) => b.medicine_id === firstItem.medicine_id && b.verification_status === 'Verified');
          if (matchBatch) setSelectedBatchId(matchBatch.id);
        }
      }
    }
  };

  const handleDispenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedId || !selectedBatchId || !patientRef || !facilityId) return;

    api.recordDispensing(currentOrg.id, {
      facility_id: facilityId,
      prescription_id: selectedRxId || undefined,
      medicine_id: selectedMedId,
      batch_id: selectedBatchId,
      pharmacist_id: currentUser.id,
      patient_reference: patientRef,
      quantity: Number(dispenseQty),
      repeat_flag: false,
      verification_status: chosenBatch?.verification_status || 'Verified',
      notes: dispensingNotes,
    });

    setIsDispenseModalOpen(false);
    setSelectedRxId('');
    setDispensingNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-sky-400" />
            Pharmacy Dispensing & Batch Verification
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dispensing records linked to verified medicine batches, stock deduction, and repeat dispensing signals
          </p>
        </div>

        {can('dispensing.create') && (
          <button
            onClick={() => {
              if (facilities.length > 0) setFacilityId(facilities[0].id);
              if (medicines.length > 0) {
                setSelectedMedId(medicines[0].id);
                const b = batches.find((x) => x.medicine_id === medicines[0].id);
                if (b) setSelectedBatchId(b.id);
              }
              setIsDispenseModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Record Dispensing Event</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient ref, medicine, batch number..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Dispensing Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Patient Ref</th>
                <th className="px-4 py-3">Medicine Dispensed</th>
                <th className="px-4 py-3">Batch Number</th>
                <th className="px-4 py-3">Batch Status</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Pharmacist</th>
                <th className="px-4 py-3">Dispensed At</th>
                <th className="px-4 py-3 text-right">Pattern Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDispensing.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-white">
                    {d.patient_reference}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{d.medicine?.generic_name}</div>
                    <div className="text-[11px] text-slate-400">{d.medicine?.brand_name}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-300">
                    {d.batch?.batch_number || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <BatchBadge status={d.batch?.verification_status || 'Verified'} />
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-sky-400">
                    {d.quantity} units
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {d.pharmacist?.full_name}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                    {formatDate(d.dispensed_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {d.repeat_flag ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        Repeat Fill
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400">
                        First Fill
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPENSE MODAL */}
      <Modal
        isOpen={isDispenseModalOpen}
        onClose={() => setIsDispenseModalOpen(false)}
        title="Record Pharmacy Dispensing Event"
        subtitle="Verifies stock batch validity and checks for repeat dispensing signals"
        maxWidth="lg"
      >
        <form onSubmit={handleDispenseSubmit} className="space-y-4 text-xs">
          {/* Link to Prescription */}
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Pending Prescription (Optional)</label>
            <select
              value={selectedRxId}
              onChange={(e) => handleRxSelect(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
            >
              <option value="">Direct / Walk-in Dispense (No Rx Link)</option>
              {prescriptions
                .filter((p) => p.status === 'active')
                .map((rx) => (
                  <option key={rx.id} value={rx.id}>
                    {rx.patient_reference} — {rx.items?.[0]?.medicine?.generic_name} ({rx.items?.[0]?.quantity} units)
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Patient Pseudonymous Identifier *</label>
              <input
                type="text"
                value={patientRef}
                onChange={(e) => setPatientRef(e.target.value)}
                placeholder="e.g. PAT-88192-A"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Facility *</label>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                required
              >
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Medicine to Dispense *</label>
            <select
              value={selectedMedId}
              onChange={(e) => {
                setSelectedMedId(e.target.value);
                const match = batches.find((b) => b.medicine_id === e.target.value);
                if (match) setSelectedBatchId(match.id);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              required
            >
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.generic_name} ({m.brand_name})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Batch Selection *</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                required
              >
                {availableBatches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.batch_number} (Exp: {formatDate(b.expiry_date)}) — {b.verification_status} ({b.current_quantity} in stock)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Quantity Dispensed *</label>
              <input
                type="number"
                min={1}
                value={dispenseQty}
                onChange={(e) => setDispenseQty(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Batch Warning Banner if Expired or Suspicious */}
          {chosenBatch && (chosenBatch.verification_status === 'Expired' || chosenBatch.verification_status === 'Suspicious') && (
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong>Warning: Batch Integrity Alert:</strong> Selected batch <code className="font-mono">{chosenBatch.batch_number}</code> is flagged as <strong>{chosenBatch.verification_status}</strong>. Dispensing will generate a high-severity surveillance signal.
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Pharmacist Verification Notes:</label>
            <textarea
              rows={2}
              value={dispensingNotes}
              onChange={(e) => setDispensingNotes(e.target.value)}
              placeholder="Verified physical packaging integrity, expiry, and patient dose counseling."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsDispenseModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
            >
              Confirm Dispensing
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
