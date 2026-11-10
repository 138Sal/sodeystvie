import React from 'react';

interface OrthodoxCrossProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const OrthodoxCross: React.FC<OrthodoxCrossProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="9" y1="5.5" x2="15" y2="5.5" />
    <line x1="5" y1="9.5" x2="19" y2="9.5" />
    <line x1="8.5" y1="17.5" x2="15.5" y2="15" />
  </svg>
);
