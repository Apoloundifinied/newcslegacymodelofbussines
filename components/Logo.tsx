
import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tactical Chevrons */}
        <path d="M10 40L30 60L10 80" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M25 35L45 55L25 75" fill="none" stroke="currentColor" strokeWidth="8" />
        
        {/* Soldier Silhouette Approximation */}
        <path d="M40 70 C 40 60, 50 50, 60 45 L 75 45 L 85 42 L 85 48 L 75 52 L 65 52 L 60 70 Z" />
        <circle cx="55" cy="40" r="6" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter uppercase italic">CS:GO</span>
        <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-70">Legacy</span>
      </div>
    </div>
  );
};

export default Logo;
