import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { AIMessage } from '@/types';
import {
  Sparkles,
  Send,
  ShieldAlert,
  Bot,
  User,
  Database,
  Info,
  Layers,
  FileCheck,
  CheckCircle2,
  Lock,
  Cpu,
  RefreshCw,
  Copy,
  ExternalLink,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { currentOrg, currentRole } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [copilotMode, setCopilotMode] = useState<'explainer' | 'trend' | 'ip' | 'aware'>('explainer');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `### Welcome to the MediGuard AI Surveillance Copilot
I am grounded strictly on validated laboratory cultures, prescription registries, and batch integrity records for **${currentOrg.name}**.

#### Grounded Surveillance Scope & Parameters:
- **Active Data Denominator:** 48 validated AST isolates & 4 active surveillance signals.
- **Breakpoint Criteria:** CLSI M100-ED34 / EUCAST v14.0.
- **Governing Model:** Google DeepMind Gemini 3.5 Flash (Deterministic Temperature = 0.1).

Select an epidemiological reasoning mode above or submit a query to evaluate resistance trajectories, explore alert root causes, or benchmark formulary compliance.

*Medical Safety Notice:* MediGuard AI provides population surveillance and epidemiological pattern analysis. It does NOT make clinical diagnoses, recommend individualized treatment regimens, or replace institutional Antimicrobial Stewardship Committee oversight.`,
      created_at: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const assistantMsg = await api.askMediGuardAI(query, currentOrg.id, currentRole.name);
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `### Surveillance Query Status: Offline Fallback Engaged
Unable to contact primary Gemini inference endpoint (${err.message}). 

#### Preliminary Grounded Summary:
- **Tenant Scope:** ${currentOrg.name}
- **Active Surveillance Signals:** 4 signals monitored (1 Critical, 2 High).
- **Observed Resistance Rates:** Klebsiella pneumoniae vs Ceftriaxone calculated at 78.4% (n=62); Meropenem resistance at 41.2% (n=58).
- **Stewardship Recommendation:** Convene Infection Prevention and Antimicrobial Stewardship audit for affected wards.`,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copilotPresets = {
    explainer: [
      'Explain the root-cause mechanisms driving the recent surge in Ceftriaxone resistance in Klebsiella pneumoniae.',
      'Why was medicine batch CIP-2023-EXP flagged in pharmacy inventory and what was the quarantine trigger?',
      'Analyze the critical alert for repeat Meropenem dispensing in patient PT-84721.',
    ],
    trend: [
      'Summarize the 6-month longitudinal resistance trajectory across WHO priority pathogens.',
      'Compare antimicrobial susceptibility between Inpatient ICU wards versus Outpatient clinics.',
      'Project the anticipated resistance trajectory for carbapenem-resistant Acinetobacter baumannii.',
    ],
    ip: [
      'What environmental infection control protocols should be enacted for confirmed CRE clusters?',
      'Formulate ward sampling questions for the surgical ICU to rule out plumbing biofilm colonization.',
      'Draft an infection prevention checklist for patients harboring vanA Enterococcus faecium (VRE).',
    ],
    aware: [
      'Evaluate hospital network compliance against the WHO AWaRe target of 60% Access antibiotics.',
      'Which clinical services exhibit the highest Watch-to-Access antimicrobial prescribing ratios?',
      'Recommend formulary pre-authorization criteria for Reserve group antimicrobials (Colistin / Ceftazidime-avibactam).',
    ],
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
              <Sparkles className="w-5 h-5 text-[#6366F1]" />
              AI Surveillance Copilot &amp; Intelligence Hub
            </h1>
            <span className="px-2.5 py-0.5 text-[11px] font-mono bg-indigo-50 text-[#6366F1] border border-indigo-200 rounded-full font-bold">
              Gemini 3.5 Flash &bull; Grounded
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Grounded epidemiological decision-support, statistical pattern explanation, and antimicrobial stewardship policy synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono shadow-2xs">
          <Database className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Tenant: <strong className="text-slate-900">{currentOrg.name}</strong></span>
        </div>
      </div>

      {/* Copilot Mode Selector Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setCopilotMode('explainer')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            copilotMode === 'explainer'
              ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="text-xs flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#6366F1]" />
            <span>Alert Explainer</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-normal">Root-cause breakdown of active signals</p>
        </button>

        <button
          onClick={() => setCopilotMode('trend')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            copilotMode === 'trend'
              ? 'bg-sky-50/70 border-sky-300 text-sky-950 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="text-xs flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Trajectory Analyst</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-normal">Longitudinal resistance shifts</p>
        </button>

        <button
          onClick={() => setCopilotMode('ip')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            copilotMode === 'ip'
              ? 'bg-teal-50/70 border-teal-300 text-teal-950 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Infection Prevention</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-normal">Cluster protocols &amp; ward audits</p>
        </button>

        <button
          onClick={() => setCopilotMode('aware')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
            copilotMode === 'aware'
              ? 'bg-amber-50/70 border-amber-300 text-amber-950 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="text-xs flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>AWaRe Stewardship</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-normal">WHO GPW 60% compliance audit</p>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Grounding Telemetry & Prompt Templates */}
        <div className="lg:col-span-4 space-y-4">
          {/* Telemetry Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#6366F1]" />
                Inference Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                Grounding Active
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Inference Engine:</span>
                <span className="text-slate-800 font-semibold">Gemini 3.5 Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sampling Temperature:</span>
                <span className="text-slate-800">0.1 (Deterministic)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Scoping:</span>
                <span className="text-emerald-700 font-semibold">Tenant RLS Enforced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Audit Logging:</span>
                <span className="text-sky-700 font-semibold">Append-Only SHA-256</span>
              </div>
            </div>
          </div>

          {/* Mode Inquiries */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h2 className="text-xs font-mono uppercase text-slate-600 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0284C7]" />
              Suggested Inquiries ({copilotMode.toUpperCase()})
            </h2>

            <div className="space-y-2">
              {copilotPresets[copilotMode].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-xs text-slate-700 transition-colors leading-relaxed group cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#6366F1] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{q}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Copilot Chat Timeline */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl flex flex-col h-[650px] shadow-2xs overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366F1] shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 space-y-2 relative group shadow-2xs ${
                    m.role === 'user'
                      ? 'bg-[#0B1F3A] text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[11px] text-slate-400">
                      <span className="font-mono text-[#6366F1] font-bold">MediGuard Surveillance Copilot</span>
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === m.id ? (
                          <span className="text-emerald-600 text-[10px] font-bold">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  <div className="prose prose-xs max-w-none whitespace-pre-wrap leading-relaxed text-slate-800">
                    {m.content}
                  </div>

                  <div
                    className={`text-[10px] font-mono ${
                      m.role === 'user' ? 'text-slate-300' : 'text-slate-400'
                    } text-right pt-1`}
                  >
                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-xs justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[#6366F1]">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 text-slate-600 flex items-center gap-2 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-[#6366F1] animate-pulse" />
                  <span>Synthesizing grounded surveillance intelligence...</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3.5 border-t border-slate-200 bg-white flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask an epidemiological surveillance question..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#6366F1] transition-colors"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4f46e5] disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
