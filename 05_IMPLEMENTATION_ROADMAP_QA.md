# MediGuard — Implementation Roadmap, QA, Demo & Antigravity Build Instructions

## 1. Build Objective

Build a complete, polished, real-world-ready MediGuard web application using:
- React + TypeScript + Vite;
- Tailwind CSS;
- accessible component system;
- Supabase;
- Gemini API through secure server-side functions;
- modern charts;
- responsive UX.

The final product must look like a premium healthcare SaaS platform and must use real database functionality, not a collection of static mock screens.

## 2. Antigravity Execution Rules

### Rule 1 — Inspect Before Changing
Understand the existing repository before creating duplicate architecture.

### Rule 2 — Keep Architecture Clean
Do not put database queries, authorization, calculations, and UI rendering in one component.

### Rule 3 — Reusable Components
Build reusable cards, tables, forms, filters, modals, charts, badges, drawers, and layouts.

### Rule 4 — Real Data
All important dashboard numbers must be generated from Supabase data.

### Rule 5 — No Fake Functionality
A button must either work or clearly indicate unavailable functionality.

### Rule 6 — Security First
Never place Gemini private keys in frontend code.
Never rely on frontend role checks alone.

### Rule 7 — Demo Quality
Seed realistic synthetic data so every major dashboard looks meaningful immediately.

### Rule 8 — Responsive
Test desktop, tablet, and mobile.

### Rule 9 — Accessibility
Use semantic HTML, keyboard support, focus states, labels, and non-color-only status.

### Rule 10 — Medical Safety
Never turn surveillance signals into diagnoses or prescriptions.

## 3. Phase 1 — Foundation

Implement:
- project structure;
- design tokens;
- routing;
- AppShell;
- authentication;
- Supabase connection;
- database migrations;
- RLS foundation;
- role/permission system;
- error/loading/empty states.

Acceptance:
- user can log in;
- organization membership loads;
- unauthorized route is blocked;
- layout is polished.

## 4. Phase 2 — Master Data

Implement:
- organizations;
- facilities;
- users;
- roles;
- medicines;
- batches;
- organisms;
- antibiotics/reference data.

Seed synthetic demo data.

Acceptance:
- CRUD operations work;
- permissions are enforced;
- validation works.

## 5. Phase 3 — Clinical/Operational Data

Implement:
- prescriptions;
- prescription items;
- dispensing;
- batch verification;
- specimens;
- susceptibility results.

Create realistic workflows:
Doctor enters prescription -> pharmacist dispenses -> batch is verified -> record appears in analytics.

Lab:
Lab scientist enters specimen -> organism -> antibiotic result -> resistance analytics updates.

## 6. Phase 4 — Analytics

Implement SQL/views/functions for:
- medication usage;
- antibiotic utilization;
- resistance percentage;
- organism trends;
- facility comparison;
- area comparison;
- time-series data;
- data-quality metrics.

Add:
- date filtering;
- organization filtering;
- facility filtering;
- medicine filtering;
- antibiotic filtering;
- organism filtering.

All charts must have:
- title;
- legend;
- units;
- period;
- sample/denominator where relevant.

## 7. Phase 5 — Alert Engine

Implement deterministic rules.

Initial rules:

### Rule A — Unusual Medicine Usage
Compare current usage against historical baseline.
Minimum sample/configurable threshold.
Create alert only when configured criteria are met.

### Rule B — Repeated Dispensing
Identify unusual repeat/refill patterns according to configurable organization rules.

### Rule C — Resistance Increase
Compare resistance percentage against a previous period and minimum sample size.

### Rule D — Concerning Organism Trend
Detect significant changes in selected organism-antibiotic combinations.

### Rule E — Batch Issue
Trigger for expired, recalled, suspicious, or unverified batches.

### Rule F — Data Quality
Detect missing/invalid/inconsistent surveillance data.

Every rule must be configurable and versioned.

## 8. Phase 6 — Alert Investigation

Implement:
- alert list;
- severity;
- filters;
- detail page;
- evidence;
- assignee;
- status;
- notes;
- resolution;
- audit trail.

Statuses:
New
Acknowledged
Investigating
Resolved
Dismissed

Dismiss requires reason.

## 9. Phase 7 — Gemini AI

Implement a secure Edge Function.

AI use cases:
1. Explain alert
2. Summarize dashboard
3. Compare periods
4. Explain resistance trend
5. Summarize medicine usage
6. Draft report
7. Answer data questions

AI UI must show:
- data scope;
- timestamp;
- source/metric references;
- limitations;
- disclaimer.

Example prompt:
"Explain why this alert was generated using only the provided MediGuard evidence. State the baseline, observed value, period, sample size where available, and limitations. Do not diagnose, prescribe, or claim confirmation of an outbreak."

## 10. Phase 8 — Reports

Implement:
- report builder;
- preview;
- generation;
- report history;
- PDF/CSV export where practical.

Report sections:
1. Executive summary
2. Scope and period
3. Key indicators
4. Medication usage
5. Antibiotic usage
6. Resistance trends
7. Alerts
8. Investigations
9. Data quality
10. Limitations
11. Appendix

## 11. Phase 9 — Notifications

Implement realtime in-app notifications for:
- critical alerts;
- assignment;
- investigation changes;
- data-quality issues;
- report completion.

## 12. Phase 10 — Audit

Create an audit timeline for:
- record changes;
- verification;
- alerts;
- investigations;
- report generation;
- sensitive access.

## 13. Seed Data Strategy

Create a believable synthetic global demo environment.

Example organizations:
- MediGuard Demo Hospital Network
- CityCare Medical Center
- North Valley General Hospital
- Central Diagnostic Laboratory
- Community Pharmacy Network

Example areas:
- Lahore
- Islamabad
- Karachi
- Rawalpindi
- Multan
- Peshawar

Example synthetic medicines/antibiotics:
- amoxicillin;
- azithromycin;
- ceftriaxone;
- ciprofloxacin;
- meropenem;
- doxycycline;
- linezolid.

Example organisms:
- E. coli;
- Klebsiella pneumoniae;
- Staphylococcus aureus;
- Pseudomonas aeruginosa;
- Acinetobacter baumannii.

All records must be synthetic and visibly marked as demo data.

## 14. Demo Scenarios

### Scenario 1 — Resistance Signal
Synthetic data creates a resistance increase.
Dashboard shows trend.
Alert engine generates signal.
User opens alert.
AI explains the observed pattern.
User creates investigation.
Report includes the event.

### Scenario 2 — Batch Verification
An expired/unverified batch exists.
System flags it.
Pharmacist reviews it.
Verification status is updated.
Audit log records action.

### Scenario 3 — Unusual Usage
Antibiotic dispensing rises above baseline.
Alert appears.
Analyst filters by facility and period.
AI summarizes the trend.
Analyst exports report.

### Scenario 4 — Data Quality
Laboratory records contain missing fields.
Data Quality page shows issue.
Authorized user resolves it.
Quality score/issue state updates.

## 15. QA Test Matrix

### Authentication
- valid login;
- invalid login;
- logout;
- password reset;
- session expiration.

### Authorization
- cross-organization access blocked;
- role restrictions;
- direct API request blocked;
- unauthorized export blocked.

### Medicine
- create;
- edit;
- search;
- duplicate handling.

### Batch
- expiry;
- verification;
- recall;
- audit.

### Prescription
- validation;
- create;
- view;
- permission.

### Dispensing
- correct batch;
- quantity validation;
- repeat flag;
- audit.

### Laboratory
- specimen;
- organism;
- antibiotic;
- result;
- missing data.

### Analytics
- filters;
- date ranges;
- correct aggregation;
- denominator;
- empty data.

### Alerts
- trigger;
- deduplicate;
- assign;
- acknowledge;
- investigate;
- resolve;
- dismiss.

### AI
- authorized access only;
- grounded response;
- no unsupported diagnosis;
- no prescription;
- prompt injection defense;
- rate limiting;
- error fallback.

### Reports
- correct filters;
- correct period;
- generated file;
- access control.

### Responsive
- 1440px desktop;
- 1024px tablet;
- 768px tablet;
- 390px mobile.

## 16. UX Polish Checklist

Before final delivery:
- no console errors;
- no broken links;
- no placeholder lorem ipsum;
- no accidental "TODO";
- consistent spacing;
- consistent typography;
- consistent icon style;
- polished skeletons;
- polished empty states;
- polished errors;
- clear confirmation dialogs;
- no horizontal overflow;
- charts readable;
- tables responsive;
- keyboard navigation works.

## 17. Performance Checklist

- lazy-load heavy pages;
- paginate large tables;
- cache safe queries;
- debounce search;
- avoid duplicate API requests;
- aggregate large datasets server-side;
- optimize chart data;
- compress uploaded assets;
- use proper database indexes.

## 18. Production Readiness

Before claiming production-ready:
- configure environment variables;
- verify Supabase RLS;
- test backup/recovery;
- configure error monitoring;
- test rate limits;
- verify storage policies;
- verify Gemini key is server-only;
- remove development secrets;
- label synthetic demo data;
- run full QA.

## 19. Final Demo Journey

The strongest demo should be:

Login
-> Overview
-> show live KPIs
-> open Resistance Surveillance
-> filter a facility/area
-> show trend
-> open generated alert
-> inspect evidence
-> ask AI to explain it
-> start investigation
-> review related medication/dispensing data
-> generate surveillance report
-> open audit trail.

The experience should demonstrate that MediGuard connects fragmented healthcare data into one coherent surveillance workflow.

## 20. Definition of Done

A feature is done only when:
- UI exists;
- database model exists;
- authorization exists;
- validation exists;
- loading/error/empty states exist;
- mobile behavior exists;
- audit behavior is considered;
- tests exist for important logic;
- the feature uses real data;
- the feature does not violate MediGuard's medical-safety boundaries.

## 21. Final Product Standard

MediGuard should feel like a product that a hospital/public-health organization could evaluate seriously.

Prioritize:
**Trust > flashy visuals**
**Evidence > AI hype**
**Security > convenience**
**Clarity > information overload**
**Real workflows > static mockups**
**Explainability > black-box decisions**
