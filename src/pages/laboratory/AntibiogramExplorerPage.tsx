import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  FileText,
  Filter,
  Download,
  Printer,
  Info,
  Microscope,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AntibiogramRow {
  organism: string;
  type: 'Gram-Negative' | 'Gram-Positive';
  isolateCount: number;
  susceptibilities: Record<string, number | null>; // % Susceptible
}

export const AntibiogramExplorerPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [reportingYear, setReportingYear] = useState<string>('2026');
  const [specimenGroup, setSpecimenGroup] = useState<string>('all');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');

  const facilities = api.getFacilities(currentOrg.id);

  const antimicrobials = [
    'Ampicillin',
    'Amox/Clav',
    'Pip/Tazo',
    'Ceftriaxone',
    'Cefepime',
    'Meropenem',
    'Amikacin',
    'Gentamicin',
    'Ciprofloxacin',
    'TMP-SMX',
    'Vancomycin',
    'Colistin',
  ];

  const antibiogramData: AntibiogramRow[] = [
    // Gram-Negative
    {
      organism: 'Escherichia coli',
      type: 'Gram-Negative',
      isolateCount: 142,
      susceptibilities: {
        Ampicillin: 28,
        'Amox/Clav': 62,
        'Pip/Tazo': 72,
        Ceftriaxone: 33,
        Cefepime: 38,
        Meropenem: 86,
        Amikacin: 93,
        Gentamicin: 78,
        Ciprofloxacin: 41,
        'TMP-SMX': 44,
        Vancomycin: null, // Intrinsic
        Colistin: 98,
      },
    },
    {
      organism: 'Klebsiella pneumoniae',
      type: 'Gram-Negative',
      isolateCount: 98,
      susceptibilities: {
        Ampicillin: null, // Intrinsic
        'Amox/Clav': 48,
        'Pip/Tazo': 42,
        Ceftriaxone: 22,
        Cefepime: 29,
        Meropenem: 59,
        Amikacin: 82,
        Gentamicin: 64,
        Ciprofloxacin: 38,
        'TMP-SMX': 35,
        Vancomycin: null,
        Colistin: 94,
      },
    },
    {
      organism: 'Pseudomonas aeruginosa',
      type: 'Gram-Negative',
      isolateCount: 64,
      susceptibilities: {
        Ampicillin: null,
        'Amox/Clav': null,
        'Pip/Tazo': 66,
        Ceftriaxone: null,
        Cefepime: 68,
        Meropenem: 63,
        Amikacin: 79,
        Gentamicin: 71,
        Ciprofloxacin: 55,
        'TMP-SMX': null,
        Vancomycin: null,
        Colistin: 96,
      },
    },
    {
      organism: 'Acinetobacter baumannii',
      type: 'Gram-Negative',
      isolateCount: 46,
      susceptibilities: {
        Ampicillin: null,
        'Amox/Clav': 12,
        'Pip/Tazo': 14,
        Ceftriaxone: 6,
        Cefepime: 11,
        Meropenem: 18,
        Amikacin: 26,
        Gentamicin: 21,
        Ciprofloxacin: 11,
        'TMP-SMX': 22,
        Vancomycin: null,
        Colistin: 86,
      },
    },
    {
      organism: 'Proteus mirabilis',
      type: 'Gram-Negative',
      isolateCount: 32,
      susceptibilities: {
        Ampicillin: 56,
        'Amox/Clav': 84,
        'Pip/Tazo': 94,
        Ceftriaxone: 78,
        Cefepime: 84,
        Meropenem: 97,
        Amikacin: 94,
        Gentamicin: 88,
        Ciprofloxacin: 68,
        'TMP-SMX': 62,
        Vancomycin: null,
        Colistin: null, // Intrinsic
      },
    },
    // Gram-Positive
    {
      organism: 'Staphylococcus aureus (MSSA)',
      type: 'Gram-Positive',
      isolateCount: 78,
      susceptibilities: {
        Ampicillin: 12,
        'Amox/Clav': 96,
        'Pip/Tazo': null,
        Ceftriaxone: null,
        Cefepime: null,
        Meropenem: null,
        Amikacin: null,
        Gentamicin: 92,
        Ciprofloxacin: 84,
        'TMP-SMX': 95,
        Vancomycin: 100,
        Colistin: null,
      },
    },
    {
      organism: 'Staphylococcus aureus (MRSA)',
      type: 'Gram-Positive',
      isolateCount: 52,
      susceptibilities: {
        Ampicillin: null,
        'Amox/Clav': null,
        'Pip/Tazo': null,
        Ceftriaxone: null,
        Cefepime: null,
        Meropenem: null,
        Amikacin: null,
        Gentamicin: 68,
        Ciprofloxacin: 47,
        'TMP-SMX': 82,
        Vancomycin: 100,
        Colistin: null,
      },
    },
    {
      organism: 'Enterococcus faecalis',
      type: 'Gram-Positive',
      isolateCount: 45,
      susceptibilities: {
        Ampicillin: 94,
        'Amox/Clav': 94,
        'Pip/Tazo': null,
        Ceftriaxone: null,
        Cefepime: null,
        Meropenem: null,
        Amikacin: null,
        Gentamicin: null,
        Ciprofloxacin: 62,
        'TMP-SMX': null,
        Vancomycin: 96,
        Colistin: null,
      },
    },
  ];

  const getSusceptibilityClass = (val: number | null) => {
    if (val === null) return 'text-slate-400 bg-slate-100';
    if (val >= 80) return 'text-emerald-800 bg-emerald-50 font-bold border border-emerald-200';
    if (val >= 60) return 'text-amber-800 bg-amber-50 font-semibold border border-amber-200';
    return 'text-rose-800 bg-rose-50 font-semibold border border-rose-200';
  };

  const handleExportCSV = () => {
    let csv = `Organism,Type,Isolate_Count,${antimicrobials.join(',')}\n`;
    antibiogramData.forEach((row) => {
      const values = antimicrobials.map((abx) => (row.susceptibilities[abx] !== null ? row.susceptibilities[abx] : 'N/A'));
      csv += `"${row.organism}","${row.type}",${row.isolateCount},${values.join(',')}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mediguard_cumulative_antibiogram_${reportingYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Microscope className="w-5 h-5 text-teal-600" />
              Cumulative Antibiogram Explorer
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              CLSI M39-A4 Standard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Annual cumulative susceptibility report showing percent susceptible (%S). Used by clinicians for empirical antibiotic selection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={reportingYear}
            onChange={(e) => setReportingYear(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500 font-mono"
          >
            <option value="2026">CY 2026 (YTD)</option>
            <option value="2025">CY 2025 (Validated)</option>
            <option value="2024">CY 2024 (Historical)</option>
          </select>

          <select
            value={specimenGroup}
            onChange={(e) => setSpecimenGroup(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Clinical Specimens</option>
            <option value="inpatient">Inpatient Wards Only</option>
            <option value="icu">ICU High-Acuity Only</option>
            <option value="urine">Urinary Isolates Only</option>
            <option value="blood">Bloodstream Isolates Only</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Pocket Card
          </button>
        </div>
      </div>

      {/* CLSI M39 Guidelines Banner */}
      <div className="bg-teal-50/60 border border-teal-200/80 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <span className="font-semibold text-teal-950">CLSI M39 De-Duplication Protocol Applied:</span> Values represent the
          percentage of isolates susceptible (%S). Only the first diagnostic isolate per patient encounter is included to eliminate bias from repeat culturing.
          Cells with <span className="text-emerald-800 font-bold">&ge;80% S</span> indicate suitable empirical therapy candidates.
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <span className="font-semibold text-slate-700">Susceptibility Guide (%S):</span>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-300" />
          <span className="text-emerald-800 font-medium">&ge;80% Susceptible (Recommended Empirical)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-amber-50 border border-amber-300" />
          <span className="text-amber-800 font-medium">60% - 79% (Moderate Susceptibility)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-rose-50 border border-rose-300" />
          <span className="text-rose-800 font-medium">&lt;60% (Empirical Failure Likely)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
          <span className="text-slate-500">N/A (Intrinsic Resistance or Not Tested)</span>
        </div>
      </div>

      {/* Main Antibiogram Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase">
              <th className="py-3 px-4 text-[#0B1F3A] min-w-[200px] sticky left-0 bg-slate-50 z-10">
                Organism / Pathogen
              </th>
              <th className="py-3 px-2 text-center text-slate-600 min-w-[60px]">
                Isolates (N)
              </th>
              {antimicrobials.map((abx) => (
                <th key={abx} className="py-3 px-2 text-center min-w-[70px]">
                  {abx}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {antibiogramData.map((row) => (
              <tr key={row.organism} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-medium text-[#0B1F3A] italic sticky left-0 bg-white z-10 border-r border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5 text-teal-600 not-italic shrink-0" />
                    <span>{row.organism}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center font-mono text-slate-600 font-medium">
                  {row.isolateCount}
                </td>
                {antimicrobials.map((abx) => {
                  const val = row.susceptibilities[abx];
                  return (
                    <td key={abx} className="py-2.5 px-1.5 text-center">
                      <div
                        className={`py-1 px-1 rounded font-mono text-[11px] ${getSusceptibilityClass(val)}`}
                      >
                        {val !== null ? `${val}%` : '—'}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

