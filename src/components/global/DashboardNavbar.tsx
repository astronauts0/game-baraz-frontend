import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  User,
  LogOut,
  Calculator,
  Wallet,
  Shield,
  HelpCircle,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";

const DashboardNavbar: React.FC = () => {
  const location = useLocation();
  const currentView = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard") return currentView === "/dashboard";
    return currentView.startsWith(path);
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Sell", path: "/dashboard/sell" },
    { name: "Listings", path: "/dashboard/listings" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Wallet", path: "/dashboard/wallet" },
    { name: "Tools", path: "/dashboard/tools", icon: Calculator },
  ];

  return (
    <nav className="sticky top-3 left-0 w-full z-50 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass_box rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between shadow-xl shadow-slate-200/50 border border-white/40 transition-all duration-300">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1 lg:hidden" />
          <Logo />
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-[13px] xl:text-sm font-semibold text-slate-500">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all link_right flex items-center gap-1.5 relative group ${
                  isActive(link.path) ? "text-primary" : "hover:text-slate-900"
                }`}
              >
                {link.icon && <link.icon size={14} />}
                {link.name}
                {isActive(link.path) && (
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 pointer-events-none text-primary"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M5 15 Q 35 5, 95 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      className="animate_draw"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 border-l border-slate-200 pl-4 sm:pl-6">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-2 hover:bg-slate-50 transition-all rounded-xl focus-visible:ring-0"
                >
                  <div className="relative">
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm transition-all group-hover:shadow-md">
                      <AvatarImage src="https://picsum.photos/100/100" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        AP
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden xl:flex flex-col items-start leading-none gap-1">
                    <span className="text-sm font-bold text-slate-900">
                      Agent Phoenix
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none">
                      Level 5 Operative
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-72 mt-3 p-2 rounded-2xl shadow-2xl border-slate-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right"
              >
                <div className="p-3 mb-2 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    AP
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-slate-900 leading-tight">
                      Agent Phoenix
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      operative.phoenix@gamebazaar.com
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 p-1 mb-2">
                  <div className="text-center p-2 rounded-lg bg-slate-50/80">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      Balance
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Rs 48,250
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-slate-50/80">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      Rating
                    </p>
                    <p className="text-xs font-bold text-slate-900">4.9/5.0</p>
                  </div>
                </div>

                <DropdownMenuLabel className="font-bold text-slate-400 uppercase text-[9px] tracking-[0.2em] px-3 py-1.5 leading-none">
                  Operative Control
                </DropdownMenuLabel>

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-primary focus:text-primary rounded-xl transition-all">
                  <User
                    size={16}
                    className="text-slate-400 group-hover:text-primary"
                  />
                  <span className="text-sm font-medium">My Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-primary focus:text-primary rounded-xl transition-all">
                  <Wallet
                    size={16}
                    className="text-slate-400 group-hover:text-primary"
                  />
                  <span className="text-sm font-medium">Wallet & Payouts</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-primary focus:text-primary rounded-xl transition-all">
                  <Shield
                    size={16}
                    className="text-slate-400 group-hover:text-primary"
                  />
                  <span className="text-sm font-medium">Security Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100 my-2 mx-2" />

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-primary focus:text-primary rounded-xl transition-all">
                  <HelpCircle
                    size={16}
                    className="text-slate-400 group-hover:text-primary"
                  />
                  <span className="text-sm font-medium">Help Center</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 rounded-xl transition-all group">
                  <LogOut
                    size={16}
                    className="text-red-400 group-hover:text-red-600"
                  />
                  <span className="text-sm font-bold tracking-tight">
                    Terminate Session
                  </span>
                </DropdownMenuItem>

                <div className="mt-2 py-2 text-center border-t border-slate-50">
                  <p className="text-[9px] text-slate-300 font-bold tracking-widest uppercase">
                    Operative v2.4.0
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
