import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { SeverityBadge } from '@/components/common/Badge';
import { formatDate } from '@/lib/formatters';
import {
  AlertTriangle,
  Repeat,
  ShieldAlert,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  FileDown,
  Building2,
  HelpCircle,
} from 'lucide-react';

interface RepeatDispensingAnomaly {
  id: string;
  patientRef: string;
  medicationName: string;
  intervalDays: number;
  totalCoursesCount: number;
  cumulativeDaysOfTherapy: number;
  facilityName: string;
  prescriberName: string;
  flagType: 'Premature Refill (<10d)' | 'Excessive Duration (>21d)' | 'Therapeutic Duplication';
  severity: 'Critical' | 'High' | 'Moderate';
  status: 'Open Review' | 'Cleared' | 'Refill Blocked';
}

export const RepeatDispensingPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [anomalies, setAnomalies] = useState<RepeatDispensingAnomaly[]>([
    {
      id: 'rep-1',
      patientRef: 'PT-98014',
      medicationName: 'Ciprofloxacin 500mg Film-coated Tablet',
      intervalDays: 8,
      totalCoursesCount: 4,
      cumulativeDaysOfTherapy: 32,
      facilityName: 'Mayo Memorial Hospital',
      prescriberName: 'Dr. Tariq Mahmood',
      flagType: 'Premature Refill (<10d)',
      severity: 'High',
      status: 'Open Review',
    },
    {
      id: 'rep-2',
      patientRef: 'PT-84721',
      medicationName: 'Meropenem 1g Powder for Injection',
      intervalDays: 4,
      totalCoursesCount: 3,
      cumulativeDaysOfTherapy: 24,
      facilityName: 'Allama Iqbal Complex',
      prescriberName: 'Dr. Ayesha Malik',
      flagType: 'Excessive Duration (>21d)',
      severity: 'Critical',
      status: 'Open Review',
    },
    {
      id: 'rep-3',
      patientRef: 'PT-66219',
      medicationName: 'Amoxicillin / Clavulanate 1000mg Tablet',
      intervalDays: 6,
      totalCoursesCount: 3,
      cumulativeDaysOfTherapy: 18,
      facilityName: 'Mayo Memorial Hospital',
      prescriberName: 'Dr. Bilal Qureshi',
      flagType: 'Premature Refill (<10d)',
      severity: 'Moderate',
      status: 'Open Review',
    },
    {
      id: 'rep-4',
      patientRef: 'PT-33091',
      medicationName: 'Levofloxacin 500mg Tablet',
      intervalDays: 11,
      totalCoursesCount: 2,
      cumulativeDaysOfTherapy: 28,
      facilityName: 'Sheikh Zayed Medical Center',
      prescriberName: 'Dr. Zoya Khan',
      flagType: 'Therapeutic Duplication',
      severity: 'High',
      status: 'Cleared',
    },
  ]);

  const openReviews = anomalies.filter((a) => a.status === 'Open Review');
  const prematureCount = anomalies.filter((a) => a.flagType.includes('Premature')).length;

  const handleAction = (id: string, newStatus: 'Cleared' | 'Refill Blocked') => {
    setAnomalies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filtered = anomalies.filter((item) => {
    const matchesSev = filterSeverity === 'all' || item.severity.toLowerCase() === filterSeverity.toLowerCase();
    const matchesSearch =
      item.patientRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prescriberName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Repeat className="w-5 h-5 text-teal-600" />
              Repeat Dispensing & Refill Surveillance
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded-md font-semibold">
              Stewardship Safety Watch
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated monitoring for premature antibiotic refill requests, duplicate therapy, and excessive days of therapy (DOT).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Safety Log
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Anomaly Flags"
          value={openReviews.length}
          subtitle="Requiring pharmacist clinical clearance"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Premature Refill Requests"
          value={prematureCount}
          subtitle="Requested < 10 days since last fill"
          icon={Clock}
          color="rose"
        />
        <StatCard
          title="Excessive DOT Warnings"
          value="1"
          subtitle="Cumulative exposure > 21 days"
          icon={Repeat}
          color="sky"
        />
        <StatCard
          title="Dispensing Interventions"
          value="98.2%"
          subtitle="Resolution rate prior to release"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Filter and Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient code, drug or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0B1F3A] placeholder-slate-400 focus:outline-none focus:border-teal-500 w-72 shadow-xs"
              />
            </div>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Severity Levels</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="moderate">Moderate Only</option>
            </select>
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-[#0B1F3A] font-semibold">{filtered.length}</strong> repeat dispensing surveillance records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Patient Code</th>
                <th className="py-3 px-4">Medication</th>
                <th className="py-3 px-4">Flag & Anomaly Type</th>
                <th className="py-3 px-4 text-right">Days Since Last Fill</th>
                <th className="py-3 px-4 text-right">Cumulative DOT</th>
                <th className="py-3 px-4">Prescriber & Facility</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Pharmacist Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-700">{item.patientRef}</td>
                  <td className="py-3 px-4 font-medium text-[#0B1F3A] max-w-[200px] truncate">{item.medicationName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        item.severity === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : item.severity === 'High'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {item.flagType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-700">
                    {item.intervalDays} days
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#0B1F3A] font-semibold">
                    {item.cumulativeDaysOfTherapy} days
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[#0B1F3A] font-medium">{item.prescriberName}</div>
                    <div className="text-[10px] text-slate-500">{item.facilityName}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        item.status === 'Open Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : item.status === 'Cleared'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.status === 'Open Review' ? (
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleAction(item.id, 'Cleared')}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Clear Fill
                        </button>
                        <button
                          onClick={() => handleAction(item.id, 'Refill Blocked')}
                          className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Block Fill
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
