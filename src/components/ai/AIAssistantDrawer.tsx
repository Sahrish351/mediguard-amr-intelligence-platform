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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white border-l border-slate-200 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[#6366F1]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-heading">
                Grounded Clinical AI Copilot
                <span className="text-[10px] font-mono bg-indigo-50 text-[#6366F1] px-1.5 py-0.5 rounded border border-indigo-200 font-bold">
                  Gemini
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Scoped to authorized records for {currentOrg.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clinical Safety Disclaimer Bar */}
        <div className="px-4 py-2.5 bg-indigo-50/70 border-b border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
          <span>
            <strong>Surveillance Decision Support:</strong> AI responses reflect authorized surveillance aggregates only. System does not diagnose, prescribe, or replace licensed clinical committees.
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[#6366F1] shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs ${
                  msg.role === 'user'
                    ? 'bg-[#0284C7] text-white shadow-md shadow-sky-600/15'
                    : 'bg-white border border-slate-200/90 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans leading-relaxed">{msg.content}</div>

                {/* Data Scope & Grounding Footnote */}
                {msg.data_scope && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 font-mono space-y-1">
                    <div className="flex items-center gap-1.5 text-[#6366F1] font-semibold">
                      <Database className="w-3 h-3" />
                      <span>Data Scope: {msg.data_scope.scope_description}</span>
                    </div>
                    <div className="text-slate-400 italic text-[10px]">
                      {msg.data_scope.limitations}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-[#0284C7] shrink-0 mt-0.5 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 text-xs items-center text-[#6366F1] bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 animate-pulse">
              <Bot className="w-4 h-4" />
              <span>Querying authorized surveillance records &amp; grounding with Gemini...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts Pill Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-1.5">
            Suggested Surveillance Inquiries:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sp)}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition-colors text-left font-medium"
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
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
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-[#6366F1] transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-[#6366F1] hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-[#6366F1] text-white transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

