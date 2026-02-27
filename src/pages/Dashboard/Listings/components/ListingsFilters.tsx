import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusType = "All" | "Active" | "Draft" | "Sold";

interface ListingsFiltersProps {
  statusFilter: StatusType;
  setStatusFilter: (status: StatusType) => void;
}

export const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const tabs: StatusType[] = ["All", "Active", "Draft", "Sold"];

  return (
    <div className="border-b border-border pb-0.5 mt-12">
      <Tabs
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value as StatusType)}
        className="w-full"
      >
        <TabsList
          variant="line"
          className="h-auto w-1/2 p-0 bg-transparent justify-start gap-8"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-0 pb-3 text-sm font-bold tracking-wide data-[state=active]:text-primary after:bg-primary rounded-none shadow-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
