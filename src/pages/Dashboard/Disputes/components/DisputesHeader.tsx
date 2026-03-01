import React from "react";
import { ShieldAlert } from "lucide-react";

export const DisputesHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-6 shrink-0">
      <div className="p-3 bg-red-100 text-red-600 rounded-xl dark:bg-red-900/30 dark:text-red-500">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-2xl font-bold font-serif tracking-tight text-slate-900 dark:text-slate-100">
          DISPUTE RESOLUTION CENTER
        </h1>
        <p className="text-slate-500 text-sm dark:text-slate-400">
          Manage active cases and communicate with GameBazaar support.
        </p>
      </div>
    </div>
  );
};
