-- =====================================================================
-- MEDIGUARD SUPABASE SCHEMA MIGRATION 00003: SEED REFERENCE & SYNTHETIC DEMO DATA
-- ALL PATIENT AND CLINICAL DATA IS STRICTLY SYNTHETIC AND LABELED FOR DEMONSTRATION
-- =====================================================================

-- 1. SEED ROLES
INSERT INTO roles (id, name, slug, description) VALUES
('11111111-1111-1111-1111-111111110001', 'Platform Administrator', 'platform-admin', 'Full platform control, global reference data and organization management'),
('11111111-1111-1111-1111-111111110002', 'Organization Administrator', 'org-admin', 'Manages single organization users, facilities, and local policies'),
('11111111-1111-1111-1111-111111110003', 'Clinical Surveillance Officer', 'surveillance-officer', 'Surveillance command center oversight, alert monitoring, and investigations'),
('11111111-1111-1111-1111-111111110004', 'Doctor / Prescriber', 'doctor', 'Creates prescriptions and views antibiotic guidance and patient history'),
('11111111-1111-1111-1111-111111110005', 'Pharmacist', 'pharmacist', 'Dispenses medication, performs batch verification, and flags repeated dispensing'),
('11111111-1111-1111-1111-111111110006', 'Laboratory Scientist', 'lab-scientist', 'Enters microbiology specimens, pathogen cultures, and antibiogram AST results'),
('11111111-1111-1111-1111-111111110007', 'Infection Prevention / Stewardship Professional', 'stewardship-lead', 'Antimicrobial stewardship monitoring, AWaRe compliance, and intervention'),
('11111111-1111-1111-1111-111111110008', 'Public Health / Epidemiology Analyst', 'epidemiologist', 'Regional surveillance, multi-facility comparison, and epidemiological trends'),
('11111111-1111-1111-1111-111111110009', 'Read-only Executive / Researcher', 'read-only', 'Read-only access to surveillance dashboards and aggregated reports')
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PERMISSIONS
INSERT INTO permissions (id, key, description) VALUES
('22222222-2222-2222-2222-222222220001', 'platform.manage', 'Global system administration'),
('22222222-2222-2222-2222-222222220002', 'org.manage', 'Organization and facility configuration'),
('22222222-2222-2222-2222-222222220003', 'prescriptions.create', 'Prescribe medications to patients'),
('22222222-2222-2222-2222-222222220004', 'prescriptions.view', 'View prescription records'),
('22222222-2222-2222-2222-222222220005', 'dispensing.create', 'Record medication dispensing and batch verification'),
('22222222-2222-2222-2222-222222220006', 'dispensing.view', 'View medication dispensing records'),
('22222222-2222-2222-2222-222222220007', 'laboratory.create', 'Enter microbiology and susceptibility results'),
('22222222-2222-2222-2222-222222220008', 'laboratory.view', 'View laboratory microbiology results'),
('22222222-2222-2222-2222-222222220009', 'analytics.view', 'View surveillance command center and trend graphs'),
('22222222-2222-2222-2222-222222220010', 'alerts.view', 'View active surveillance signals and alerts'),
('22222222-2222-2222-2222-222222220011', 'alerts.investigate', 'Assign, manage, and resolve alert investigations'),
('22222222-2222-2222-2222-222222220012', 'reports.generate', 'Build, generate, and export surveillance reports'),
('22222222-2222-2222-2222-222222220013', 'ai.use', 'Access grounded Gemini AI surveillance assistant'),
('22222222-2222-2222-2222-222222220014', 'audit.view', 'Inspect security audit logs')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED ORGANIZATIONS
INSERT INTO organizations (id, name, type, country, region, timezone, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MediGuard National Surveillance Network', 'hospital_network', 'Pakistan', 'Punjab', 'Asia/Karachi', 'active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'CityCare Healthcare System (Isolated Tenant)', 'hospital_network', 'Pakistan', 'Sindh', 'Asia/Karachi', 'active')
ON CONFLICT (id) DO NOTHING;

-- 4. SEED FACILITIES FOR ORG A
INSERT INTO facilities (id, organization_id, name, type, area, address, status) VALUES
('fa000001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mayo Memorial Hospital', 'hospital', 'Central Lahore', 'Hospital Road, Anarkali, Lahore', 'active'),
('fa000001-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Central Microbiology Reference Lab', 'laboratory', 'Gulberg III, Lahore', 'Main Boulevard, Gulberg, Lahore', 'active'),
('fa000001-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Allama Iqbal Medical Complex', 'hospital', 'Faisal Town, Lahore', 'Allama Iqbal Town, Lahore', 'active'),
('fa000001-0000-0000-0000-000000000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Regional Pharmacy Hub 01', 'pharmacy', 'Cantt, Lahore', 'Mall Road, Cantt, Lahore', 'active'),
-- Facilities for Org B (to test isolation)
('fb000002-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'CityCare Karachi General', 'hospital', 'Clifton, Karachi', 'Khayaban-e-Iqbal, Clifton, Karachi', 'active'),
('fb000002-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'CityCare South Diagnostics', 'laboratory', 'Saddar, Karachi', 'Saddar Town, Karachi', 'active')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED ORGANISMS (WHO Priority Pathogens & Common AMR targets)
INSERT INTO organisms (id, name, scientific_name, category, gram_stain, who_priority, status) VALUES
('00000001-0000-0000-0000-000000000001', 'Escherichia coli', 'Escherichia coli', 'Gram-negative bacilli', 'Gram-negative', 'Critical', 'active'),
('00000001-0000-0000-0000-000000000002', 'Klebsiella pneumoniae', 'Klebsiella pneumoniae', 'Gram-negative bacilli', 'Gram-negative', 'Critical', 'active'),
('00000001-0000-0000-0000-000000000003', 'Pseudomonas aeruginosa', 'Pseudomonas aeruginosa', 'Gram-negative bacilli', 'Gram-negative', 'Critical', 'active'),
('00000001-0000-0000-0000-000000000004', 'Acinetobacter baumannii', 'Acinetobacter baumannii', 'Gram-negative bacilli', 'Gram-negative', 'Critical', 'active'),
('00000001-0000-0000-0000-000000000005', 'Staphylococcus aureus (MRSA/MSSA)', 'Staphylococcus aureus', 'Gram-positive cocci', 'Gram-positive', 'High', 'active'),
('00000001-0000-0000-0000-000000000006', 'Enterococcus faecium (VRE)', 'Enterococcus faecium', 'Gram-positive cocci', 'Gram-positive', 'High', 'active'),
('00000001-0000-0000-0000-000000000007', 'Streptococcus pneumoniae', 'Streptococcus pneumoniae', 'Gram-positive cocci', 'Gram-positive', 'Medium', 'active')
ON CONFLICT (id) DO NOTHING;

-- 6. SEED MEDICINES (Antibiotics with WHO AWaRe categorization & Standard catalog)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'medicines' AND column_name = 'awarre_category'
  ) THEN
    ALTER TABLE medicines RENAME COLUMN awarre_category TO aware_category;
  END IF;
END $$;

INSERT INTO medicines (id, organization_id, generic_name, brand_name, active_ingredients, strength, dosage_form, route, therapeutic_class, atc_code, is_antibiotic, antibiotic_class, aware_category, manufacturer, status) VALUES
('00000002-0000-0000-0000-000000000001', NULL, 'Amoxicillin / Clavulanic Acid', 'Augmentin', 'Amoxicillin 500mg, Clavulanic Acid 125mg', '625 mg', 'Tablet', 'Oral', 'Beta-lactam Antibacterial', 'J01CR02', TRUE, 'Penicillins', 'Access', 'GlaxoSmithKline', 'active'),
('00000002-0000-0000-0000-000000000002', NULL, 'Ceftriaxone', 'Rocephin', 'Ceftriaxone Sodium', '1 g', 'Injection', 'Intravenous', 'Third-generation Cephalosporin', 'J01DD04', TRUE, 'Cephalosporins', 'Watch', 'Roche Pharmaceuticals', 'active'),
('00000002-0000-0000-0000-000000000003', NULL, 'Ciprofloxacin', 'Ciprobay', 'Ciprofloxacin Hydrochloride', '500 mg', 'Tablet', 'Oral', 'Fluoroquinolones', 'J01MA02', TRUE, 'Fluoroquinolones', 'Watch', 'Bayer Healthcare', 'active'),
('00000002-0000-0000-0000-000000000004', NULL, 'Meropenem', 'Meronem', 'Meropenem Trihydrate', '1 g', 'Injection', 'Intravenous', 'Carbapenems', 'J01DH02', TRUE, 'Carbapenems', 'Watch', 'Pfizer Global', 'active'),
('00000002-0000-0000-0000-000000000005', NULL, 'Azithromycin', 'Zithromax', 'Azithromycin Dihydrate', '500 mg', 'Tablet', 'Oral', 'Macrolides', 'J01FA10', TRUE, 'Macrolides', 'Watch', 'Pfizer Global', 'active'),
('00000002-0000-0000-0000-000000000006', NULL, 'Linezolid', 'Zyvox', 'Linezolid', '600 mg', 'Tablet', 'Oral', 'Oxazolidinones', 'J01XX08', TRUE, 'Oxazolidinones', 'Reserve', 'Pfizer Global', 'active'),
('00000002-0000-0000-0000-000000000007', NULL, 'Colistin (Polymyxin E)', 'Colomycin', 'Colistimethate Sodium', '1 Million IU', 'Injection', 'Intravenous', 'Polymyxins', 'J01XB01', TRUE, 'Polymyxins', 'Reserve', 'Forest Laboratories', 'active'),
('00000002-0000-0000-0000-000000000008', NULL, 'Paracetamol', 'Panadol', 'Acetaminophen', '500 mg', 'Tablet', 'Oral', 'Analgesics / Antipyretics', 'N02BE01', FALSE, NULL, NULL, 'GSK Consumer', 'active')
ON CONFLICT (id) DO NOTHING;

-- 7. SEED MEDICINE BATCHES
INSERT INTO medicine_batches (id, medicine_id, facility_id, batch_number, manufacture_date, expiry_date, initial_quantity, current_quantity, verification_status, recall_status, verification_source, notes) VALUES
('00000003-0000-0000-0000-000000000001', '00000002-0000-0000-0000-000000000001', 'fa000001-0000-0000-0000-000000000004', 'AUG-2024-B88', '2024-01-10', '2026-06-30', 5000, 3420, 'Verified', 'Normal', 'National Drug Regulatory Authority GS1', 'Verified safe for dispensing'),
('00000003-0000-0000-0000-000000000002', '00000002-0000-0000-0000-000000000002', 'fa000001-0000-0000-0000-000000000001', 'CTX-2024-V12', '2024-03-15', '2026-03-31', 2000, 850, 'Verified', 'Normal', 'Hospital Pharmacy QC', 'Routine batch in ICU supply'),
('00000003-0000-0000-0000-000000000003', '00000002-0000-0000-0000-000000000004', 'fa000001-0000-0000-0000-000000000001', 'MER-2023-X91', '2023-08-01', '2025-08-31', 1200, 420, 'Verified', 'Normal', 'Manufacturer Certificate of Analysis', 'High surveillance priority'),
('00000003-0000-0000-0000-000000000004', '00000002-0000-0000-0000-000000000003', 'fa000001-0000-0000-0000-000000000004', 'CIP-2023-EXP', '2023-01-10', '2024-12-31', 1500, 140, 'Expired', 'Normal', 'Internal Expiry Check', 'Flagged as expired batch - quarantine immediately'),
('00000003-0000-0000-0000-000000000005', '00000002-0000-0000-0000-000000000005', 'fa000001-0000-0000-0000-000000000004', 'AZI-2024-SUSP', '2024-05-20', '2026-11-30', 800, 780, 'Suspicious', 'Quarantined', 'Packaging Discrepancy Signal', 'Tamper evidence detected during stock intake - hold for investigation')
ON CONFLICT (id) DO NOTHING;

-- 8. SEED PROFILES
INSERT INTO profiles (id, auth_user_id, full_name, email, phone, title, status) VALUES
('00000004-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Dr. Tariq Mehmood', 'tariq.admin@mediguard.org', '+923001234567', 'Chief Epidemiologist & System Director', 'active'),
('00000004-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Dr. Sarah Farooq', 'sarah.doc@mediguard.org', '+923002345678', 'Senior Consultant Physician', 'active'),
('00000004-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Zainab Qureshi, PharmD', 'zainab.pharm@mediguard.org', '+923003456789', 'Lead Clinical Pharmacist', 'active'),
('00000004-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Dr. Asad Ullah, PhD', 'asad.lab@mediguard.org', '+923004567890', 'Principal Clinical Microbiologist', 'active'),
('00000004-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Ayesha Malik, MPH', 'ayesha.analyst@mediguard.org', '+923005678901', 'Antimicrobial Stewardship Analyst', 'active')
ON CONFLICT (id) DO NOTHING;

-- 9. SEED ORGANIZATION MEMBERSHIP
INSERT INTO organization_members (id, organization_id, user_id, role_id, status) VALUES
('00000005-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111110001', 'active'),
('00000005-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111110004', 'active'),
('00000005-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111110005', 'active'),
('00000005-0000-0000-0000-000000000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111110006', 'active'),
('00000005-0000-0000-0000-000000000005', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111110008', 'active')
ON CONFLICT (id) DO NOTHING;

-- 10. SEED SYNTHETIC DETERMINISTIC ALERTS
INSERT INTO alerts (id, organization_id, facility_id, signal_type, severity, title, description, detected_at, period_start, period_end, observed_value, baseline_value, change_percent, affected_entity_type, affected_entity_id, status, assigned_to, detection_rule_id, detection_rule_version) VALUES
('00000006-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'fa000001-0000-0000-0000-000000000001', 'resistance_surge', 'Critical', 'Signal detected: Ceftriaxone Resistance Surge in Klebsiella pneumoniae', 'Microbiology surveillance detected a 38.5% resistance increase compared to 6-month baseline across Mayo Memorial ICU cultures.', NOW() - INTERVAL '2 days', NOW() - INTERVAL '30 days', NOW(), 64.20, 46.30, 38.66, 'organism', '00000001-0000-0000-0000-000000000002', 'Investigating', '00000004-0000-0000-0000-000000000005', 'RULE-AMR-SURGE-01', '1.0.0'),
('00000006-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'fa000001-0000-0000-0000-000000000004', 'batch_issue', 'High', 'Batch signal: Expired Antibiotic Batch CIP-2023-EXP Stock Present', 'Batch verification detected active inventory of expired Ciprofloxacin 500mg tablets in Regional Pharmacy Hub 01.', NOW() - INTERVAL '1 day', NOW() - INTERVAL '7 days', NOW(), 140.00, 0.00, 100.00, 'batch', '00000003-0000-0000-0000-000000000004', 'Acknowledged', '00000004-0000-0000-0000-000000000003', 'RULE-BATCH-EXP-02', '1.0.0'),
('00000006-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'fa000001-0000-0000-0000-000000000001', 'unusual_usage', 'Medium', 'Pattern observed: Meropenem Dispensing Spike in Surgical Ward', 'Observed 52.4% increase in intravenous Meropenem dispensing over 14-day baseline without corresponding rise in confirmed sepsis cultures.', NOW() - INTERVAL '3 days', NOW() - INTERVAL '14 days', NOW(), 345.00, 226.00, 52.65, 'medicine', '00000002-0000-0000-0000-000000000004', 'New', NULL, 'RULE-USAGE-SPIKE-03', '1.0.0')
ON CONFLICT (id) DO NOTHING;

-- 11. SEED INVESTIGATION FOR CRITICAL ALERT
INSERT INTO investigations (id, alert_id, organization_id, investigator_id, status, findings, action_taken, started_at) VALUES
('00000007-0000-0000-0000-000000000001', '00000006-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000004-0000-0000-0000-000000000005', 'In Progress', 'Preliminary surveillance finding: 14 out of 22 Klebsiella isolates in surgical ICU exhibit ESBL phenotype with elevated Ceftriaxone MIC (>16 ug/mL). Cross-referencing environmental swabs and nurse staffing ratios.', 'Initiated contact precautions audit and notified Antimicrobial Stewardship Committee for regimen switch review.', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

INSERT INTO investigation_notes (id, investigation_id, author_id, note, created_at) VALUES
('00000008-0000-0000-0000-000000000001', '00000007-0000-0000-0000-000000000001', '00000004-0000-0000-0000-000000000005', 'Reviewed 30-day antibiogram with Dr. Asad from Microbiology. Denominator is 22 non-duplicate clinical isolates. Signal is statistically notable (p < 0.05).', NOW() - INTERVAL '18 hours'),
('00000008-0000-0000-0000-000000000002', '00000007-0000-0000-0000-000000000001', '00000004-0000-0000-0000-000000000004', 'Microbiology lab confirms EUCAST disk diffusion and automated VITEK-2 AST profiles match clonal pattern. Recommending stewardship alert to prescribers.', NOW() - INTERVAL '12 hours')
ON CONFLICT (id) DO NOTHING;
