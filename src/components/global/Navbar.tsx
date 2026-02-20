import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { navLinks } from "@/data/appData";
import Logo from "./Logo";
import AnimatedArrow from "../shared/AnimatedArrow";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentView = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentView === "/";
    return currentView.startsWith(path);
  };

  return (
    <nav className="sticky top-3 left-0 w-full z-50 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass_box rounded-2xl px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between shadow-xl shadow-slate-200/50 border border-white/40 transition-all duration-300">
        <Logo />

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold text-slate-500">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all link_right flex items-center gap-1.5 relative group ${
                  isActive(link.path) ? link.color : "hover:text-slate-900"
                }`}
              >
                {link.special && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive(link.path)
                        ? "bg-emerald-600 shrink-0"
                        : "bg-emerald-400 group-hover:bg-emerald-500"
                    }`}
                  ></span>
                )}
                {link.name}
                {isActive(link.path) && (
                  <svg
                    className={`absolute -bottom-1.5 left-0 w-full h-3 pointer-events-none ${
                      link.color === "text-primary"
                        ? "text-primary"
                        : link.color
                    }`}
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

          <Link to="/create-escrow" className="hidden sm:flex group">
            <Button>
              <span>Start Transaction</span>
              <AnimatedArrow
                direction="right"
                iconSpanClassName="group-hover:text-white"
              />
            </Button>
          </Link>
          <SidebarTrigger className="lg:hidden" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
