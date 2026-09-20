# MediGuard — Technical Architecture & Engineering Specification

## 1. Recommended Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui or an equivalent accessible component system
- React Router
- TanStack Query
- React Hook Form
- Zod
- Recharts or Apache ECharts
- Lucide icons

### Backend / Platform
Use Supabase as the primary backend:
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Supabase Storage
- Supabase Realtime
- Supabase Edge Functions where server-side logic is required

### AI
- Gemini API through a secure server-side/Edge Function layer.
- Never expose the Gemini secret API key in frontend source code.

### Deployment
- Vercel for frontend if appropriate.
- Supabase for backend/database/auth/storage.
- Environment variables for all secrets.

## 2. Architecture

Browser
  -> React application
  -> Supabase Auth
  -> Supabase Database
  -> Supabase Storage
  -> Supabase Realtime
  -> Edge Functions
       -> Gemini API
       -> alert/analytics jobs
       -> report generation
       -> controlled server-side operations

Do not allow the browser to directly call Gemini with a private API key.

## 3. Project Structure

Suggested:

src/
  app/
  components/
    ui/
    charts/
    tables/
    forms/
    alerts/
    ai/
  layouts/
  pages/
    auth/
    dashboard/
    surveillance/
    medications/
    prescriptions/
    dispensing/
    laboratory/
    alerts/
    investigations/
    reports/
    data-quality/
    audit/
    settings/
  hooks/
  lib/
    supabase.ts
    permissions.ts
    validation.ts
    formatters.ts
  services/
  types/
  constants/
  routes/
  styles/

supabase/
  migrations/
  functions/
    ai-assistant/
    generate-report/
    run-alert-detection/
    validate-batch/
    data-quality/

## 4. Database Principles

Use UUID primary keys.
Use created_at and updated_at.
Use foreign keys.
Use indexes for common filters.
Use organization_id on tenant-owned tables.
Use soft deletion only where appropriate and legally acceptable.
Never use frontend-only authorization.

## 5. Core Database Tables

### organizations
- id
- name
- type
- country
- region
- timezone
- status
- created_at

### facilities
- id
- organization_id
- name
- type: hospital/laboratory/pharmacy/other
- address/area metadata
- status

### profiles
- id
- auth user id
- full name
- email
- phone optional
- status
- created_at

### organization_members
- id
- organization_id
- user_id
- role_id
- status

### roles
- id
- name
- description

### permissions
- id
- key
- description

### role_permissions
- role_id
- permission_id

### medicines
- id
- generic_name
- brand_name
- active_ingredients
- strength
- dosage_form
- route
- therapeutic_class
- antibiotic boolean
- manufacturer
- status

### medicine_batches
- id
- medicine_id
- facility_id
- batch_number
- manufacture_date
- expiry_date
- quantity
- verification_status
- recall_status
- verification_source
- verified_at
- verified_by

### prescriptions
- id
- organization_id
- facility_id
- prescriber_id
- patient_reference
- encounter_reference
- prescription_date
- status

### prescription_items
- id
- prescription_id
- medicine_id
- dose
- frequency
- route
- duration
- quantity
- indication_category

### dispensing_records
- id
- organization_id
- facility_id
- prescription_id
- medicine_id
- batch_id
- pharmacist_id
- quantity
- dispensed_at
- repeat_flag
- verification_status

### laboratories
Can use facilities with type=laboratory, but create a dedicated table only if needed.

### specimens
- id
- organization_id
- laboratory_id
- patient_reference
- specimen_type
- collected_at
- received_at
- quality_status

### organisms
- id
- name
- scientific_name
- category
- status

### antibiotics
Can reference medicines where possible, with a separate classification table for surveillance grouping.

### susceptibility_results
- id
- specimen_id
- organism_id
- antibiotic_id
- result
- mic_value
- interpretation
- tested_at
- guideline_version
- quality_status

### alerts
- id
- organization_id
- facility_id nullable
- type
- severity
- title
- description
- detected_at
- period_start
- period_end
- observed_value
- baseline_value
- change_percent
- status
- assigned_to
- detection_rule_version
- created_at

### alert_evidence
- id
- alert_id
- source_type
- source_id
- metadata

### investigations
- id
- alert_id
- investigator_id
- status
- finding
- resolution_reason
- started_at
- resolved_at

### investigation_notes
- id
- investigation_id
- author_id
- note
- created_at

### reports
- id
- organization_id
- created_by
- type
- period_start
- period_end
- filters_json
- status
- file_path
- created_at

### notifications
- id
- user_id
- type
- title
- body
- entity_type
- entity_id
- read_at
- created_at

### audit_logs
- id
- organization_id
- actor_id
- action
- entity_type
- entity_id
- old_values
- new_values
- created_at

### data_quality_issues
- id
- organization_id
- entity_type
- entity_id
- issue_type
- severity
- description
- status
- resolved_by
- resolved_at

### ai_conversations
- id
- user_id
- organization_id
- title
- created_at

### ai_messages
- id
- conversation_id
- role
- content
- data_scope
- model
- created_at

## 6. Multi-Tenancy

Every tenant-owned record must be scoped by organization_id either directly or through a secure relation.

RLS rules must ensure:
- users see only organizations they belong to;
- organization admins can manage their organization;
- platform admins have explicit elevated access;
- facility-level users see only authorized facilities;
- read-only roles cannot mutate data.

Never rely on hidden frontend routes for security.

## 7. RLS Strategy

Create policies for:
- SELECT;
- INSERT;
- UPDATE;
- DELETE.

Use helper SQL functions where necessary to determine organization membership and permission.

Test policies with multiple test users:
- platform admin;
- org admin;
- doctor;
- pharmacist;
- lab scientist;
- analyst;
- read-only user;
- user from another organization.

## 8. Data Validation

Validate at three levels:
1. UI schema validation with Zod.
2. Server/Edge Function validation.
3. Database constraints.

Examples:
- expiry date must be valid;
- quantity cannot be negative;
- resistance percentage 0–100;
- required organization relation;
- valid enum/status;
- laboratory result must use supported interpretation;
- batch cannot be silently changed after verification without audit.

## 9. Analytics Strategy

Do not calculate every complex metric repeatedly in the browser.

Use:
- SQL views;
- materialized views where justified;
- database functions;
- scheduled aggregation jobs.

Core metrics:
- total dispensing;
- antibiotic dispensing;
- usage change percentage;
- resistance percentage;
- organism frequency;
- antibiotic-organism resistance matrix;
- facility comparison;
- area comparison;
- time trend.

Definitions must be stored/documented so users understand how a metric is calculated.

## 10. Alert Engine

Use deterministic rules first.

Example:
If current period usage > baseline * threshold:
create unusual_usage signal.

If resistance percentage exceeds configured change threshold:
create resistance_increase signal.

If batch status is expired/recalled/unverified:
create batch_verification signal.

Do not use an LLM as the primary detector of safety alerts.

Each rule needs:
- rule id;
- version;
- description;
- threshold;
- scope;
- minimum sample size;
- cooldown/deduplication behavior.

Avoid duplicate alerts for the same signal repeatedly.

## 11. Statistical Caution

For resistance trends:
- display sample size;
- avoid interpreting tiny samples as strong evidence;
- show confidence/limitations where implemented;
- distinguish percentage change from absolute percentage-point change;
- support minimum sample thresholds;
- label preliminary signals.

For usage anomalies:
- compare against appropriate historical baseline;
- account for seasonality when data supports it;
- show the baseline used.

## 12. Realtime

Use Supabase Realtime for:
- new critical alerts;
- investigation assignment updates;
- notification updates;
- report generation status where appropriate.

Do not stream unnecessary raw patient/clinical data.

## 13. Storage

Supabase Storage buckets:
- report-files
- organization-assets
- approved-guideline-documents

Storage policies must be organization-aware.

## 14. Gemini Integration

Flow:

User question
-> authenticate user
-> determine organization and permissions
-> determine requested scope
-> query approved data
-> build compact structured context
-> call Gemini
-> validate/sanitize response
-> return answer with data scope and limitations
-> log AI interaction metadata

Do not send unrestricted database dumps to the model.

## 15. AI Grounding

The AI assistant should use two context types:

### Platform Data
- approved analytics;
- alert details;
- aggregated usage;
- resistance trends;
- report data.

### Approved Knowledge
- organization-approved guidelines;
- version/date;
- source metadata.

AI should clearly separate:
- observed MediGuard data;
- guideline information;
- interpretation.

## 16. API/Service Patterns

Create service functions such as:
- getDashboardMetrics()
- getMedicationUsage()
- getResistanceTrends()
- getAlerts()
- getAlertDetails()
- createInvestigation()
- recordDispensing()
- recordLabResult()
- verifyBatch()
- generateReport()
- askMediGuardAI()

Never place complex business logic directly inside page components.

## 17. Error Handling

Use consistent errors:
- AUTH_REQUIRED
- FORBIDDEN
- VALIDATION_ERROR
- NOT_FOUND
- CONFLICT
- RATE_LIMITED
- INTERNAL_ERROR

Show user-friendly messages while keeping technical details in logs.

## 18. Environment Variables

Frontend:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Server/Edge:
- SUPABASE_SERVICE_ROLE_KEY where absolutely required
- GEMINI_API_KEY

Never commit secrets.

## 19. Testing

Unit:
- validation;
- calculations;
- alert rules;
- formatters.

Integration:
- authentication;
- RLS;
- data entry;
- alert creation;
- AI endpoint authorization.

E2E:
- login;
- role-based dashboard;
- prescription -> dispensing;
- lab result -> resistance chart;
- alert -> investigation;
- report generation.

## 20. Deployment

Before production:
- run database migrations;
- verify RLS;
- configure production environment variables;
- configure storage policies;
- configure Edge Functions;
- test Gemini rate limits;
- seed only clearly labeled demo data;
- enable monitoring;
- remove development secrets.

## 21. Engineering Rule

Build real functionality first. Do not create fake buttons that look functional.

If a feature is not implemented, show a clear disabled/coming-soon state rather than pretending it works.
