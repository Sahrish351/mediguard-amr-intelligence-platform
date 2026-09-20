# MediGuard — Product Requirements Document (PRD)

## 1. Product Identity

**Product name:** MediGuard  
**Product type:** Global Medication Safety & Antibiotic Resistance Surveillance Platform  
**Primary purpose:** Help healthcare organizations monitor medication usage, dispensing, verification, antimicrobial resistance, and safety signals so professionals can detect unusual patterns early and investigate them.

### Core principle
MediGuard is a **surveillance, monitoring, analytics, and decision-support platform**. It is **not** a diagnostic system, does not prescribe medicines, does not replace clinicians, and must never present AI output as a medical order.

## 2. Problem

Medication and antibiotic-resistance information is often fragmented across hospitals, laboratories, pharmacies, prescriptions, spreadsheets, and disconnected reporting systems. This makes it difficult to:

- monitor antibiotic consumption;
- compare resistance trends;
- identify unusual medicine usage;
- detect repeated dispensing patterns;
- verify medicine/batch information;
- connect prescriptions, dispensing, and laboratory results;
- identify concerning resistance increases early;
- create reliable surveillance reports;
- give authorized decision-makers one understandable view of the situation.

## 3. Vision

Create a modern, secure, scalable platform where authorized healthcare organizations can transform medication and antibiogram data into actionable surveillance intelligence.

MediGuard should feel like a serious global health-tech product: clean, trustworthy, evidence-oriented, accessible, responsive, and professional.

## 4. Goals

1. Centralize medication and antimicrobial-resistance surveillance data.
2. Connect prescription, dispensing, medicine/batch, and laboratory datasets.
3. Provide hospital-wise, laboratory-wise, pharmacy-wise, area-wise, medicine-wise, bacteria-wise, and time-wise analytics.
4. Detect configurable safety and surveillance signals.
5. Provide explainable alerts rather than unexplained AI decisions.
6. Provide an AI assistant grounded in approved guidelines and actual platform data.
7. Generate professional surveillance reports.
8. Maintain strong role-based access and auditability.
9. Support multiple organizations and geographic regions.
10. Build the foundation for future interoperability without making external integrations mandatory for MVP.

## 5. Non-Goals

MediGuard must NOT:

- diagnose a patient;
- prescribe medicine;
- recommend an individual treatment plan;
- automatically change a prescription;
- make autonomous clinical decisions;
- claim that an alert proves an adverse event or outbreak;
- expose patient information to unauthorized users;
- fabricate medical guidelines or surveillance statistics.

## 6. Primary Users

### Global/Platform Administrator
Manages organizations, system configuration, users, reference data, permissions, and platform health.

### Organization Administrator
Manages one hospital, laboratory, pharmacy network, or healthcare organization and its users.

### Hospital/Clinical Surveillance Officer
Reviews medication usage, antibiotic consumption, resistance trends, alerts, and reports.

### Doctor/Prescriber
Views authorized prescription and medicine-use information and relevant surveillance alerts.

### Pharmacist
Records/verifies dispensing, medicine/batch details, expiry, quantity, and suspicious/repeated dispensing signals.

### Laboratory Scientist
Records microbiology results, organism identification, specimen information, antibiotic susceptibility/resistance results, and antibiogram data.

### Infection Prevention / Antimicrobial Stewardship Professional
Investigates antibiotic-use and resistance patterns and prepares stewardship reports.

### Public Health / Epidemiology Analyst
Compares trends across locations and time periods and monitors population-level signals.

### Read-only Executive / Researcher
Views approved dashboards and reports without modifying source data.

## 7. MVP Modules

1. Authentication and organization onboarding
2. Role-based access control
3. Dashboard
4. Organization management
5. Hospital/lab/pharmacy management
6. Medicine catalog
7. Batch and expiry management
8. Prescription records
9. Pharmacy dispensing records
10. Medicine verification
11. Laboratory/antibiogram records
12. Antibiotic resistance analytics
13. Medication consumption analytics
14. Alert engine
15. Alert investigation workflow
16. AI surveillance assistant
17. Reports
18. Notifications
19. Audit logs
20. Settings and reference data

## 8. End-to-End Data Flow

Prescription:
Doctor -> Prescription -> Patient/Encounter reference -> Medicine -> Quantity/Dose metadata -> Pharmacy -> Dispensing

Dispensing:
Pharmacy -> Medicine -> Batch -> Quantity -> Date -> Prescription reference -> Verification -> Surveillance analytics

Medicine verification:
Medicine -> Manufacturer -> Batch -> Expiry -> Status -> Verification event -> Alert if suspicious/invalid

Laboratory:
Patient/Encounter reference -> Specimen -> Organism/Bacteria -> Antibiotic susceptibility -> Resistance result -> Laboratory -> Time/Area -> Analytics

Analytics:
Source records -> validation -> normalization -> aggregation -> metrics -> trends -> signal detection -> alerts -> investigation -> report/AI explanation

## 9. Core Functional Requirements

### FR-01 Authentication
- Email/password authentication.
- Secure session handling.
- Optional Google OAuth can be added.
- Email verification.
- Password reset.
- Account status.
- Organization membership.

### FR-02 RBAC
Permissions must be enforced server-side and in the UI.

Example permission groups:
- platform.manage
- organization.manage
- users.manage
- medicines.manage
- batches.manage
- prescriptions.create/read
- dispensing.create/read
- laboratory.create/read
- analytics.view
- alerts.view
- alerts.investigate
- reports.create/export
- ai.use
- audit.view

### FR-03 Medicine Catalog
Store:
- generic name;
- brand name;
- active ingredients;
- strength;
- dosage form;
- route;
- therapeutic class;
- ATC-like classification field;
- antibiotic/non-antibiotic classification;
- manufacturer;
- country/market;
- status.

### FR-04 Batch
Store:
- medicine;
- batch/lot number;
- manufacturer;
- manufacturing date;
- expiry date;
- verification status;
- source;
- quantity;
- recall status;
- notes.

### FR-05 Prescription
Store minimum required data:
- organization;
- prescriber;
- encounter/reference;
- patient pseudonymous identifier;
- medicine;
- dosage/strength metadata;
- quantity;
- duration;
- route;
- frequency;
- date/time;
- status;
- indication/category where appropriate and permitted.

Do not display unnecessary patient identity in analytics.

### FR-06 Dispensing
Store:
- prescription reference;
- pharmacy;
- pharmacist;
- medicine;
- batch;
- quantity;
- dispensing date/time;
- verification status;
- repeat/refill indicator;
- rejection/cancellation reason where applicable.

### FR-07 Laboratory/Antibiogram
Store:
- laboratory;
- specimen reference;
- collection date;
- patient pseudonymous identifier;
- specimen type;
- organism/bacteria;
- antibiotic;
- susceptibility result;
- MIC if available;
- interpretation;
- resistance category;
- quality-control status.

Support S/I/R-style interpretation without hard-coding one guideline forever.

### FR-08 Analytics
Minimum dashboards:
- total medication records;
- antibiotic consumption;
- top antibiotics;
- top medicines;
- dispensing volume;
- unusual usage;
- resistance percentage;
- organism distribution;
- hospital comparison;
- area comparison;
- time-series trends;
- medicine verification issues;
- expiring/expired batches;
- alert severity distribution.

### FR-09 Alerts
Alert examples:
- unusual increase in medicine usage;
- repeated dispensing pattern;
- high antibiotic utilization;
- sudden resistance increase;
- concerning organism resistance trend;
- invalid/expired/unverified batch;
- recalled batch;
- missing/low-quality laboratory data;
- abnormal data submission pattern.

Every alert must show:
- title;
- severity;
- signal type;
- affected entity;
- detected period;
- observed value;
- baseline/reference value;
- why it triggered;
- data sources;
- recommended investigation action;
- status;
- assigned investigator;
- timestamps;
- audit history.

The system must distinguish **signal** from **confirmed event**.

### FR-10 Investigation
Workflow:
New -> Acknowledged -> Investigating -> Resolved / Dismissed

Investigator can:
- assign;
- add notes;
- attach evidence;
- link related records;
- record finding;
- resolve/dismiss;
- specify reason.

### FR-11 AI Assistant
AI can:
- summarize dashboard trends;
- explain why an alert fired;
- compare selected periods;
- summarize resistance patterns;
- draft surveillance reports;
- answer questions about authorized platform data;
- explain approved guideline content;
- suggest investigation questions.

AI cannot:
- diagnose;
- prescribe;
- invent evidence;
- fabricate citations;
- reveal unauthorized records;
- override deterministic rules;
- make final clinical decisions.

Every AI answer should expose:
- data period;
- data scope;
- source references where applicable;
- confidence/limitations;
- "decision-support only" disclaimer.

### FR-12 Reports
Reports:
- medication utilization;
- antibiotic utilization;
- resistance/antibiogram;
- alert summary;
- batch verification;
- organization comparison;
- monthly/quarterly surveillance;
- investigation summary.

Export:
- PDF;
- CSV;
- XLSX where practical.

### FR-13 Notifications
In-app notifications for:
- critical alerts;
- assigned investigations;
- report completion;
- data-quality issues;
- expiring batches;
- system/admin events.

Email can be an optional later channel.

### FR-14 Audit Log
Record:
- actor;
- action;
- entity;
- old/new values where appropriate;
- timestamp;
- organization;
- IP/device metadata only where legally appropriate.

Audit records should be append-only from normal user interfaces.

## 10. Dashboard Requirements

Dashboard hierarchy:

Top:
- global filters;
- date range;
- organization;
- area;
- facility;
- medicine;
- antibiotic;
- organism.

KPI cards:
- antibiotic utilization;
- dispensing volume;
- resistance rate;
- active alerts;
- critical alerts;
- unverified batches.

Main visualizations:
- resistance trend line;
- antibiotic usage trend;
- top resistant organisms;
- antibiotic vs resistance comparison;
- geographic/area comparison;
- facility comparison;
- recent critical alerts.

Bottom:
- alert queue;
- data quality;
- expiring batches;
- recent activity.

## 11. Search and Filtering

Global search should support:
- medicine;
- batch;
- antibiotic;
- organism;
- facility;
- alert;
- report.

Filters should be combinable and reflected in the URL where useful.

## 12. Non-Functional Requirements

### Security
- Supabase Row Level Security.
- Least privilege.
- Secure secrets.
- No API keys in client code except intended public Supabase client configuration.
- Server-side validation for sensitive operations.
- Audit trail.
- Rate limiting for AI endpoints.
- Input validation and output sanitization.

### Privacy
Use minimum necessary data.
Prefer pseudonymous patient references in surveillance views.
Never show patient-identifying data in global dashboards by default.
Organization-level isolation is mandatory.

### Performance
- Dashboard initial load target under 3 seconds on normal broadband for typical datasets.
- Paginate large tables.
- Server-side filtering.
- Aggregate large datasets.
- Avoid loading full raw tables into the browser.

### Accessibility
Target WCAG 2.2 AA principles:
- keyboard navigation;
- visible focus;
- semantic labels;
- contrast;
- readable typography;
- non-color-only status indicators;
- responsive layout.

### Reliability
- graceful API errors;
- retry only safe operations;
- clear loading states;
- empty states;
- offline-friendly draft handling only if explicitly implemented.

## 13. Success Metrics

Product metrics:
- percentage of records passing validation;
- alert acknowledgement time;
- investigation completion time;
- percentage of organizations actively using analytics;
- report generation time;
- data completeness;
- false-positive feedback rate for alerts;
- AI answer grounding rate;
- system uptime.

## 14. MVP Acceptance Criteria

MVP is complete when:
- users can securely log in;
- organizations and roles work;
- authorized users can enter prescription, dispensing, batch, and lab data;
- data is stored in Supabase;
- analytics calculate from real stored data;
- alert rules run against real data;
- investigators can manage alerts;
- AI can explain selected real dashboard/alert data without inventing facts;
- reports can be generated;
- audit logs exist;
- unauthorized users cannot access another organization;
- mobile/tablet/desktop layouts are polished;
- seed/demo data makes the platform immediately impressive for demonstrations.

## 15. Product Tone

MediGuard must communicate:
**Trustworthy + Scientific + Modern + Calm + Data-driven + Human-centered**

Avoid:
- gimmicky medical graphics;
- excessive gradients;
- childish icons;
- fake hospital statistics presented as real;
- overuse of AI buzzwords;
- cluttered dashboards.
