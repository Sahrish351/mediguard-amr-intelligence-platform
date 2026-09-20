import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    isIncrease: boolean;
    isNegativeSentiment?: boolean;
    periodText?: string;
  };
  icon: LucideIcon;
  variant?: 'default' | 'critical' | 'warning' | 'ai';
  color?: string;
  tooltip?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  variant = 'default',
  color,
  tooltip,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'critical':
        return 'border-red-500/30 bg-red-950/10 hover:border-red-500/50 critical-glow';
      case 'warning':
        return 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50';
      case 'ai':
        return 'border-purple-500/30 bg-purple-950/10 hover:border-purple-500/50 ai-glow';
      default:
        return 'border-slate-800 bg-[#0F172A] hover:border-slate-700';
    }
  };

  const getIconColor = () => {
    if (color) {
      switch (color) {
        case 'emerald':
          return 'text-emerald-400 bg-emerald-500/10';
        case 'amber':
          return 'text-amber-400 bg-amber-500/10';
        case 'rose':
        case 'red':
          return 'text-rose-400 bg-rose-500/10';
        case 'sky':
        case 'blue':
          return 'text-sky-400 bg-sky-500/10';
        case 'teal':
          return 'text-teal-400 bg-teal-500/10';
        case 'indigo':
        case 'purple':
          return 'text-indigo-400 bg-indigo-500/10';
        default:
          return 'text-slate-400 bg-slate-800';
      }
    }
    switch (variant) {
      case 'critical':
        return 'text-red-400 bg-red-500/10';
      case 'warning':
        return 'text-amber-400 bg-amber-500/10';
      case 'ai':
        return 'text-purple-400 bg-purple-500/10';
      default:
        return 'text-sky-400 bg-sky-500/10';
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 ${getVariantStyles()}`} title={tooltip}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</span>
        <div className={`p-2 rounded-lg ${getIconColor()}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">{value}</span>
        {subtitle && <span className="text-xs text-slate-500 font-sans">{subtitle}</span>}
      </div>

      {change && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          {change.isIncrease ? (
            <TrendingUp
              className={`w-3.5 h-3.5 ${
                change.isNegativeSentiment ? 'text-red-400' : 'text-emerald-400'
              }`}
            />
          ) : (
            <TrendingDown
              className={`w-3.5 h-3.5 ${
                change.isNegativeSentiment ? 'text-red-400' : 'text-emerald-400'
              }`}
            />
          )}
          <span
            className={`font-semibold font-mono ${
              change.isNegativeSentiment ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {change.value}
          </span>
          <span className="text-slate-500">{change.periodText || 'vs historical baseline'}</span>
        </div>
      )}
    </div>
  );
};

