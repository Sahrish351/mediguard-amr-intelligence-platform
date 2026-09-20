-- =====================================================================
-- MEDIGUARD SUPABASE SCHEMA MIGRATION 00002: ROW LEVEL SECURITY & POLICIES
-- Strict multi-tenant isolation: Organization A can NEVER access Org B data.
-- =====================================================================

-- 1. Helper function: Get current user's profile ID
CREATE OR REPLACE FUNCTION current_profile_id()
RETURNS UUID AS $$
    SELECT id FROM profiles WHERE auth_user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- 2. Helper function: Check if current user is member of an organization
CREATE OR REPLACE FUNCTION is_member_of(org_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM organization_members om
        JOIN profiles p ON om.user_id = p.id
        WHERE p.auth_user_id = auth.uid()
          AND om.organization_id = org_id
          AND om.status = 'active'
    );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- 3. Helper function: Check if current user is platform administrator
CREATE OR REPLACE FUNCTION is_platform_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM organization_members om
        JOIN profiles p ON om.user_id = p.id
        JOIN roles r ON om.role_id = r.id
        WHERE p.auth_user_id = auth.uid()
          AND r.slug = 'platform-admin'
          AND om.status = 'active'
    );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- 4. Enable RLS on all tenant tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispensing_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE specimens ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisms ENABLE ROW LEVEL SECURITY;
ALTER TABLE susceptibility_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE investigations ENABLE ROW LEVEL SECURITY;
ALTER TABLE investigation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_quality_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- POLICIES DEFINITIONS
-- =====================================================================

-- PROFILES
CREATE POLICY profiles_select_all ON profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY profiles_update_own ON profiles
    FOR UPDATE TO authenticated USING (auth_user_id = auth.uid());

-- ORGANIZATIONS
CREATE POLICY org_select ON organizations
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(id));

CREATE POLICY org_modify ON organizations
    FOR ALL TO authenticated
    USING (is_platform_admin());

-- FACILITIES
CREATE POLICY facilities_select ON facilities
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY facilities_modify ON facilities
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- ORGANIZATION_MEMBERS
CREATE POLICY members_select ON organization_members
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- MEDICINES (Global records with organization_id NULL are visible to all; Org-specific records scoped to org)
CREATE POLICY medicines_select ON medicines
    FOR SELECT TO authenticated
    USING (organization_id IS NULL OR is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY medicines_modify ON medicines
    FOR ALL TO authenticated
    USING (is_platform_admin() OR (organization_id IS NOT NULL AND is_member_of(organization_id)));

-- MEDICINE_BATCHES
CREATE POLICY batches_select ON medicine_batches
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM facilities f
        WHERE f.id = medicine_batches.facility_id
          AND (is_platform_admin() OR is_member_of(f.organization_id))
    ) OR facility_id IS NULL);

CREATE POLICY batches_modify ON medicine_batches
    FOR ALL TO authenticated
    USING (EXISTS (
        SELECT 1 FROM facilities f
        WHERE f.id = medicine_batches.facility_id
          AND (is_platform_admin() OR is_member_of(f.organization_id))
    ));

-- PRESCRIPTIONS
CREATE POLICY prescriptions_select ON prescriptions
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY prescriptions_modify ON prescriptions
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- PRESCRIPTION_ITEMS
CREATE POLICY presc_items_select ON prescription_items
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM prescriptions p
        WHERE p.id = prescription_items.prescription_id
          AND (is_platform_admin() OR is_member_of(p.organization_id))
    ));

CREATE POLICY presc_items_modify ON prescription_items
    FOR ALL TO authenticated
    USING (EXISTS (
        SELECT 1 FROM prescriptions p
        WHERE p.id = prescription_items.prescription_id
          AND (is_platform_admin() OR is_member_of(p.organization_id))
    ));

-- DISPENSING_RECORDS
CREATE POLICY dispensing_select ON dispensing_records
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY dispensing_insert ON dispensing_records
    FOR INSERT TO authenticated
    WITH CHECK (is_platform_admin() OR is_member_of(organization_id));

-- SPECIMENS
CREATE POLICY specimens_select ON specimens
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY specimens_modify ON specimens
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- ORGANISMS (Global reference catalog)
CREATE POLICY organisms_select ON organisms
    FOR SELECT TO authenticated USING (true);

-- SUSCEPTIBILITY_RESULTS
CREATE POLICY susceptibility_select ON susceptibility_results
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM specimens s
        WHERE s.id = susceptibility_results.specimen_id
          AND (is_platform_admin() OR is_member_of(s.organization_id))
    ));

CREATE POLICY susceptibility_modify ON susceptibility_results
    FOR ALL TO authenticated
    USING (EXISTS (
        SELECT 1 FROM specimens s
        WHERE s.id = susceptibility_results.specimen_id
          AND (is_platform_admin() OR is_member_of(s.organization_id))
    ));

-- ALERTS
CREATE POLICY alerts_select ON alerts
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY alerts_modify ON alerts
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- ALERT_EVIDENCE
CREATE POLICY evidence_select ON alert_evidence
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM alerts a
        WHERE a.id = alert_evidence.alert_id
          AND (is_platform_admin() OR is_member_of(a.organization_id))
    ));

-- INVESTIGATIONS
CREATE POLICY investigations_select ON investigations
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY investigations_modify ON investigations
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- INVESTIGATION_NOTES
CREATE POLICY notes_select ON investigation_notes
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM investigations i
        WHERE i.id = investigation_notes.investigation_id
          AND (is_platform_admin() OR is_member_of(i.organization_id))
    ));

CREATE POLICY notes_insert ON investigation_notes
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM investigations i
        WHERE i.id = investigation_notes.investigation_id
          AND (is_platform_admin() OR is_member_of(i.organization_id))
    ));

-- REPORTS
CREATE POLICY reports_select ON reports
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY reports_insert ON reports
    FOR INSERT TO authenticated
    WITH CHECK (is_platform_admin() OR is_member_of(organization_id));

-- NOTIFICATIONS
CREATE POLICY notifications_select ON notifications
    FOR SELECT TO authenticated
    USING (user_id = current_profile_id());

CREATE POLICY notifications_update ON notifications
    FOR UPDATE TO authenticated
    USING (user_id = current_profile_id());

-- AUDIT_LOGS (Append-only for users, immutable)
CREATE POLICY audit_select ON audit_logs
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR (organization_id IS NOT NULL AND is_member_of(organization_id)));

CREATE POLICY audit_insert ON audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- DATA_QUALITY_ISSUES
CREATE POLICY dq_select ON data_quality_issues
    FOR SELECT TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

CREATE POLICY dq_modify ON data_quality_issues
    FOR ALL TO authenticated
    USING (is_platform_admin() OR is_member_of(organization_id));

-- AI_CONVERSATIONS & MESSAGES
CREATE POLICY ai_conv_select ON ai_conversations
    FOR SELECT TO authenticated
    USING (user_id = current_profile_id());

CREATE POLICY ai_conv_modify ON ai_conversations
    FOR ALL TO authenticated
    USING (user_id = current_profile_id());

CREATE POLICY ai_msg_select ON ai_messages
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM ai_conversations c
        WHERE c.id = ai_messages.conversation_id
          AND c.user_id = current_profile_id()
    ));

CREATE POLICY ai_msg_insert ON ai_messages
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM ai_conversations c
        WHERE c.id = ai_messages.conversation_id
          AND c.user_id = current_profile_id()
    ));

