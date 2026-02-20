import React from "react";

const FloatingNotification: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div className="bg-white p-4 rounded-2xl border-l-4 border-l-primary flex items-center gap-4 shadow-2xl animate-bounce-slow border border-slate-100 ring-1 ring-black/5">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="icon text-primary text-xl">shopping_cart</span>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase text-primary tracking-widest">
            Just Happened
          </div>
          <div className="text-sm font-bold text-slate-900">
            Someone just bought a Smurf acct. Nice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingNotification;
