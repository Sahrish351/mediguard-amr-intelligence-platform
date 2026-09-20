import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface RouteMeta {
  group: string;
  label: string;
}

const ROUTE_MAP: Record<string, RouteMeta> = {
  '/app': { group: 'Command Center', label: 'Executive Overview' },
  '/app/command-center': { group: 'Command Center', label: 'Global Command Center' },
  '/app/operational': { group: 'Command Center', label: 'Operational Dashboard' },
  '/app/surveillance': { group: 'Surveillance & AMR', label: 'Surveillance Matrix' },
  '/app/amr-heatmap': { group: 'Surveillance & AMR', label: 'Resistance Heatmap (CLSI M39)' },
  '/app/critical-pathogens': { group: 'Surveillance & AMR', label: 'WHO Priority Pathogens' },
  '/app/amr-forecasting': { group: 'Surveillance & AMR', label: 'Surveillance Trajectory Forecasting' },
  '/app/medications': { group: 'Medication & Batches', label: 'Formulary & Batches' },
  '/app/aware-intelligence': { group: 'Medication & Batches', label: 'WHO AWaRe Intelligence' },
  '/app/batches': { group: 'Medication & Batches', label: 'Batch Integrity & Cold Chain' },
  '/app/prescriptions': { group: 'Prescriptions & Dispensing', label: 'Prescription Registry' },
  '/app/prescribers': { group: 'Prescriptions & Dispensing', label: 'Prescriber Analytics & Scorecards' },
  '/app/dispensing': { group: 'Prescriptions & Dispensing', label: 'Pharmacy Dispensing' },
  '/app/repeat-dispensing': { group: 'Prescriptions & Dispensing', label: 'Repeat Dispensing Surveillance' },
  '/app/laboratory': { group: 'Laboratory / AST', label: 'Culture & AST Entry' },
  '/app/antibiogram-explorer': { group: 'Laboratory / AST', label: 'Cumulative Antibiogram Explorer' },
  '/app/alerts': { group: 'Alerts & Triage', label: 'Alert Center' },
  '/app/investigations': { group: 'Alerts & Triage', label: 'Investigation Workspace' },
  '/app/ai-assistant': { group: 'AI Intelligence', label: 'AI Surveillance Copilot' },
  '/app/reports': { group: 'Reports & Research', label: 'Surveillance Reports & Dossiers' },
  '/app/data-quality': { group: 'Data & Platform', label: 'Data Quality & Hygiene' },
  '/app/connectors': { group: 'Data & Platform', label: 'Healthcare Connectors (HL7 / ASTM / GS1)' },
  '/app/jobs': { group: 'Data & Platform', label: 'Background Surveillance Automation' },
  '/app/audit': { group: 'Data & Platform', label: 'Immutable Audit Trail' },
  '/app/settings': { group: 'Data & Platform', label: 'Institutional Settings & Governance' },
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = ROUTE_MAP[currentPath];

  if (!meta) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium">
      <Link
        to="/app"
        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-slate-500" />
        <span>Platform</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
      <span className="text-slate-400">{meta.group}</span>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
      <span className="text-sky-400 font-semibold">{meta.label}</span>
    </nav>
  );
};

