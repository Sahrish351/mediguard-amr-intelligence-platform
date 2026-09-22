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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Clinical Prescription Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Prescription Encounter</span>
          </button>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-3.5 bg-teal-50/60 border border-teal-200/80 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
        <Shield className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Privacy by Design:</strong> Patient identifying fields (CNIC, names, home addresses) are strictly pseudonymized into token references (e.g. <code className="text-teal-900 bg-white border border-teal-200 px-1 py-0.5 rounded font-mono text-[11px]">PAT-88192-A</code>) before entering the surveillance registry.
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient ref, encounter, indication..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-[#0B1F3A] placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] uppercase border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100">
              {filteredPrescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-[#0B1F3A] text-xs">{p.patient_reference}</div>
                    <div className="font-mono text-[10px] text-slate-500">{p.encounter_reference}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.facility?.name}
                  </td>
                  <td className="px-4 py-3">
                    {p.items?.map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-medium text-[#0B1F3A]">
                          <span>{item.medicine?.generic_name}</span>
                          <AWaReBadge category={item.medicine?.awarre_category} />
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.dose} • {item.frequency} ({item.route}) for {item.duration_days}d (Qty: {item.quantity})
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{p.clinical_indication || '—'}</div>
                    {p.items?.[0]?.indication_category && (
                      <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200">
                        {p.items[0].indication_category}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.prescriber?.full_name || 'Staff Physician'}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                    {formatDate(p.prescription_date)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        p.status === 'dispensed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
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
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Patient Pseudonymous Identifier *</label>
              <input
                type="text"
                value={patientRef}
                onChange={(e) => setPatientRef(e.target.value)}
                placeholder="e.g. PAT-9104-B"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Encounter Reference</label>
              <input
                type="text"
                value={encounterRef}
                onChange={(e) => setEncounterRef(e.target.value)}
                placeholder="e.g. ENC-2024-192"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Facility *</label>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
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
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Indication Category *</label>
              <select
                value={indicationCategory}
                onChange={(e) => setIndicationCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
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
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Medicine *</label>
            <select
              value={selectedMedId}
              onChange={(e) => setSelectedMedId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
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
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Dose</label>
              <input
                type="text"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
                placeholder="1 g IV"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              >
                <option value="Once daily">Once daily</option>
                <option value="BID">BID (Twice daily)</option>
                <option value="TID">TID (Three times daily)</option>
                <option value="QID">QID (Four times daily)</option>
                <option value="PRN">PRN (As needed)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Duration (Days)</label>
              <input
                type="number"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Total Quantity</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Clinical Indication Notes:</label>
            <textarea
              rows={2}
              value={clinicalIndication}
              onChange={(e) => setClinicalIndication(e.target.value)}
              placeholder="e.g. Ventilator-associated pneumonia with bilateral infiltrates"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold shadow-xs cursor-pointer"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
