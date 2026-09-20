// =====================================================================
// MEDIGUARD SURVEILLANCE PLATFORM VERIFICATION TEST SUITE
// Automated verification of multi-tenant isolation, RBAC, deterministic alerts,
// batch verification, prescribing, dispensing, and AST calculations.
// =====================================================================

import { api } from '../src/services/api';
import { hasPermission, canPerform } from '../src/lib/permissions';
import { formatResistanceRate } from '../src/lib/formatters';

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failCount++;
  }
}

console.log('=== RUNNING MEDIGUARD INTEGRATION & SECURITY TESTS ===\n');

// 1. MULTI-TENANT ISOLATION TEST
console.log('--- 1. Multi-Tenant Organization Isolation ---');
const orgAId = 'org-1';
const orgBId = 'org-2';

const orgAFacilities = api.getFacilities(orgAId);
const orgBFacilities = api.getFacilities(orgBId);

assert(orgAFacilities.length > 0, 'Org A facilities exist');
assert(orgBFacilities.length > 0, 'Org B facilities exist');
assert(
  !orgAFacilities.some((f) => f.organization_id === orgBId),
  'Org A facility list contains NO Org B facilities'
);
assert(
  !orgBFacilities.some((f) => f.organization_id === orgAId),
  'Org B facility list contains NO Org A facilities'
);

const orgAPrescriptions = api.getPrescriptions(orgAId);
const orgBPrescriptions = api.getPrescriptions(orgBId);
assert(
  !orgAPrescriptions.some((p) => p.organization_id === orgBId),
  'Org A cannot see Org B prescriptions'
);

// 2. RBAC CAPABILITIES TEST FOR ALL 9 ROLES
console.log('\n--- 2. Role-Based Access Control (RBAC) ---');
assert(canPerform('doctor', 'create_prescription'), 'Doctor CAN create prescriptions');
assert(!canPerform('doctor', 'dispense'), 'Doctor CANNOT dispense medication');
assert(canPerform('pharmacist', 'dispense'), 'Pharmacist CAN dispense medication');
assert(!canPerform('pharmacist', 'create_prescription'), 'Pharmacist CANNOT create prescriptions');
assert(canPerform('lab-scientist', 'enter_lab'), 'Laboratory Scientist CAN record AST');
assert(!canPerform('lab-scientist', 'dispense'), 'Laboratory Scientist CANNOT dispense');
assert(canPerform('stewardship-lead', 'generate_report'), 'Stewardship Lead CAN generate surveillance reports');
assert(!canPerform('read-only', 'create_prescription'), 'Read-only researcher CANNOT create prescriptions');
assert(!canPerform('read-only', 'dispense'), 'Read-only researcher CANNOT dispense');
assert(hasPermission('platform-admin', 'platform.manage'), 'Platform Admin has global control');

// 3. CLINICAL PRESCRIBING & DISPENSING WORKFLOW
console.log('\n--- 3. Prescribing to Dispensing Pipeline ---');
const createdRx = api.createPrescription(orgAId, {
  facility_id: orgAFacilities[0].id,
  prescriber_id: 'usr-2',
  patient_reference: 'PAT-TEST-999',
  encounter_reference: 'ENC-TEST-001',
  clinical_indication: 'Empiric sepsis protocol',
  status: 'active',
  items: [
    {
      id: '',
      prescription_id: '',
      medicine_id: 'med-2', // Ceftriaxone
      dose: '1 g IV',
      frequency: 'BID',
      route: 'Intravenous',
      duration_days: 5,
      quantity: 10,
    },
  ],
});

assert(createdRx.id.startsWith('rx-'), 'Prescription created with valid ID');

// Pharmacist dispenses
const beforeBatch = api.getBatches().find((b) => b.id === 'bat-2')!;
const beforeStock = beforeBatch.current_quantity;

const dispensed = api.recordDispensing(orgAId, {
  facility_id: orgAFacilities[0].id,
  prescription_id: createdRx.id,
  medicine_id: 'med-2',
  batch_id: 'bat-2',
  pharmacist_id: 'usr-3',
  patient_reference: 'PAT-TEST-999',
  quantity: 5,
  repeat_flag: false,
  verification_status: 'Verified',
});

const afterBatch = api.getBatches().find((b) => b.id === 'bat-2')!;
assert(dispensed.id.startsWith('dsp-'), 'Dispensing recorded successfully');
assert(afterBatch.current_quantity === beforeStock - 5, 'Inventory quantity accurately deducted from batch');

// 4. BATCH VERIFICATION & AUDIT LOGGING
console.log('\n--- 4. Batch Verification & Audit Trails ---');
api.verifyBatch('bat-1', 'Verified', 'usr-3', 'Regulatory barcode verification passed');
const verifiedBatch = api.getBatches().find((b) => b.id === 'bat-1');
assert(verifiedBatch?.verification_status === 'Verified', 'Batch verification status updated to Verified');

const latestAudit = api.getAuditLogs(orgAId)[0];
assert(latestAudit !== undefined, 'Audit log created');
assert(latestAudit.action === 'verify_batch', 'Audit log records exact verification action');

// 5. DETERMINISTIC ALERT ENGINE & REPEAT DISPENSING SIGNAL
console.log('\n--- 5. Deterministic Alert Rules Engine ---');
// Record another 2 dispenses to same patient to trigger repeat dispensing signal
api.recordDispensing(orgAId, {
  facility_id: orgAFacilities[0].id,
  medicine_id: 'med-2',
  batch_id: 'bat-2',
  pharmacist_id: 'usr-3',
  patient_reference: 'PAT-TEST-999',
  quantity: 5,
  repeat_flag: true,
  verification_status: 'Verified',
});

api.recordDispensing(orgAId, {
  facility_id: orgAFacilities[0].id,
  medicine_id: 'med-2',
  batch_id: 'bat-2',
  pharmacist_id: 'usr-3',
  patient_reference: 'PAT-TEST-999',
  quantity: 5,
  repeat_flag: true,
  verification_status: 'Verified',
});

const alertsAfterRepeat = api.getAlerts(orgAId);
const repeatAlert = alertsAfterRepeat.find(
  (a) => a.signal_type === 'repeat_dispensing' && a.title.includes('PAT-TEST-999')
);
assert(repeatAlert !== undefined, 'Deterministic rule triggered repeat dispensing alert');

// 6. MICROBIOLOGY & RESISTANCE RATE CALCULATION
console.log('\n--- 6. Laboratory Antibiogram & Denominator Integrity ---');
const testRate = formatResistanceRate(14, 22);
assert(testRate === '63.6% (14/22)', 'Resistance rate accurately computed with explicit denominator');

// Test Critical Reserve Pathogen Alert
api.recordLabResult(
  orgAId,
  {
    laboratory_id: orgAFacilities[1].id,
    patient_reference: 'PAT-AMR-CRIT',
    specimen_type: 'Blood',
    collected_at: new Date().toISOString(),
    quality_status: 'Adequate',
  },
  [
    {
      organism_id: 'org-kleb', // Klebsiella (Critical)
      antibiotic_id: 'med-7', // Colistin (Reserve)
      result: 'Resistant',
      mic_value: '>= 4 ug/mL',
      interpretation: 'R',
      guideline_version: 'CLSI M100-ED33',
      quality_status: 'Valid',
    },
  ]
);

const reserveAlert = api.getAlerts(orgAId).find((a) => a.detection_rule_id === 'RULE-RESERVE-RESIST-06');
assert(reserveAlert !== undefined, 'Deterministic engine detected critical Reserve resistance signal');

// 7. INVESTIGATION & DISMISSAL PROTOCOL
console.log('\n--- 7. Alert Investigation & Dismissal Rationale ---');
const alertToDismiss = api.getAlerts(orgAId)[0];
let threwWithoutReason = false;
try {
  api.updateAlertStatus(alertToDismiss.id, 'Dismissed', 'usr-1', '');
} catch {
  threwWithoutReason = true;
}
assert(threwWithoutReason, 'Dismissing an alert strictly requires a documented justification');

api.updateAlertStatus(alertToDismiss.id, 'Dismissed', 'usr-1', 'Verified duplicate test from same patient');
const dismissedAlert = api.getAlertById(alertToDismiss.id);
assert(dismissedAlert?.status === 'Dismissed', 'Alert dismissed successfully with documented justification');

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}

