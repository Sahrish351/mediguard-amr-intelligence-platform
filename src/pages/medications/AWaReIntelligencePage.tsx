import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { AWaReBadge } from '@/components/common/Badge';
import { StatCard } from '@/components/common/StatCard';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Building2,
  Info,
  Search,
  CheckCircle2,
  Lock,
  FileDown,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AWaReIntelligencePage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Access' | 'Watch' | 'Reserve'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const medicines = api.getMedicines();
  const prescriptions = api.getPrescriptions(currentOrg.id);

  // Helper to safely get AWaRe category across aliases
  const getAware = (m: any) => m.aware_category || m.awarre_category || m.aware_classification || 'Access';

  // Categorize
  const accessMeds = medicines.filter((m) => getAware(m) === 'Access');
  const watchMeds = medicines.filter((m) => getAware(m) === 'Watch');
  const reserveMeds = medicines.filter((m) => getAware(m) === 'Reserve');

  const totalMeds = medicines.length;
  const accessPct = totalMeds > 0 ? ((accessMeds.length / totalMeds) * 100).toFixed(1) : '0';
  const watchPct = totalMeds > 0 ? ((watchMeds.length / totalMeds) * 100).toFixed(1) : '0';
  const reservePct = totalMeds > 0 ? ((reserveMeds.length / totalMeds) * 100).toFixed(1) : '0';

  const pieData = [
    { name: 'Access', value: accessMeds.length, color: '#10b981' },
    { name: 'Watch', value: watchMeds.length, color: '#f59e0b' },
    { name: 'Reserve', value: reserveMeds.length, color: '#ef4444' },
  ];

  const facilityBreakdown = [
    { facility: 'Mayo Memorial Hospital', Access: 58, Watch: 34, Reserve: 8 },
    { facility: 'Allama Iqbal Complex', Access: 64, Watch: 28, Reserve: 8 },
    { facility: 'Sheikh Zayed Medical Center', Access: 61, Watch: 32, Reserve: 7 },
  ];

  const filteredMeds = medicines.filter((m) => {
    const cat = getAware(m);
    const matchesCat = selectedCategory === 'all' || cat === selectedCategory;
    const matchesSearch =
      m.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.atc_code || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">WHO AWaRe Classification Intelligence</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              WHO Benchmark Target: &ge;60% Access
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Institutional antimicrobial stewardship surveillance benchmarking against the World Health Organization AWaRe Framework.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Benchmark Compliance Banner */}
      <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-emerald-300">WHO 13th GPW Compliance Status:</span> Current network-wide Access
          antimicrobial distribution is <strong className="text-emerald-400 font-mono">{accessPct}%</strong>.
          The WHO global target mandates that Access group antibiotics represent at least 60% of total consumption to ensure essential treatments remain widely available while curbing resistance.
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Access Group (1st Line)"
          value={`${accessPct}%`}
          subtitle={`${accessMeds.length} active formulary items`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Watch Group (Restricted)"
          value={`${watchPct}%`}
          subtitle={`${watchMeds.length} items (higher resistance risk)`}
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Reserve Group (Last Resort)"
          value={`${reservePct}%`}
          subtitle={`${reserveMeds.length} items (strict pre-authorization)`}
          icon={Lock}
          color="rose"
        />
        <StatCard
          title="AWaRe Index Score"
          value="8.4 / 10"
          subtitle="Formulary stewardship compliance"
          icon={ShieldCheck}
          color="sky"
        />
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">AWaRe Distribution</h2>
            <p className="text-xs text-slate-400 mt-0.5">Ratio of monitored antimicrobial classifications</p>
          </div>
          <div className="h-56 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-xs font-medium">
            <div>
              <span className="text-emerald-400">Access</span>
              <div className="font-mono text-white text-sm mt-0.5">{accessMeds.length}</div>
            </div>
            <div>
              <span className="text-amber-400">Watch</span>
              <div className="font-mono text-white text-sm mt-0.5">{watchMeds.length}</div>
            </div>
            <div>
              <span className="text-rose-400">Reserve</span>
              <div className="font-mono text-white text-sm mt-0.5">{reserveMeds.length}</div>
            </div>
          </div>
        </div>

        {/* Facility Consumption Comparison */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Facility AWaRe Consumption (%)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Antimicrobial proportion by healthcare facility</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Benchmark: &ge;60% Access
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} unit="%" domain={[0, 100]} />
                <YAxis dataKey="facility" type="category" stroke="#94a3b8" fontSize={11} width={150} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                />
                <Legend />
                <Bar dataKey="Access" name="Access (%)" fill="#10b981" stackId="a" />
                <Bar dataKey="Watch" name="Watch (%)" fill="#f59e0b" stackId="a" />
                <Bar dataKey="Reserve" name="Reserve (%)" fill="#ef4444" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Formulary Table */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search generic, brand or ATC code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 w-64"
              />
            </div>

            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({medicines.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Access')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === 'Access' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Access ({accessMeds.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Watch')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === 'Watch' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Watch ({watchMeds.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Reserve')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedCategory === 'Reserve' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Reserve ({reserveMeds.length})
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong>{filteredMeds.length}</strong> antimicrobial items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Generic & Brand Name</th>
                <th className="py-3 px-4 font-semibold">ATC Code</th>
                <th className="py-3 px-4 font-semibold">Therapeutic Class</th>
                <th className="py-3 px-4 font-semibold">Dosage / Form</th>
                <th className="py-3 px-4 font-semibold text-center">AWaRe Category</th>
                <th className="py-3 px-4 font-semibold">Stewardship Policy</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredMeds.map((med) => (
                <tr key={med.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{med.generic_name}</div>
                    <div className="text-[11px] text-slate-400">{med.brand_name}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{med.atc_code}</td>
                  <td className="py-3 px-4 text-slate-300">{med.therapeutic_class}</td>
                  <td className="py-3 px-4 text-slate-400">
                    {med.strength} &bull; {med.dosage_form}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <AWaReBadge category={getAware(med)} />
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {getAware(med) === 'Reserve' ? (
                      <span className="text-rose-400 font-medium flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        Infectious Disease Pre-Auth Required
                      </span>
                    ) : getAware(med) === 'Watch' ? (
                      <span className="text-amber-400 font-medium">Restricted to indicated cultures</span>
                    ) : (
                      <span className="text-emerald-400 font-medium">First-line empirical option</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        med.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {med.status}
                    </span>
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
