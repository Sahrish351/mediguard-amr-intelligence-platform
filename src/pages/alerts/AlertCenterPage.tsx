import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Alert, AlertSeverity, AlertStatus } from '@/types';
import { SeverityBadge } from '@/components/common/Badge';
import { formatDate } from '@/lib/formatters';
import { Modal } from '@/components/common/Modal';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  FileSearch,
  ShieldAlert,
} from 'lucide-react';

export const AlertCenterPage: React.FC = () => {
  const { currentOrg, currentUser, users } = useAuth();
  const navigate = useNavigate();

  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAlertForDismiss, setSelectedAlertForDismiss] = useState<Alert | null>(null);
  const [dismissalReason, setDismissalReason] = useState('');
  const [assignAlertTarget, setAssignAlertTarget] = useState<Alert | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState('');

  const alerts = api.getAlerts(currentOrg.id);

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  const handleAcknowledge = (alertId: string) => {
    api.updateAlertStatus(alertId, 'Acknowledged', currentUser.id);
  };

  const handleInvestigate = (alertId: string) => {
    api.updateAlertStatus(alertId, 'Investigating', currentUser.id);
    navigate('/investigations');
  };

  const handleDismissSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlertForDismiss || !dismissalReason.trim()) return;

    api.updateAlertStatus(
      selectedAlertForDismiss.id,
      'Dismissed',
      currentUser.id,
      dismissalReason
    );

    setSelectedAlertForDismiss(null);
    setDismissalReason('');
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignAlertTarget || !selectedAssignee) return;

    api.assignAlert(assignAlertTarget.id, selectedAssignee, currentUser.id);
    setAssignAlertTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Deterministic Surveillance Alert Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Rule-based detection triage: usage anomalies, repeat fills, resistance surges, and batch defects
          </p>
        </div>

        {/* Severity Metrics Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-red-950/40 text-red-400 border border-red-800/40 font-bold">
            {alerts.filter((a) => a.severity === 'Critical').length} Critical
          </span>
          <span className="px-2.5 py-1 rounded bg-orange-950/40 text-orange-400 border border-orange-800/40 font-bold">
            {alerts.filter((a) => a.severity === 'High').length} High
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-950/40 text-amber-400 border border-amber-800/40">
            {alerts.filter((a) => a.severity === 'Medium').length} Medium
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#0F172A] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-[11px] text-slate-400">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none"
          >
            <option value="all" className="bg-slate-900">All Severities</option>
            <option value="Critical" className="bg-slate-900">Critical</option>
            <option value="High" className="bg-slate-900">High</option>
            <option value="Medium" className="bg-slate-900">Medium</option>
            <option value="Low" className="bg-slate-900">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#0F172A] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
          <span className="font-mono text-[11px] text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none"
          >
            <option value="all" className="bg-slate-900">All Statuses</option>
            <option value="New" className="bg-slate-900">New</option>
            <option value="Acknowledged" className="bg-slate-900">Acknowledged</option>
            <option value="Investigating" className="bg-slate-900">Investigating</option>
            <option value="Resolved" className="bg-slate-900">Resolved</option>
            <option value="Dismissed" className="bg-slate-900">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Alerts Triage List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border bg-[#0F172A] transition-all ${
              alert.severity === 'Critical'
                ? 'border-red-500/40 bg-red-950/10'
                : alert.severity === 'High'
                ? 'border-orange-500/40 bg-orange-950/10'
                : 'border-slate-800'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Column: Severity & Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <SeverityBadge severity={alert.severity} />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {alert.detection_rule_id} v{alert.detection_rule_version}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Detected: {formatDate(alert.detected_at)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                {/* Evidence & Metrics Strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Observed:</span>
                    <span className="font-bold text-white">{alert.observed_value}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Baseline:</span>
                    <span>{alert.baseline_value}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Deviation:</span>
                    <span className="font-bold text-red-400">+{alert.change_percent}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Facility:</span>
                    <span className="font-sans text-slate-300">{alert.facility?.name || 'Network'}</span>
                  </div>
                </div>

                {alert.dismissal_reason && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                    <strong>Dismissal Audit Justification:</strong> {alert.dismissal_reason}
                  </div>
                )}
              </div>

              {/* Right Column: Status & Triage Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">Status:</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-slate-800 text-sky-400 border border-slate-700">
                    {alert.status}
                  </span>
                  {alert.assignee && (
                    <span className="text-[11px] text-slate-400 font-sans">
                      ({alert.assignee.full_name})
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {alert.status === 'New' && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setAssignAlertTarget(alert);
                      setSelectedAssignee(alert.assigned_to || users[0].id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Assign</span>
                  </button>

                  <button
                    onClick={() => handleInvestigate(alert.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>Investigate</span>
                  </button>

                  {alert.status !== 'Dismissed' && alert.status !== 'Resolved' && (
                    <button
                      onClick={() => setSelectedAlertForDismiss(alert)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-800/30 text-xs transition-colors"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DISMISSAL MODAL (Mandatory Reason Required by PRD) */}
      <Modal
        isOpen={!!selectedAlertForDismiss}
        onClose={() => setSelectedAlertForDismiss(null)}
        title="Dismiss Surveillance Signal"
        subtitle="Medical safety protocol mandates a documented justification for dismissing safety signals"
      >
        <form onSubmit={handleDismissSubmit} className="space-y-4 text-xs">
          <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-lg text-amber-300">
            <strong>Signal to Dismiss:</strong> {selectedAlertForDismiss?.title}
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">
              Justification / False-Positive Rationale *
            </label>
            <textarea
              rows={3}
              value={dismissalReason}
              onChange={(e) => setDismissalReason(e.target.value)}
              placeholder="e.g. Verified culture contamination or routine duplicate sample from same surgical case. Confirmed by lab supervisor."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedAlertForDismiss(null)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold"
            >
              Confirm Dismissal
            </button>
          </div>
        </form>
      </Modal>

      {/* ASSIGN INVESTIGATOR MODAL */}
      <Modal
        isOpen={!!assignAlertTarget}
        onClose={() => setAssignAlertTarget(null)}
        title="Assign Surveillance Alert Investigator"
        subtitle="Designates an authorized clinical officer or analyst to lead the investigation"
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">
              Select Investigator / Clinical Officer *
            </label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              required
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.full_name} ({u.title || 'Staff'})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAssignAlertTarget(null)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

