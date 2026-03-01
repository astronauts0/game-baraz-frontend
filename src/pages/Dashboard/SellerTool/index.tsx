import React from "react";
import { BarChart3, Layers, RefreshCw, AlertCircle } from "lucide-react";

import { useSellerTool, PLATFORM_FEE_PERCENT } from "./useSellerTool";
import { KPICards } from "./components/KPICards";
import { InputConsole } from "./components/InputConsole";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { BreakdownTab } from "./components/BreakdownTab";
import { HistoryTab } from "./components/HistoryTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import ContainerDiv from "@/components/shared/ContainerDiv";
import SectionTop from "@/components/global/SectionTop";

const SellerToolsPage: React.FC = () => {
  const { state, actions } = useSellerTool();

  return (
    <ContainerDiv className="py-10 sm:py-20 space-y-6">
      <SectionTop
        title="Profit Simulator"
        description="Calculate your potential profit on every sale."
      />

      <KPICards
        netProfit={state.netProfit}
        roi={state.roi}
        profitMargin={state.profitMargin}
        breakEven={state.breakEven}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <InputConsole
          editingId={state.editingId}
          assetName={state.assetName}
          setAssetName={actions.setAssetName}
          costPrice={state.costPrice}
          setCostPrice={actions.setCostPrice}
          miscCosts={state.miscCosts}
          setMiscCosts={actions.setMiscCosts}
          listingPrice={state.listingPrice}
          setListingPrice={actions.setListingPrice}
          platformFeePercent={PLATFORM_FEE_PERCENT}
          platformFeeAmount={state.platformFeeAmount}
          handleCancelEdit={actions.handleCancelEdit}
          handleSaveOrUpdateScenario={actions.handleSaveOrUpdateScenario}
          cp={state.cp}
          lp={state.lp}
          misc={state.misc}
        />

        <div className="lg:col-span-8">
          <Tabs
            value={state.activeTab}
            onValueChange={(val) => actions.setActiveTab(val as any)}
            className="w-full flex flex-col min-h-[600px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <BarChart3 size={16} /> Analytics
              </TabsTrigger>
              <TabsTrigger
                value="breakdown"
                className="flex items-center gap-2"
              >
                <Layers size={16} /> Breakdown
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <RefreshCw size={16} /> History
              </TabsTrigger>
            </TabsList>

            <div className="pt-6 flex-1">
              <TabsContent value="analytics" className="m-0 h-full">
                <AnalyticsTab
                  portfolioStats={state.portfolioStats}
                  barChartData={state.barChartData}
                  pieChartData={state.pieChartData}
                />
              </TabsContent>

              <TabsContent value="breakdown" className="m-0 h-full">
                <BreakdownTab
                  lp={state.lp}
                  cp={state.cp}
                  platformFeePercent={PLATFORM_FEE_PERCENT}
                  platformFeeAmount={state.platformFeeAmount}
                  misc={state.misc}
                  netProfit={state.netProfit}
                  profitMargin={state.profitMargin}
                />
              </TabsContent>

              <TabsContent value="history" className="m-0 h-full">
                <HistoryTab
                  portfolioStats={state.portfolioStats}
                  searchTerm={state.searchTerm}
                  handleSearchChange={actions.handleSearchChange}
                  displayedScenarios={state.displayedScenarios}
                  filteredScenarios={state.filteredScenarios}
                  handleEditScenario={actions.handleEditScenario}
                  setDeleteId={(id) => actions.setDeleteId(id)}
                  currentPage={state.currentPage}
                  totalPages={state.totalPages}
                  handlePageChange={actions.handlePageChange}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <ModalPrimary
        isOpen={!!state.deleteId}
        onClose={() => actions.setDeleteId(null)}
        title="Delete Plan"
      >
        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle className="text-red-600 shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-red-900">
                Confirm Deletion
              </h4>
              <p className="text-xs text-red-700 mt-1">
                Permanently remove this budget plan?
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => actions.setDeleteId(null)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={actions.confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </ModalPrimary>
    </ContainerDiv>
  );
};

export default SellerToolsPage;
