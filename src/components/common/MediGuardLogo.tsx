import React from 'react';
import { Link } from 'react-router-dom';

interface MediGuardLogoProps {
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  className?: string;
}

export const MediGuardLogo: React.FC<MediGuardLogoProps> = ({
  variant = 'dark',
  showTagline = false,
  size = 'md',
  to = '/',
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', sub: 'text-[11px]' },
    xl: { icon: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs' },
  };

  const { icon, text, sub } = sizeMap[size];

  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900';
  const taglineColor = variant === 'white' ? 'text-slate-300' : 'text-slate-500';

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Engineered Medical Shield with Cross & Surveillance Pulse */}
      <div className={`relative ${icon} shrink-0`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="mg-shield-gradient" x1="4" y1="2" x2="40" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="0.5" stopColor="#0369A1" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="mg-pulse-gradient" x1="10" y1="22" x2="34" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#0D9488" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>

          {/* Shield Base */}
          <path
            d="M22 2.5C31.5 6.5 38 6.5 38 6.5C38 21.5 31.8 35.5 22 41.5C12.2 35.5 6 21.5 6 6.5C6 6.5 12.5 6.5 22 2.5Z"
            fill="url(#mg-shield-gradient)"
          />

          {/* Inner Safety Shield Outline */}
          <path
            d="M22 5.5C29.8 8.8 35.2 8.8 35.2 8.8C35.2 21.2 30.1 33.1 22 38.2C13.9 33.1 8.8 21.2 8.8 8.8C8.8 8.8 14.2 8.8 22 5.5Z"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Medical Cross Overlay */}
          <rect x="20" y="11" width="4" height="20" rx="1.5" fill="white" fillOpacity="0.18" />
          <rect x="12" y="19" width="20" height="4" rx="1.5" fill="white" fillOpacity="0.18" />

          {/* Vital Surveillance Pulse Wave (Signal of Active Intelligence) */}
          <path
            d="M11 22H16.5L18.8 16.5L22.5 27.5L25.5 19L27.5 22H33"
            stroke="url(#mg-pulse-gradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Status Beacon */}
          <circle cx="32" cy="11" r="2.5" fill="#10B981" />
          <circle cx="32" cy="11" r="4.5" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-heading font-extrabold tracking-tight ${text} ${textColor}`}>
            MEDI<span className="text-sky-600">GUARD</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mb-0.5" />
        </div>
        {showTagline && (
          <span className={`font-sans font-medium tracking-wide uppercase mt-1 ${sub} ${taglineColor}`}>
            Medication Safety &amp; AMR Intelligence
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block hover:opacity-95 transition-opacity focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return content;
};

