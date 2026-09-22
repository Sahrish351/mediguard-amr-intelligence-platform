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
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
            <History className="w-5 h-5 text-[#0284C7]" />
            Immutable Security &amp; Clinical Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cryptographically timestamped, append-only chronological log of all prescribing, dispensing, and triage events
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-mono shadow-2xs font-bold">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Append-Only • Tamper Evident</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search action, actor, entity, IP address..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] shadow-2xs transition-colors"
          />
        </div>
      </div>

      {/* Audit Log Stream Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAFC] text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200 font-bold">
              <tr>
                <th className="px-4 py-3">Timestamp (UTC)</th>
                <th className="px-4 py-3">Action Event</th>
                <th className="px-4 py-3">Entity Type</th>
                <th className="px-4 py-3">Actor / Clinical User</th>
                <th className="px-4 py-3">Audit Details / Payload</th>
                <th className="px-4 py-3 text-right">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-slate-500">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-[#0284C7] uppercase text-[11px]">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-sans font-medium">
                    {log.entity_type}
                  </td>
                  <td className="px-4 py-3 font-sans text-slate-900 font-semibold">
                    {log.actor?.full_name || 'System / Auto-Rule'}
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-500 max-w-xs truncate">
                    {JSON.stringify(log.new_values || {})}
                  </td>
                  <td className="px-4 py-3 text-right text-[11px] text-slate-400">
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
