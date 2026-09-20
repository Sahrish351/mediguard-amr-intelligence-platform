import React from 'react';
import { AlertSeverity, BatchVerificationStatus, AWaReCategory } from '@/types';
import { getSeverityStyle, getBatchStatusStyle, getAWaReStyle } from '@/lib/formatters';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, XCircle, ShieldCheck } from 'lucide-react';

interface SeverityBadgeProps {
  severity: AlertSeverity;
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, className = '' }) => {
  const style = getSeverityStyle(severity);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border} ${className}`}>
      {severity === 'Critical' && <AlertCircle className="w-3 h-3 text-red-400" />}
      {severity === 'High' && <AlertTriangle className="w-3 h-3 text-orange-400" />}
      {severity === 'Medium' && <Clock className="w-3 h-3 text-amber-400" />}
      {severity === 'Low' && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
      <span>{severity}</span>
    </span>
  );
};

interface BatchBadgeProps {
  status: BatchVerificationStatus;
  className?: string;
}

export const BatchBadge: React.FC<BatchBadgeProps> = ({ status, className = '' }) => {
  const style = getBatchStatusStyle(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border} ${className}`}>
      {status === 'Verified' && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
      {status === 'Expired' && <XCircle className="w-3 h-3 text-red-400" />}
      {status === 'Suspicious' && <AlertTriangle className="w-3 h-3 text-orange-400" />}
      {status === 'Pending' && <Clock className="w-3 h-3 text-amber-400" />}
      <span>{status}</span>
    </span>
  );
};

interface AWaReBadgeProps {
  category?: AWaReCategory;
  classification?: AWaReCategory;
  className?: string;
}

export const AWaReBadge: React.FC<AWaReBadgeProps> = ({ category, classification, className = '' }) => {
  const cat = category || classification;
  const style = getAWaReStyle(cat);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider border ${style.bg} ${className}`}>
      {cat || 'Unclassified'}
    </span>
  );
};

