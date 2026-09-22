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
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2 font-heading">
            <Globe className="w-5 h-5 text-[#0284C7]" />
            Inter-Regional Surveillance Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Macro-level geographic tracking across metropolitan divisions, health districts, and clinical networks
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 font-bold shadow-2xs">
            {regions.length} Surveillance Hubs Monitored
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Regional Map & Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Regional Surveillance Hub Selector */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-mono font-bold uppercase text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0284C7]" />
              Regional Epidemiological Grid
            </h2>
            <span className="text-[11px] font-mono text-slate-400">Live Geospatial Indices</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regions.map((reg) => {
              const isSelected = selectedRegion.id === reg.id;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/70 border-[#0284C7] shadow-xs'
                      : 'bg-[#F7FAFC] border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">{reg.name}</span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        reg.status === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : reg.status === 'Watch'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {reg.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-1 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Resistance</span>
                      <span className="text-rose-600 font-bold">{reg.resistance_rate}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Facilities</span>
                      <span className="text-slate-800 font-semibold">{reg.total_facilities}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Alerts</span>
                      <span className="text-amber-600 font-bold">{reg.active_alerts}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Regional Resistance Comparison Bar Chart (WHITE BACKGROUND, NAVY TEXT) */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">Regional Resistance Benchmark (% Resistant)</span>
            <div className="h-48 w-full bg-white rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} unit="%" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '12px', fontSize: '11px', color: '#0B1F3A', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="resistance" fill="#0284C7" radius={[4, 4, 0, 0]} name="Resistance Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Selected Region Deep Dive */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Selected Hub Profile</span>
              <h3 className="text-base font-bold text-[#0B1F3A] tracking-tight font-heading">{selectedRegion.name}</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Coord: {selectedRegion.lat.toFixed(2)}, {selectedRegion.lng.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-medium">Total Facilities</span>
              <span className="text-base font-bold text-slate-900">{selectedRegion.total_facilities} hospitals &amp; labs</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-medium">Dispensing Volume</span>
              <span className="text-base font-bold text-[#0284C7]">{selectedRegion.utilization_units.toLocaleString()} units</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-medium">Regional Resistance</span>
              <span className="text-base font-bold text-rose-600">{selectedRegion.resistance_rate}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F7FAFC] border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block font-medium">Open Signals</span>
              <span className="text-base font-bold text-amber-600">{selectedRegion.active_alerts} signals</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <span className="font-mono text-[11px] text-slate-400 uppercase block font-bold">Stewardship Priority Guidance:</span>
            <p className="bg-[#F7FAFC] p-4 rounded-xl border border-slate-200 leading-relaxed text-slate-700">
              Surveillance telemetry for {selectedRegion.name} shows elevated Watch-category antibiotic utilization. Recommend auditing cephalosporin empirical guidelines across inpatient wards.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Link
              to="/app/surveillance"
              className="flex-1 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold text-center transition-colors shadow-2xs cursor-pointer"
            >
              Drill into Local Antibiogram
            </Link>
            <Link
              to="/app/alerts"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer text-center"
            >
              Review Hub Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
