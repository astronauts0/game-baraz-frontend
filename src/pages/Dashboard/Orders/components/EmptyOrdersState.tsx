import { Search } from "lucide-react";

export const EmptyOrdersState = () => (
  <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
    <div className="p-3 bg-slate-50 rounded-full mb-3 text-slate-300">
      <Search size={32} />
    </div>
    <p className="text-slate-900 font-bold">No orders found</p>
    <p className="text-slate-500 text-sm mt-1">
      Try adjusting your search or filters.
    </p>
  </div>
);
