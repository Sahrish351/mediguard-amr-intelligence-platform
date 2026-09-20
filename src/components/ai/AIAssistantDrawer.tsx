import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { AIMessage } from '@/types';
import { Sparkles, Send, X, ShieldAlert, Bot, User, Database, AlertCircle } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const { currentOrg, currentRole } = useAuth();
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello, I am MediGuard's AI Surveillance Assistant. 

I can help explain deterministic safety alerts, calculate resistance rate changes against historical baselines, summarize antibiotic utilization by WHO AWaRe classification, and suggest investigation questions.

**Important Notice:** I am a surveillance decision-support tool. I do NOT diagnose patient infections, prescribe medications, or recommend treatment changes. All analyses are strictly grounded on authorized MediGuard records for **${currentOrg.name}**.`,
      created_at: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

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
          content: `Unable to complete AI query: ${err.message || 'Unknown network error'}. Please verify connection.`,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    'Explain the surge in Ceftriaxone resistance this month.',
    'Summarize all active critical alerts.',
    'Why was batch CIP-2023-EXP flagged?',
    'What data supports the Meropenem usage spike?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#0F172A] border-l border-slate-800 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0B0F19] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                Grounded AI Surveillance Assistant
                <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">
                  Gemini 1.5
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Grounded on authorized data for {currentOrg.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinical Safety Disclaimer Bar */}
        <div className="px-4 py-2 bg-purple-950/20 border-b border-purple-500/20 text-[11px] text-purple-300 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            <strong>Decision-Support Notice:</strong> AI responses reflect authorized surveillance aggregates only. System does not diagnose, prescribe, or verify individual clinical causality.
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 ${
                  msg.role === 'user'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/10'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Data Scope & Grounding Footnote */}
                {msg.data_scope && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-400">
                      <Database className="w-3 h-3" />
                      <span>Data Scope: {msg.data_scope.scope_description}</span>
                    </div>
                    <div className="text-slate-500 italic text-[10px]">
                      {msg.data_scope.limitations}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 text-xs items-center text-purple-400 bg-purple-950/10 border border-purple-500/20 rounded-xl p-3 animate-pulse">
              <Bot className="w-4 h-4" />
              <span>Querying authorized surveillance records & grounding with Gemini...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts Pill Bar */}
        <div className="p-3 border-t border-slate-800 bg-[#0B0F19]/50">
          <div className="text-[10px] uppercase font-mono text-slate-500 mb-1.5">
            Suggested Surveillance Inquiries:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sp)}
                className="text-[11px] px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors text-left"
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-[#0B0F19]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about alerts, resistance patterns, or AWaRe compliance..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

