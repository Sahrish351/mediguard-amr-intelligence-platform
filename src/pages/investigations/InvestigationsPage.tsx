import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Investigation, InvestigationNote } from '@/types';
import { SeverityBadge } from '@/components/common/Badge';
import { formatDate, formatDateTime } from '@/lib/formatters';
import {
  FileSearch,
  MessageSquare,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Database,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export const InvestigationsPage: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const investigations = api.getInvestigations(currentOrg.id);

  const [selectedInvId, setSelectedInvId] = useState<string>(
    investigations.length > 0 ? investigations[0].id : ''
  );
  const [newNote, setNewNote] = useState('');
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [findings, setFindings] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [resolutionReason, setResolutionReason] = useState('');

  const activeInv = investigations.find((i) => i.id === selectedInvId) || investigations[0];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInv || !newNote.trim()) return;

    api.addInvestigationNote(activeInv.id, currentUser.id, newNote);
    setNewNote('');
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInv || !findings.trim()) return;

    api.resolveInvestigation(
      activeInv.id,
      findings,
      actionTaken,
      resolutionReason,
      currentUser.id
    );

    setIsResolveModalOpen(false);
  };

  if (!activeInv) {
    return (
      <div className="p-8 text-center text-slate-400 bg-[#0F172A] border border-slate-800 rounded-xl">
        <FileSearch className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <h3 className="text-base font-semibold text-white">No Active Investigations</h3>
        <p className="text-xs text-slate-400 mt-1">Surveillance alerts moved to investigation will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-sky-400" />
            Epidemiological Investigation Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Three-column collaborative case triage: evidence verification, microbiology corroboration, and stewardship intervention
          </p>
        </div>

        {/* Investigation Selector */}
        <div className="flex items-center gap-2 bg-[#0F172A] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
          <span className="font-mono text-[11px] text-slate-400">Case:</span>
          <select
            value={selectedInvId}
            onChange={(e) => setSelectedInvId(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none"
          >
            {investigations.map((inv) => (
              <option key={inv.id} value={inv.id} className="bg-slate-900">
                [{inv.alert?.severity}] {inv.alert?.title.slice(0, 45)}... ({inv.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* THREE-COLUMN DESKTOP LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Alert Summary & Parameters */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-500">Signal Assessment</span>
              {activeInv.alert && <SeverityBadge severity={activeInv.alert.severity} />}
            </div>

            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-snug">
                {activeInv.alert?.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {activeInv.alert?.description}
              </p>
            </div>

            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Observed Value:</span>
                <span className="font-bold text-white">{activeInv.alert?.observed_value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Baseline Target:</span>
                <span>{activeInv.alert?.baseline_value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Calculated Surge:</span>
                <span className="font-bold text-red-400">+{activeInv.alert?.change_percent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rule Trigger:</span>
                <span className="text-slate-300">{activeInv.alert?.detection_rule_id}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div><strong>Lead Investigator:</strong> {activeInv.investigator?.full_name}</div>
              <div><strong>Initiated:</strong> {formatDateTime(activeInv.started_at)}</div>
              <div><strong>Status:</strong> <span className="text-sky-400 font-mono font-semibold">{activeInv.status}</span></div>
            </div>

            {/* Resolve Button */}
            {activeInv.status !== 'Resolved' && (
              <button
                onClick={() => setIsResolveModalOpen(true)}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Formulate Findings & Close Investigation</span>
              </button>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: Evidence & Surveillance Timeline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-xs font-bold font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                Corroborating Clinical Evidence
              </h2>
            </div>

            {/* Statistical payload */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5">
              <div className="text-sky-400 font-medium">Statistical Denominator Breakdown:</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Analysis incorporates 22 non-duplicate clinical specimens cultured over 30 days. P-value calculation indicates departure from binomial baseline (p = 0.038).
              </p>
            </div>

            {/* Findings if resolved */}
            {activeInv.findings && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg text-xs text-emerald-300 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Final Epidemiological Finding:
                </div>
                <p className="text-slate-200">{activeInv.findings}</p>
                {activeInv.action_taken && (
                  <div className="pt-1 text-[11px] text-emerald-400">
                    <strong>Action Taken:</strong> {activeInv.action_taken}
                  </div>
                )}
              </div>
            )}

            {/* Linked Clinical Records Timeline */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Surveillance Timeline</span>
              <div className="border-l-2 border-slate-800 pl-3 space-y-3 text-xs text-slate-400">
                <div>
                  <div className="text-[11px] font-mono text-slate-500">Day 0</div>
                  <div className="text-white font-medium">Signal detected by rule engine</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500">Day +1</div>
                  <div className="text-white font-medium">Investigator assigned & preliminary cultures reviewed</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500">Day +2</div>
                  <div className="text-white font-medium">Contact precautions audit initiated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Collaborative Notes & Updates */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 flex flex-col h-[600px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <h2 className="text-xs font-bold font-mono uppercase text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                Case Notes & Stewardship Log
              </h2>
              <span className="text-[10px] font-mono text-slate-500">
                {activeInv.notes?.length || 0} Entries
              </span>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {activeInv.notes?.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-sky-400">{n.author?.full_name || 'Investigator'}</span>
                    <span className="font-mono text-slate-500">{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">{n.note}</p>
                </div>
              ))}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-800 flex gap-2 shrink-0">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log observation, lab call, or ward audit..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RESOLUTION MODAL */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-semibold text-white">Resolve & Conclude Surveillance Investigation</h3>
            <p className="text-xs text-slate-400">
              Document final epidemiological findings and institutional stewardship actions taken to resolve this signal.
            </p>

            <form onSubmit={handleResolveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Final Surveillance Findings *</label>
                <textarea
                  rows={3}
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Detail microbiological confirmation, clonal typing, or ward transmission factors..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Action Taken / Intervention *</label>
                <textarea
                  rows={2}
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="e.g. Switched empiric regimen guidelines, isolated colonized patients, audited hand hygiene compliance."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Resolution Rationale *</label>
                <input
                  type="text"
                  value={resolutionReason}
                  onChange={(e) => setResolutionReason(e.target.value)}
                  placeholder="e.g. Signal stabilized below alert threshold after infection control intervention."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

