
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-auto text-current"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer stylized circuit rings */}
        <path 
          d="M 50 20 A 30 30 0 0 1 80 50" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <circle cx="80" cy="50" r="4" fill="currentColor" />
        
        <path 
          d="M 20 50 A 30 30 0 0 0 50 80" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <circle cx="50" cy="80" r="4" fill="currentColor" />
        
        <path 
          d="M 35 35 A 25 25 0 0 0 25 60" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <circle cx="35" cy="35" r="4" fill="currentColor" />

        {/* Central Core */}
        <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        
        {/* Connecting Nodes */}
        <line x1="50" y1="50" x2="35" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-widest font-serif text-white">OBBY'S</span>
          <span className="text-[10px] tracking-[0.3em] font-sans text-green-500 font-semibold">PC SOLUTIONS</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
