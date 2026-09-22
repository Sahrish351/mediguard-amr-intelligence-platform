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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#0B1F3A] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              WHO AWaRe Classification Intelligence
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 rounded-md font-semibold">
              WHO Benchmark Target: &ge;60% Access
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional antimicrobial stewardship surveillance benchmarking against the World Health Organization AWaRe Framework.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Benchmark Compliance Banner */}
      <div className="bg-teal-50/60 border border-teal-200/80 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900 leading-relaxed">
          <span className="font-semibold text-teal-950">WHO 13th GPW Compliance Status:</span> Current network-wide Access
          antimicrobial distribution is <strong className="text-teal-800 font-mono font-bold">{accessPct}%</strong>.
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
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1F3A]">AWaRe Distribution</h2>
            <p className="text-xs text-slate-500 mt-0.5">Ratio of monitored antimicrobial classifications</p>
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
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center text-xs font-medium">
            <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
              <span className="text-emerald-800 font-semibold">Access</span>
              <div className="font-mono text-emerald-950 font-bold text-sm mt-0.5">{accessMeds.length}</div>
            </div>
            <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
              <span className="text-amber-800 font-semibold">Watch</span>
              <div className="font-mono text-amber-950 font-bold text-sm mt-0.5">{watchMeds.length}</div>
            </div>
            <div className="bg-rose-50/60 p-2 rounded-lg border border-rose-100">
              <span className="text-rose-800 font-semibold">Reserve</span>
              <div className="font-mono text-rose-950 font-bold text-sm mt-0.5">{reserveMeds.length}</div>
            </div>
          </div>
        </div>

        {/* Facility Consumption Comparison */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1F3A]">Facility AWaRe Consumption (%)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Antimicrobial proportion by healthcare facility</p>
            </div>
            <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
              Benchmark: &ge;60% Access
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.7} />
                <XAxis type="number" stroke="#64748B" fontSize={12} unit="%" domain={[0, 100]} />
                <YAxis dataKey="facility" type="category" stroke="#64748B" fontSize={11} width={150} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
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
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search generic, brand or ATC code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:border-teal-500 w-64 shadow-xs"
              />
            </div>

            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs shadow-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedCategory === 'all' ? 'bg-slate-100 text-[#0B1F3A] font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({medicines.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Access')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedCategory === 'Access' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Access ({accessMeds.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Watch')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedCategory === 'Watch' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Watch ({watchMeds.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Reserve')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedCategory === 'Reserve' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Reserve ({reserveMeds.length})
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            Showing <strong className="text-[#0B1F3A] font-semibold">{filteredMeds.length}</strong> antimicrobial items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Generic & Brand Name</th>
                <th className="py-3 px-4">ATC Code</th>
                <th className="py-3 px-4">Therapeutic Class</th>
                <th className="py-3 px-4">Dosage / Form</th>
                <th className="py-3 px-4 text-center">AWaRe Category</th>
                <th className="py-3 px-4">Stewardship Policy</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMeds.map((med) => (
                <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#0B1F3A]">{med.generic_name}</div>
                    <div className="text-[11px] text-teal-700 font-medium font-mono">{med.brand_name}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{med.atc_code}</td>
                  <td className="py-3 px-4 text-slate-600">{med.therapeutic_class}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {med.strength} &bull; {med.dosage_form}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <AWaReBadge category={getAware(med)} />
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {getAware(med) === 'Reserve' ? (
                      <span className="text-rose-700 font-semibold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        ID Pre-Auth Required
                      </span>
                    ) : getAware(med) === 'Watch' ? (
                      <span className="text-amber-700 font-semibold">Restricted to indicated cultures</span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">First-line empirical option</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        med.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
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
