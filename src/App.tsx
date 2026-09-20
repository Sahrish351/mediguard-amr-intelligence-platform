import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { AppShell } from '@/components/layout/AppShell';
import { PublicLayout } from '@/components/layout/PublicLayout';

// Public Marketing Pages
import { HomePage } from '@/pages/public/HomePage';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';
import { SolutionsPage } from '@/pages/public/SolutionsPage';
import { ResearchInsightsPage } from '@/pages/public/ResearchInsightsPage';
import { SecurityPrivacyPage } from '@/pages/public/SecurityPrivacyPage';
import { ResourcesFaqPage } from '@/pages/public/ResourcesFaqPage';
import { LoginPage, RegisterPage } from '@/pages/public/AuthPages';

// Platform Application Pages
import { OverviewDashboard } from '@/pages/dashboard/OverviewDashboard';
import { GlobalCommandCenter } from '@/pages/dashboard/GlobalCommandCenter';
import { OperationalDashboard } from '@/pages/dashboard/OperationalDashboard';
import { SurveillancePage } from '@/pages/surveillance/SurveillancePage';
import { AMRHeatmapPage } from '@/pages/surveillance/AMRHeatmapPage';
import { CriticalPathogensPage } from '@/pages/surveillance/CriticalPathogensPage';
import { AMRForecastingPage } from '@/pages/surveillance/AMRForecastingPage';
import { MedicationsPage } from '@/pages/medications/MedicationsPage';
import { AWaReIntelligencePage } from '@/pages/medications/AWaReIntelligencePage';
import { BatchRegistryPage } from '@/pages/medications/BatchRegistryPage';
import { PrescriptionsPage } from '@/pages/prescriptions/PrescriptionsPage';
import { PrescriberAnalyticsPage } from '@/pages/prescriptions/PrescriberAnalyticsPage';
import { DispensingPage } from '@/pages/dispensing/DispensingPage';
import { RepeatDispensingPage } from '@/pages/dispensing/RepeatDispensingPage';
import { LaboratoryPage } from '@/pages/laboratory/LaboratoryPage';
import { AntibiogramExplorerPage } from '@/pages/laboratory/AntibiogramExplorerPage';
import { AlertCenterPage } from '@/pages/alerts/AlertCenterPage';
import { InvestigationsPage } from '@/pages/investigations/InvestigationsPage';
import { ReportsPage } from '@/pages/reports/ReportsPage';
import { AIAssistantPage } from '@/pages/ai-assistant/AIAssistantPage';
import { DataQualityPage } from '@/pages/data-quality/DataQualityPage';
import { ConnectorsPage } from '@/pages/platform/ConnectorsPage';
import { BackgroundJobsPage } from '@/pages/platform/BackgroundJobsPage';
import { AuditLogsPage } from '@/pages/audit/AuditLogsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Portal Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<HowItWorksPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/research" element={<ResearchInsightsPage />} />
            <Route path="/security" element={<SecurityPrivacyPage />} />
            <Route path="/resources" element={<ResourcesFaqPage />} />
            <Route path="/faq" element={<ResourcesFaqPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Authenticated Clinical Surveillance Platform Routes */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<OverviewDashboard />} />
            <Route path="command-center" element={<GlobalCommandCenter />} />
            <Route path="operational" element={<OperationalDashboard />} />
            <Route path="surveillance" element={<SurveillancePage />} />
            <Route path="amr-heatmap" element={<AMRHeatmapPage />} />
            <Route path="critical-pathogens" element={<CriticalPathogensPage />} />
            <Route path="amr-forecasting" element={<AMRForecastingPage />} />
            <Route path="medications" element={<MedicationsPage />} />
            <Route path="aware-intelligence" element={<AWaReIntelligencePage />} />
            <Route path="batches" element={<BatchRegistryPage />} />
            <Route path="prescriptions" element={<PrescriptionsPage />} />
            <Route path="prescribers" element={<PrescriberAnalyticsPage />} />
            <Route path="dispensing" element={<DispensingPage />} />
            <Route path="repeat-dispensing" element={<RepeatDispensingPage />} />
            <Route path="laboratory" element={<LaboratoryPage />} />
            <Route path="antibiogram-explorer" element={<AntibiogramExplorerPage />} />
            <Route path="alerts" element={<AlertCenterPage />} />
            <Route path="investigations" element={<InvestigationsPage />} />
            <Route path="ai-assistant" element={<AIAssistantPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="data-quality" element={<DataQualityPage />} />
            <Route path="connectors" element={<ConnectorsPage />} />
            <Route path="jobs" element={<BackgroundJobsPage />} />
            <Route path="audit" element={<AuditLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Legacy Path Compatibility Redirects */}
          <Route path="/surveillance" element={<Navigate to="/app/surveillance" replace />} />
          <Route path="/medications" element={<Navigate to="/app/medications" replace />} />
          <Route path="/prescriptions" element={<Navigate to="/app/prescriptions" replace />} />
          <Route path="/dispensing" element={<Navigate to="/app/dispensing" replace />} />
          <Route path="/laboratory" element={<Navigate to="/app/laboratory" replace />} />
          <Route path="/alerts" element={<Navigate to="/app/alerts" replace />} />
          <Route path="/investigations" element={<Navigate to="/app/investigations" replace />} />
          <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
          <Route path="/ai-assistant" element={<Navigate to="/app/ai-assistant" replace />} />
          <Route path="/data-quality" element={<Navigate to="/app/data-quality" replace />} />
          <Route path="/audit" element={<Navigate to="/app/audit" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
