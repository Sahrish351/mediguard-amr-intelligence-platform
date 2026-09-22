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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Surveillance Data Quality & Hygiene Console
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              Hygiene Score: {qualityScore}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated detection of incomplete antibiogram records, unverified batches, and clinical transcription anomalies.
          </p>
        </div>

        {/* Quality Score Badge */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400">Registry Integrity</span>
            <span className="text-sm font-bold font-mono text-teal-700">{qualityScore}% Compliant</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
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
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search exception description or entity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:border-teal-500 w-64 shadow-xs"
              />
            </div>

            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs shadow-xs">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'all' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Exceptions
              </button>
              <button
                onClick={() => setCategoryFilter('expiry')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'expiry' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Batch Integrity
              </button>
              <button
                onClick={() => setCategoryFilter('missing')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  categoryFilter === 'missing' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AST Discordance
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            Queue: <strong className="text-[#0B1F3A] font-semibold">{filteredIssues.length}</strong> surveillance exceptions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] uppercase border-b border-slate-200">
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
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        issue.severity === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700 font-medium">
                    {issue.issue_type.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-md leading-relaxed">
                    {issue.description}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                    {issue.entity_type}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                    {formatDate(issue.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        issue.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {issue.status === 'Open' ? (
                      <button
                        onClick={() => setSelectedIssueForAction(issue)}
                        className="px-2.5 py-1 rounded-md bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        Reconcile
                      </button>
                    ) : (
                      <span className="text-[11px] text-teal-700 font-mono inline-flex items-center gap-1 font-medium">
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                <FileCheck className="w-4 h-4" />
                <span>Reconcile Data Exception</span>
              </div>
              <button
                onClick={() => setSelectedIssueForAction(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {selectedIssueForAction.description}
            </p>

            <div>
              <label className="text-xs text-slate-700 block mb-1 font-semibold">Reconciliation Action / Notes:</label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="e.g. Batch verified against physical inventory log; quarantined lot removed from dispensing line."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:border-teal-500 h-20 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setSelectedIssueForAction(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolve(selectedIssueForAction.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors cursor-pointer shadow-xs"
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
