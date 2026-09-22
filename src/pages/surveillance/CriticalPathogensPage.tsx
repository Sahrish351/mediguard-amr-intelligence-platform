import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import {
  Microscope,
  ShieldAlert,
  AlertTriangle,
  Flame,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  FileDown,
  Dna,
  BedDouble,
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
} from 'recharts';

interface PathogenItem {
  id: string;
  name: string;
  whoCategory: 'Critical' | 'High' | 'Medium';
  resistancePhenotype: string;
  keyMechanisms: string[];
  isolatesCount: number;
  resistanceRate: number;
  rateChange: number; // +3.2%
  icuIncidence: number;
  cohortInIsolation: number;
  stewardshipAction: string;
}

export const CriticalPathogensPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWard, setSelectedWard] = useState<string>('all');

  const pathogens: PathogenItem[] = [
    {
      id: 'crab',
      name: 'Acinetobacter baumannii',
      whoCategory: 'Critical',
      resistancePhenotype: 'Carbapenem-Resistant (CRAB)',
      keyMechanisms: ['blaOXA-23', 'blaOXA-51', 'Efflux pumps'],
      isolatesCount: 42,
      resistanceRate: 82.1,
      rateChange: +4.5,
      icuIncidence: 68.4,
      cohortInIsolation: 7,
      stewardshipAction: 'Strict contact isolation; environmental fumigation; colistin stewardship review.',
    },
    {
      id: 'cre-kp',
      name: 'Klebsiella pneumoniae',
      whoCategory: 'Critical',
      resistancePhenotype: 'Carbapenem-Resistant (CRE / NDM-1)',
      keyMechanisms: ['blaNDM-1', 'blaKPC-2', 'blaCTX-M-15'],
      isolatesCount: 58,
      resistanceRate: 41.2,
      rateChange: +7.2,
      icuIncidence: 52.0,
      cohortInIsolation: 12,
      stewardshipAction: 'Mandatory pre-authorization for ceftazidime-avibactam; infection control audit.',
    },
    {
      id: 'crpa',
      name: 'Pseudomonas aeruginosa',
      whoCategory: 'Critical',
      resistancePhenotype: 'Carbapenem-Resistant (CRPA)',
      keyMechanisms: ['OprD porin loss', 'AmpC overexpression', 'blaVIM'],
      isolatesCount: 49,
      resistanceRate: 36.7,
      rateChange: -1.8,
      icuIncidence: 44.1,
      cohortInIsolation: 5,
      stewardshipAction: 'Combination testing with tobramycin; evaluate sink/plumbing colonization.',
    },
    {
      id: 'mrsa',
      name: 'Staphylococcus aureus',
      whoCategory: 'High',
      resistancePhenotype: 'Methicillin-Resistant (MRSA)',
      keyMechanisms: ['mecA (PBP2a alteration)'],
      isolatesCount: 64,
      resistanceRate: 38.5,
      rateChange: +1.2,
      icuIncidence: 31.2,
      cohortInIsolation: 8,
      stewardshipAction: 'Nares decolonization protocol; vancomycin trough therapeutic drug monitoring.',
    },
    {
      id: 'vre',
      name: 'Enterococcus faecium',
      whoCategory: 'High',
      resistancePhenotype: 'Vancomycin-Resistant (VRE)',
      keyMechanisms: ['vanA ligase (D-Ala-D-Lac)'],
      isolatesCount: 31,
      resistanceRate: 37.9,
      rateChange: +3.8,
      icuIncidence: 28.6,
      cohortInIsolation: 4,
      stewardshipAction: 'Linezolid/daptomycin restriction; terminal ultraviolet room disinfection.',
    },
    {
      id: 'esbl-ec',
      name: 'Escherichia coli',
      whoCategory: 'Critical',
      resistancePhenotype: 'ESBL-Producing (Fluoroquinolone Non-Susceptible)',
      keyMechanisms: ['blaCTX-M-14', 'gyrA / parC mutations'],
      isolatesCount: 92,
      resistanceRate: 67.0,
      rateChange: +2.1,
      icuIncidence: 22.0,
      cohortInIsolation: 14,
      stewardshipAction: 'Carbapenem-sparing protocol; evaluate oral fosfomycin/nitrofurantoin suitability.',
    },
  ];

  const trendData = [
    { month: 'Apr', crab: 78.0, cre: 34.0, mrsa: 36.5, vre: 32.0 },
    { month: 'May', crab: 79.5, cre: 36.2, mrsa: 37.0, vre: 33.5 },
    { month: 'Jun', crab: 80.2, cre: 37.0, mrsa: 36.8, vre: 34.1 },
    { month: 'Jul', crab: 79.0, cre: 38.5, mrsa: 38.0, vre: 35.0 },
    { month: 'Aug', crab: 81.0, cre: 39.8, mrsa: 37.5, vre: 36.2 },
    { month: 'Sep', crab: 82.1, cre: 41.2, mrsa: 38.5, vre: 37.9 },
  ];

  const filtered = pathogens.filter(
    (p) => selectedCategory === 'all' || p.whoCategory.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A]">WHO Priority Pathogens Surveillance</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-rose-50 text-rose-700 border border-rose-200 rounded">
              High-Consequence Organisms
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Active tracking of multi-drug resistant (MDR) priority pathogens designated by the World Health Organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500"
          >
            <option value="all">All WHO Tiers</option>
            <option value="critical">Critical Priority Only</option>
            <option value="high">High Priority Only</option>
          </select>

          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0B1F3A] focus:outline-none focus:border-teal-500"
          >
            <option value="all">All Clinical Wards</option>
            <option value="icu">Intensive Care Units (ICU)</option>
            <option value="surgery">Surgical Units</option>
            <option value="oncology">Hematology / Oncology</option>
          </select>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 shadow-xs transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-500" />
            Export Brief
          </button>
        </div>
      </div>

      {/* Trajectory Chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-[#0B1F3A]">6-Month Pathogen Resistance Trajectory</h2>
            <p className="text-xs text-slate-500 mt-0.5">Non-susceptibility rates across key surveillance indicator organisms</p>
          </div>
          <span className="text-xs font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            CRE +7.2% vs Baseline
          </span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} unit="%" domain={[20, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', color: '#0B1F3A' }}
              />
              <Legend />
              <Line type="monotone" dataKey="crab" name="CR-Acinetobacter (CRAB)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cre" name="CR-Klebsiella (CRE)" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="mrsa" name="MRSA" stroke="#0284c7" strokeWidth={2} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="vre" name="VRE" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pathogen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    item.whoCategory === 'Critical'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  WHO {item.whoCategory} Priority
                </span>
                <span className="text-xs font-mono text-slate-500">n={item.isolatesCount} isolates</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#0B1F3A] italic mt-3">{item.name}</h3>
              <p className="text-xs font-semibold text-rose-700 mt-0.5">{item.resistancePhenotype}</p>

              {/* Molecular Resistance Mechanisms */}
              <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                  <Dna className="w-3.5 h-3.5 text-teal-600" />
                  Key Molecular Determinants:
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {item.keyMechanisms.map((mech) => (
                    <span
                      key={mech}
                      className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-700"
                    >
                      {mech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">Resistance</div>
                  <div className="text-sm font-bold font-mono text-rose-600 mt-0.5">{item.resistanceRate}%</div>
                  <div className="text-[9px] text-rose-600 mt-0.5">+{item.rateChange}%</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">ICU Burden</div>
                  <div className="text-sm font-bold font-mono text-amber-700 mt-0.5">{item.icuIncidence}%</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">of isolates</div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">In Isolation</div>
                  <div className="text-sm font-bold font-mono text-teal-700 mt-0.5">{item.cohortInIsolation}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">patients</div>
                </div>
              </div>

              {/* Stewardship Action */}
              <div className="mt-4 p-2.5 rounded-lg bg-teal-50/60 border border-teal-200 text-[11px] text-slate-700">
                <span className="font-semibold text-teal-800">Control Protocol: </span>
                {item.stewardshipAction}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Surveillance Status: <strong className="text-teal-700">Active</strong></span>
              <a
                href="/app/alerts"
                className="text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 font-medium"
              >
                View Signals <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

