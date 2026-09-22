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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-600" />
              Institutional Settings & Reference
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              Governance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure surveillance sensitivity, breakpoint reference standards (CLSI/EUCAST), and AI safety guardrails.
          </p>
        </div>

        {isSaved && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'general'
              ? 'border-teal-600 text-teal-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Organization Profile
        </button>

        <button
          onClick={() => setActiveTab('thresholds')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'thresholds'
              ? 'border-teal-600 text-teal-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Surveillance Breakpoints & SLAs
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'ai'
              ? 'border-teal-600 text-teal-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Copilot Safety & Guardrails
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'security'
              ? 'border-teal-600 text-teal-700 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          Access & Multi-Tenancy
        </button>
      </div>

      {/* Tab Contents */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'general' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#0B1F3A]">Healthcare Organization Details</h2>
            <p className="text-xs text-slate-500">Primary legal identifier and reporting entity data.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-semibold">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-semibold">Healthcare License ID</label>
                <input
                  type="text"
                  defaultValue="PK-HL-2024-8849"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-semibold">Surveillance Region</label>
                <input
                  type="text"
                  defaultValue="Punjab Province (National AMR Node)"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-semibold">Designated Stewardship Officer</label>
                <input
                  type="text"
                  defaultValue="Dr. Tariq Mahmood (Lead Microbiologist)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thresholds' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#0B1F3A]">Breakpoint Standards & Alert Sensitivities</h2>
            <p className="text-xs text-slate-500">
              Select standard interpretive criteria for antimicrobial susceptibility interpretation and alert trigger logic.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs text-slate-700 block mb-2 font-semibold">Susceptibility Interpretive Standard</label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      standard === 'CLSI'
                        ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standard"
                      checked={standard === 'CLSI'}
                      onChange={() => setStandard('CLSI')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#0B1F3A]">CLSI M100</div>
                      <div className="text-[10px] text-slate-500">Clinical & Laboratory Standards Institute</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      standard === 'EUCAST'
                        ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standard"
                      checked={standard === 'EUCAST'}
                      onChange={() => setStandard('EUCAST')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <div className="font-semibold text-xs text-[#0B1F3A]">EUCAST v14</div>
                      <div className="text-[10px] text-slate-500">European Committee on AST</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 block mb-1 font-semibold">
                    Cluster Alert Threshold (Cases / 14 Days)
                  </label>
                  <input
                    type="number"
                    value={clusterThreshold}
                    onChange={(e) => setClusterThreshold(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Triggers cluster alert when &ge; N identical MDR isolates occur in same ward.
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-700 block mb-1 font-semibold">Critical Alert Response SLA (Hours)</label>
                  <input
                    type="number"
                    value={alertSlaHours}
                    onChange={(e) => setAlertSlaHours(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
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
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#0B1F3A]">AI Surveillance Copilot Safety Guardrails</h2>
            <p className="text-xs text-slate-500">
              Enforce strict non-diagnostic bounding, grounded data denominator verification, and audit logging.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/80 flex items-start gap-3">
                <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="text-xs text-teal-950 leading-relaxed">
                  <strong className="text-teal-900">Mandatory Medical Safety Architecture:</strong> The MediGuard AI engine is
                  strictly restricted to non-diagnostic surveillance pattern summaries. All responses cite observed counts and
                  incorporate standardized decision-support disclaimers. Direct patient treatment recommendations are prohibited.
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-semibold">Evidence Grounding Rigor</label>
                <select
                  value={groundingStrictness}
                  onChange={(e) => setGroundingStrictness(e.target.value)}
                  className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-medium"
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
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="logPrompts" className="text-xs text-slate-600">
                  Enforce permanent cryptographic audit logging for all AI prompts and outputs (HIPAA / GDPR compliance)
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#0B1F3A]">Multi-Tenancy & Row-Level Security (RLS)</h2>
            <p className="text-xs text-slate-500">Database security isolation status for current organization tenant.</p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0B1F3A]">Tenant Organization ID</div>
                  <div className="font-mono text-slate-500 mt-0.5">{currentOrg?.id}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
                  ISOLATED
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0B1F3A]">PostgreSQL Row-Level Security Policies</div>
                  <div className="text-slate-500 mt-0.5">25 tables protected via organization_id isolation filters</div>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
                  ENFORCED
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#0B1F3A]">Your Current Authenticated Role</div>
                  <div className="text-slate-500 mt-0.5 capitalize">{currentRole?.name || currentRole?.slug}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono text-[10px] font-semibold">
                  RBAC VERIFIED
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Institutional Settings
          </button>
        </div>
      </form>
    </div>
  );
};
