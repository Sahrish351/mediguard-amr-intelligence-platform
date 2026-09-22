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
    navigate('/app/investigations');
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
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Deterministic Surveillance Alert Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Rule-based detection triage: usage anomalies, repeat fills, resistance surges, and batch defects
          </p>
        </div>

        {/* Severity Metrics Bar */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold shadow-2xs">
            {alerts.filter((a) => a.severity === 'Critical').length} Critical
          </span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold shadow-2xs">
            {alerts.filter((a) => a.severity === 'High').length} High
          </span>
          <span className="px-2.5 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 font-bold shadow-2xs">
            {alerts.filter((a) => a.severity === 'Medium').length} Medium
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 shadow-2xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-[11px] text-slate-500">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 shadow-2xs">
          <span className="font-mono text-[11px] text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Alerts Triage List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition-all shadow-2xs ${
              alert.severity === 'Critical'
                ? 'border-rose-200 bg-rose-50/20'
                : alert.severity === 'High'
                ? 'border-amber-200 bg-amber-50/20'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Column: Severity & Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <SeverityBadge severity={alert.severity} />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                    {alert.detection_rule_id} v{alert.detection_rule_version}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Detected: {formatDate(alert.detected_at)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] tracking-tight font-heading">
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                {/* Evidence & Metrics Strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Observed:</span>
                    <span className="font-bold text-slate-900">{alert.observed_value}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Baseline:</span>
                    <span className="text-slate-700">{alert.baseline_value}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Deviation:</span>
                    <span className="font-bold text-rose-600">+{alert.change_percent}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Facility:</span>
                    <span className="font-sans font-medium text-slate-800">{alert.facility?.name || 'Network'}</span>
                  </div>
                </div>

                {alert.dismissal_reason && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <strong className="text-slate-800">Dismissal Audit Justification:</strong> {alert.dismissal_reason}
                  </div>
                )}
              </div>

              {/* Right Column: Status & Triage Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    {alert.status}
                  </span>
                  {alert.assignee && (
                    <span className="text-[11px] text-slate-500 font-sans">
                      ({alert.assignee.full_name})
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {alert.status === 'New' && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setAssignAlertTarget(alert);
                      setSelectedAssignee(alert.assigned_to || users[0].id);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assign</span>
                  </button>

                  <button
                    onClick={() => handleInvestigate(alert.id)}
                    className="px-4 py-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>Investigate</span>
                  </button>

                  {alert.status !== 'Dismissed' && alert.status !== 'Resolved' && (
                    <button
                      onClick={() => setSelectedAlertForDismiss(alert)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium transition-colors cursor-pointer"
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
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
            <strong>Signal to Dismiss:</strong> {selectedAlertForDismiss?.title}
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-mono text-[11px] font-bold">
              Justification / False-Positive Rationale *
            </label>
            <textarea
              rows={3}
              value={dismissalReason}
              onChange={(e) => setDismissalReason(e.target.value)}
              placeholder="e.g. Verified culture contamination or routine duplicate sample from same surgical case. Confirmed by lab supervisor."
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#0284C7]"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedAlertForDismiss(null)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
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
            <label className="block text-slate-700 mb-1 font-mono text-[11px] font-bold">
              Select Investigator / Clinical Officer *
            </label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#0284C7] cursor-pointer"
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
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold cursor-pointer"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
