import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { formatDate } from '@/lib/formatters';
import {
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const BackgroundJobsPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [jobs, setJobs] = useState(api.getBackgroundJobs());
  const [runningJobId, setRunningJobId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const successfulJobs = jobs.filter((j) => j.status === 'Success').length;

  const handleRunJob = (id: string) => {
    setRunningJobId(id);
    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id
            ? {
                ...j,
                last_run: new Date().toISOString(),
                status: 'Success',
                duration_ms: Math.floor(Math.random() * 800) + 400,
              }
            : j
        )
      );
      setRunningJobId(null);
      setStatusMessage(`Background job executed successfully: ${id}`);
      setTimeout(() => setStatusMessage(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              Background Surveillance Automation
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              Rule Engine & Schedulers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated alert generation jobs, nightly CLSI antibiogram recalculations, and pharmaceutical batch expiry scans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRunJob(jobs[0]?.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Trigger Surveillance Rule Engine
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-800 font-medium animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Scheduled Daemons"
          value={jobs.length}
          subtitle="All cron schedules active"
          icon={Calendar}
          color="sky"
        />
        <StatCard
          title="Engine Health"
          value="100%"
          subtitle={`${successfulJobs} / ${jobs.length} passed last cycle`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Avg Rule Execution"
          value="1.2 s"
          subtitle="Real-time alert threshold computation"
          icon={Zap}
          color="teal"
        />
        <StatCard
          title="Data Hygiene Scanner"
          value="Online"
          subtitle="Continuous AST validation"
          icon={Cpu}
          color="indigo"
        />
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1F3A]">Scheduled Automation Registry</h2>
            <p className="text-xs text-slate-500 mt-0.5">Automated cron workers maintaining system state and surveillance integrity</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Timezone: UTC (00:00)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Job Name</th>
                <th className="py-3 px-4">Schedule Expression</th>
                <th className="py-3 px-4">Last Execution</th>
                <th className="py-3 px-4 font-semibold text-right">Execution Duration</th>
                <th className="py-3 px-4">Next Scheduled Run</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#0B1F3A] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {job.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700 font-medium">
                      {job.schedule}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{formatDate(job.last_run)}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-teal-700">
                    {job.duration_ms} ms
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{formatDate(job.next_run)}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        job.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRunJob(job.id)}
                      disabled={runningJobId === job.id}
                      className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
                    >
                      {runningJobId === job.id ? 'Running...' : 'Run Now'}
                    </button>
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
