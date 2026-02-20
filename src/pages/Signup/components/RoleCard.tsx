import { CheckCircle2 } from "lucide-react";
import type React from "react";

interface RoleCardProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  title: string;
  description: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}) => (
  <button
    onClick={onClick}
    className={`w-full group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-5 cursor-pointer ${
      active
        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
        : "border-slate-100 bg-white hover:border-slate-200"
    }`}
  >
    <div
      className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${
        active
          ? "bg-primary text-white"
          : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
      }`}
    >
      <Icon size={28} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3
          className={`font-black text-lg ${
            active ? "text-primary" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        {active && <CheckCircle2 className="text-primary" size={20} />}
      </div>
      <p className="text-xs text-slate-500 font-medium mt-1">{description}</p>
    </div>
  </button>
);

export default RoleCard;
