import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ShoppingBag,
  ShieldCheck,
  BookOpen,
  Image as ImageIcon,
  ShieldAlert,
  Zap,
  ChevronRight,
  LayoutDashboard,
  PlusCircle,
  List,
  Package,
  Wallet as WalletIcon,
  Calculator,
  User,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const items = [
  {
    title: "Loot",
    url: "/marketplace",
    icon: ShoppingBag,
    color: "text-blue-500",
  },
  {
    title: "Safehouse",
    url: "/safehouse",
    icon: ShieldCheck,
    color: "text-emerald-500",
  },
  {
    title: "How it works",
    url: "/how-it-works",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    title: "Journal",
    url: "/blog",
    icon: BookOpen,
    color: "text-purple-500",
  },
  {
    title: "Showcase",
    url: "/gallery",
    icon: ImageIcon,
    color: "text-pink-500",
  },
  {
    title: "Anti-Fraud",
    url: "/antifraud",
    icon: ShieldAlert,
    color: "text-red-500",
  },
];

const dashboardItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    color: "text-indigo-500",
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: ShoppingBag,
    color: "text-blue-500",
  },
  {
    title: "Sell Asset",
    url: "/dashboard/sell",
    icon: PlusCircle,
    color: "text-emerald-500",
  },
  {
    title: "My Listings",
    url: "/dashboard/listings",
    icon: List,
    color: "text-amber-500",
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Package,
    color: "text-purple-500",
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: WalletIcon,
    color: "text-pink-500",
  },
  {
    title: "Tools",
    url: "/dashboard/tools",
    icon: Calculator,
    color: "text-slate-500",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar side="left" collapsible="offcanvas" className="z-[100]">
      <SidebarHeader className="p-6 border-b border-slate-100">
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-all">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight uppercase leading-tight">
              GameBazaar
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
              The Secure Nexus
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-8">
        {/* User Profile - Mobile Only */}
        <div className="lg:hidden mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src="https://picsum.photos/100/100" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  AP
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Agent Phoenix
              </p>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">
                Level 5 Operative
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                Balance
              </p>
              <p className="text-xs font-bold text-slate-900">Rs 48,250</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                Rating
              </p>
              <p className="text-xs font-bold text-slate-900">4.9/5.0</p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              to="/profile"
              onClick={() => setOpenMobile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors text-slate-600"
            >
              <User size={16} className="text-slate-400" />
              <span className="text-sm font-medium">My Profile</span>
            </Link>
            <Link
              to="/dashboard/wallet"
              onClick={() => setOpenMobile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors text-slate-600"
            >
              <WalletIcon size={16} className="text-slate-400" />
              <span className="text-sm font-medium">Wallet</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => setOpenMobile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors text-slate-600"
            >
              <Shield size={16} className="text-slate-400" />
              <span className="text-sm font-medium">Security</span>
            </Link>
            <Link
              to="/help"
              onClick={() => setOpenMobile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors text-slate-600"
            >
              <HelpCircle size={16} className="text-slate-400" />
              <span className="text-sm font-medium">Help Center</span>
            </Link>
            <div className="h-px bg-slate-100 my-2 mx-1" />
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600">
              <LogOut size={16} className="text-red-400" />
              <span className="text-sm font-bold">Logout</span>
            </button>
          </div>
        </div>

        <SidebarMenu className="gap-2">
          {(location.pathname.startsWith("/dashboard")
            ? dashboardItems
            : items
          ).map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "flex items-center justify-between py-2 rounded-xl transition-all duration-200 h-auto",
                    isActive
                      ? "bg-slate-100 text-slate-900 font-bold shadow-sm"
                      : "hover:bg-slate-50 text-slate-500 hover:text-slate-900",
                  )}
                >
                  <Link to={item.url} onClick={() => setOpenMobile(false)}>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          isActive ? "bg-white shadow-sm" : "bg-slate-100/50",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4",
                            isActive ? item.color : "text-slate-400",
                          )}
                        />
                      </div>
                      <span className="text-sm">{item.title}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="flex flex-col gap-3">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold px-2">
            Secure Marketplace
          </p>
          <Link to="/dashboard" onClick={() => setOpenMobile(false)}>
            <Button size="lg" className="w-full">
              Start Transaction
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
