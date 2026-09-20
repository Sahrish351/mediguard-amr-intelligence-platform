import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Prescription, Medicine } from '@/types';
import { formatDate } from '@/lib/formatters';
import { AWaReBadge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';
import { FileText, Plus, Shield, Search, CheckCircle2, User } from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const { currentOrg, currentUser, can } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form State
  const [patientRef, setPatientRef] = useState('');
  const [encounterRef, setEncounterRef] = useState('');
  const [facilityId, setFacilityId] = useState('');
  const [clinicalIndication, setClinicalIndication] = useState('');
  const [selectedMedId, setSelectedMedId] = useState('');
  const [dose, setDose] = useState('1 g IV');
  const [frequency, setFrequency] = useState('BID');
  const [route, setRoute] = useState('Intravenous');
  const [durationDays, setDurationDays] = useState(7);
  const [quantity, setQuantity] = useState(14);
  const [indicationCategory, setIndicationCategory] = useState('Respiratory');

  const facilities = api.getFacilities(currentOrg.id);
  const medicines = api.getMedicines(currentOrg.id);
  const prescriptions = api.getPrescriptions(currentOrg.id);

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patient_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.encounter_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clinical_indication?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientRef || !selectedMedId || !facilityId) return;

    api.createPrescription(currentOrg.id, {
      facility_id: facilityId,
      prescriber_id: currentUser.id,
      patient_reference: patientRef,
      encounter_reference: encounterRef || `ENC-${Date.now().toString().slice(-4)}`,
      clinical_indication: clinicalIndication,
      status: 'active',
      items: [
        {
          id: '',
          prescription_id: '',
          medicine_id: selectedMedId,
          dose,
          frequency,
          route,
          duration_days: Number(durationDays),
          quantity: Number(quantity),
          indication_category: indicationCategory,
        },
      ],
    });

    setIsNewModalOpen(false);
    // Reset Form
    setPatientRef('');
    setEncounterRef('');
    setClinicalIndication('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            Clinical Prescription Registry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Prescribing encounter monitoring with pseudonymous patient identifiers for surveillance confidentiality
          </p>
        </div>

        {can('prescriptions.create') && (
          <button
            onClick={() => {
              if (facilities.length > 0) setFacilityId(facilities[0].id);
              if (medicines.length > 0) setSelectedMedId(medicines[0].id);
              setIsNewModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Prescription Encounter</span>
          </button>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
        <Shield className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong>Privacy by Design:</strong> Patient identifying fields (CNIC, names, home addresses) are strictly pseudonymized into token references (e.g. <code className="text-sky-300 font-mono">PAT-88192-A</code>) before entering the surveillance registry.
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient ref, encounter, indication..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Encounter / Patient Ref</th>
                <th className="px-4 py-3">Facility</th>
                <th className="px-4 py-3">Prescribed Regimen</th>
                <th className="px-4 py-3">Clinical Indication</th>
                <th className="px-4 py-3">Prescriber</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPrescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-white text-xs">{p.patient_reference}</div>
                    <div className="font-mono text-[10px] text-slate-500">{p.encounter_reference}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {p.facility?.name}
                  </td>
                  <td className="px-4 py-3">
                    {p.items?.map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-medium text-white">
                          <span>{item.medicine?.generic_name}</span>
                          <AWaReBadge category={item.medicine?.awarre_category} />
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.dose} • {item.frequency} ({item.route}) for {item.duration_days}d (Qty: {item.quantity})
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    <div>{p.clinical_indication || '—'}</div>
                    {p.items?.[0]?.indication_category && (
                      <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {p.items[0].indication_category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {p.prescriber?.full_name || 'Staff Physician'}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                    {formatDate(p.prescription_date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        p.status === 'dispensed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE PRESCRIPTION MODAL */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Record Clinical Prescription Encounter"
        subtitle="Enters prescription data into the organization surveillance registry"
        maxWidth="xl"
      >
        <form onSubmit={handleCreatePrescription} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Patient Pseudonymous Identifier *</label>
              <input
                type="text"
                value={patientRef}
                onChange={(e) => setPatientRef(e.target.value)}
                placeholder="e.g. PAT-9104-B"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Encounter Reference</label>
              <input
                type="text"
                value={encounterRef}
                onChange={(e) => setEncounterRef(e.target.value)}
                placeholder="e.g. ENC-2024-192"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Indication Category *</label>
              <select
                value={indicationCategory}
                onChange={(e) => setIndicationCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              >
                <option value="Respiratory">Respiratory (Pneumonia/Bronchitis)</option>
                <option value="Sepsis">Severe Sepsis / Septic Shock</option>
                <option value="UTI">Urinary Tract Infection</option>
                <option value="Surgical Prophylaxis">Surgical Prophylaxis</option>
                <option value="Gastrointestinal">Intra-Abdominal / GI</option>
                <option value="Skin & Soft Tissue">Skin & Soft Tissue</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Medicine *</label>
            <select
              value={selectedMedId}
              onChange={(e) => setSelectedMedId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              required
            >
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.generic_name} ({m.brand_name}) — {m.awarre_category || 'General'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Dose</label>
              <input
                type="text"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                placeholder="1 g IV"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              >
                <option value="Once daily">Once daily</option>
                <option value="BID">BID (Twice daily)</option>
                <option value="TID">TID (Three times daily)</option>
                <option value="QID">QID (Four times daily)</option>
                <option value="PRN">PRN (As needed)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Total Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Clinical Indication Notes:</label>
            <textarea
              rows={2}
              value={clinicalIndication}
              onChange={(e) => setClinicalIndication(e.target.value)}
              placeholder="e.g. Ventilator-associated pneumonia with bilateral infiltrates"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

