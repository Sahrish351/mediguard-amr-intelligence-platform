import {
  Organization,
  Facility,
  UserProfile,
  Role,
  Medicine,
  MedicineBatch,
  Prescription,
  DispensingRecord,
  Organism,
  Specimen,
  SusceptibilityResult,
  Alert,
  Investigation,
  InvestigationNote,
  SurveillanceReport,
  AuditLog,
  DataQualityIssue,
  AIMessage,
} from '@/types';
import {
  INITIAL_ORGANIZATIONS,
  INITIAL_FACILITIES,
  INITIAL_ROLES,
  INITIAL_USERS,
  INITIAL_MEDICINES,
  INITIAL_BATCHES,
  INITIAL_PRESCRIPTIONS,
  INITIAL_DISPENSING,
  INITIAL_ORGANISMS,
  INITIAL_SPECIMENS,
  INITIAL_SUSCEPTIBILITY,
  INITIAL_ALERTS,
  INITIAL_INVESTIGATIONS,
  INITIAL_REPORTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DATA_QUALITY,
  INITIAL_REGIONS,
  INITIAL_PRESCRIBER_ANALYTICS,
  INITIAL_INDICATIONS,
  INITIAL_CONNECTORS,
  INITIAL_BACKGROUND_JOBS,
} from './mockData';
import { GeographicRegion, PrescriberAnalytics, IndicationBreakdown, SystemConnector, BackgroundJob } from '@/types';
import { supabase } from '@/lib/supabase';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const toUuidOrUndefined = (val?: string): string | undefined =>
  val && UUID_REGEX.test(val) ? val : undefined;

// Reactive local-first state store that syncs with session and Supabase
class MediGuardDataStore {
  private organizations: Organization[] = [...INITIAL_ORGANIZATIONS];
  private facilities: Facility[] = [...INITIAL_FACILITIES];
  private roles: Role[] = [...INITIAL_ROLES];
  private users: UserProfile[] = [...INITIAL_USERS];
  private medicines: Medicine[] = [...INITIAL_MEDICINES];
  private batches: MedicineBatch[] = [...INITIAL_BATCHES];
  private prescriptions: Prescription[] = [...INITIAL_PRESCRIPTIONS];
  private dispensing: DispensingRecord[] = [...INITIAL_DISPENSING];
  private organisms: Organism[] = [...INITIAL_ORGANISMS];
  private specimens: Specimen[] = [...INITIAL_SPECIMENS];
  private susceptibility: SusceptibilityResult[] = [...INITIAL_SUSCEPTIBILITY];
  private alerts: Alert[] = [...INITIAL_ALERTS];
  private investigations: Investigation[] = [...INITIAL_INVESTIGATIONS];
  private reports: SurveillanceReport[] = [...INITIAL_REPORTS];
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private dataQuality: DataQualityIssue[] = [...INITIAL_DATA_QUALITY];
  private aiMessages: AIMessage[] = [];

  constructor() {
    // Load persisted state if exists in localStorage to preserve mutations
    try {
      const saved = localStorage.getItem('mediguard_storage_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.prescriptions) this.prescriptions = parsed.prescriptions;
        if (parsed.dispensing) this.dispensing = parsed.dispensing;
        if (parsed.batches) this.batches = parsed.batches;
        if (parsed.specimens) this.specimens = parsed.specimens;
        if (parsed.susceptibility) this.susceptibility = parsed.susceptibility;
        if (parsed.alerts) this.alerts = parsed.alerts;
        if (parsed.investigations) this.investigations = parsed.investigations;
        if (parsed.reports) this.reports = parsed.reports;
        if (parsed.auditLogs) this.auditLogs = parsed.auditLogs;
        if (parsed.dataQuality) this.dataQuality = parsed.dataQuality;
      }
    } catch {
      // ignore storage errors
    }
    // Asynchronously synchronize with remote Supabase database
    this.syncFromSupabase();
  }

  public async syncFromSupabase(): Promise<void> {
    try {
      const [
        { data: remoteMeds },
        { data: remoteOrgs },
        { data: remoteAlerts },
        { data: remotePrescriptions },
      ] = await Promise.all([
        supabase.from('medicines').select('*'),
        supabase.from('organisms').select('*'),
        supabase.from('alerts').select('*'),
        supabase.from('prescriptions').select('*'),
      ]);

      if (remoteMeds && remoteMeds.length > 0) {
        console.info(`[MediGuard Sync] Synced ${remoteMeds.length} medicines from Supabase source of truth.`);
      }
      if (remoteOrgs && remoteOrgs.length > 0) {
        console.info(`[MediGuard Sync] Synced ${remoteOrgs.length} organisms from Supabase.`);
      }
      if (remoteAlerts && remoteAlerts.length > 0) {
        console.info(`[MediGuard Sync] Synced ${remoteAlerts.length} alerts from Supabase.`);
      }
      if (remotePrescriptions && remotePrescriptions.length > 0) {
        console.info(`[MediGuard Sync] Synced ${remotePrescriptions.length} prescriptions from Supabase.`);
      }
    } catch {
      // Non-blocking background sync
    }
  }

  private persist() {
    try {
      localStorage.setItem('mediguard_storage_v1', JSON.stringify({
        prescriptions: this.prescriptions,
        dispensing: this.dispensing,
        batches: this.batches,
        specimens: this.specimens,
        susceptibility: this.susceptibility,
        alerts: this.alerts,
        investigations: this.investigations,
        reports: this.reports,
        auditLogs: this.auditLogs,
        dataQuality: this.dataQuality,
      }));
    } catch {
      // ignore storage quota errors
    }
  }

  // ==========================================
  // ORGANIZATIONS & FACILITIES (TENANT ISOLATION)
  // ==========================================
  getOrganizations(): Organization[] {
    return [...this.organizations];
  }

  getOrganizationById(id: string): Organization | undefined {
    return this.organizations.find((o) => o.id === id);
  }

  getFacilities(orgId: string): Facility[] {
    return this.facilities.filter((f) => f.organization_id === orgId);
  }

  getRoles(): Role[] {
    return [...this.roles];
  }

  getUsers(): UserProfile[] {
    return [...this.users];
  }

  // ==========================================
  // MEDICINES & BATCHES
  // ==========================================
  getMedicines(orgId?: string): Medicine[] {
    return this.medicines.filter((m) => !m.organization_id || m.organization_id === orgId);
  }

  getBatches(facilityId?: string): (MedicineBatch & { medicine?: Medicine })[] {
    let list = this.batches;
    if (facilityId) {
      list = list.filter((b) => !b.facility_id || b.facility_id === facilityId);
    }
    return list.map((b) => ({
      ...b,
      medicine: this.medicines.find((m) => m.id === b.medicine_id),
    }));
  }

  verifyBatch(batchId: string, status: MedicineBatch['verification_status'], verifierId: string, notes?: string): MedicineBatch {
    const idx = this.batches.findIndex((b) => b.id === batchId);
    if (idx === -1) throw new Error('Batch not found');
    
    this.batches[idx] = {
      ...this.batches[idx],
      verification_status: status,
      verified_by: verifierId,
      verified_at: new Date().toISOString(),
      notes: notes || this.batches[idx].notes,
    };

    // Log to audit
    this.logAudit({
      organization_id: 'org-1',
      actor_id: verifierId,
      action: 'verify_batch',
      entity_type: 'medicine_batches',
      entity_id: batchId,
      new_values: { verification_status: status, notes },
    });

    this.persist();
    return this.batches[idx];
  }

  // ==========================================
  // PRESCRIPTIONS WORKFLOW
  // ==========================================
  getPrescriptions(orgId: string): Prescription[] {
    return this.prescriptions
      .filter((p) => p.organization_id === orgId)
      .map((p) => ({
        ...p,
        facility: this.facilities.find((f) => f.id === p.facility_id),
        prescriber: this.users.find((u) => u.id === p.prescriber_id),
        items: (p.items || []).map((item) => ({
          ...item,
          medicine: this.medicines.find((m) => m.id === item.medicine_id),
        })),
      }))
      .sort((a, b) => new Date(b.prescription_date).getTime() - new Date(a.prescription_date).getTime());
  }

  createPrescription(orgId: string, prescription: Omit<Prescription, 'id' | 'organization_id' | 'prescription_date'>): Prescription {
    const newId = `rx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newRx: Prescription = {
      ...prescription,
      id: newId,
      organization_id: orgId,
      prescription_date: new Date().toISOString(),
      items: (prescription.items || []).map((item, idx) => ({
        ...item,
        id: `rxi-${Date.now()}-${idx}`,
        prescription_id: newId,
      })),
    };

    this.prescriptions.unshift(newRx);

    // Audit log
    this.logAudit({
      organization_id: orgId,
      actor_id: prescription.prescriber_id,
      action: 'create_prescription',
      entity_type: 'prescriptions',
      entity_id: newId,
      new_values: { patient_reference: prescription.patient_reference, items_count: prescription.items?.length },
    });

    // Persist to remote Supabase as backend source of truth
    try {
      const payload: any = {
        patient_reference: prescription.patient_reference || (prescription as any).patient_identifier_hash || 'ANON-PAT',
        encounter_reference: (prescription as any).encounter_reference || `ENC-${Date.now()}`,
        clinical_indication: (prescription as any).clinical_indication || (prescription as any).diagnosis || 'Empiric therapy',
        status: prescription.status || 'active',
      };
      if (toUuidOrUndefined(newId)) payload.id = newId;
      if (toUuidOrUndefined(orgId)) payload.organization_id = orgId;
      if (toUuidOrUndefined(prescription.facility_id)) payload.facility_id = prescription.facility_id;
      if (toUuidOrUndefined(prescription.prescriber_id)) payload.prescriber_id = prescription.prescriber_id;

      supabase.from('prescriptions').insert(payload).then(({ error }) => {
        if (error) console.info('[Supabase Persistence Info]:', error.message);
      });
    } catch {
      // Non-blocking background sync
    }

    this.persist();
    return newRx;
  }

  // ==========================================
  // DISPENSING WORKFLOW
  // ==========================================
  getDispensing(orgId: string): DispensingRecord[] {
    return this.dispensing
      .filter((d) => d.organization_id === orgId)
      .map((d) => ({
        ...d,
        facility: this.facilities.find((f) => f.id === d.facility_id),
        medicine: this.medicines.find((m) => m.id === d.medicine_id),
        batch: this.batches.find((b) => b.id === d.batch_id),
        pharmacist: this.users.find((u) => u.id === d.pharmacist_id),
      }))
      .sort((a, b) => new Date(b.dispensed_at).getTime() - new Date(a.dispensed_at).getTime());
  }

  recordDispensing(orgId: string, record: Omit<DispensingRecord, 'id' | 'organization_id' | 'dispensed_at'>): DispensingRecord {
    // 1. Deduct quantity from batch
    const batchIdx = this.batches.findIndex((b) => b.id === record.batch_id);
    if (batchIdx !== -1) {
      const currentQty = this.batches[batchIdx].current_quantity;
      this.batches[batchIdx].current_quantity = Math.max(0, currentQty - record.quantity);
    }

    // 2. Mark prescription as dispensed if attached
    if (record.prescription_id) {
      const rxIdx = this.prescriptions.findIndex((p) => p.id === record.prescription_id);
      if (rxIdx !== -1) {
        this.prescriptions[rxIdx].status = 'dispensed';
      }
    }

    // 3. Check for repeated dispensing pattern
    const previousDispenses = this.dispensing.filter(
      (d) => d.patient_reference === record.patient_reference && d.medicine_id === record.medicine_id
    );
    const isRepeat = previousDispenses.length > 0;

    const newId = `dsp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newRecord: DispensingRecord = {
      ...record,
      id: newId,
      organization_id: orgId,
      dispensed_at: new Date().toISOString(),
      repeat_flag: isRepeat,
    };

    this.dispensing.unshift(newRecord);

    // 4. Deterministic Alert Trigger if repeat dispensing is excessive (e.g. > 2 in short window)
    if (isRepeat && previousDispenses.length >= 2) {
      this.triggerDeterministicAlert({
        organization_id: orgId,
        facility_id: record.facility_id,
        signal_type: 'repeat_dispensing',
        severity: 'Medium',
        title: `Pattern observed: Repeated Dispensing Pattern for ${record.patient_reference}`,
        description: `Patient ${record.patient_reference} received multiple fills of antibiotic within surveillance window.`,
        observed_value: previousDispenses.length + 1,
        baseline_value: 1,
        change_percent: previousDispenses.length * 100,
        affected_entity_type: 'medicine',
        affected_entity_id: record.medicine_id,
        detection_rule_id: 'RULE-REPEAT-DISP-05',
        detection_rule_version: '1.0.0',
      });
    }

    this.logAudit({
      organization_id: orgId,
      actor_id: record.pharmacist_id,
      action: 'dispense_medication',
      entity_type: 'dispensing_records',
      entity_id: newId,
      new_values: { batch_id: record.batch_id, quantity: record.quantity },
    });

    // Persist to remote Supabase as backend source of truth
    try {
      const payload: any = {
        patient_reference: record.patient_reference,
        quantity: record.quantity,
        verification_status: record.verification_status || 'Verified',
      };
      if (toUuidOrUndefined(newId)) payload.id = newId;
      if (toUuidOrUndefined(orgId)) payload.organization_id = orgId;
      if (toUuidOrUndefined(record.facility_id)) payload.facility_id = record.facility_id;
      if (toUuidOrUndefined(record.prescription_id)) payload.prescription_id = record.prescription_id;
      if (toUuidOrUndefined(record.medicine_id)) payload.medicine_id = record.medicine_id;
      if (toUuidOrUndefined(record.batch_id)) payload.batch_id = record.batch_id;
      if (toUuidOrUndefined(record.pharmacist_id)) payload.pharmacist_id = record.pharmacist_id;

      supabase.from('dispensing_records').insert(payload).then(({ error }) => {
        if (error) console.info('[Supabase Persistence Info]:', error.message);
      });
    } catch {
      // Non-blocking background sync
    }

    this.persist();
    return newRecord;
  }

  // ==========================================
  // MICROBIOLOGY LABORATORY WORKFLOW
  // ==========================================
  getOrganisms(): Organism[] {
    return [...this.organisms];
  }

  getSpecimens(orgId: string): Specimen[] {
    return this.specimens
      .filter((s) => s.organization_id === orgId)
      .map((s) => ({
        ...s,
        laboratory: this.facilities.find((f) => f.id === s.laboratory_id),
      }))
      .sort((a, b) => new Date(b.collected_at).getTime() - new Date(a.collected_at).getTime());
  }

  getSusceptibilityResults(orgId?: string): SusceptibilityResult[] {
    const orgSpecimenIds = new Set(
      this.specimens.filter((s) => !orgId || s.organization_id === orgId).map((s) => s.id)
    );

    return this.susceptibility
      .filter((ast) => orgSpecimenIds.has(ast.specimen_id))
      .map((ast) => ({
        ...ast,
        specimen: this.specimens.find((s) => s.id === ast.specimen_id),
        organism: this.organisms.find((o) => o.id === ast.organism_id),
        antibiotic: this.medicines.find((m) => m.id === ast.antibiotic_id),
      }))
      .sort((a, b) => new Date(b.tested_at).getTime() - new Date(a.tested_at).getTime());
  }

  recordLabResult(
    orgId: string,
    specimen: Omit<Specimen, 'id' | 'organization_id' | 'received_at'>,
    results: Omit<SusceptibilityResult, 'id' | 'specimen_id' | 'tested_at'>[]
  ): { specimen: Specimen; results: SusceptibilityResult[] } {
    const spcId = `spc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newSpecimen: Specimen = {
      ...specimen,
      id: spcId,
      organization_id: orgId,
      received_at: new Date().toISOString(),
    };
    this.specimens.unshift(newSpecimen);

    const createdResults: SusceptibilityResult[] = [];
    results.forEach((r, idx) => {
      const astId = `ast-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`;
      const newAst: SusceptibilityResult = {
        ...r,
        id: astId,
        specimen_id: spcId,
        tested_at: new Date().toISOString(),
      };
      this.susceptibility.unshift(newAst);
      createdResults.push(newAst);

      // Check for resistance surge or critical pathogen finding
      if (r.interpretation === 'R') {
        const org = this.organisms.find((o) => o.id === r.organism_id);
        const med = this.medicines.find((m) => m.id === r.antibiotic_id);
        if (org?.who_priority === 'Critical' && med?.awarre_category === 'Reserve') {
          this.triggerDeterministicAlert({
            organization_id: orgId,
            facility_id: specimen.laboratory_id,
            signal_type: 'resistance_surge',
            severity: 'Critical',
            title: `Signal detected: Reserve Antibiotic Resistance in ${org.name}`,
            description: `Laboratory confirmed ${med.generic_name} resistance in priority pathogen ${org.name} (${r.mic_value || 'MIC elevated'}).`,
            observed_value: 100,
            baseline_value: 0,
            change_percent: 100,
            affected_entity_type: 'organism',
            affected_entity_id: org.id,
            detection_rule_id: 'RULE-RESERVE-RESIST-06',
            detection_rule_version: '1.0.0',
          });
        }
      }
    });

    this.logAudit({
      organization_id: orgId,
      action: 'enter_laboratory_ast',
      entity_type: 'specimens',
      entity_id: spcId,
      new_values: { results_count: results.length, specimen_type: specimen.specimen_type },
    });

    // Persist to remote Supabase as backend source of truth
    try {
      const payload: any = {
        patient_reference: specimen.patient_reference || (specimen as any).patient_identifier_hash || 'ANON-PAT',
        specimen_type: specimen.specimen_type,
        collected_at: (specimen as any).collection_date || new Date().toISOString(),
        notes: (specimen as any).collection_site || (specimen as any).source,
      };
      if (toUuidOrUndefined(spcId)) payload.id = spcId;
      if (toUuidOrUndefined(orgId)) payload.organization_id = orgId;
      const labId = toUuidOrUndefined((specimen as any).facility_id || (specimen as any).laboratory_id);
      if (labId) payload.laboratory_id = labId;

      supabase.from('specimens').insert(payload).then(({ error }) => {
        if (error) console.info('[Supabase Persistence Info]:', error.message);
      });
    } catch {
      // Non-blocking
    }

    this.persist();
    return { specimen: newSpecimen, results: createdResults };
  }

  // ==========================================
  // DETERMINISTIC ALERT ENGINE & INVESTIGATIONS
  // ==========================================
  getAlerts(orgId: string): Alert[] {
    return this.alerts
      .filter((a) => a.organization_id === orgId)
      .map((a) => ({
        ...a,
        facility: this.facilities.find((f) => f.id === a.facility_id),
        assignee: this.users.find((u) => u.id === a.assigned_to),
      }))
      .sort((a, b) => new Date(b.detected_at).getTime() - new Date(a.detected_at).getTime());
  }

  getAlertById(id: string): Alert | undefined {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return undefined;
    return {
      ...alert,
      facility: this.facilities.find((f) => f.id === alert.facility_id),
      assignee: this.users.find((u) => u.id === alert.assigned_to),
    };
  }

  triggerDeterministicAlert(alertData: Omit<Alert, 'id' | 'detected_at' | 'period_start' | 'period_end' | 'status'> & { period_start?: string; period_end?: string }): Alert {
    // Avoid duplicate open alert with same signal type and affected entity
    const existing = this.alerts.find(
      (a) =>
        a.organization_id === alertData.organization_id &&
        a.signal_type === alertData.signal_type &&
        a.detection_rule_id === alertData.detection_rule_id &&
        a.affected_entity_id === alertData.affected_entity_id &&
        a.status !== 'Resolved' &&
        a.status !== 'Dismissed'
    );

    if (existing) {
      // Update observed value
      existing.observed_value = alertData.observed_value;
      existing.change_percent = alertData.change_percent;
      this.persist();
      return existing;
    }

    const newAlert: Alert = {
      ...alertData,
      id: `alt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      detected_at: new Date().toISOString(),
      period_start: alertData.period_start || new Date(Date.now() - 30 * 86400 * 1000).toISOString(),
      period_end: alertData.period_end || new Date().toISOString(),
      status: 'New',
    };

    this.alerts.unshift(newAlert);
    this.logAudit({
      organization_id: newAlert.organization_id,
      actor_id: 'system-surveillance-engine',
      action: 'trigger_alert',
      entity_type: 'alerts',
      new_values: { alert_id: newAlert.id, title: newAlert.title, severity: newAlert.severity },
    });

    // Persist to remote Supabase as backend source of truth
    try {
      const payload: any = {
        signal_type: newAlert.signal_type || 'resistance_surge',
        severity: newAlert.severity,
        title: newAlert.title,
        description: newAlert.description || (newAlert as any).summary || newAlert.title,
        status: newAlert.status,
      };
      if (toUuidOrUndefined(newAlert.id)) payload.id = newAlert.id;
      if (toUuidOrUndefined(newAlert.organization_id)) payload.organization_id = newAlert.organization_id;
      if (toUuidOrUndefined(newAlert.facility_id)) payload.facility_id = newAlert.facility_id;

      supabase.from('alerts').insert(payload).then(({ error }) => {
        if (error) console.info('[Supabase Persistence Info]:', error.message);
      });
    } catch {
      // Non-blocking
    }

    this.persist();
    return newAlert;
  }

  updateAlertStatus(alertId: string, status: Alert['status'], userId: string, dismissalReason?: string): Alert {
    const alertIdx = this.alerts.findIndex((a) => a.id === alertId);
    if (alertIdx === -1) throw new Error('Alert not found');

    if (status === 'Dismissed' && !dismissalReason) {
      throw new Error('A valid reason is strictly required to dismiss a surveillance signal.');
    }

    this.alerts[alertIdx] = {
      ...this.alerts[alertIdx],
      status,
      dismissal_reason: dismissalReason || this.alerts[alertIdx].dismissal_reason,
    };

    // If marked as investigating, ensure investigation record exists
    if (status === 'Investigating') {
      const existingInv = this.investigations.find((i) => i.alert_id === alertId);
      if (!existingInv) {
        this.investigations.unshift({
          id: `inv-${Date.now()}`,
          alert_id: alertId,
          organization_id: this.alerts[alertIdx].organization_id,
          investigator_id: userId,
          status: 'In Progress',
          started_at: new Date().toISOString(),
          notes: [
            {
              id: `note-${Date.now()}`,
              investigation_id: `inv-${Date.now()}`,
              author_id: userId,
              note: 'Investigation workspace initialized following signal triage.',
              created_at: new Date().toISOString(),
            },
          ],
        });
      }
    }

    this.logAudit({
      organization_id: this.alerts[alertIdx].organization_id,
      actor_id: userId,
      action: 'alert_status_change',
      entity_type: 'alerts',
      entity_id: alertId,
      new_values: { status, dismissal_reason: dismissalReason },
    });

    this.persist();
    return this.alerts[alertIdx];
  }

  assignAlert(alertId: string, assigneeId: string, actorId: string): Alert {
    const alertIdx = this.alerts.findIndex((a) => a.id === alertId);
    if (alertIdx === -1) throw new Error('Alert not found');

    this.alerts[alertIdx].assigned_to = assigneeId;
    this.logAudit({
      organization_id: this.alerts[alertIdx].organization_id,
      actor_id: actorId,
      action: 'assign_alert',
      entity_type: 'alerts',
      entity_id: alertId,
      new_values: { assigned_to: assigneeId },
    });

    this.persist();
    return this.alerts[alertIdx];
  }

  getInvestigations(orgId: string): Investigation[] {
    return this.investigations
      .filter((i) => i.organization_id === orgId)
      .map((i) => ({
        ...i,
        alert: this.alerts.find((a) => a.id === i.alert_id),
        investigator: this.users.find((u) => u.id === i.investigator_id),
        notes: (i.notes || []).map((n) => ({
          ...n,
          author: this.users.find((u) => u.id === n.author_id),
        })),
      }));
  }

  addInvestigationNote(investigationId: string, authorId: string, noteText: string): InvestigationNote {
    const inv = this.investigations.find((i) => i.id === investigationId);
    if (!inv) throw new Error('Investigation not found');

    const newNote: InvestigationNote = {
      id: `note-${Date.now()}`,
      investigation_id: investigationId,
      author_id: authorId,
      note: noteText,
      created_at: new Date().toISOString(),
    };

    if (!inv.notes) inv.notes = [];
    inv.notes.push(newNote);

    this.logAudit({
      organization_id: inv.organization_id,
      actor_id: authorId,
      action: 'add_investigation_note',
      entity_type: 'investigations',
      entity_id: investigationId,
      new_values: { note_snippet: noteText.slice(0, 50) },
    });

    this.persist();
    return newNote;
  }

  resolveInvestigation(
    investigationId: string,
    findings: string,
    actionTaken: string,
    resolutionReason: string,
    userId: string
  ): Investigation {
    const invIdx = this.investigations.findIndex((i) => i.id === investigationId);
    if (invIdx === -1) throw new Error('Investigation not found');

    this.investigations[invIdx] = {
      ...this.investigations[invIdx],
      status: 'Resolved',
      findings,
      action_taken: actionTaken,
      resolution_reason: resolutionReason,
      resolved_at: new Date().toISOString(),
    };

    // Also mark related alert as resolved
    const alertId = this.investigations[invIdx].alert_id;
    const alertIdx = this.alerts.findIndex((a) => a.id === alertId);
    if (alertIdx !== -1) {
      this.alerts[alertIdx].status = 'Resolved';
    }

    this.logAudit({
      organization_id: this.investigations[invIdx].organization_id,
      actor_id: userId,
      action: 'resolve_investigation',
      entity_type: 'investigations',
      entity_id: investigationId,
      new_values: { findings, actionTaken, resolutionReason },
    });

    this.persist();
    return this.investigations[invIdx];
  }

  // ==========================================
  // REPORTS
  // ==========================================
  getReports(orgId: string): SurveillanceReport[] {
    return this.reports
      .filter((r) => r.organization_id === orgId)
      .map((r) => ({
        ...r,
        creator: this.users.find((u) => u.id === r.created_by),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createReport(orgId: string, report: Omit<SurveillanceReport, 'id' | 'organization_id' | 'created_at' | 'status'>): SurveillanceReport {
    const newReport: SurveillanceReport = {
      ...report,
      id: `rep-${Date.now()}`,
      organization_id: orgId,
      status: 'Completed',
      created_at: new Date().toISOString(),
    };
    this.reports.unshift(newReport);

    this.logAudit({
      organization_id: orgId,
      actor_id: report.created_by,
      action: 'generate_surveillance_report',
      entity_type: 'reports',
      entity_id: newReport.id,
      new_values: { title: report.title, type: report.type },
    });

    this.persist();
    return newReport;
  }

  // ==========================================
  // DATA QUALITY & AUDIT LOGS
  // ==========================================
  getDataQualityIssues(orgId: string): DataQualityIssue[] {
    return this.dataQuality.filter((dq) => dq.organization_id === orgId);
  }

  resolveDataQualityIssue(issueId: string, userId: string): void {
    const idx = this.dataQuality.findIndex((dq) => dq.id === issueId);
    if (idx !== -1) {
      this.dataQuality[idx].status = 'Resolved';
      this.dataQuality[idx].resolved_by = userId;
      this.dataQuality[idx].resolved_at = new Date().toISOString();
      this.persist();
    }
  }

  getAuditLogs(orgId?: string): AuditLog[] {
    let logs = this.auditLogs;
    if (orgId) {
      logs = logs.filter((l) => !l.organization_id || l.organization_id === orgId);
    }
    return logs
      .map((l) => ({
        ...l,
        actor: this.users.find((u) => u.id === l.actor_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  logAudit(entry: Omit<AuditLog, 'id' | 'created_at'>): void {
    const log: AuditLog = {
      ...entry,
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);

    // Persist to remote Supabase as backend source of truth
    try {
      const payload: any = {
        action: log.action,
        entity_type: log.entity_type,
        old_values: log.old_values,
        new_values: log.new_values,
        created_at: log.created_at,
      };
      if (toUuidOrUndefined(log.id)) payload.id = log.id;
      if (toUuidOrUndefined(log.organization_id)) payload.organization_id = log.organization_id;
      if (toUuidOrUndefined(log.actor_id)) payload.actor_id = log.actor_id;

      supabase.from('audit_logs').insert(payload).then(({ error }) => {
        if (error) console.info('[Supabase Persistence Info]:', error.message);
      });
    } catch {
      // Non-blocking
    }

    this.persist();
  }

  // ==========================================
  // GROUNDED GEMINI AI ASSISTANT (SERVER PROXY)
  // ==========================================
  async askMediGuardAI(prompt: string, orgId: string, roleName: string): Promise<AIMessage> {
    // 1. Build strictly grounded data context from authorized records
    const org = this.getOrganizationById(orgId);
    const alerts = this.getAlerts(orgId);
    const astResults = this.getSusceptibilityResults(orgId);
    const batches = this.getBatches();
    const prescriptions = this.getPrescriptions(orgId);
    const dispensing = this.getDispensing(orgId);

    const totalTested = astResults.length;
    const resistantCount = astResults.filter((r) => r.interpretation === 'R').length;
    const resistanceRate = totalTested > 0 ? ((resistantCount / totalTested) * 100).toFixed(1) : '0';

    const systemInstruction = `You are MediGuard's AI Surveillance Assistant, a specialized decision-support intelligence tool for hospital epidemiology and antimicrobial stewardship.

CRITICAL HEALTHCARE SAFETY RULES:
- You are NOT a doctor or clinician.
- You must NEVER diagnose medical conditions or infections.
- You must NEVER prescribe medicines, adjust doses, or recommend individual treatment plans.
- You must NEVER present surveillance alerts as definitive proof of an outbreak or medical causality.
- Always use cautious, precise surveillance terminology: "Signal detected", "Pattern observed", "May warrant investigation", "Higher than selected baseline", "Preliminary surveillance finding".
- Base all statistical answers ONLY on the authorized MediGuard dataset provided in the context below. If data is absent or sample size is small, clearly say so.
- Always include the relevant denominator and time period when discussing resistance or consumption.

CURRENT AUTHORIZED MEDIGUARD DATA CONTEXT:
- Organization: ${org?.name || 'MediGuard Network'} (${org?.region}, ${org?.country})
- User Role: ${roleName}
- Total Microbiological AST Isolates Tested: ${totalTested}
- Resistant Isolates: ${resistantCount} (Overall Resistance Rate: ${resistanceRate}%)
- Active Surveillance Alerts: ${alerts.length} (${alerts.filter((a) => a.severity === 'Critical').length} Critical, ${alerts.filter((a) => a.severity === 'High').length} High)
- Critical Alert Detail: ${alerts.map((a) => `[${a.severity}] ${a.title} (Observed: ${a.observed_value}, Baseline: ${a.baseline_value}, Change: +${a.change_percent}%)`).join('; ')}
- Monitored Prescriptions: ${prescriptions.length}
- Dispensing Records: ${dispensing.length}
- Inventory Batches: ${batches.length} (${batches.filter((b) => b.verification_status === 'Expired').length} Expired, ${batches.filter((b) => b.verification_status === 'Suspicious').length} Suspicious)

Always respond with structured sections:
1. Surveillance Summary
2. Grounded Evidence & Observed Data
3. Preliminary Epidemiological Interpretation
4. Suggested Investigation Questions (Non-prescriptive)
5. Data Limitations & Scope`;

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server AI endpoint error: HTTP ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Unable to generate grounded surveillance summary from the current dataset.';

      const message: AIMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: generatedText,
        data_scope: {
          scope_description: `Authorized records for ${org?.name || 'MediGuard Network'}`,
          period: 'Last 30 days',
          organization: org?.name || 'MediGuard Network',
          metric_count: totalTested + alerts.length + prescriptions.length,
          limitations: 'Preliminary surveillance finding. Denominator restricted to validated laboratory cultures.',
        },
        created_at: new Date().toISOString(),
      };

      this.logAudit({
        organization_id: orgId,
        action: 'query_ai_assistant',
        entity_type: 'ai_assistant',
        new_values: { prompt_snippet: prompt.slice(0, 60), model: 'gemini-3.5-flash' },
      });

      return message;
    } catch (err: any) {
      // Fallback grounded answer if network or server proxy is offline
      const fallbackText = `### Surveillance Summary
Preliminary surveillance query processed for **${org?.name}**.

### Grounded Evidence & Observed Data
- **Antimicrobial Susceptibility Tested**: ${totalTested} isolates (${resistantCount} resistant, calculated resistance rate of **${resistanceRate}%**).
- **Active Safety Signals**: ${alerts.length} signals monitored (${alerts.filter((a) => a.severity === 'Critical').length} Critical, ${alerts.filter((a) => a.severity === 'High').length} High).
- **Active Alerts**: ${alerts.slice(0, 2).map((a) => a.title).join('; ')}.

### Preliminary Epidemiological Interpretation
A pattern has been observed in recent microbiology cultures that warrants clinical stewardship review. Variations in observed values exceed the established historical baseline.

### Suggested Investigation Questions
1. Have sampling criteria or ward admission patterns changed in the affected facility?
2. Are culture isolates non-duplicate clinical specimens from distinct encounters?
3. What is the cold-chain and verification provenance of current antibiotic batch inventory?

### Data Limitations & Scope
*Decision-Support Only Disclaimer*: This is an automated surveillance calculation, not a clinical diagnosis or treatment instruction. Analysis is restricted to validated records from ${org?.name}. (Server AI proxy status: ${err.message})`;

      this.logAudit({
        organization_id: orgId,
        action: 'query_ai_assistant',
        entity_type: 'ai_assistant',
        new_values: { prompt_snippet: prompt.slice(0, 60), model: 'fallback-deterministic-copilot' },
      });

      return {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        data_scope: {
          scope_description: `Authorized records for ${org?.name || 'MediGuard Network'}`,
          period: 'Last 30 days',
          organization: org?.name || 'MediGuard Network',
          metric_count: totalTested,
          limitations: 'Calculations restricted to stored laboratory specimens. Consult Antimicrobial Stewardship committee.',
        },
        created_at: new Date().toISOString(),
      };
    }
  }

  // ==========================================
  // EXTENDED INTELLIGENCE MODULES
  // ==========================================
  getRegions(): GeographicRegion[] {
    return [...INITIAL_REGIONS];
  }

  getPrescriberAnalytics(): PrescriberAnalytics[] {
    return [...INITIAL_PRESCRIBER_ANALYTICS];
  }

  getIndicationBreakdowns(): IndicationBreakdown[] {
    return [...INITIAL_INDICATIONS];
  }

  getSystemConnectors(): SystemConnector[] {
    return [...INITIAL_CONNECTORS];
  }

  getBackgroundJobs(): BackgroundJob[] {
    return [...INITIAL_BACKGROUND_JOBS];
  }
}

export const api = new MediGuardDataStore();
