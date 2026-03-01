import React from "react";
import { FileText, Tag, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface BreakdownTabProps {
  lp: number;
  cp: number;
  platformFeePercent: number;
  platformFeeAmount: number;
  misc: number;
  netProfit: number;
  profitMargin: number;
}

export const BreakdownTab: React.FC<BreakdownTabProps> = ({
  lp,
  cp,
  platformFeePercent,
  platformFeeAmount,
  misc,
  netProfit,
  profitMargin,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="font-serif font-bold flex items-center gap-2">
            <FileText size={20} className="text-muted-foreground" /> Financial
            Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 p-4 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-600">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Gross Revenue
                </p>
                <p className="text-sm font-medium text-slate-400">
                  Listing Price
                </p>
              </div>
            </div>
            <p className="text-xl font-mono font-bold text-slate-900">
              Rs {lp.toLocaleString()}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Deductions & Costs
            </p>

            <div className="flex justify-between items-center px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-slate-200 rounded-full group-hover:bg-amber-400 transition-colors"></div>
                <span className="text-sm font-medium text-slate-600">
                  Asset Cost Price
                </span>
              </div>
              <span className="font-mono text-slate-600">
                - Rs {cp.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-slate-200 rounded-full group-hover:bg-red-400 transition-colors"></div>
                <div>
                  <span className="text-sm font-medium text-slate-600 block">
                    Platform Fee
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {platformFeePercent}% of Sale Price
                  </span>
                </div>
              </div>
              <span className="font-mono text-red-500">
                - Rs {platformFeeAmount.toLocaleString()}
              </span>
            </div>

            {misc > 0 && (
              <div className="flex justify-between items-center px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-slate-200 rounded-full group-hover:bg-orange-400 transition-colors"></div>
                  <span className="text-sm font-medium text-slate-600">
                    Miscellaneous
                  </span>
                </div>
                <span className="font-mono text-slate-600">
                  - Rs {misc.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100 my-6"></div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold text-slate-900">Net Profit</p>
              <p className="text-xs text-slate-500">Cash in hand</p>
            </div>
            <div
              className={`text-right ${netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              <p className="text-2xl font-mono font-bold">
                Rs {netProfit.toLocaleString()}
              </p>
              <p className="text-xs font-medium bg-slate-50 inline-block px-2 py-0.5 rounded mt-1 border border-slate-100">
                {profitMargin.toFixed(1)}% Margin
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/30 p-6 border-t flex flex-col items-stretch">
          <div className="flex h-4 w-full rounded-full overflow-hidden shadow-inner bg-secondary">
            <div
              style={{
                width: `${Math.min(((cp + misc) / lp) * 100, 100) || 0}%`,
              }}
              className="bg-slate-400 h-full"
            ></div>
            <div
              style={{ width: `${lp > 0 ? platformFeePercent : 0}%` }}
              className="bg-red-400 h-full"
            ></div>
            <div className="flex-1 bg-emerald-500 h-full"></div>
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div> Cost
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div> Fees
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Profit
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="flex gap-3 px-4">
        <AlertCircle size={16} className="text-slate-400 shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-600">Pro Tip:</span> To increase
          your margin by 5%, consider listing on weekends when demand for this
          asset category peaks by 14%.
        </p>
      </div>
    </div>
  );
};
