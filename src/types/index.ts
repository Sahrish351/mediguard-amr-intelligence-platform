// =====================================================================
// MEDIGUARD SYSTEM TYPES
// =====================================================================

export type UserRoleSlug =
  | 'platform-admin'
  | 'org-admin'
  | 'surveillance-officer'
  | 'doctor'
  | 'pharmacist'
  | 'lab-scientist'
  | 'stewardship-lead'
  | 'epidemiologist'
  | 'read-only';

export function getWorkspacePathForRole(roleSlug?: UserRoleSlug | string): string {
  switch (roleSlug) {
    case 'doctor':
      return '/doctor';
    case 'pharmacist':
      return '/pharmacist';
    case 'lab-scientist':
      return '/laboratory';
    case 'stewardship-lead':
      return '/stewardship';
    case 'epidemiologist':
      return '/epidemiology';
    case 'surveillance-officer':
      return '/surveillance';
    case 'org-admin':
      return '/organization';
    case 'platform-admin':
      return '/admin';
    case 'read-only':
      return '/researcher';
    default:
      return '/doctor';
  }
}

export interface UserProfile {
  id: string;
  auth_user_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  title?: string;
  status: 'active' | 'suspended';
  avatar_url?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'hospital_network' | 'public_health_agency' | 'laboratory_network' | 'pharmacy_network';
  country: string;
  region: string;
  timezone: string;
  status: 'active' | 'suspended';
  created_at?: string;
}

export interface Facility {
  id: string;
  organization_id: string;
  name: string;
  type: 'hospital' | 'laboratory' | 'pharmacy' | 'clinic' | 'surveillance_unit';
  facility_type?: string;
  area: string;
  address?: string;
  contact_phone?: string;
  status: 'active' | 'inactive';
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role_id: string;
  role?: Role;
  facility_id?: string;
  status: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: string;
  slug: UserRoleSlug;
  description: string;
}

export interface Permission {
  id: string;
  key: string;
  description: string;
}

// =====================================================================
// CLINICAL & PHARMACEUTICAL ENTITIES
// =====================================================================

export type AWaReCategory = 'Access' | 'Watch' | 'Reserve';

export interface Medicine {
  id: string;
  organization_id?: string | null;
  generic_name: string;
  brand_name: string;
  active_ingredients: string;
  strength: string;
  dosage_form: string;
  route: string;
  therapeutic_class: string;
  atc_code?: string;
  is_antibiotic: boolean;
  antibiotic_class?: string;
  awarre_category?: AWaReCategory;
  aware_category?: AWaReCategory;
  aware_classification?: AWaReCategory;
  manufacturer: string;
  status: 'active' | 'discontinued';
}

export type BatchVerificationStatus =
  | 'Pending'
  | 'Verified'
  | 'Unverified'
  | 'Expired'
  | 'Expiring Soon'
  | 'Recalled'
  | 'Suspicious'
  | 'Rejected';

export interface MedicineBatch {
  id: string;
  medicine_id: string;
  medicine?: Medicine;
  facility_id?: string;
  batch_number: string;
  manufacture_date: string;
  manufacturing_date?: string;
  expiry_date: string;
  manufacturer?: string;
  initial_quantity: number;
  current_quantity: number;
  verification_status: BatchVerificationStatus;
  recall_status: 'Normal' | 'Recalled' | 'Quarantined';
  verification_source?: string;
  verified_at?: string;
  verified_by?: string;
  notes?: string;
}

export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medicine_id: string;
  medicine?: Medicine;
  dose: string;
  frequency: string;
  route: string;
  duration_days: number;
  quantity: number;
  indication_category?: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  organization_id: string;
  facility_id: string;
  facility?: Facility;
  prescriber_id: string;
  prescriber?: UserProfile;
  patient_reference: string; // Pseudonymous identifier (e.g. PAT-90823-X)
  encounter_reference: string;
  prescription_date: string;
  clinical_indication?: string;
  diagnosis_icd10?: string;
  status: 'active' | 'dispensed' | 'cancelled' | 'completed';
  items?: PrescriptionItem[];
}

export interface DispensingRecord {
  id: string;
  organization_id: string;
  facility_id: string;
  facility?: Facility;
  prescription_id?: string;
  medicine_id: string;
  medicine?: Medicine;
  batch_id: string;
  batch?: MedicineBatch;
  pharmacist_id: string;
  pharmacist?: UserProfile;
  patient_reference: string;
  quantity: number;
  dispensed_at: string;
  repeat_flag: boolean;
  verification_status: string;
  notes?: string;
}

// =====================================================================
// MICROBIOLOGY & ANTIBIOGRAM
// =====================================================================

export interface Organism {
  id: string;
  name: string;
  scientific_name: string;
  category: string;
  gram_stain: 'Gram-negative' | 'Gram-positive';
  who_priority?: 'Critical' | 'High' | 'Medium';
  status: 'active' | 'archived';
}

export interface Specimen {
  id: string;
  organization_id: string;
  laboratory_id: string;
  laboratory?: Facility;
  patient_reference: string;
  specimen_type: 'Blood' | 'Urine' | 'Sputum' | 'CSF' | 'Wound Swab' | 'Stool' | 'Other';
  collected_at: string;
  received_at: string;
  quality_status: 'Adequate' | 'Contaminated' | 'Insufficient' | 'Hemolyzed';
  notes?: string;
}

export interface SusceptibilityResult {
  id: string;
  specimen_id: string;
  specimen?: Specimen;
  organism_id: string;
  organism?: Organism;
  antibiotic_id: string;
  antibiotic?: Medicine;
  result: 'Susceptible' | 'Intermediate' | 'Resistant';
  mic_value?: string;
  interpretation: 'S' | 'I' | 'R';
  tested_at: string;
  guideline_version: string;
  quality_status: 'Valid' | 'Needs Review';
  notes?: string;
}

// =====================================================================
// SURVEILLANCE SIGNALS, ALERTS & INVESTIGATIONS
// =====================================================================

export type AlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertSignalType =
  | 'unusual_usage'
  | 'repeat_dispensing'
  | 'resistance_surge'
  | 'organism_trend'
  | 'batch_issue'
  | 'data_quality';

export type AlertStatus = 'New' | 'Acknowledged' | 'Investigating' | 'Resolved' | 'Dismissed' | 'Open';

export interface Alert {
  id: string;
  organization_id: string;
  facility_id?: string;
  facility?: Facility;
  signal_type: AlertSignalType;
  severity: AlertSeverity;
  title: string;
  description: string;
  detected_at: string;
  period_start: string;
  period_end: string;
  observed_value: number;
  baseline_value: number;
  change_percent: number;
  affected_entity_type?: 'medicine' | 'organism' | 'batch' | 'facility';
  affected_entity_id?: string;
  status: AlertStatus;
  assigned_to?: string;
  assignee?: UserProfile;
  detection_rule_id: string;
  detection_rule_version: string;
  evidence?: AlertEvidence[];
  dismissal_reason?: string;
}

export interface AlertEvidence {
  id: string;
  alert_id: string;
  source_type: string;
  source_id: string;
  statistical_payload?: Record<string, any>;
}

export interface InvestigationNote {
  id: string;
  investigation_id: string;
  author_id: string;
  author?: UserProfile;
  note: string;
  created_at: string;
}

export interface Investigation {
  id: string;
  alert_id: string;
  alert?: Alert;
  organization_id: string;
  investigator_id: string;
  investigator?: UserProfile;
  status: 'In Progress' | 'Resolved' | 'Dismissed';
  findings?: string;
  resolution_reason?: string;
  action_taken?: string;
  started_at: string;
  resolved_at?: string;
  notes?: InvestigationNote[];
}

// =====================================================================
// REPORTS, NOTIFICATIONS & AUDIT
// =====================================================================

export interface SurveillanceReport {
  id: string;
  organization_id: string;
  created_by: string;
  creator?: UserProfile;
  title: string;
  type:
    | 'medication_utilization'
    | 'antibiotic_stewardship'
    | 'antibiogram_summary'
    | 'batch_verification'
    | 'monthly_surveillance'
    | 'quarterly_surveillance';
  period_start: string;
  period_end: string;
  filters_json: Record<string, any>;
  status: 'Generating' | 'Completed' | 'Failed';
  summary_markdown?: string;
  created_at: string;
}

export interface InAppNotification {
  id: string;
  user_id: string;
  organization_id: string;
  type: 'critical_alert' | 'assigned_investigation' | 'report_ready' | 'batch_expiry' | 'quality_issue';
  title: string;
  body: string;
  entity_type?: string;
  entity_id?: string;
  read_at?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  organization_id?: string;
  actor_id?: string;
  actor?: UserProfile;
  action: string;
  entity_type: string;
  entity_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface DataQualityIssue {
  id: string;
  organization_id: string;
  entity_type: string;
  entity_id: string;
  issue_type: string;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  status: 'Open' | 'Resolved' | 'Ignored';
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
}

// =====================================================================
// AI ASSISTANT TYPES
// =====================================================================

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  data_scope?: {
    scope_description: string;
    period: string;
    organization: string;
    metric_count: number;
    limitations: string;
    evidence_ids?: string[];
  };
  created_at: string;
}

// =====================================================================
// EXTENDED INTELLIGENCE & PLATFORM TYPES
// =====================================================================

export interface GeographicRegion {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  total_facilities: number;
  resistance_rate: number;
  utilization_units: number;
  active_alerts: number;
  status: 'Critical' | 'Watch' | 'Stable';
}

export interface PrescriberAnalytics {
  id: string;
  doctor_name: string;
  prescriber_name?: string;
  specialty: string;
  department?: string;
  facility: string;
  facility_name?: string;
  prescriptions_count: number;
  total_prescriptions?: number;
  antibiotic_rate: number;
  watch_reserve_ratio: number;
  compliance_score: number;
  guideline_adherence_pct?: number;
  high_risk_alerts_count?: number;
  aware_distribution?: { Access: number; Watch: number; Reserve: number };
}

export interface IndicationBreakdown {
  category: string;
  prescriptions: number;
  top_antibiotic: string;
  avg_duration_days: number;
  resistance_rate: number;
}

export interface SystemConnector {
  id: string;
  name: string;
  type: 'HL7_FHIR' | 'LIS_ASTM' | 'GS1_EPCIS' | 'DHIS2_SURVEILLANCE' | 'REST_WEBHOOK';
  protocol?: string;
  endpoint?: string;
  status: 'Online' | 'Degraded' | 'Offline' | 'Active';
  records_processed_24h?: number;
  records_synced?: number;
  error_rate?: number;
  last_sync: string;
  latency_ms: number;
}

export interface BackgroundJob {
  id: string;
  name: string;
  schedule: string;
  last_run: string;
  next_run?: string;
  status: 'Success' | 'Running' | 'Failed';
  duration_sec?: number;
  duration_ms?: number;
  records_evaluated?: number;
}



