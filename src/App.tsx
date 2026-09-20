import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AppShell } from '@/components/layout/AppShell';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { getWorkspacePathForRole } from '@/types';

// Public Marketing & Portal Pages
import { HomePage } from '@/pages/public/HomePage';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';
import { SolutionsPage } from '@/pages/public/SolutionsPage';
import { ResearchInsightsPage } from '@/pages/public/ResearchInsightsPage';
import { SecurityPrivacyPage } from '@/pages/public/SecurityPrivacyPage';
import { ResourcesFaqPage } from '@/pages/public/ResourcesFaqPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '@/pages/public/AuthPages';
import { AccessDeniedPage } from '@/pages/public/AccessDeniedPage';

// 9 Dedicated Role Workspaces
import { DoctorWorkspace } from '@/pages/workspaces/DoctorWorkspace';
import { PharmacistWorkspace } from '@/pages/workspaces/PharmacistWorkspace';
import { LaboratoryWorkspace } from '@/pages/workspaces/LaboratoryWorkspace';
import { StewardshipWorkspace } from '@/pages/workspaces/StewardshipWorkspace';
import { EpidemiologyWorkspace } from '@/pages/workspaces/EpidemiologyWorkspace';
import { SurveillanceWorkspace } from '@/pages/workspaces/SurveillanceWorkspace';
import { OrganizationAdminWorkspace } from '@/pages/workspaces/OrganizationAdminWorkspace';
import { PlatformAdminWorkspace } from '@/pages/workspaces/PlatformAdminWorkspace';
import { ResearcherWorkspace } from '@/pages/workspaces/ResearcherWorkspace';

// Platform Application Pages (Shared Clinical Submodules)
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

// Component to dynamically route /app to the authenticated user's assigned role workspace
function WorkspaceRedirect() {
  const { currentRole } = useAuth();
  const target = getWorkspacePathForRole(currentRole?.slug);
  return <Navigate to={target} replace />;
}

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
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Access Denied Privilege Boundary */}
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* ========================================================= */}
          {/* 9 DEDICATED HEALTHCARE ROLE WORKSPACES                   */}
          {/* Each route is RBAC protected and wraps into AppShell      */}
          {/* ========================================================= */}

          {/* 1. Doctor Clinical Prescribing Workspace */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <AppShell>
                  <DoctorWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 2. Pharmacist Safety & Dispensing Workspace */}
          <Route
            path="/pharmacist"
            element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <AppShell>
                  <PharmacistWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 3. Laboratory Microbiology Workspace */}
          <Route
            path="/laboratory"
            element={
              <ProtectedRoute allowedRoles={['lab-scientist']}>
                <AppShell>
                  <LaboratoryWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 4. Antimicrobial Stewardship Workspace */}
          <Route
            path="/stewardship"
            element={
              <ProtectedRoute allowedRoles={['stewardship-lead']}>
                <AppShell>
                  <StewardshipWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 5. Epidemiology Intelligence Workspace */}
          <Route
            path="/epidemiology"
            element={
              <ProtectedRoute allowedRoles={['epidemiologist']}>
                <AppShell>
                  <EpidemiologyWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 6. Clinical Surveillance Officer Workspace */}
          <Route
            path="/surveillance"
            element={
              <ProtectedRoute allowedRoles={['surveillance-officer']}>
                <AppShell>
                  <SurveillanceWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 7. Organization Executive & Governance Workspace */}
          <Route
            path="/organization"
            element={
              <ProtectedRoute allowedRoles={['org-admin']}>
                <AppShell>
                  <OrganizationAdminWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 8. Global Platform Admin Command Center */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['platform-admin']}>
                <AppShell>
                  <PlatformAdminWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* 9. Scientific Research & Surveillance Explorer */}
          <Route
            path="/researcher"
            element={
              <ProtectedRoute allowedRoles={['read-only']}>
                <AppShell>
                  <ResearcherWorkspace />
                </AppShell>
              </ProtectedRoute>
            }
          />

          {/* ========================================================= */}
          {/* SHARED CLINICAL SURVEILLANCE PLATFORM MODULES (/app/*)     */}
          {/* ========================================================= */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* Navigating to /app automatically redirects to user's assigned role workspace */}
            <Route index element={<WorkspaceRedirect />} />
            <Route path="overview" element={<OverviewDashboard />} />
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

          {/* Deep-link and legacy path compatibility redirects */}
          <Route path="/medications" element={<Navigate to="/app/medications" replace />} />
          <Route path="/prescriptions" element={<Navigate to="/app/prescriptions" replace />} />
          <Route path="/dispensing" element={<Navigate to="/app/dispensing" replace />} />
          <Route path="/alerts" element={<Navigate to="/app/alerts" replace />} />
          <Route path="/investigations" element={<Navigate to="/app/investigations" replace />} />
          <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
          <Route path="/ai-assistant" element={<Navigate to="/app/ai-assistant" replace />} />
          <Route path="/data-quality" element={<Navigate to="/app/data-quality" replace />} />
          <Route path="/audit" element={<Navigate to="/app/audit" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
