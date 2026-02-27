import React from "react";
import { TrendingUp, Box, Star, Activity } from "lucide-react";
import { RECENT_OPERATIONS } from "@/constants";
import StatCard from "../../components/shared/StatCard";
import RecentOperations from "./components/recent-operations";
import ContainerDiv from "@/components/shared/ContainerDiv";
import BackgroundFx from "@/components/shared/BackgroundFx";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { DownToUpCurveSvg } from "@/components/Svgs";
import { Badge } from "@/components/ui/badge";
import DashboardSalesChart from "./components/DashboardSalesChart";
import DashboardPieChart from "./components/DashboardPieChart";
import QuickActions from "./components/QuickActions";
import SectionTop from "@/components/global/SectionTop";

const Dashboard: React.FC = () => {
  return (
    <ContainerDiv className="py-10 md:py-20 space-y-8">
      <BackgroundFx from="from-primary/25" />
      {/* Page Title & Status */}
      <SectionTop
        title="Operative Dashboard"
        description="Track and manage your asset transactions."
      >
        <SectionBadge className="w-fit">System Online</SectionBadge>
      </SectionTop>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Earnings"
          value="Rs 4,285,900"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
          subContent={
            <div className="h-8 md:w-24">
              <DownToUpCurveSvg />
            </div>
          }
        />
        <StatCard
          label="Active Listings"
          value="142"
          icon={Box}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
          subContent={
            <div className="h-8 w-8 rounded bg-purple-50 flex items-center justify-center">
              <Activity size={16} className="text-purple-400" />
            </div>
          }
        />
        <StatCard
          label="Operative Rank"
          value={
            <div className="flex items-baseline gap-1">
              99.8{" "}
              <span className="text-lg text-slate-400 font-medium">/100</span>
            </div>
          }
          icon={Star}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
          subContent={
            <Badge className="bg-amber-100 text-amber-700 text-[10px] font-bold border-amber-200">
              Elite Operative
            </Badge>
          }
        />
      </div>

      {/* Main Content Layout - Grid on PC */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info (2/3 width on PC) */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardSalesChart />
          <RecentOperations data={RECENT_OPERATIONS} />
        </div>

        {/* Right Column - Secondary Info (1/3 width on PC) */}
        <div className="space-y-8">
          <DashboardPieChart />
          <QuickActions />
        </div>
      </div>
    </ContainerDiv>
  );
};

export default Dashboard;
