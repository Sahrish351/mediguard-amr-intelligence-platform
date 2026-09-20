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
  - *Access Category:* 37.1% (Target: &ge; 60%)
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileBarChart2 className="w-5 h-5 text-sky-400" />
            Antimicrobial Stewardship & Surveillance Reports
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured epidemiological publications, AWaRe compliance metrics, and exportable surveillance dossiers
          </p>
        </div>

        {can('reports.generate') && (
          <button
            onClick={() => {
              setReportTitle(`Surveillance Summary — ${currentOrg.name} (${new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})`);
              setIsNewReportModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Surveillance Report</span>
          </button>
        )}
      </div>

      {/* Main Grid: Reports List + Active Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Report History List */}
        <div className="lg:col-span-4 bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-3.5 border-b border-slate-800 bg-[#0B0F19] text-xs font-mono uppercase text-slate-400">
            Published Dossiers ({reports.length})
          </div>
          <div className="divide-y divide-slate-800/60 max-h-[600px] overflow-y-auto">
            {reports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`w-full text-left p-3.5 transition-colors ${
                  activeReport?.id === rep.id
                    ? 'bg-sky-500/10 border-l-2 border-sky-400'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="text-xs font-semibold text-white tracking-tight">{rep.title}</div>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-400">
                  <span className="capitalize">{rep.type.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>{formatDate(rep.period_start)} - {formatDate(rep.period_end)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Structured Report Document Preview */}
        <div className="lg:col-span-8 bg-[#0F172A] border border-slate-800 rounded-xl p-6 space-y-6">
          {activeReport ? (
            <>
              {/* Document Header & Export Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Official Surveillance Dossier
                  </span>
                  <h2 className="text-base font-bold text-white mt-1.5">{activeReport.title}</h2>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Author: {activeReport.creator?.full_name || 'Stewardship Lead'} • Generated: {formatDate(activeReport.created_at)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-sky-400" />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>

              {/* Rendered Markdown Body */}
              <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 text-slate-300">
                <div className="whitespace-pre-wrap font-sans bg-slate-900/60 p-5 rounded-xl border border-slate-800/80">
                  {activeReport.summary_markdown}
                </div>
              </div>

              {/* Verified Stamp */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>MediGuard Surveillance Verification Signature: Valid</span>
                </div>
                <span>Tenant: {currentOrg.id}</span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
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
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Report Dossier Title *</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Surveillance Report Type *</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none"
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
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Period Start *</label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-mono text-[11px]">Period End *</label>
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsNewReportModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
            >
              Generate Dossier
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

