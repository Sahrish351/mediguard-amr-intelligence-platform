import { AlertSeverity, BatchVerificationStatus, AWaReCategory } from '@/types';

export function formatDate(isoString?: string | null): string {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString?: string | null): string {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString;
  }
}

export function formatResistanceRate(resistant: number, tested: number): string {
  if (tested === 0) return 'No data (0 tested)';
  const pct = ((resistant / tested) * 100).toFixed(1);
  return `${pct}% (${resistant}/${tested})`;
}

export function getSeverityStyle(severity: AlertSeverity): { bg: string; text: string; border: string } {
  switch (severity) {
    case 'Critical':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
      };
    case 'High':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
      };
    case 'Medium':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      };
    case 'Low':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
      };
  }
}

export function getBatchStatusStyle(status: BatchVerificationStatus): { bg: string; text: string; border: string } {
  switch (status) {
    case 'Verified':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'Pending':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    case 'Unverified':
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
    case 'Expired':
      return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
    case 'Recalled':
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' };
    case 'Suspicious':
      return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' };
    case 'Rejected':
      return { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/30' };
    case 'Expiring Soon':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
  }
}

export function getAWaReStyle(category?: AWaReCategory): { bg: string; text: string; label: string } {
  switch (category) {
    case 'Access':
      return { bg: 'bg-emerald-950 text-emerald-300 border-emerald-800/40', text: 'text-emerald-400', label: 'Access (1st Line)' };
    case 'Watch':
      return { bg: 'bg-amber-950 text-amber-300 border-amber-800/40', text: 'text-amber-400', label: 'Watch (Higher Resistance Risk)' };
    case 'Reserve':
      return { bg: 'bg-rose-950 text-rose-300 border-rose-800/40', text: 'text-rose-400', label: 'Reserve (Last-Resort Only)' };
    default:
      return { bg: 'bg-slate-800 text-slate-300 border-slate-700', text: 'text-slate-400', label: 'Unclassified' };
  }
}

