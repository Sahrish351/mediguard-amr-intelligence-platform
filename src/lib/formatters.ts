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
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
      };
    case 'High':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
      };
    case 'Medium':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
      };
    case 'Low':
      return {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
      };
  }
}

export function getBatchStatusStyle(status: BatchVerificationStatus): { bg: string; text: string; border: string } {
  switch (status) {
    case 'Verified':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'Pending':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'Unverified':
      return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
    case 'Expired':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    case 'Recalled':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    case 'Suspicious':
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
    case 'Rejected':
      return { bg: 'bg-zinc-100', text: 'text-zinc-700', border: 'border-zinc-200' };
    case 'Expiring Soon':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
  }
}

export function getAWaReStyle(category?: AWaReCategory): { bg: string; text: string; label: string } {
  switch (category) {
    case 'Access':
      return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'text-emerald-700', label: 'Access (1st Line)' };
    case 'Watch':
      return { bg: 'bg-amber-50 text-amber-800 border-amber-200', text: 'text-amber-700', label: 'Watch (Higher Resistance Risk)' };
    case 'Reserve':
      return { bg: 'bg-rose-50 text-rose-800 border-rose-200', text: 'text-rose-700', label: 'Reserve (Last-Resort Only)' };
    default:
      return { bg: 'bg-slate-100 text-slate-700 border-slate-200', text: 'text-slate-600', label: 'Unclassified' };
  }
}

