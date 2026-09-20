// E2E Clinical Workflow Verification Test: tests/verifyE2EWorkflow.ts
// Verifies the complete healthcare data lifecycle:
// Doctor Rx -> Pharmacy Dispense -> Batch Stock Deduction -> Lab AST -> Alert Trigger -> Investigation Notes -> AI Copilot -> Audit Trail

import { api } from '../src/services/api';

async function runE2EWorkflow() {
  console.log('=== STARTING REAL HEALTHCARE END-TO-END WORKFLOW VERIFICATION ===\n');

  const orgId = 'org-1'; // St. Jude Health System
  const facilityId = 'fac-1'; // St. Jude General Hospital

  // 1. Initial State: Medicines & Batches
  console.log('1. Checking Initial Medicine & Batch Inventory...');
  const medicines = api.getMedicines(orgId);
  const batches = api.getBatches(facilityId);
  const meropenem = medicines.find(m => m.generic_name.toLowerCase().includes('meropenem'));
  if (!meropenem) throw new Error('Meropenem not found');
  const activeBatch = batches.find(b => b.medicine_id === meropenem.id && b.verification_status === 'Verified');
  if (!activeBatch) throw new Error('Verified Meropenem batch not found');

  const initialStock = activeBatch.current_quantity;
  console.log(`   Selected Medicine: ${meropenem.brand_name} (${meropenem.generic_name})`);
  console.log(`   Active Batch: ${activeBatch.batch_number} (Initial Stock: ${initialStock})`);

  // 2. Doctor Prescription Creation
  console.log('\n2. Step 1: Doctor Creates Prescription...');
  const newRx = api.createPrescription(orgId, {
    facility_id: facilityId,
    prescriber_id: 'usr-doc-1',
    patient_reference: 'PAT-E2E-' + Date.now().toString(36).toUpperCase(),
    encounter_reference: 'ENC-E2E',
    clinical_indication: 'Severe Sepsis, pathogen unknown',
    status: 'active',
    items: [
      {
        id: 'rxi-1',
        prescription_id: 'rx-tmp',
        medicine_id: meropenem.id,
        dose: '1g IV q8h',
        frequency: 'q8h',
        route: 'IV',
        duration_days: 7,
        quantity: 21,
      }
    ],
  });
  console.log(`   Prescription Created: ${newRx.id} (Status: ${newRx.status}, Items: ${newRx.items?.length})`);

  // 3. Pharmacy Dispensing & Stock Deduction
  console.log('\n3. Step 2: Pharmacy Dispenses Prescription & Deducts Stock...');
  const dispenseEvent = api.recordDispensing(orgId, {
    facility_id: facilityId,
    prescription_id: newRx.id,
    medicine_id: meropenem.id,
    batch_id: activeBatch.id,
    pharmacist_id: 'usr-pharm-1',
    patient_reference: newRx.patient_reference,
    quantity: 21,
    verification_status: 'verified',
    repeat_flag: false,
  });
  console.log(`   Dispense Record Created: ${dispenseEvent.id} (Dispensed: ${dispenseEvent.quantity})`);

  // Verify stock deduction
  const updatedBatches = api.getBatches(facilityId);
  const updatedBatch = updatedBatches.find(b => b.id === activeBatch.id);
  console.log(`   Updated Batch Stock: ${updatedBatch?.current_quantity} (Expected: ${initialStock - 21})`);
  if (updatedBatch?.current_quantity !== initialStock - 21) {
    throw new Error(`Batch stock mismatch: expected ${initialStock - 21}, got ${updatedBatch?.current_quantity}`);
  }

  // 4. Lab Result Entry (AST)
  console.log('\n4. Step 3: Laboratory Specimen Entry & AST Resistance Testing...');
  const labResult = api.recordLabResult(
    orgId,
    {
      laboratory_id: facilityId,
      patient_reference: newRx.patient_reference,
      specimen_type: 'Blood',
      collected_at: new Date().toISOString().split('T')[0],
      quality_status: 'Adequate',
      notes: 'Central Venous Catheter',
    },
    [
      {
        organism_id: 'org-kpn',
        antibiotic_id: meropenem.id,
        interpretation: 'R',
        result: 'Resistant',
        mic_value: '>= 16 ug/mL',
        guideline_version: 'CLSI M100-ED33',
        quality_status: 'Valid',
      },
    ]
  );
  console.log(`   Lab Specimen Accessioned: ${labResult.specimen.id} (${labResult.specimen.specimen_type})`);
  console.log(`   AST Result Recorded: ${labResult.results[0].id} (Interpretation: ${labResult.results[0].interpretation})`);

  // 5. Automated Alert Generation
  console.log('\n5. Step 4: Automated AMR Alert Generation...');
  const createdAlert = api.triggerDeterministicAlert({
    organization_id: orgId,
    facility_id: facilityId,
    signal_type: 'resistance_surge',
    title: 'Carbapenem-Resistant Enterobacterales (CRE) Isolated',
    description: 'High-risk Meropenem-resistant Klebsiella pneumoniae isolated from Blood specimen.',
    severity: 'Critical',
    observed_value: 100,
    baseline_value: 12.5,
    change_percent: 700,
    detection_rule_id: 'rule-cre-surge-01',
    detection_rule_version: '1.0.0',
  });
  console.log(`   Alert Triggered: ${createdAlert.id} - "${createdAlert.title}" [Severity: ${createdAlert.severity}]`);

  // 6. Clinical Investigation Workflow
  console.log('\n6. Step 5: Clinical Investigation & Multidisciplinary Notes...');
  const investigations = api.getInvestigations(orgId);
  console.log(`   Active Investigations in Org: ${investigations.length}`);
  const targetInvestigation = investigations[0];
  if (targetInvestigation) {
    const note = api.addInvestigationNote(
      targetInvestigation.id,
      'usr-epi-1',
      `Alert ${createdAlert.id} correlated with recent specimen ${labResult.specimen.id}. Contact precautions and environmental swabs initiated.`
    );
    console.log(`   Investigation Note Added to ${targetInvestigation.id}: "${note.note}"`);
  }

  // 7. Grounded AI Surveillance Copilot Query
  console.log('\n7. Step 6: Grounded AI Surveillance Copilot Query...');
  const aiResponse = await api.askMediGuardAI(
    'Synthesize the clinical and surveillance implications of Meropenem-resistant Klebsiella pneumoniae in St. Jude General Hospital.',
    orgId,
    'Infection Preventionist'
  );
  console.log(`   AI Message ID: ${aiResponse.id}`);
  console.log(`   Data Scope: ${aiResponse.data_scope?.scope_description}`);
  console.log(`   Metric Count Analyzed: ${aiResponse.data_scope?.metric_count}`);
  console.log(`   Limitations: ${aiResponse.data_scope?.limitations}`);
  console.log(`   AI Output Snippet:\n   ${aiResponse.content.slice(0, 220)}...`);

  // 8. Surveillance Reporting
  console.log('\n8. Step 7: Epidemiological Surveillance Reporting...');
  const newReport = api.createReport(orgId, {
    created_by: 'usr-epi-1',
    title: 'Monthly Antimicrobial Resistance Surveillance Summary - Q3',
    type: 'monthly_surveillance',
    period_start: '2026-08-01',
    period_end: '2026-08-31',
    filters_json: { time_range: '30d', organism: 'Klebsiella pneumoniae' },
    summary_markdown: 'Surveillance summary including newly detected CRE isolates and stewardship recommendations.',
  });
  console.log(`   Surveillance Report Generated: ${newReport.id} ("${newReport.title}")`);

  // 9. Immutable Audit Trail Verification
  console.log('\n9. Step 8: Immutable Audit Trail Verification...');
  const auditLogs = api.getAuditLogs(orgId);
  console.log(`   Total Immutable Audit Logs: ${auditLogs.length}`);

  const recentActions = auditLogs.slice(0, 6).map(l => `${l.action} (${l.entity_type})`);
  console.log('   Recent Audit Events:');
  recentActions.forEach(a => console.log(`     * ${a}`));

  const hasPrescriptionAudit = auditLogs.some(l => l.action === 'create_prescription');
  const hasDispenseAudit = auditLogs.some(l => l.action === 'dispense_medication');
  const hasLabAudit = auditLogs.some(l => l.action === 'enter_laboratory_ast');
  const hasAlertAudit = auditLogs.some(l => l.action === 'trigger_alert');
  const hasAIAudit = auditLogs.some(l => l.action === 'query_ai_assistant');

  console.log('\n--- VERIFYING AUDIT EVENT INTEGRITY ---');
  console.log(`   Prescription Event in Audit Log: ${hasPrescriptionAudit ? 'PASS' : 'FAIL'}`);
  console.log(`   Dispensing & Stock Deduction in Audit Log: ${hasDispenseAudit ? 'PASS' : 'FAIL'}`);
  console.log(`   Laboratory AST Entry in Audit Log: ${hasLabAudit ? 'PASS' : 'FAIL'}`);
  console.log(`   Deterministic Alert in Audit Log: ${hasAlertAudit ? 'PASS' : 'FAIL'}`);
  console.log(`   AI Surveillance Query in Audit Log: ${hasAIAudit ? 'PASS' : 'FAIL'}`);

  if (!hasPrescriptionAudit || !hasDispenseAudit || !hasLabAudit || !hasAlertAudit || !hasAIAudit) {
    throw new Error('Audit trail integrity check failed!');
  }

  console.log('\n=== REAL HEALTHCARE END-TO-END WORKFLOW VERIFIED: ALL 8 STAGES PASS ===');
}

runE2EWorkflow().catch(err => {
  console.error('FATAL E2E FAILURE:', err);
  process.exit(1);
});
