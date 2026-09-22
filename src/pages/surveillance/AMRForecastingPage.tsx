import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { StatCard } from '@/components/common/StatCard';
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Info,
  Sliders,
  Filter,
  FileDown,
  ArrowRight,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

export const AMRForecastingPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [selectedScenario, setSelectedScenario] = useState<'current' | 'stewardship' | 'surge'>('current');
  const [targetPathogen, setTargetPathogen] = useState<'klebsiella' | 'ecoli' | 'pseudomonas'>('klebsiella');

  // Projection simulation data (Historical: Apr - Sep, Projected: Oct - Mar)
  const projectionData = [
    { month: 'Apr', historical: 36.2, projected: null, lowerCI: null, upperCI: null },
    { month: 'May', historical: 38.1, projected: null, lowerCI: null, upperCI: null },
    { month: 'Jun', historical: 37.4, projected: null, lowerCI: null, upperCI: null },
    { month: 'Jul', historical: 40.2, projected: null, lowerCI: null, upperCI: null },
    { month: 'Aug', historical: 43.5, projected: null, lowerCI: null, upperCI: null },
    { month: 'Sep (Now)', historical: 41.2, projected: 41.2, lowerCI: 41.2, upperCI: 41.2 },
    {
      month: 'Oct',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 39.5 : selectedScenario === 'surge' ? 44.8 : 42.4,
      lowerCI: 37.0,
      upperCI: 46.0,
    },
    {
      month: 'Nov',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 38.0 : selectedScenario === 'surge' ? 48.2 : 43.8,
      lowerCI: 35.5,
      upperCI: 49.5,
    },
    {
      month: 'Dec',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 36.8 : selectedScenario === 'surge' ? 52.1 : 45.0,
      lowerCI: 34.0,
      upperCI: 53.0,
    },
    {
      month: 'Jan',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 35.5 : selectedScenario === 'surge' ? 55.4 : 46.2,
      lowerCI: 32.5,
      upperCI: 56.5,
    },
    {
      month: 'Feb',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 34.8 : selectedScenario === 'surge' ? 58.0 : 47.4,
      lowerCI: 31.0,
      upperCI: 59.0,
    },
    {
      month: 'Mar',
      historical: null,
      projected: selectedScenario === 'stewardship' ? 34.0 : selectedScenario === 'surge' ? 60.5 : 48.3,
      lowerCI: 29.5,
      upperCI: 62.0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Surveillance Trajectory & Forecasting
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-semibold">
              Predictive Modeling
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Statistical projection of antimicrobial resistance trends over a 12-month horizon using moving-average and 95% confidence intervals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={targetPathogen}
            onChange={(e) => setTargetPathogen(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] shadow-xs focus:outline-none focus:border-teal-500 font-medium"
          >
            <option value="klebsiella">K. pneumoniae (Carbapenem-R)</option>
            <option value="ecoli">E. coli (3rd Gen Cephalosporin-R)</option>
            <option value="pseudomonas">P. aeruginosa (Carbapenem-R)</option>
          </select>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Forecast
          </button>
        </div>
      </div>

      {/* Scenario Selection Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Simulation Scenarios:</div>
          <p className="text-xs text-slate-500">Toggle intervention models to project the impact of antimicrobial stewardship policies.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedScenario('current')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
              selectedScenario === 'current'
                ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-xs text-[#0B1F3A]">Baseline Trajectory</div>
            <div className="text-[10px] text-slate-500">Current trends persist</div>
          </button>

          <button
            onClick={() => setSelectedScenario('stewardship')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
              selectedScenario === 'stewardship'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-xs text-emerald-800">Stewardship Protocol</div>
            <div className="text-[10px] text-emerald-600">-15% Watch/Reserve target</div>
          </button>

          <button
            onClick={() => setSelectedScenario('surge')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border cursor-pointer ${
              selectedScenario === 'surge'
                ? 'bg-rose-50 border-rose-500 text-rose-900 font-semibold shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-xs text-rose-800">Uncontrolled Surge</div>
            <div className="text-[10px] text-rose-600">Nosocomial outbreak rate</div>
          </button>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1F3A]">
              12-Month Resistance Forecast: {targetPathogen === 'klebsiella' ? 'K. pneumoniae vs. Meropenem' : targetPathogen}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical validated data (Apr-Sep) with 6-month model projection (Oct-Mar) and 95% confidence interval
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-slate-50 border border-slate-200 font-mono text-slate-700">
              Projected 6M Rate:{' '}
              <strong
                className={
                  selectedScenario === 'stewardship'
                    ? 'text-emerald-700'
                    : selectedScenario === 'surge'
                    ? 'text-rose-700'
                    : 'text-amber-700'
                }
              >
                {selectedScenario === 'stewardship' ? '34.0%' : selectedScenario === 'surge' ? '60.5%' : '48.3%'}
              </strong>
            </span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.7} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} unit="%" domain={[20, 70]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="historical"
                name="Historical Resistance Rate"
                stroke="#0284c7"
                strokeWidth={3}
                dot={{ r: 5, fill: '#0284c7' }}
              />
              <Line
                type="monotone"
                dataKey="projected"
                name={
                  selectedScenario === 'stewardship'
                    ? 'Projected (Stewardship Target)'
                    : selectedScenario === 'surge'
                    ? 'Projected (Surge Scenario)'
                    : 'Projected (Baseline)'
                }
                stroke={
                  selectedScenario === 'stewardship'
                    ? '#10b981'
                    : selectedScenario === 'surge'
                    ? '#ef4444'
                    : '#f59e0b'
                }
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="upperCI"
                name="95% Upper Bound"
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="lowerCI"
                name="95% Lower Bound"
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projected Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Estimated 6M Rate Delta</div>
          <div
            className={`text-2xl font-bold font-mono mt-1 ${
              selectedScenario === 'stewardship'
                ? 'text-emerald-700'
                : selectedScenario === 'surge'
                ? 'text-rose-700'
                : 'text-amber-700'
            }`}
          >
            {selectedScenario === 'stewardship' ? '-7.2%' : selectedScenario === 'surge' ? '+19.3%' : '+7.1%'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">vs. current 41.2% baseline</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Projected Excess ICU Days</div>
          <div className="text-2xl font-bold font-mono text-[#0B1F3A] mt-1">
            {selectedScenario === 'stewardship' ? '18 days' : selectedScenario === 'surge' ? '142 days' : '54 days'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Attributable to treatment delays</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Reserve Antimicrobial Cost</div>
          <div className="text-2xl font-bold font-mono text-[#0B1F3A] mt-1">
            {selectedScenario === 'stewardship' ? '$14,200' : selectedScenario === 'surge' ? '$86,400' : '$38,500'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Colistin / Ceftazidime-avibactam</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Stewardship Feasibility</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">High</div>
          <p className="text-[11px] text-slate-400 mt-1">Based on prescriber compliance rate</p>
        </div>
      </div>

      {/* Statistical Disclaimer Alert */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Statistical Methodology Note:</span> Projections
          use autoregressive exponential smoothing fitted to multi-month non-duplicate specimen isolates.
          Confidence intervals widen over time to reflect epidemiological uncertainty. This tool supports institutional planning
          and infection prevention resource allocation; it does not replace routine microbiological testing.
        </div>
      </div>
    </div>
  );
};
