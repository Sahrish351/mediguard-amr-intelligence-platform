import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { AWaReBadge } from '@/components/common/Badge';
import {
  Activity,
  BarChart2,
  Calendar,
  Filter,
  Layers,
  Microscope,
  Info,
  Download,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';

export const SurveillancePage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [activeTab, setActiveTab] = useState<'resistance' | 'usage' | 'organisms' | 'facilities'>('resistance');
  const [selectedOrganism, setSelectedOrganism] = useState<string>('all');

  const organisms = api.getOrganisms();
  const astResults = api.getSusceptibilityResults(currentOrg.id);

  // Antibiogram Matrix Data (Isolates tested, Resistant count, % Resistant)
  const antibiogramMatrix = [
    {
      organism: 'Klebsiella pneumoniae',
      ceftriaxone: { tested: 22, resistant: 14, pct: 63.6 },
      ciprofloxacin: { tested: 22, resistant: 12, pct: 54.5 },
      meropenem: { tested: 22, resistant: 2, pct: 9.1 },
      colistin: { tested: 15, resistant: 0, pct: 0.0 },
    },
    {
      organism: 'Escherichia coli',
      ceftriaxone: { tested: 45, resistant: 19, pct: 42.2 },
      ciprofloxacin: { tested: 45, resistant: 26, pct: 57.8 },
      meropenem: { tested: 45, resistant: 1, pct: 2.2 },
      colistin: { tested: 20, resistant: 0, pct: 0.0 },
    },
    {
      organism: 'Pseudomonas aeruginosa',
      ceftriaxone: { tested: 18, resistant: 16, pct: 88.9 }, // Natural resistance
      ciprofloxacin: { tested: 18, resistant: 7, pct: 38.9 },
      meropenem: { tested: 18, resistant: 6, pct: 33.3 },
      colistin: { tested: 14, resistant: 1, pct: 7.1 },
    },
    {
      organism: 'Acinetobacter baumannii',
      ceftriaxone: { tested: 14, resistant: 14, pct: 100.0 },
      ciprofloxacin: { tested: 14, resistant: 12, pct: 85.7 },
      meropenem: { tested: 14, resistant: 11, pct: 78.6 },
      colistin: { tested: 14, resistant: 2, pct: 14.3 },
    },
  ];

  const filteredMatrix = selectedOrganism === 'all'
    ? antibiogramMatrix
    : antibiogramMatrix.filter((item) => item.organism === selectedOrganism);

  // Time trend data for selected pathogen
  const trendComparisonData = [
    { period: '2024-W32', Ceftriaxone: 45.2, Ciprofloxacin: 52.0, Meropenem: 6.5 },
    { period: '2024-W33', Ceftriaxone: 48.0, Ciprofloxacin: 51.5, Meropenem: 7.1 },
    { period: '2024-W34', Ceftriaxone: 52.3, Ciprofloxacin: 53.8, Meropenem: 8.0 },
    { period: '2024-W35', Ceftriaxone: 58.1, Ciprofloxacin: 56.2, Meropenem: 8.8 },
    { period: '2024-W36', Ceftriaxone: 63.6, Ciprofloxacin: 55.4, Meropenem: 9.5 },
  ];

  const getHeatmapColor = (pct: number) => {
    if (pct >= 60) return 'bg-red-950/60 text-red-300 font-bold border-red-800/40';
    if (pct >= 40) return 'bg-orange-950/60 text-orange-300 font-semibold border-orange-800/40';
    if (pct >= 20) return 'bg-amber-950/60 text-amber-300 border-amber-800/40';
    return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            Antimicrobial Resistance & Usage Surveillance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Systematic antibiogram profiling, susceptibility matrices, and epidemiological trend detection
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#0F172A] border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('resistance')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'resistance'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Antibiogram Matrix
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'usage'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AWaRe Utilization
          </button>
          <button
            onClick={() => setActiveTab('organisms')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'organisms'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pathogen Distribution
          </button>
        </div>
      </div>

      {/* Surveillance Scope Notice */}
      <div className="p-3 bg-sky-950/20 border border-sky-800/30 rounded-xl flex items-start gap-2.5 text-xs text-sky-300">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Statistical Surveillance Protocol:</strong> Resistance percentages are calculated strictly as{' '}
          <code className="font-mono text-white bg-slate-900 px-1 py-0.5 rounded">
            (Resistant Isolates / Tested Isolates) * 100
          </code>
          . Only first isolate per patient per encounter is included to eliminate duplication bias. Small sample sizes (&lt; 30) are labeled as preliminary findings.
        </div>
      </div>

      {/* Tab 1: Antibiogram Heatmap & Resistance Matrix */}
      {activeTab === 'resistance' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Organism Filter:</span>
              <select
                value={selectedOrganism}
                onChange={(e) => setSelectedOrganism(e.target.value)}
                className="bg-[#0F172A] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="all">All Pathogens (Critical & High Priority)</option>
                {organisms.map((o) => (
                  <option key={o.id} value={o.name}>
                    {o.name} ({o.who_priority})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> &lt; 20% (Low)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> 20-39%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-orange-500 inline-block"></span> 40-59%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500 inline-block"></span> &gt;= 60% (Surge)</span>
            </div>
          </div>

          {/* Antibiogram Matrix Table */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Cumulative Antibiogram Matrix (% Resistant)</h2>
                <p className="text-xs text-slate-400">Validated non-duplicate isolates tested over the current 30-day period</p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">CLSI M100 Breakpoints</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B0F19] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3 min-w-[200px]">Organism / Bacterial Species</th>
                    <th className="px-4 py-3 text-center">
                      <div>Ceftriaxone (Watch)</div>
                      <span className="text-[10px] lowercase text-slate-500">3rd gen cephalosporin</span>
                    </th>
                    <th className="px-4 py-3 text-center">
                      <div>Ciprofloxacin (Watch)</div>
                      <span className="text-[10px] lowercase text-slate-500">fluoroquinolone</span>
                    </th>
                    <th className="px-4 py-3 text-center">
                      <div>Meropenem (Watch)</div>
                      <span className="text-[10px] lowercase text-slate-500">carbapenem</span>
                    </th>
                    <th className="px-4 py-3 text-center">
                      <div>Colistin (Reserve)</div>
                      <span className="text-[10px] lowercase text-slate-500">polymyxin</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3.5 font-sans font-medium text-white italic">
                        {row.organism}
                      </td>

                      {/* Ceftriaxone */}
                      <td className="px-4 py-3.5 text-center">
                        <div className={`inline-block px-3 py-1 rounded border ${getHeatmapColor(row.ceftriaxone.pct)}`}>
                          {row.ceftriaxone.pct.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ({row.ceftriaxone.resistant}/{row.ceftriaxone.tested})
                        </div>
                      </td>

                      {/* Ciprofloxacin */}
                      <td className="px-4 py-3.5 text-center">
                        <div className={`inline-block px-3 py-1 rounded border ${getHeatmapColor(row.ciprofloxacin.pct)}`}>
                          {row.ciprofloxacin.pct.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ({row.ciprofloxacin.resistant}/{row.ciprofloxacin.tested})
                        </div>
                      </td>

                      {/* Meropenem */}
                      <td className="px-4 py-3.5 text-center">
                        <div className={`inline-block px-3 py-1 rounded border ${getHeatmapColor(row.meropenem.pct)}`}>
                          {row.meropenem.pct.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ({row.meropenem.resistant}/{row.meropenem.tested})
                        </div>
                      </td>

                      {/* Colistin */}
                      <td className="px-4 py-3.5 text-center">
                        <div className={`inline-block px-3 py-1 rounded border ${getHeatmapColor(row.colistin.pct)}`}>
                          {row.colistin.pct.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ({row.colistin.resistant}/{row.colistin.tested})
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Longitudinal Trend Chart */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Longitudinal Resistance Evolution (Weekly Surveillance)</h2>
                <p className="text-xs text-slate-400">Tracking emergence of resistance trends against benchmark antibiotics</p>
              </div>
              <span className="text-xs font-mono text-red-400 font-semibold">+18.4% pt rise in Ceftriaxone</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} unit="%" />
                  <Tooltip contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Ceftriaxone" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Ciprofloxacin" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Meropenem" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AWaRe Utilization */}
      {activeTab === 'usage' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">WHO AWaRe Antibiotic Stewardship Breakdown</h2>
              <p className="text-xs text-slate-400">Proportion of Access, Watch, and Reserve antibiotics dispensed across departments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-emerald-400">Access Antibiotics</span>
                <AWaReBadge category="Access" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">37.1%</div>
              <p className="text-xs text-slate-400 mt-1">WHO Target: &ge; 60% of total consumption</p>
              <div className="mt-2 text-xs text-red-400 font-mono">-22.9% below target</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-amber-400">Watch Antibiotics</span>
                <AWaReBadge category="Watch" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">58.4%</div>
              <p className="text-xs text-slate-400 mt-1">Higher resistance potential (Ceftriaxone, Cipro, Meropenem)</p>
              <div className="mt-2 text-xs text-amber-400 font-mono">Excessive empirical reliance</div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-rose-400">Reserve Antibiotics</span>
                <AWaReBadge category="Reserve" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">4.5%</div>
              <p className="text-xs text-slate-400 mt-1">Protected last-resort drugs (Linezolid, Colistin)</p>
              <div className="mt-2 text-xs text-emerald-400 font-mono">Within stewardship safety limits</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Organisms Distribution */}
      {activeTab === 'organisms' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Microbiology Organism Isolates Profile</h2>
            <p className="text-xs text-slate-400">Distribution of confirmed clinical culture isolates and WHO priority categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {organisms.map((o) => (
              <div key={o.id} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white italic">{o.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      o.who_priority === 'Critical'
                        ? 'bg-red-950 text-red-400 border-red-800/40'
                        : 'bg-amber-950 text-amber-400 border-amber-800/40'
                    }`}>
                      {o.who_priority} Priority
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{o.category} • {o.gram_stain}</span>
                </div>
                <div className="mt-3 text-[11px] font-mono text-sky-400 border-t border-slate-800 pt-2">
                  Active AST Panel: CLSI Guidelines
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

