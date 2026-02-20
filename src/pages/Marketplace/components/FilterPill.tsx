import React from "react";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full cursor-copy text-[11px] font-black uppercase tracking-wide transition-all border select-none ${
      active
        ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
        : "bg-white border-black hover:bg-slate-50"
    }`}
  >
    {label}
  </button>
);

export default FilterPill;
