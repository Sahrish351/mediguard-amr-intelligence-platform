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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Repeat Dispensing & Refill Surveillance</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
              Stewardship Safety Watch
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Automated monitoring for premature antibiotic refill requests, duplicate therapy, and excessive days of therapy (DOT).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
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
          subtitle="Requested &lt; 10 days since last fill"
          icon={Clock}
          color="rose"
        />
        <StatCard
          title="Excessive DOT Warnings"
          value="1"
          subtitle="Cumulative exposure &gt; 21 days"
          icon={Repeat}
          color="sky"
        />
        <StatCard
          title="Dispensing Interventions"
          value="98.2%"
          subtitle="Resolution rate prior to medication release"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Filter and Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient code, drug or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 w-72"
              />
            </div>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Severity Levels</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="moderate">Moderate Only</option>
            </select>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong>{filtered.length}</strong> repeat dispensing surveillance records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Patient Code</th>
                <th className="py-3 px-4 font-semibold">Medication</th>
                <th className="py-3 px-4 font-semibold">Flag & Anomaly Type</th>
                <th className="py-3 px-4 font-semibold text-right">Days Since Last Fill</th>
                <th className="py-3 px-4 font-semibold text-right">Cumulative DOT</th>
                <th className="py-3 px-4 font-semibold">Prescriber & Facility</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Pharmacist Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-400">{item.patientRef}</td>
                  <td className="py-3 px-4 font-medium text-white max-w-[200px] truncate">{item.medicationName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        item.severity === 'Critical'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : item.severity === 'High'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {item.flagType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-400">
                    {item.intervalDays} days
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white">
                    {item.cumulativeDaysOfTherapy} days
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{item.prescriberName}</div>
                    <div className="text-[10px] text-slate-400">{item.facilityName}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Open Review'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : item.status === 'Cleared'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
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
                          className="px-2 py-1 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-800 rounded text-[10px] font-medium"
                        >
                          Clear Fill
                        </button>
                        <button
                          onClick={() => handleAction(item.id, 'Refill Blocked')}
                          className="px-2 py-1 bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800 rounded text-[10px] font-medium"
                        >
                          Block Fill
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500">Processed</span>
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

