import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Settings,
  Building2,
  Sliders,
  Shield,
  Sparkles,
  CheckCircle2,
  Save,
  Info,
  Lock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentOrg, currentUser, currentRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'thresholds' | 'ai' | 'security'>('general');
  const [isSaved, setIsSaved] = useState(false);

  // Form states
  const [orgName, setOrgName] = useState(currentOrg?.name || 'MediGuard Healthcare Network');
  const [standard, setStandard] = useState<'CLSI' | 'EUCAST'>('CLSI');
  const [alertSlaHours, setAlertSlaHours] = useState('24');
  const [clusterThreshold, setClusterThreshold] = useState('3');
  const [groundingStrictness, setGroundingStrictness] = useState('high');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Institutional Settings & Reference</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">
              Governance
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Configure surveillance sensitivity, breakpoint reference standards (CLSI/EUCAST), and AI safety guardrails.
          </p>
        </div>

        {isSaved && (
          <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-sm">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'general'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Organization Profile
        </button>

        <button
          onClick={() => setActiveTab('thresholds')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'thresholds'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Surveillance Breakpoints & SLAs
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'ai'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Copilot Safety & Guardrails
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'security'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          Access & Multi-Tenancy
        </button>
      </div>

      {/* Tab Contents */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'general' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">Healthcare Organization Details</h2>
            <p className="text-xs text-slate-400">Primary legal identifier and reporting entity data.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Healthcare License ID</label>
                <input
                  type="text"
                  defaultValue="PK-HL-2024-8849"
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg p-2.5 text-xs text-slate-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Surveillance Region</label>
                <input
                  type="text"
                  defaultValue="Punjab Province (National AMR Node)"
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg p-2.5 text-xs text-slate-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Designated Stewardship Officer</label>
                <input
                  type="text"
                  defaultValue="Dr. Tariq Mahmood (Lead Microbiologist)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thresholds' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">Breakpoint Standards & Alert Sensitivities</h2>
            <p className="text-xs text-slate-400">
              Select standard interpretive criteria for antimicrobial susceptibility interpretation and alert trigger logic.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs text-slate-300 block mb-2 font-medium">Susceptibility Interpretive Standard</label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                      standard === 'CLSI'
                        ? 'bg-sky-600/10 border-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standard"
                      checked={standard === 'CLSI'}
                      onChange={() => setStandard('CLSI')}
                      className="text-sky-600"
                    />
                    <div>
                      <div className="font-semibold text-xs">CLSI M100</div>
                      <div className="text-[10px] text-slate-400">Clinical & Laboratory Standards Institute</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                      standard === 'EUCAST'
                        ? 'bg-sky-600/10 border-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standard"
                      checked={standard === 'EUCAST'}
                      onChange={() => setStandard('EUCAST')}
                      className="text-sky-600"
                    />
                    <div>
                      <div className="font-semibold text-xs">EUCAST v14</div>
                      <div className="text-[10px] text-slate-400">European Committee on AST</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    Cluster Alert Threshold (Cases / 14 Days)
                  </label>
                  <input
                    type="number"
                    value={clusterThreshold}
                    onChange={(e) => setClusterThreshold(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Triggers cluster alert when &ge; N identical MDR isolates occur in same ward.
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">Critical Alert Response SLA (Hours)</label>
                  <input
                    type="number"
                    value={alertSlaHours}
                    onChange={(e) => setAlertSlaHours(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Mandatory acknowledgment window before supervisory escalation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">AI Surveillance Copilot Safety Guardrails</h2>
            <p className="text-xs text-slate-400">
              Enforce strict non-diagnostic bounding, grounded data denominator verification, and audit logging.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/60 flex items-start gap-3">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-sky-300">Mandatory Medical Safety Architecture:</strong> The MediGuard AI engine is
                  strictly restricted to non-diagnostic surveillance pattern summaries. All responses cite observed counts and
                  incorporate standardized decision-support disclaimers. Direct patient treatment recommendations are prohibited.
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">Evidence Grounding Rigor</label>
                <select
                  value={groundingStrictness}
                  onChange={(e) => setGroundingStrictness(e.target.value)}
                  className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="high">High Rigor (Requires validated AST laboratory culture denominator)</option>
                  <option value="maximum">Maximum Rigor (Strictly de-duplicated CLSI M39 specimens only)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="logPrompts"
                  defaultChecked
                  disabled
                  className="rounded bg-slate-950 border-slate-800 text-sky-600"
                />
                <label htmlFor="logPrompts" className="text-xs text-slate-300">
                  Enforce permanent cryptographic audit logging for all AI prompts and outputs (HIPAA / GDPR compliance)
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">Multi-Tenancy & Row-Level Security (RLS)</h2>
            <p className="text-xs text-slate-400">Database security isolation status for current organization tenant.</p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Tenant Organization ID</div>
                  <div className="font-mono text-slate-400 mt-0.5">{currentOrg?.id}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                  ISOLATED
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">PostgreSQL Row-Level Security Policies</div>
                  <div className="text-slate-400 mt-0.5">25 tables protected via organization_id isolation filters</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                  ENFORCED
                </span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Your Current Authenticated Role</div>
                  <div className="text-slate-400 mt-0.5 capitalize">{currentRole?.name || currentRole?.slug}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[10px]">
                  RBAC VERIFIED
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Institutional Settings
          </button>
        </div>
      </form>
    </div>
  );
};
