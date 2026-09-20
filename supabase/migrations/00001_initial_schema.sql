-- =====================================================================
-- MEDIGUARD SUPABASE SCHEMA MIGRATION 00001: CORE SURVEILLANCE SCHEMA
-- Standard: PostgreSQL 15+, UUID-v4, Multi-Tenant Partitioning by organization_id
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'hospital_network', -- hospital_network, public_health_agency, laboratory_network, pharmacy_network
    country VARCHAR(100) NOT NULL DEFAULT 'Pakistan',
    region VARCHAR(100) NOT NULL DEFAULT 'Punjab',
    timezone VARCHAR(50) NOT NULL DEFAULT 'Asia/Karachi',
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, suspended, trial
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. FACILITIES
CREATE TABLE IF NOT EXISTS facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- hospital, laboratory, pharmacy, clinic, surveillance_unit
    area VARCHAR(100) NOT NULL DEFAULT 'Urban',
    address TEXT,
    contact_phone VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_facilities_org ON facilities(organization_id);

-- 3. PROFILES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    title VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ROLES
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- Platform Administrator, Organization Administrator, Clinical Surveillance Officer, Doctor, Pharmacist, Laboratory Scientist, Antimicrobial Stewardship Professional, Epidemiology Analyst, Read-only Researcher
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PERMISSIONS
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ROLE_PERMISSIONS
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 7. ORGANIZATION_MEMBERS
CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    facility_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_members_org ON organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_members_user ON organization_members(user_id);

-- 8. MEDICINES CATALOG
CREATE TABLE IF NOT EXISTS medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE, -- NULL means global standard catalog
    generic_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255) NOT NULL,
    active_ingredients TEXT NOT NULL,
    strength VARCHAR(100) NOT NULL,
    dosage_form VARCHAR(100) NOT NULL, -- Tablet, Capsule, Injection, Syrup, IV Infusion
    route VARCHAR(100) NOT NULL DEFAULT 'Oral', -- Oral, Intravenous, Intramuscular, Topical
    therapeutic_class VARCHAR(150) NOT NULL,
    atc_code VARCHAR(20),
    is_antibiotic BOOLEAN NOT NULL DEFAULT FALSE,
    antibiotic_class VARCHAR(100), -- Penicillins, Cephalosporins, Carbapenems, Macrolides, Fluoroquinolones, Aminoglycosides
    aware_category VARCHAR(20), -- Access, Watch, Reserve
    manufacturer VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_medicines_generic ON medicines(generic_name);
CREATE INDEX IF NOT EXISTS idx_medicines_antibiotic ON medicines(is_antibiotic);

-- 9. MEDICINE_BATCHES
CREATE TABLE IF NOT EXISTS medicine_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
    facility_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
    batch_number VARCHAR(100) NOT NULL,
    manufacture_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    initial_quantity INTEGER NOT NULL DEFAULT 0,
    current_quantity INTEGER NOT NULL DEFAULT 0,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Verified, Unverified, Expired, Recalled, Suspicious, Rejected
    recall_status VARCHAR(50) NOT NULL DEFAULT 'Normal', -- Normal, Recalled, Quarantined
    verification_source VARCHAR(100), -- National Regulatory Authority, Internal QC, GS1 Barcode Scan
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(medicine_id, batch_number)
);
CREATE INDEX IF NOT EXISTS idx_batches_expiry ON medicine_batches(expiry_date);
CREATE INDEX IF NOT EXISTS idx_batches_status ON medicine_batches(verification_status);

-- 10. PRESCRIPTIONS
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    prescriber_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    patient_reference VARCHAR(100) NOT NULL, -- Pseudonymous identifier (e.g. PAT-90823-X)
    encounter_reference VARCHAR(100) NOT NULL,
    prescription_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    clinical_indication TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, dispensed, cancelled, completed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_prescriptions_org ON prescriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_date ON prescriptions(prescription_date);

-- 11. PRESCRIPTION_ITEMS
CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
    medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE RESTRICT,
    dose VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL, -- BID, TID, QID, Once daily, PRN
    route VARCHAR(100) NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 5,
    quantity INTEGER NOT NULL DEFAULT 1,
    indication_category VARCHAR(100), -- Respiratory, UTI, Surgical Prophylaxis, Sepsis, Gastrointestinal
    instructions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_prescription_items_med ON prescription_items(medicine_id);

-- 12. DISPENSING_RECORDS
CREATE TABLE IF NOT EXISTS dispensing_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    prescription_id UUID REFERENCES prescriptions(id) ON DELETE SET NULL,
    medicine_id UUID NOT NULL REFERENCES medicines(id) ON DELETE RESTRICT,
    batch_id UUID NOT NULL REFERENCES medicine_batches(id) ON DELETE RESTRICT,
    pharmacist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    patient_reference VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    dispensed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    repeat_flag BOOLEAN NOT NULL DEFAULT FALSE,
    verification_status VARCHAR(50) NOT NULL DEFAULT 'Verified',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dispensing_org ON dispensing_records(organization_id);
CREATE INDEX IF NOT EXISTS idx_dispensing_date ON dispensing_records(dispensed_at);
CREATE INDEX IF NOT EXISTS idx_dispensing_medicine ON dispensing_records(medicine_id);
CREATE INDEX IF NOT EXISTS idx_dispensing_patient ON dispensing_records(patient_reference);

-- 13. SPECIMENS
CREATE TABLE IF NOT EXISTS specimens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    laboratory_id UUID NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
    patient_reference VARCHAR(100) NOT NULL,
    specimen_type VARCHAR(100) NOT NULL, -- Blood, Urine, Sputum, CSF, Wound Swab, Stool
    collected_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    quality_status VARCHAR(50) NOT NULL DEFAULT 'Adequate', -- Adequate, Contaminated, Insufficient, Hemolyzed
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_specimens_org ON specimens(organization_id);
CREATE INDEX IF NOT EXISTS idx_specimens_lab ON specimens(laboratory_id);
CREATE INDEX IF NOT EXISTS idx_specimens_date ON specimens(collected_at);

-- 14. ORGANISMS
CREATE TABLE IF NOT EXISTS organisms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- Gram-negative bacilli, Gram-positive cocci, Mycobacteria, Fungi
    gram_stain VARCHAR(50) NOT NULL, -- Gram-negative, Gram-positive
    who_priority VARCHAR(50), -- Critical, High, Medium
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. SUSCEPTIBILITY_RESULTS
CREATE TABLE IF NOT EXISTS susceptibility_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    specimen_id UUID NOT NULL REFERENCES specimens(id) ON DELETE CASCADE,
    organism_id UUID NOT NULL REFERENCES organisms(id) ON DELETE RESTRICT,
    antibiotic_id UUID NOT NULL REFERENCES medicines(id) ON DELETE RESTRICT,
    result VARCHAR(50) NOT NULL, -- Susceptible, Intermediate, Resistant
    mic_value VARCHAR(50), -- e.g. "<= 0.5 ug/mL", ">= 16 ug/mL"
    interpretation VARCHAR(50) NOT NULL, -- S, I, R
    tested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    guideline_version VARCHAR(100) NOT NULL DEFAULT 'CLSI M100-ED33', -- CLSI, EUCAST
    quality_status VARCHAR(50) NOT NULL DEFAULT 'Valid',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_susceptibility_organism ON susceptibility_results(organism_id);
CREATE INDEX IF NOT EXISTS idx_susceptibility_antibiotic ON susceptibility_results(antibiotic_id);
CREATE INDEX IF NOT EXISTS idx_susceptibility_interp ON susceptibility_results(interpretation);

-- 16. ALERTS
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    facility_id UUID REFERENCES facilities(id) ON DELETE SET NULL,
    signal_type VARCHAR(100) NOT NULL, -- unusual_usage, repeat_dispensing, resistance_surge, organism_trend, batch_issue, data_quality
    severity VARCHAR(50) NOT NULL, -- Critical, High, Medium, Low
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    period_start TIMESTAMPTZ NOT NULL,
    period_end TIMESTAMPTZ NOT NULL,
    observed_value NUMERIC(10, 2),
    baseline_value NUMERIC(10, 2),
    change_percent NUMERIC(10, 2),
    affected_entity_type VARCHAR(100), -- medicine, organism, batch, facility
    affected_entity_id UUID,
    status VARCHAR(50) NOT NULL DEFAULT 'New', -- New, Acknowledged, Investigating, Resolved, Dismissed
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    detection_rule_id VARCHAR(100) NOT NULL,
    detection_rule_version VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    dedup_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_alerts_org ON alerts(organization_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_signal ON alerts(signal_type);

-- 17. ALERT_EVIDENCE
CREATE TABLE IF NOT EXISTS alert_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
    source_type VARCHAR(100) NOT NULL, -- dispensing_records, susceptibility_results, medicine_batches, audit_logs
    source_id UUID NOT NULL,
    statistical_payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_evidence_alert ON alert_evidence(alert_id);

-- 18. INVESTIGATIONS
CREATE TABLE IF NOT EXISTS investigations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    investigator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    status VARCHAR(50) NOT NULL DEFAULT 'In Progress', -- In Progress, Resolved, Dismissed
    findings TEXT,
    resolution_reason TEXT,
    action_taken TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_investigations_alert ON investigations(alert_id);
CREATE INDEX IF NOT EXISTS idx_investigations_org ON investigations(organization_id);

-- 19. INVESTIGATION_NOTES
CREATE TABLE IF NOT EXISTS investigation_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investigation_id UUID NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notes_investigation ON investigation_notes(investigation_id);

-- 20. REPORTS
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- medication_utilization, antibiotic_stewardship, antibiogram_summary, batch_verification, monthly_surveillance
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    filters_json JSONB NOT NULL DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'Completed', -- Generating, Completed, Failed
    summary_markdown TEXT,
    file_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_reports_org ON reports(organization_id);

-- 21. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- critical_alert, assigned_investigation, report_ready, batch_expiry, quality_issue
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read_at);

-- 22. AUDIT_LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- login, create_prescription, dispense_medication, verify_batch, alert_status_change, resolve_investigation, export_report, query_ai
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_org ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);

-- 23. DATA_QUALITY_ISSUES
CREATE TABLE IF NOT EXISTS data_quality_issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    entity_type VARCHAR(100) NOT NULL, -- dispensing_records, specimens, susceptibility_results, medicine_batches
    entity_id UUID NOT NULL,
    issue_type VARCHAR(100) NOT NULL, -- missing_interpretation, invalid_expiry, name_mismatch, duplicate_dispensing, missing_batch
    severity VARCHAR(50) NOT NULL DEFAULT 'Medium', -- Low, Medium, High
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Open', -- Open, Resolved, Ignored
    resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_quality_org ON data_quality_issues(organization_id);
CREATE INDEX IF NOT EXISTS idx_quality_status ON data_quality_issues(status);

-- 24. AI_CONVERSATIONS & AI_MESSAGES
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    data_scope JSONB, -- Record IDs, date range, filters used for grounding
    model VARCHAR(100) NOT NULL DEFAULT 'gemini-1.5-flash',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conv ON ai_messages(conversation_id);

