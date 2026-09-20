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
        return 'border-rose-200 bg-rose-50/40 hover:border-rose-300';
      case 'warning':
        return 'border-amber-200 bg-amber-50/40 hover:border-amber-300';
      case 'ai':
        return 'border-indigo-200 bg-indigo-50/40 hover:border-indigo-300';
      default:
        return 'border-slate-200/80 bg-white hover:border-slate-300 shadow-2xs';
    }
  };

  const getIconColor = () => {
    if (color) {
      switch (color) {
        case 'emerald':
          return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
        case 'amber':
          return 'text-amber-700 bg-amber-50 border border-amber-200';
        case 'rose':
        case 'red':
          return 'text-rose-700 bg-rose-50 border border-rose-200';
        case 'sky':
        case 'blue':
          return 'text-sky-700 bg-sky-50 border border-sky-200';
        case 'teal':
          return 'text-teal-700 bg-teal-50 border border-teal-200';
        case 'indigo':
        case 'purple':
          return 'text-indigo-700 bg-indigo-50 border border-indigo-200';
        default:
          return 'text-slate-600 bg-slate-100 border border-slate-200';
      }
    }
    switch (variant) {
      case 'critical':
        return 'text-rose-700 bg-rose-50 border border-rose-200';
      case 'warning':
        return 'text-amber-700 bg-amber-50 border border-amber-200';
      case 'ai':
        return 'text-indigo-700 bg-indigo-50 border border-indigo-200';
      default:
        return 'text-sky-700 bg-sky-50 border border-sky-200';
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${getVariantStyles()}`} title={tooltip}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase font-heading">{title}</span>
        <div className={`p-2 rounded-xl ${getIconColor()}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">{value}</span>
        {subtitle && <span className="text-xs text-slate-500 font-sans">{subtitle}</span>}
      </div>

      {change && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          {change.isIncrease ? (
            <TrendingUp
              className={`w-3.5 h-3.5 ${
                change.isNegativeSentiment ? 'text-rose-600' : 'text-emerald-600'
              }`}
            />
          ) : (
            <TrendingDown
              className={`w-3.5 h-3.5 ${
                change.isNegativeSentiment ? 'text-rose-600' : 'text-emerald-600'
              }`}
            />
          )}
          <span
            className={`font-semibold font-mono ${
              change.isNegativeSentiment ? 'text-rose-600' : 'text-emerald-600'
            }`}
          >
            {change.value}
          </span>
          <span className="text-slate-500 text-[11px]">{change.periodText || 'vs historical baseline'}</span>
        </div>
      )}
    </div>
  );
};
