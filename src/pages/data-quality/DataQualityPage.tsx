import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { formatDate } from '@/lib/formatters';
import { StatCard } from '@/components/common/StatCard';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  FileCheck,
  Building2,
  Layers,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

export const DataQualityPage: React.FC = () => {
  const { currentOrg, currentUser } = useAuth();
  const [dataQualityIssues, setDataQualityIssues] = useState(api.getDataQualityIssues(currentOrg.id));
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssueForAction, setSelectedIssueForAction] = useState<any | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  const openIssues = dataQualityIssues.filter((i) => i.status === 'Open');
  const resolvedIssues = dataQualityIssues.filter((i) => i.status === 'Resolved');
  const qualityScore = Math.max(0, 100 - openIssues.length * 8);

  const handleResolve = (issueId: string) => {
    api.resolveDataQualityIssue(issueId, currentUser.id);
    setDataQualityIssues(api.getDataQualityIssues(currentOrg.id));
    setSelectedIssueForAction(null);
    setActionNotes('');
  };

  const filteredIssues = dataQualityIssues.filter((issue) => {
    const matchesCat = categoryFilter === 'all' || issue.issue_type.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch =
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.issue_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Surveillance Data Quality & Hygiene Console
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              Hygiene Score: {qualityScore}%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated detection of incomplete antibiogram records, unverified batches, and clinical transcription anomalies.
          </p>
        </div>

        {/* Quality Score Badge */}
        <div className="flex items-center gap-3 bg-[#0F172A] border border-slate-800 px-4 py-2 rounded-xl">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase text-slate-500">Registry Integrity</span>
            <span className="text-base font-bold font-mono text-emerald-400">{qualityScore}% Compliant</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Quality Exceptions"
          value={openIssues.length}
          subtitle="Awaiting manual reconciliation"
          icon={AlertTriangle}
          color={openIssues.length > 0 ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Reconciled Items"
          value={resolvedIssues.length}
          subtitle="Audit confirmed & logged"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Rule Validation Rate"
          value="100%"
          subtitle="CLSI M100 & GS1 rules active"
          icon={FileCheck}
          color="sky"
        />
        <StatCard
          title="Transcription Accuracy"
          value="99.2%"
          subtitle="De-duplicated patient identifiers"
          icon={ShieldCheck}
          color="teal"
        />
      </div>

      {/* Filter and Table Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search exception description or entity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0B0F19] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 w-64"
              />
            </div>

            <div className="flex items-center bg-[#0B0F19] border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Exceptions
              </button>
              <button
                onClick={() => setCategoryFilter('expiry')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'expiry' ? 'bg-amber-600/30 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Batch Integrity
              </button>
              <button
                onClick={() => setCategoryFilter('missing')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'missing' ? 'bg-rose-600/30 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                AST Discordance
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            Queue: <strong>{filteredIssues.length}</strong> surveillance exceptions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Exception Category</th>
                <th className="px-4 py-3">Clinical Description</th>
                <th className="px-4 py-3">Entity Type</th>
                <th className="px-4 py-3">Detected Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        issue.severity === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300 font-medium">
                    {issue.issue_type.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-3 text-slate-200 max-w-md leading-relaxed">
                    {issue.description}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                    {issue.entity_type}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">
                    {formatDate(issue.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        issue.status === 'Resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {issue.status === 'Open' ? (
                      <button
                        onClick={() => setSelectedIssueForAction(issue)}
                        className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        Reconcile
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-mono inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reconciliation Modal */}
      {selectedIssueForAction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <FileCheck className="w-4 h-4" />
                <span>Reconcile Data Exception</span>
              </div>
              <button
                onClick={() => setSelectedIssueForAction(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedIssueForAction.description}
            </p>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">Reconciliation Action / Notes:</label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="e.g. Batch verified against physical inventory log; quarantined lot removed from dispensing line."
                className="w-full bg-[#0B0F19] border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 h-20 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedIssueForAction(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolve(selectedIssueForAction.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              >
                Confirm Reconciliation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
