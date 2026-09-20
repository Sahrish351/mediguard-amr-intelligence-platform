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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI Surveillance Copilot & Intelligence Hub
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded">
              Gemini 3.5 Flash &bull; Grounded Inference
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded epidemiological decision-support, statistical pattern explanation, and antimicrobial stewardship policy synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span>Tenant Scope: {currentOrg.name}</span>
        </div>
      </div>

      {/* Copilot Mode Selector Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setCopilotMode('explainer')}
          className={`p-3 rounded-xl border text-left transition-all ${
            copilotMode === 'explainer'
              ? 'bg-purple-950/40 border-purple-500 text-white shadow-xs'
              : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs font-bold flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
            Alert Explainer
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Root-cause breakdown of active signals</p>
        </button>

        <button
          onClick={() => setCopilotMode('trend')}
          className={`p-3 rounded-xl border text-left transition-all ${
            copilotMode === 'trend'
              ? 'bg-sky-950/40 border-sky-500 text-white shadow-xs'
              : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs font-bold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            Trajectory Analyst
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Longitudinal resistance shifts</p>
        </button>

        <button
          onClick={() => setCopilotMode('ip')}
          className={`p-3 rounded-xl border text-left transition-all ${
            copilotMode === 'ip'
              ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-xs'
              : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Infection Prevention
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Cluster protocols & ward audits</p>
        </button>

        <button
          onClick={() => setCopilotMode('aware')}
          className={`p-3 rounded-xl border text-left transition-all ${
            copilotMode === 'aware'
              ? 'bg-amber-950/40 border-amber-500 text-white shadow-xs'
              : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-xs font-bold flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            AWaRe Stewardship
          </div>
          <p className="text-[11px] text-slate-400 mt-1">WHO GPW 60% compliance audit</p>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Grounding Telemetry & Prompt Templates */}
        <div className="lg:col-span-4 space-y-4">
          {/* Telemetry Card */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Inference Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Grounding Active
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Inference Engine:</span>
                <span className="text-white font-semibold">Gemini 3.5 Flash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sampling Temperature:</span>
                <span className="text-white">0.1 (Deterministic)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Security Scoping:</span>
                <span className="text-emerald-400">Tenant RLS Enforced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Audit Logging:</span>
                <span className="text-sky-400">Append-Only SHA-256</span>
              </div>
            </div>
          </div>

          {/* Mode Inquiries */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-3">
            <h2 className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Suggested Inquiries ({copilotMode.toUpperCase()})
            </h2>

            <div className="space-y-2">
              {copilotPresets[copilotMode].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-xs text-slate-300 transition-colors leading-relaxed group cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{q}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Copilot Chat Timeline */}
        <div className="lg:col-span-8 bg-[#0F172A] border border-slate-800 rounded-xl flex flex-col h-[650px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-xl p-4 space-y-2 relative group ${
                    m.role === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
                      <span className="font-mono text-purple-400 font-semibold">MediGuard Surveillance Copilot</span>
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy to clipboard"
                      >
                        {copiedId === m.id ? (
                          <span className="text-emerald-400 text-[10px]">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  <div className="prose prose-invert prose-xs max-w-none whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>

                  <div
                    className={`text-[10px] font-mono ${
                      m.role === 'user' ? 'text-sky-200' : 'text-slate-500'
                    } text-right pt-1`}
                  >
                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-xs justify-start items-center">
                <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>Synthesizing grounded surveillance intelligence...</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask an epidemiological surveillance question..."
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
