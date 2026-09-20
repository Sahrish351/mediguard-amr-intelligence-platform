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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Background Surveillance Automation</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
              Rule Engine & Schedulers
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Automated alert generation jobs, nightly CLSI antibiogram recalculations, and pharmaceutical batch expiry scans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRunJob(jobs[0]?.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            Trigger Surveillance Rule Engine
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {statusMessage && (
        <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-200 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Scheduled Automation Registry</h2>
            <p className="text-xs text-slate-400 mt-0.5">Automated cron workers maintaining system state and surveillance integrity</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Timezone: UTC (00:00)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Job Name</th>
                <th className="py-3 px-4 font-semibold">Schedule Expression</th>
                <th className="py-3 px-4 font-semibold">Last Execution</th>
                <th className="py-3 px-4 font-semibold text-right">Execution Duration</th>
                <th className="py-3 px-4 font-semibold">Next Scheduled Run</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      {job.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                      {job.schedule}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{formatDate(job.last_run)}</td>
                  <td className="py-3 px-4 text-right font-mono font-medium text-emerald-400">
                    {job.duration_ms} ms
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{formatDate(job.next_run)}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        job.status === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRunJob(job.id)}
                      disabled={runningJobId === job.id}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-[11px] font-medium transition-colors disabled:opacity-50"
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

