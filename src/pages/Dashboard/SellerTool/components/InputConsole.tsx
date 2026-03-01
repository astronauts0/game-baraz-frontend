import React from "react";
import { Target, AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InputConsoleProps {
  editingId: string | null;
  assetName: string;
  setAssetName: (val: string) => void;
  costPrice: string;
  setCostPrice: (val: string) => void;
  miscCosts: string;
  setMiscCosts: (val: string) => void;
  listingPrice: string;
  setListingPrice: (val: string) => void;
  platformFeePercent: number;
  platformFeeAmount: number;
  handleCancelEdit: () => void;
  handleSaveOrUpdateScenario: () => void;
  cp: number;
  lp: number;
  misc: number;
}

export const InputConsole: React.FC<InputConsoleProps> = ({
  editingId,
  assetName,
  setAssetName,
  costPrice,
  setCostPrice,
  miscCosts,
  setMiscCosts,
  listingPrice,
  setListingPrice,
  platformFeePercent,
  platformFeeAmount,
  handleCancelEdit,
  handleSaveOrUpdateScenario,
  cp,
  lp,
  misc,
}) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <Card
        className={`transition-all ${editingId ? "border-primary ring-2 ring-primary/20" : ""}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Target size={16} className="text-primary" /> Deal Parameters
          </CardTitle>
          {editingId && (
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
              EDITING MODE
            </span>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">
              Asset Identifier
            </label>
            <Input
              placeholder="e.g. Rare Fortnite Account"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase mb-3 block">
              Cost Analysis
            </label>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs">
                      Rs
                    </span>
                    <Input
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      className="pl-8 bg-slate-50 border-slate-200"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
                    Misc. Costs
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs">
                      Rs
                    </span>
                    <Input
                      type="number"
                      value={miscCosts}
                      onChange={(e) => setMiscCosts(e.target.value)}
                      className="pl-8 bg-slate-50 border-slate-200"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase mb-3 block">
              Sale Strategy
            </label>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1 block">
                  Target Listing Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs">
                    Rs
                  </span>
                  <Input
                    type="number"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    className="pl-8 font-bold border-slate-200"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs font-medium">
                  Platform Fee ({platformFeePercent}%)
                </span>
                <span className="text-xs font-bold">
                  - Rs {platformFeeAmount.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            {editingId && (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
            <Button
              className="flex-2"
              onClick={handleSaveOrUpdateScenario}
              disabled={!assetName || lp === 0}
            >
              <Save size={16} className="mr-2" />{" "}
              {editingId ? "Update" : "Save Scenario"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-3">
        <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-primary uppercase">
            Pricing Intelligence
          </h4>
          <p className="text-xs text-primary/80 mt-1 leading-relaxed">
            To hit a <span className="font-bold">20% Profit Margin</span>, your
            minimum listing price should be
            <span className="font-bold border-b border-primary/30 ml-1">
              Rs {cp > 0 ? (cp * 1.2 + misc).toFixed(0) : "0"}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
