# MediGuard — Enterprise Medication Safety & AMR Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ecf8e.svg)](https://supabase.com/)
[![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://deepmind.google/technologies/gemini/)

**MediGuard** is an enterprise-grade healthcare intelligence platform engineered for **Medication Safety**, **Batch Verification**, **Antimicrobial Resistance (AMR) Surveillance**, and **Automated Clinical Investigation**. Built for hospitals, health ministries, regional laboratories, and antimicrobial stewardship committees.

---

## 🌟 Core Capabilities

### 1. Medication Safety & Verification
- **Batch Verification**: Real-time batch number lookup, counterfeit detection, manufacturing recall status, and temperature excursion tracking.
- **Inventory & Stock Floor Protection**: Strict non-negative inventory deductions upon pharmacy dispensing.
- **WHO AWaRe Classification**: Automated categorisation into **Access**, **Watch**, and **Reserve** tiers with stewardship guideline enforcement.

### 2. Antimicrobial Resistance (AMR) Surveillance
- **Interactive Geospatial Heatmap**: Real-time regional resistance tracking with specimen-level denominator integrity.
- **Critical Pathogen Monitoring**: Automated surveillance for WHO Priority Pathogens (*CRE*, *MRSA*, *ESBL-producing Enterobacterales*, *VRE*, *Pseudomonas aeruginosa*).
- **Antibiogram Explorer**: Breakpoint analysis conforming to **CLSI M100** and **EUCAST** standards.
- **Forecasting & Trend Analysis**: Early anomaly detection for emerging bacterial resistance surges.

### 3. Clinical Workflow & Governance
- **Closed-Loop Data Flow**: Doctor Prescribing $\rightarrow$ Pharmacy Dispensing $\rightarrow$ Laboratory AST Specimen Accessioning $\rightarrow$ Automated Alerting.
- **Deterministic Alert Rules**: Automated triggers for repeat antibiotic dispensing within 14 days, unusual dosage surges, and reserve antibiotic prescriptions.
- **Investigation Workspace**: Multi-disciplinary triage, clinical findings documentation, and mandatory justification for signal dismissal.
- **Immutable Audit Trail**: Append-only event logging for forensic regulatory compliance and accountability.

### 4. Grounded AI Surveillance Copilot
- **Secure Serverless Proxy**: Google Gemini integration routed through server-side serverless endpoints (`/api/ai/chat`), keeping API keys strictly isolated from public client bundles.
- **Grounded Clinical Telemetry**: Analyzes authorized facility data scopes with non-diagnostic disclaimers and multi-model fallback resiliency.

---

## 🏗️ Technical Architecture

```
mediguard/
├── api/                       # Vercel Serverless Functions
│   └── ai/chat.ts             # Secure server-side Gemini AI proxy
├── src/
│   ├── components/            # UI components & design system
│   │   ├── ai/                # AI assistant drawer & interface
│   │   ├── common/            # Header, Sidebar, StatCard, Badge, Modal
│   │   └── layout/            # AppShell & PublicLayout
│   ├── context/               # AuthContext & RBAC state
│   ├── lib/                   # Supabase client & permissions matrix
│   ├── pages/                 # Route views
│   │   ├── dashboard/         # Command centers & operational overview
│   │   ├── medications/       # Batches, registry & AWaRe intelligence
│   │   ├── prescriptions/     # Prescriptions & prescriber analytics
│   │   ├── dispensing/        # Dispensing records & repeat monitoring
│   │   ├── laboratory/        # Specimens, AST entry & antibiogram
│   │   ├── surveillance/      # Heatmap, forecasting & critical pathogens
│   │   ├── alerts/            # Alert triage & signal center
│   │   ├── investigations/    # Case investigation workspace
│   │   ├── reports/           # Epidemiological reports generator
│   │   ├── audit/             # Immutable audit trail
│   │   └── public/            # Landing page, How It Works, Solutions
│   └── services/              # API layer, state synchronization & mock data
├── supabase/
│   ├── migrations/            # 25 relational tables, RLS policies, seed data
│   └── functions/             # Supabase Edge Functions
└── tests/                     # Automated QA & E2E verification suites
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Sahrish351/mediguard-amr-intelligence-platform.git
cd mediguard-amr-intelligence-platform
npm install
```

### 2. Environment Setup
Create a `.env` file in the project root (see `.env.example`):
```env
# Client-Safe Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Server-Only Gemini API Key (Never exposed to client bundle)
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Testing & Verification

MediGuard includes a test suite covering security, clinical workflows, and database integrity:

```bash
# Type check without emitting files
npx tsc --noEmit

# Production build
npm run build

# Integration & RBAC test suite (26 assertions)
npx tsx tests/verifyPlatform.ts

# Resilience & failure handling (7 tests)
npx tsx tests/verifyFailureCases.ts

# Clinical end-to-end workflow (8 stages)
npx tsx tests/verifyE2EWorkflow.ts

# Remote Supabase production verification (10 criteria)
npx tsx tests/verifyRemoteSupabaseFinal.ts
```

---

## ☁️ Deployment (Vercel)

This project is configured for Vercel deployment with `vercel.json` providing:
- **Single Page Application (SPA) routing** (direct refreshes on all deep routes)
- **Serverless API proxying** for `/api/ai/chat`
- **Strict security headers** (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`)
- **Immutable static asset caching**

### Environment Variables on Vercel:
1. `VITE_SUPABASE_URL` — Public Supabase project URL.
2. `VITE_SUPABASE_ANON_KEY` — Public client publishable anon key.
3. `GEMINI_API_KEY` — Server-side secret key (do NOT prefix with `VITE_`).

### Supabase Auth URL Configuration:
In **Supabase Dashboard $\rightarrow$ Authentication $\rightarrow$ URL Configuration**:
- **Site URL**: `https://<your-deployment>.vercel.app`
- **Redirect URLs**:
  - `https://<your-deployment>.vercel.app/**`
  - `http://localhost:3000/**`

---

## 🔒 Security & Privacy

- **Row Level Security (RLS)**: Active across all 25 tables to ensure strict multi-tenant isolation.
- **Role-Based Access Control (RBAC)**: Enforced privilege boundaries for Doctors, Pharmacists, Lab Scientists, and Admins.
- **Zero Secret Exposure**: Public bundles are scanned to ensure no API keys or service role tokens are leaked.
- **Audit Logging**: Every sensitive action (prescribing, dispensing, alert dismissal) is immutably recorded.

---

## 📄 License
This project is proprietary healthcare software developed for national and institutional surveillance.
