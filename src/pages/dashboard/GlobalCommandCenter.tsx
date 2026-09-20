import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Globe, Activity, Building2, AlertTriangle, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const GlobalCommandCenter: React.FC = () => {
  const { currentOrg } = useAuth();
  const regions = api.getRegions();
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const regionChartData = regions.map((r) => ({
    name: r.name.split(' ')[0],
    resistance: r.resistance_rate,
    alerts: r.active_alerts,
    volume: r.utilization_units,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            Inter-Regional Surveillance Command Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Macro-level geographic tracking across metropolitan divisions, health districts, and clinical networks
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-sky-950/40 text-sky-400 border border-sky-800/40">
            {regions.length} Surveillance Hubs Monitored
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Regional Map & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Regional Surveillance Hub Selector */}
        <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-xs font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400" />
              Regional Epidemiological Grid
            </h2>
            <span className="text-[11px] font-mono text-slate-500">Live Geospatial Indices</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regions.map((reg) => {
              const isSelected = selectedRegion.id === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/40 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{reg.name}</span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border ${
                        reg.status === 'Critical'
                          ? 'bg-red-950 text-red-400 border-red-800/40'
                          : reg.status === 'Watch'
                          ? 'bg-amber-950 text-amber-400 border-amber-800/40'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800/40'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-3 gap-1 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Resistance</span>
                      <span className="text-red-400 font-bold">{reg.resistance_rate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Facilities</span>
                      <span className="text-white">{reg.total_facilities}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Alerts</span>
                      <span className="text-amber-400 font-bold">{reg.active_alerts}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Regional Resistance Comparison Bar Chart */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-semibold text-white block mb-2">Regional Resistance Benchmark (% Resistant)</span>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} unit="%" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="resistance" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Resistance Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Selected Region Deep Dive */}
        <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500">Selected Hub Profile</span>
              <h3 className="text-base font-bold text-white tracking-tight">{selectedRegion.name}</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Coord: {selectedRegion.lat.toFixed(2)}, {selectedRegion.lng.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase block">Total Facilities</span>
              <span className="text-lg font-bold text-white">{selectedRegion.total_facilities} hospitals & labs</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase block">Dispensing Volume</span>
              <span className="text-lg font-bold text-sky-400">{selectedRegion.utilization_units.toLocaleString()} units</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase block">Regional Resistance</span>
              <span className="text-lg font-bold text-red-400">{selectedRegion.resistance_rate}%</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase block">Open Signals</span>
              <span className="text-lg font-bold text-amber-400">{selectedRegion.active_alerts} signals</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-500 uppercase block">Stewardship Priority Guidance:</span>
            <p className="bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed text-slate-300">
              Surveillance telemetry for {selectedRegion.name} shows elevated Watch-category antibiotic utilization. Recommend auditing cephalosporin empirical guidelines across inpatient wards.
            </p>
          </div>

          <div className="pt-2 flex gap-2">
            <Link
              to="/app/surveillance"
              className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold text-center transition-colors"
            >
              Drill into Local Antibiogram
            </Link>
            <Link
              to="/app/alerts"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              Review Hub Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

