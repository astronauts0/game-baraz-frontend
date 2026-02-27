import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = "All" | "Active" | "History";

interface OrdersTabsProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: Tab[] = ["All", "Active", "History"];

export const OrdersTabs = ({ activeTab, onChange }: OrdersTabsProps) => (
  <div className="border-b border-border pb-0.5">
    <Tabs
      value={activeTab}
      onValueChange={(value) => onChange(value as Tab)}
      className="w-full"
    >
      <TabsList
        variant="line"
        className="h-auto w-1/2 p-0 bg-transparent justify-start gap-8"
      >
        {TABS.map((tab) => (
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
