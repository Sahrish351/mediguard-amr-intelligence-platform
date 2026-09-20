import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { DEMO_BANNER_TEXT } from '@/services/mockData';

export const DemoBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-300 flex items-center justify-between font-mono">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-semibold tracking-wide uppercase">{DEMO_BANNER_TEXT}</span>
        <span className="text-amber-400/60 hidden sm:inline">— For surveillance decision-support demonstration only. Not for clinical diagnosis.</span>
      </div>
      <div className="text-[11px] text-amber-400/80 font-sans hidden md:block">
        Surveillance Engine Active • CLSI M100-ED33
      </div>
    </div>
  );
};

