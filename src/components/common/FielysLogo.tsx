import React from 'react';

interface FielysLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'full';
}

export const FielysLogo: React.FC<FielysLogoProps> = ({ 
  className = "w-7 h-7", 
  variant = 'icon' 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg 
        viewBox="0 0 64 64" 
        className="w-full h-full shrink-0 drop-shadow-[0_2px_8px_rgba(6,182,212,0.35)]" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fielys-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#081528" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="fielys-primary" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="fielys-accent" x1="28" y1="18" x2="52" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="fielys-border" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
          <filter id="fielys-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Squircle App Badge Container */}
        <rect x="3" y="3" width="58" height="58" rx="14" fill="url(#fielys-bg)" />
        <rect x="3" y="3" width="58" height="58" rx="14" stroke="url(#fielys-border)" strokeWidth="2" />

        {/* Technical Sub-grid */}
        <path d="M18 3v58M46 3v58M3 18h58M3 46h58" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" />

        {/* Stylized Field Service "F" Monogram */}
        {/* Main Vertical Spine */}
        <path 
          d="M19 16C19 14.8954 19.8954 14 21 14H27C28.1046 14 29 14.8954 29 16V48C29 49.1046 28.1046 50 27 50H21C19.8954 50 19 49.1046 19 48V16Z" 
          fill="url(#fielys-primary)" 
        />

        {/* Top Arm - Dynamic Speed / Forward Chevron Wing */}
        <path 
          d="M29 14H46C47.3807 14 48.3375 15.3524 47.907 16.6439L45.2403 24.6439C44.978 25.4309 44.2374 25.973 43.4072 25.973H29V14Z" 
          fill="url(#fielys-accent)" 
        />

        {/* Middle Arm - Precision Service Tool Prong */}
        <path 
          d="M29 29H39.5C40.7107 29 41.609 30.147 41.3195 31.3255L40.1695 36.0025C39.9576 36.8641 39.183 37.473 38.294 37.473H29V29Z" 
          fill="url(#fielys-primary)" 
        />

        {/* Live GPS Dispatch Beacon Pulse */}
        <circle cx="48" cy="18" r="3.5" fill="#10b981" filter="url(#fielys-glow)" />
        <circle cx="48" cy="18" r="1.5" fill="#ffffff" />

        {/* Service Route Telemetry Line & Node */}
        <circle cx="43" cy="45" r="3" fill="#06b6d4" fillOpacity="0.9" />
        <path d="M29 45H40" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="text-base font-extrabold tracking-wider text-cyan-400 font-sans leading-none">FIELYS</span>
          <span className="text-[10px] font-mono text-slate-400 leading-none mt-1">FSM OS</span>
        </div>
      )}
    </div>
  );
};
