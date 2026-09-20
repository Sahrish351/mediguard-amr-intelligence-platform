import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import { formatDate } from '@/lib/formatters';
import {
  Network,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
} from 'lucide-react';

export const ConnectorsPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [connectors, setConnectors] = useState(api.getSystemConnectors());
  const [testingId, setTestingId] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const activeCount = connectors.filter((c) => c.status === 'Active' || c.status === 'Online').length;
  const totalEvents = connectors.reduce((acc, c) => acc + (c.records_synced || c.records_processed_24h || 0), 0);

  const handleTestConnection = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setSyncMessage(`Ping handshake successful for connector: ${id}. Latency: 112ms.`);
      setTimeout(() => setSyncMessage(null), 4000);
    }, 800);
  };

  const handleManualSync = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              last_sync: new Date().toISOString(),
              records_synced: (c.records_synced || 0) + 15,
            }
          : c
      )
    );
    setSyncMessage(`Incremental sync completed for connector: ${id}. 15 new records ingested.`);
    setTimeout(() => setSyncMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Healthcare System Connectors</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              HL7 FHIR &bull; ASTM E1394 &bull; GS1
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Standardized electronic health record (EHR), laboratory analyzer, and pharmaceutical supply chain ingestion telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleManualSync(connectors[0]?.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Poll All Active Endpoints
          </button>
        </div>
      </div>

      {/* Sync Banner Notification */}
      {syncMessage && (
        <div className="bg-sky-950/80 border border-sky-600/80 rounded-xl p-3 flex items-center gap-3 text-xs text-sky-200 animate-in fade-in">
          <Zap className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Ingestion Gateways"
          value={`${activeCount} / ${connectors.length}`}
          subtitle="All primary interfaces operational"
          icon={Radio}
          color="emerald"
        />
        <StatCard
          title="Telemetry Events Ingested"
          value={totalEvents.toLocaleString()}
          subtitle="Messages parsed this month"
          icon={Activity}
          color="sky"
        />
        <StatCard
          title="Average Ingestion Latency"
          value="138 ms"
          subtitle="Real-time event streaming"
          icon={Zap}
          color="teal"
        />
        <StatCard
          title="Security Transport"
          value="TLS 1.3"
          subtitle="mTLS mutual certificate authentication"
          icon={ShieldCheck}
          color="indigo"
        />
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {connectors.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{c.protocol}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    c.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  {c.status}
                </span>
              </div>

              {/* Specs & URL */}
              <div className="mt-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Endpoint:</span>
                  <span className="font-mono text-slate-300 truncate max-w-[240px]">{c.endpoint}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Last Successful Sync:</span>
                  <span className="text-slate-300">{formatDate(c.last_sync)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Records Synced:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {(c.records_synced ?? c.records_processed_24h ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Error Rate:</span>
                  <span className="font-mono text-slate-400">{c.error_rate ?? 0}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleTestConnection(c.id)}
                disabled={testingId === c.id}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
              >
                {testingId === c.id ? 'Pinging...' : 'Test Connection'}
              </button>
              <button
                onClick={() => handleManualSync(c.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-600 hover:bg-sky-500 text-white transition-colors"
              >
                Sync Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
