import React from "react";

interface GridOptionIconProps {
  count: number;
}

const GridOptionIcon: React.FC<GridOptionIconProps> = ({ count }) => {
  if (count === 3) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0.5" y="2" width="4" height="12" rx="1" />
        <rect x="6" y="2" width="4" height="12" rx="1" />
        <rect x="11.5" y="2" width="4" height="12" rx="1" />
      </svg>
    );
  }
  if (count === 4) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="2" width="2.5" height="12" rx="0.5" />
        <rect x="4.5" y="2" width="2.5" height="12" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="12" rx="0.5" />
        <rect x="11.5" y="2" width="2.5" height="12" rx="0.5" />
      </svg>
    );
  }
  if (count === 5) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <rect x="0" y="2" width="2" height="12" rx="0.5" />
        <rect x="3.5" y="2" width="2" height="12" rx="0.5" />
        <rect x="7" y="2" width="2" height="12" rx="0.5" />
        <rect x="10.5" y="2" width="2" height="12" rx="0.5" />
        <rect x="14" y="2" width="2" height="12" rx="0.5" />
      </svg>
    );
  }
  if (count === 6) {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    );
  }
  return null;
};

export default GridOptionIcon;
