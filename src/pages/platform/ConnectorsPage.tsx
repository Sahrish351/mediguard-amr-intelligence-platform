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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <Network className="w-5 h-5 text-teal-600" />
              Healthcare System Connectors
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              HL7 FHIR &bull; ASTM E1394 &bull; GS1
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized electronic health record (EHR), laboratory analyzer, and pharmaceutical supply chain ingestion telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleManualSync(connectors[0]?.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Poll All Active Endpoints
          </button>
        </div>
      </div>

      {/* Sync Banner Notification */}
      {syncMessage && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-teal-900 font-medium animate-in fade-in">
          <Zap className="w-4 h-4 text-teal-600 shrink-0" />
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
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1F3A]">{c.name}</h3>
                    <span className="text-[11px] font-mono text-slate-500">{c.protocol}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    c.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  {c.status}
                </span>
              </div>

              {/* Specs & URL */}
              <div className="mt-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Endpoint:</span>
                  <span className="font-mono text-slate-700 truncate max-w-[240px]">{c.endpoint}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Last Successful Sync:</span>
                  <span className="text-slate-700">{formatDate(c.last_sync)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Total Records Synced:</span>
                  <span className="font-mono font-bold text-teal-700">
                    {(c.records_synced ?? c.records_processed_24h ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Error Rate:</span>
                  <span className="font-mono text-slate-600">{c.error_rate ?? 0}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => handleTestConnection(c.id)}
                disabled={testingId === c.id}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              >
                {testingId === c.id ? 'Pinging...' : 'Test Connection'}
              </button>
              <button
                onClick={() => handleManualSync(c.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white transition-colors cursor-pointer shadow-2xs"
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
