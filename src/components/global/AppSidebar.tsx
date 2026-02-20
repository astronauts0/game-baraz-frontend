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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
        <SidebarMenu className="gap-2">
          {items.map((item) => {
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
          <Link to="/create-escrow" onClick={() => setOpenMobile(false)}>
            <Button size="lg" className="w-full">
              Start Transaction
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
