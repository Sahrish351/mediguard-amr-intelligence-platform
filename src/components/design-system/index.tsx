import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus, AlertCircle, RefreshCw } from 'lucide-react';

// =====================================================================
// BUTTON COMPONENT
// =====================================================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'ai' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantClasses = {
    primary: 'bg-[#0B1F3A] hover:bg-[#142d52] text-white shadow-sm focus:ring-[#0B1F3A]',
    secondary: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-sm focus:ring-[#0284C7]',
    teal: 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-sm focus:ring-[#0D9488]',
    ai: 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white shadow-md shadow-indigo-500/20 focus:ring-[#6366F1]',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
    danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-sm focus:ring-[#DC2626]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <RefreshCw className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

// =====================================================================
// SECTION HEADER
// =====================================================================
export interface SectionHeaderProps {
  badge?: string;
  badgeColor?: 'blue' | 'teal' | 'indigo' | 'amber' | 'rose';
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeColor = 'blue',
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const badgeStyles = {
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div
      className={`space-y-3 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'
      } ${className}`}
    >
      {badge && (
        <div className={`inline-flex items-center ${align === 'center' ? 'justify-center' : ''}`}>
          <span
            className={`text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight font-heading leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// =====================================================================
// METRIC CARD COMPONENT
// =====================================================================
export interface MetricProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    isPositive?: boolean;
  };
  accentColor?: 'teal' | 'blue' | 'indigo' | 'rose' | 'amber';
}

export const Metric: React.FC<MetricProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  accentColor = 'teal',
}) => {
  const iconBg = {
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    blue: 'bg-sky-50 text-sky-700 border-sky-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow space-y-3 text-left">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
          {label}
        </span>
        {Icon && (
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${iconBg[accentColor]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] font-mono tracking-tight">
          {value}
        </div>
        {(subtext || trend) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 font-bold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.direction === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
                {trend.direction === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
                {trend.direction === 'neutral' && <Minus className="w-3.5 h-3.5" />}
                {trend.value}
              </span>
            )}
            {subtext && <span className="text-slate-500 truncate">{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================================
// CHART CARD CONTAINER
// =====================================================================
export interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badge,
  action,
  children,
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 text-left ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] font-heading">{title}</h3>
            {badge && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="w-full pt-2">{children}</div>
    </div>
  );
};

// =====================================================================
// IMAGE CARD COMPONENT
// =====================================================================
export interface ImageCardProps {
  imageUrl: string;
  alt: string;
  badge?: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  alt,
  badge,
  title,
  description,
  stats,
  className = '',
}) => {
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-2xs hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="relative h-52 sm:h-60 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
        {badge && (
          <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 border border-white/50 shadow-xs">
            {badge}
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4 text-left">
          <h4 className="text-lg font-bold text-white font-heading">{title}</h4>
        </div>
      </div>

      <div className="p-5 text-left space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{description}</p>

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            {stats.map((st, i) => (
              <div key={i} className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-500 block font-heading">
                  {st.label}
                </span>
                <span className="text-sm font-mono font-bold text-[#0B1F3A]">{st.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================================
// EMPTY STATE COMPONENT
// =====================================================================
export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = AlertCircle,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-slate-200 max-w-lg mx-auto space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto border border-sky-100 shadow-2xs">
        <Icon className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-[#0B1F3A] font-heading">{title}</h4>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

// =====================================================================
// LOADING SKELETON STATE
// =====================================================================
export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div className="space-y-4 w-full animate-pulse p-6 bg-white rounded-3xl border border-slate-200">
      <div className="h-6 bg-slate-100 rounded-lg w-1/3" />
      <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
      <div className="space-y-2 pt-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-50 rounded-xl w-full" />
        ))}
      </div>
    </div>
  );
};

// =====================================================================
// STATUS BADGE COMPONENT
// =====================================================================
export interface StatusBadgeProps {
  status: string;
  type?: 'severity' | 'verification' | 'general';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const norm = status.toLowerCase();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';

  if (norm.includes('critical') || norm.includes('recalled') || norm.includes('rejected') || norm.includes('resistant')) {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (norm.includes('high') || norm.includes('warning') || norm.includes('suspicious') || norm.includes('watch')) {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (norm.includes('verified') || norm.includes('active') || norm.includes('normal') || norm.includes('access') || norm.includes('susceptible')) {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (norm.includes('reserve') || norm.includes('intermediate') || norm.includes('pending')) {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }

  return (
    <span className={`inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style}`}>
      {status}
    </span>
  );
};

// =====================================================================
// PAGE HEADER COMPONENT
// =====================================================================
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'teal' | 'indigo' | 'amber' | 'rose';
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeColor = 'teal',
  breadcrumbs,
  actions,
  className = '',
}) => {
  const badgeStyles = {
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className={`space-y-3 pb-6 border-b border-slate-200/80 mb-6 ${className}`}>
      {breadcrumbs && <div className="text-xs text-slate-500">{breadcrumbs}</div>}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight font-heading">
              {title}
            </h1>
            {badge && (
              <span
                className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${badgeStyles[badgeColor]}`}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

// =====================================================================
// CARD COMPONENT
// =====================================================================
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

// =====================================================================
// FORM INPUT & SELECT COMPONENTS
// =====================================================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 text-left w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`block w-full rounded-xl border ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-200 focus:border-[#0284C7] focus:ring-sky-100'
          } bg-white px-3.5 py-2.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all ${
            Icon ? 'pl-10' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  children,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 text-left w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`block w-full rounded-xl border ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-200 focus:border-[#0284C7] focus:ring-sky-100'
        } bg-white px-3.5 py-2.5 text-sm text-[#0B1F3A] focus:outline-none focus:ring-4 transition-all ${className}`}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

// =====================================================================
// ALERT NOTIFICATION COMPONENT
// =====================================================================
export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'critical';
  title?: string;
  message: string;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export const AlertBanner: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  action,
  className = '',
}) => {
  const styles = {
    info: 'bg-sky-50 text-sky-900 border-sky-200',
    success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    critical: 'bg-rose-50 text-rose-900 border-rose-200',
  };

  const iconColors = {
    info: 'text-sky-600',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    critical: 'text-rose-600',
  };

  return (
    <div
      role="alert"
      className={`p-4 rounded-2xl border flex items-start gap-3 text-left transition-all ${styles[type]} ${className}`}
    >
      <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[type]}`} />
      <div className="flex-1 space-y-0.5">
        {title && <h5 className="font-bold text-sm font-heading">{title}</h5>}
        <p className="text-xs sm:text-sm leading-relaxed opacity-95">{message}</p>
        {action && <div className="pt-2">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1.5 py-0.5 rounded-md hover:bg-black/5"
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// =====================================================================
// ERROR STATE COMPONENT
// =====================================================================
export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-8 text-center rounded-3xl bg-rose-50/50 border border-rose-200 max-w-md mx-auto space-y-4 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto border border-rose-200">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-rose-900 font-heading">{title}</h4>
        <p className="text-xs sm:text-sm text-rose-700 max-w-sm mx-auto leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} icon={RefreshCw}>
          Retry Operation
        </Button>
      )}
    </div>
  );
};

// =====================================================================
// STEPPER COMPONENT
// =====================================================================
export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors border ${
                    isCompleted
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : isCurrent
                      ? 'bg-sky-600 border-sky-600 text-white ring-4 ring-sky-100'
                      : 'bg-white border-slate-300 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-heading ${
                    isCurrent ? 'font-bold text-[#0B1F3A]' : isCompleted ? 'font-semibold text-teal-800' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[10px] text-slate-400 hidden sm:block truncate w-full">
                    {step.description}
                  </span>
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 -mt-5 ${
                    idx < currentStep ? 'bg-teal-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================================
// TABS COMPONENT
// =====================================================================
export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: LucideIcon;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 gap-1 overflow-x-auto max-w-full ${className}`}
    >
      {tabs.map((t) => {
        const isActive = activeTab === t.id;
        const Icon = t.icon;

        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-white text-[#0B1F3A] font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            <span>{t.label}</span>
            {t.badge !== undefined && (
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-teal-50 text-teal-700' : 'bg-slate-200/70 text-slate-600'
                }`}
              >
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};


