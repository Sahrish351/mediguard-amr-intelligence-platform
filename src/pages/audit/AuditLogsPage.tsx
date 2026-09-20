import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { formatDateTime } from '@/lib/formatters';
import { History, Shield, Search, Database, Lock } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const auditLogs = api.getAuditLogs(currentOrg.id);

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.actor?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ip_address?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            Immutable Security & Clinical Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographically timestamped, append-only chronological log of all prescribing, dispensing, and triage events
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Append-Only • Tamper Evident</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search action, actor, entity, IP address..."
            className="w-full bg-[#0F172A] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F19] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp (UTC)</th>
                <th className="px-4 py-3">Action Event</th>
                <th className="px-4 py-3">Entity Type</th>
                <th className="px-4 py-3">Actor / Clinical User</th>
                <th className="px-4 py-3">Audit Details / Payload</th>
                <th className="px-4 py-3 text-right">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-slate-400">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-sky-400 uppercase text-[11px]">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-sans">
                    {log.entity_type}
                  </td>
                  <td className="px-4 py-3 font-sans text-white">
                    {log.actor?.full_name || 'System / Auto-Rule'}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-400 max-w-xs truncate">
                    {JSON.stringify(log.new_values || {})}
                  </td>
                  <td className="px-4 py-3 text-right text-[11px] text-slate-500">
                    {log.ip_address || '127.0.0.1'}
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

