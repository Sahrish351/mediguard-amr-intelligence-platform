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
      <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-3xl shadow-2xs">
        <FileSearch className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-[#0B1F3A] font-heading">No Active Investigations</h3>
        <p className="text-xs text-slate-500 mt-1">Surveillance alerts moved to investigation will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
            <FileSearch className="w-5 h-5 text-[#0284C7]" />
            Epidemiological Investigation Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Three-column collaborative case triage: evidence verification, microbiology corroboration, and stewardship intervention
          </p>
        </div>

        {/* Investigation Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 shadow-2xs">
          <span className="font-mono text-[11px] text-slate-400 font-bold">Case:</span>
          <select
            value={selectedInvId}
            onChange={(e) => setSelectedInvId(e.target.value)}
            className="bg-transparent text-xs text-slate-900 font-medium focus:outline-none cursor-pointer max-w-xs truncate"
          >
            {investigations.map((inv) => (
              <option key={inv.id} value={inv.id}>
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
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">Signal Assessment</span>
              {activeInv.alert && <SeverityBadge severity={activeInv.alert.severity} />}
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0B1F3A] tracking-tight leading-snug font-heading">
                {activeInv.alert?.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {activeInv.alert?.description}
              </p>
            </div>

            <div className="p-4 bg-[#F7FAFC] border border-slate-200 rounded-xl space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Observed Value:</span>
                <span className="font-bold text-slate-900">{activeInv.alert?.observed_value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Baseline Target:</span>
                <span className="text-slate-700">{activeInv.alert?.baseline_value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Calculated Surge:</span>
                <span className="font-bold text-rose-600">+{activeInv.alert?.change_percent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rule Trigger:</span>
                <span className="text-slate-700">{activeInv.alert?.detection_rule_id}</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-1">
              <div><strong className="text-slate-800">Lead Investigator:</strong> {activeInv.investigator?.full_name}</div>
              <div><strong className="text-slate-800">Initiated:</strong> {formatDateTime(activeInv.started_at)}</div>
              <div><strong className="text-slate-800">Status:</strong> <span className="text-[#0284C7] font-mono font-bold uppercase">{activeInv.status}</span></div>
            </div>

            {/* Resolve Button */}
            {activeInv.status !== 'Resolved' && (
              <button
                onClick={() => setIsResolveModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Formulate Findings &amp; Close Case</span>
              </button>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: Evidence & Surveillance Timeline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-xs font-bold font-mono uppercase text-slate-600 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#0284C7]" />
                Corroborating Clinical Evidence
              </h2>
            </div>

            {/* Statistical payload */}
            <div className="p-4 bg-[#F7FAFC] border border-slate-200 rounded-xl text-xs space-y-1.5">
              <div className="text-[#0284C7] font-bold">Statistical Denominator Breakdown:</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Analysis incorporates 22 non-duplicate clinical specimens cultured over 30 days. P-value calculation indicates departure from binomial baseline (p = 0.038).
              </p>
            </div>

            {/* Findings if resolved */}
            {activeInv.findings && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Final Epidemiological Finding:
                </div>
                <p className="text-slate-800">{activeInv.findings}</p>
                {activeInv.action_taken && (
                  <div className="pt-1 text-[11px] text-emerald-800 font-medium">
                    <strong>Action Taken:</strong> {activeInv.action_taken}
                  </div>
                )}
              </div>
            )}

            {/* Linked Clinical Records Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Surveillance Timeline</span>
              <div className="border-l-2 border-teal-400 pl-4 space-y-3.5 text-xs text-slate-600">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold">Day 0</div>
                  <div className="text-slate-900 font-semibold">Signal detected by rule engine</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold">Day +1</div>
                  <div className="text-slate-900 font-semibold">Investigator assigned &amp; preliminary cultures reviewed</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold">Day +2</div>
                  <div className="text-slate-900 font-semibold">Contact precautions audit initiated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Collaborative Notes & Updates */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col h-[600px] shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <h2 className="text-xs font-bold font-mono uppercase text-slate-600 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#6366F1]" />
                Case Notes &amp; Stewardship Log
              </h2>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {activeInv.notes?.length || 0} Entries
              </span>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {activeInv.notes?.map((n) => (
                <div key={n.id} className="p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-[#0284C7]">{n.author?.full_name || 'Investigator'}</span>
                    <span className="font-mono text-slate-400">{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{n.note}</p>
                </div>
              ))}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-100 flex gap-2 shrink-0">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log observation, lab call, or ward audit..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284C7]"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="p-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-40 text-white transition-colors cursor-pointer shadow-2xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* RESOLUTION MODAL */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A] font-heading">Resolve &amp; Conclude Surveillance Investigation</h3>
              <p className="text-xs text-slate-500 mt-1">
                Document final epidemiological findings and institutional stewardship actions taken to resolve this signal.
              </p>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-mono text-[11px] font-bold">Final Surveillance Findings *</label>
                <textarea
                  rows={3}
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Detail microbiological confirmation, clonal typing, or ward transmission factors..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-mono text-[11px] font-bold">Action Taken / Intervention *</label>
                <textarea
                  rows={2}
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="e.g. Switched empiric regimen guidelines, isolated colonized patients, audited hand hygiene compliance."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-mono text-[11px] font-bold">Resolution Rationale *</label>
                <input
                  type="text"
                  value={resolutionReason}
                  onChange={(e) => setResolutionReason(e.target.value)}
                  placeholder="e.g. Signal stabilized below alert threshold after infection control intervention."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-2xs"
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
