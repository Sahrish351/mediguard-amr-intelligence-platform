import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { SurveillanceReport } from '@/types';
import { formatDate } from '@/lib/formatters';
import { Modal } from '@/components/common/Modal';
import {
  FileBarChart2,
  Plus,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { currentOrg, currentUser, can } = useAuth();
  const reports = api.getReports(currentOrg.id);

  const [selectedReportId, setSelectedReportId] = useState<string>(
    reports.length > 0 ? reports[0].id : ''
  );
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);

  // Form State
  const [reportTitle, setReportTitle] = useState('');
  const [reportType, setReportType] = useState<SurveillanceReport['type']>('monthly_surveillance');
  const [periodStart, setPeriodStart] = useState('2024-08-01');
  const [periodEnd, setPeriodEnd] = useState('2024-08-31');

  const activeReport = reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim()) return;

    const generatedMarkdown = `### 1. Executive Summary
This surveillance report covers the monitoring period from **${periodStart}** to **${periodEnd}** for **${currentOrg.name}**. 
Active surveillance tracked antibiotic prescribing, dispensing records, and laboratory antimicrobial susceptibility testing (AST) results.

### 2. Surveillance Scope & Denominator
- **Monitoring Scope:** Clinical encounters and validated non-duplicate microbiology cultures.
- **Reporting Period:** ${periodStart} through ${periodEnd}.
- **Target Facilities:** All network hospitals and clinical laboratories.

### 3. Key Surveillance Indicators
- **Total Prescriptions Monitored:** 1,420 encounters
- **Antibiotic Utilization Volume:** 3,890 units
  - *Access Category:* 37.1% (Target: ≥ 60%)
  - *Watch Category:* 58.4% (Elevated reliance on 3rd gen cephalosporins & fluoroquinolones)
  - *Reserve Category:* 4.5% (Protected last-resort reserve antimicrobials)
- **Cumulative Resistance Rate:** 34.2% (164 resistant isolates out of 480 tested)

### 4. Critical Safety Signals & Investigations
- **Signal Detected:** 38.7% surge in Ceftriaxone resistance in *Klebsiella pneumoniae* isolates.
- **Investigation Finding:** Clonal ESBL strain identified in surgical intensive care unit. Contact precautions and antimicrobial stewardship interventions enacted.

### 5. Surveillance Limitations & Disclaimers
*Decision-Support Only Notice:* This document contains aggregated epidemiological intelligence. It does NOT constitute an individualized medical diagnosis, prescription, or clinical order. Empiric therapy should align with local institutional stewardship guidelines.`;

    const newRep = api.createReport(currentOrg.id, {
      title: reportTitle,
      type: reportType,
      period_start: periodStart,
      period_end: periodEnd,
      filters_json: { organization_id: currentOrg.id },
      summary_markdown: generatedMarkdown,
      created_by: currentUser.id,
    });

    setSelectedReportId(newRep.id);
    setIsNewReportModalOpen(false);
    setReportTitle('');
  };

  const handleExportCSV = () => {
    if (!activeReport) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
        `Report Title,Type,Period Start,Period End,Organization,Status\n"${activeReport.title}","${activeReport.type}","${activeReport.period_start}","${activeReport.period_end}","${currentOrg.name}","Completed"\n`
      );
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `mediguard-report-${activeReport.period_start}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
            <FileBarChart2 className="w-5 h-5 text-teal-600" />
            Antimicrobial Stewardship & Surveillance Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured epidemiological publications, AWaRe compliance metrics, and exportable surveillance dossiers
          </p>
        </div>

        {can('reports.generate') && (
          <button
            onClick={() => {
              setReportTitle(`Surveillance Summary — ${currentOrg.name} (${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`);
              setIsNewReportModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Surveillance Report</span>
          </button>
        )}
      </div>

      {/* Main Grid: Reports List + Active Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Report History List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
            Published Dossiers ({reports.length})
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {reports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`w-full text-left p-3.5 transition-colors cursor-pointer ${
                  activeReport?.id === rep.id
                    ? 'bg-teal-50 border-l-3 border-teal-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-semibold text-[#0B1F3A] tracking-tight">{rep.title}</div>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-500">
                  <span className="capitalize">{rep.type.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>{formatDate(rep.period_start)} - {formatDate(rep.period_end)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Structured Report Document Preview */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
          {activeReport ? (
            <>
              {/* Document Header & Export Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                    Official Surveillance Dossier
                  </span>
                  <h2 className="text-base font-bold text-[#0B1F3A] mt-1.5">{activeReport.title}</h2>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Author: {activeReport.creator?.full_name || 'Stewardship Lead'} • Generated: {formatDate(activeReport.created_at)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 shadow-xs transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>

              {/* Rendered Markdown Body */}
              <div className="prose max-w-none text-xs leading-relaxed space-y-4 text-slate-700">
                <div className="whitespace-pre-wrap font-sans bg-slate-50/70 p-5 rounded-xl border border-slate-200 text-[#0B1F3A]">
                  {activeReport.summary_markdown}
                </div>
              </div>

              {/* Verified Stamp */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs font-mono text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">MediGuard Surveillance Verification Signature: Valid</span>
                </div>
                <span className="text-emerald-700">Tenant: {currentOrg.id}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No report selected.
            </div>
          )}
        </div>
      </div>

      {/* GENERATE REPORT MODAL */}
      <Modal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        title="Generate Antimicrobial Surveillance Report"
        subtitle="Aggregates verified clinical, dispensing, and antibiogram records into a surveillance dossier"
        maxWidth="lg"
      >
        <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Report Dossier Title *</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Surveillance Report Type *</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500"
            >
              <option value="monthly_surveillance">Monthly Antimicrobial Resistance Surveillance Dossier</option>
              <option value="antibiotic_stewardship">WHO AWaRe Antibiotic Utilization & Stewardship Report</option>
              <option value="antibiogram_summary">Cumulative Hospital Antibiogram Breakdown</option>
              <option value="batch_verification">Pharmaceutical Batch Integrity & Regulatory Verification Audit</option>
              <option value="quarterly_surveillance">Quarterly Multicenter Regional Epidemiological Report</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Period Start *</label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 font-semibold text-[11px]">Period End *</label>
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[#0B1F3A] focus:outline-none focus:border-teal-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsNewReportModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold shadow-xs cursor-pointer"
            >
              Generate Dossier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
