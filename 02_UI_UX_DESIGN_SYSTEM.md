# MediGuard — UI/UX & Design System Specification

## 1. Design Direction

Build MediGuard as a premium global health-tech SaaS product.

Reference feeling:
- enterprise healthcare;
- modern data platform;
- clinical command center;
- calm and trustworthy;
- high information density without visual clutter.

The UI must look production-ready, not like a student dashboard.

## 2. Visual Personality

Keywords:
**Clinical, premium, intelligent, precise, calm, trustworthy, modern, accessible.**

Avoid:
- neon-heavy dashboards;
- excessive glassmorphism;
- giant rounded cards everywhere;
- cartoon medical illustrations;
- overly decorative animations;
- random gradients;
- tiny unreadable charts.

## 3. Theme

Primary dark command-center theme:
- deep navy/ink background;
- white/near-white surfaces;
- blue/teal primary accents;
- restrained green for positive/normal;
- amber for warning;
- red for critical;
- violet only for AI-related secondary identity.

The implementation must define CSS variables/tokens instead of scattering colors throughout components.

Suggested token names:
--bg
--surface
--surface-elevated
--border
--text
--text-muted
--primary
--primary-hover
--success
--warning
--danger
--info
--ai
--focus

Provide light theme support only if it can be implemented without compromising the primary visual system.

## 4. Typography

Use a modern professional sans-serif.

Recommended:
- Inter or Geist for UI;
- IBM Plex Mono for technical identifiers/data values where useful.

Hierarchy:
- Display: 36–48px
- Page title: 28–34px
- Section title: 20–24px
- Card title: 15–18px
- Body: 14–16px
- Caption: 12–13px

Never sacrifice readability to fit more data.

## 5. Layout

Desktop:
- fixed/compact left sidebar;
- top utility/header bar;
- content area;
- optional contextual right drawer for investigations.

Tablet:
- collapsible sidebar.

Mobile:
- bottom navigation or compact drawer;
- charts become horizontally scrollable or stacked;
- tables become responsive cards where appropriate.

Maximum content width should prevent excessive empty space.

## 6. Global Navigation

Primary:
1. Overview
2. Surveillance
3. Medications
4. Prescriptions
5. Dispensing
6. Laboratory
7. Alerts
8. Investigations
9. Reports
10. AI Assistant
11. Data Quality
12. Audit Logs
13. Settings

Show navigation based on role permissions.

## 7. App Shell

Sidebar:
- MediGuard logo;
- organization switcher;
- navigation;
- alert count;
- user profile;
- help.

Header:
- breadcrumb;
- global search;
- date/filter controls where relevant;
- notification bell;
- AI assistant shortcut;
- profile menu.

## 8. Landing Page

If public marketing page exists, it should communicate:
Headline:
**See medication safety signals before they become bigger problems.**

Supporting message:
A secure surveillance platform connecting medication usage, dispensing, medicine verification, and antimicrobial resistance intelligence.

Sections:
1. Hero
2. Product preview
3. Why fragmented data is a problem
4. Connected surveillance workflow
5. Key capabilities
6. Analytics preview
7. Alert intelligence
8. AI assistant
9. Security/privacy principles
10. Role-based experience
11. CTA
12. Footer

Never invent customer logos, statistics, certifications, or clinical claims.

## 9. Login/Register

Login page:
- elegant split layout;
- short value proposition;
- secure form;
- forgot password;
- organization context if needed.

Registration:
- organization-aware onboarding;
- role selection only where allowed;
- email verification.

## 10. Overview Dashboard

Top:
- "Good morning" style greeting only if appropriate;
- organization context;
- time range;
- filter button.

KPI cards:
- Antibiotic Utilization
- Resistance Rate
- Active Alerts
- Critical Alerts
- Unverified Batches
- Data Quality

Each card should include:
- metric;
- comparison;
- period;
- small trend;
- tooltip explaining definition.

Charts:
1. Antibiotic utilization trend
2. Resistance trend
3. Organism distribution
4. Facility comparison
5. Medicine usage anomalies
6. Alert severity timeline

## 11. Surveillance Page

Create a command-center experience.

Tabs:
- Medication Usage
- Antibiotic Usage
- Resistance
- Organisms
- Facilities
- Geography
- Time Trends

Each view has:
- filter bar;
- KPI strip;
- primary chart;
- secondary charts;
- detailed data table;
- export button.

## 12. Medicine Catalog

Table columns:
- medicine;
- category;
- antibiotic;
- formulation;
- manufacturer;
- active batches;
- verification status;
- usage trend.

Actions:
- view;
- edit;
- add batch;
- verify;
- view history.

## 13. Batch Verification

Batch detail should show:
- medicine;
- batch number;
- manufacturer;
- manufacturing date;
- expiry;
- quantity;
- verification status;
- source;
- history.

Status design:
- Verified
- Pending
- Unverified
- Expired
- Recalled
- Suspicious

Never use color alone; always show labels/icons.

## 14. Prescription Page

Use a clean clinical form:
- patient reference;
- encounter;
- prescriber;
- medicine;
- dose metadata;
- route;
- frequency;
- duration;
- quantity;
- notes;
- save.

Include a visible privacy notice explaining that surveillance views minimize patient identity.

## 15. Dispensing Page

Show:
- prescription;
- medicine;
- batch;
- quantity;
- pharmacist;
- timestamp;
- repeat/refill;
- verification.

Add quick verification workflow.

## 16. Laboratory Page

Input:
- laboratory;
- specimen type;
- specimen date;
- organism;
- antibiotic;
- result;
- MIC;
- interpretation;
- quality control.

Results table should make S/I/R interpretation easy to scan.

## 17. Alert Center

Design as a professional triage queue.

Columns:
- severity;
- signal;
- entity;
- observed;
- baseline;
- change;
- detected;
- status;
- assignee.

Filters:
- severity;
- status;
- signal type;
- organization;
- date;
- assigned user.

Critical alerts should be visually prominent but not alarming.

## 18. Alert Detail

Header:
- severity;
- alert title;
- status;
- assignment;
- detected time.

Sections:
1. Why this alert fired
2. Observed data
3. Baseline comparison
4. Trend chart
5. Related records
6. Data quality
7. AI summary
8. Investigation notes
9. Audit history

Use language like:
"Signal detected" rather than "Confirmed outbreak."

## 19. Investigation Workspace

Three-column desktop layout:
- left: alert summary;
- center: evidence/timeline;
- right: notes/actions.

Actions:
- acknowledge;
- assign;
- investigate;
- add note;
- link evidence;
- resolve;
- dismiss.

Require a reason for dismissal.

## 20. AI Assistant UI

Do not make AI the visual center of the entire product.

AI panel:
- clean conversation interface;
- suggested prompts;
- source/data scope;
- date range;
- "Generated from authorized MediGuard data" indicator.

Suggested prompts:
- "Explain the increase in resistance this month."
- "Summarize critical alerts."
- "Compare antibiotic utilization across facilities."
- "Draft a monthly surveillance summary."
- "What data supports this alert?"

Every answer includes:
- sources/data scope;
- limitations;
- generated timestamp;
- decision-support disclaimer.

## 21. Reports

Report builder:
- report type;
- organization;
- date range;
- filters;
- sections;
- preview;
- generate;
- export.

Generated report design:
- cover;
- executive summary;
- methodology;
- key indicators;
- trends;
- alerts;
- data quality;
- limitations;
- appendix.

## 22. Data Quality

Show:
- missing fields;
- duplicate records;
- invalid dates;
- expired batches;
- inconsistent medicine names;
- missing laboratory interpretation;
- suspicious data spikes.

Use a quality score only if its methodology is transparent.

## 23. Empty/Error/Loading States

Every screen must have polished states.

Empty:
- explain why there is no data;
- provide next action.

Loading:
- skeletons, not blank white space.

Error:
- human-readable message;
- retry;
- support/reference ID where appropriate.

## 24. Motion

Use subtle motion:
- 150–250ms transitions;
- drawer animations;
- chart reveal;
- toast transitions.

Never animate medical alerts excessively.

## 25. Components

Create reusable components:
- AppShell
- Sidebar
- Topbar
- Breadcrumbs
- OrganizationSwitcher
- FilterBar
- KPIStatCard
- TrendIndicator
- ChartCard
- DataTable
- StatusBadge
- SeverityBadge
- AlertCard
- AlertTimeline
- Drawer
- Modal
- FormField
- DateRangePicker
- SearchCommand
- NotificationPanel
- AIChatPanel
- ReportBuilder
- EmptyState
- ErrorState
- LoadingSkeleton
- ConfirmDialog
- AuditTimeline

## 26. UX Rules

- Never hide important actions in unclear menus.
- Destructive actions require confirmation.
- Preserve filters during navigation when practical.
- Tables must support sorting/filtering.
- Tooltips explain technical metrics.
- Every chart has a title and understandable units.
- Date/time and timezone must be explicit.
- Do not overwhelm users with all data at once.
- Use progressive disclosure.
