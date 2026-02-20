import React from "react";
import { Link } from "react-router-dom";
import ContainerDiv from "../shared/ContainerDiv";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { footerLinks } from "@/data/appData";
import AnimatedArrow from "../shared/AnimatedArrow";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-primary lg:pt-32 pt-12 lg:pb-12 pb-6 overflow-hidden font-sans">
      <ContainerDiv>
        {/* Top CTA Section */}
        <div className="text-center lg:mb-24 mb-12 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
            READY. SET. GET RICH.
          </h2>
          <p className="text-lg md:text-xl font-medium text-white/90 mb-10 max-w-2xl mx-auto">
            Join millions who stopped getting scammed and started winning.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="group">
              <span>Enter GameBazaar</span>
              <AnimatedArrow direction="right" />
            </Button>
          </Link>
        </div>

        {/* Dark Footer Card */}
        <div className="bg-slate-900 rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 text-white grid grid-cols-1 md:grid-cols-12 gap-12 shadow-2xl relative z-10">
          {/* Column 1: Brand Info (Spans 4 columns on desktop) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full min-h-[180px]">
            <Logo />
            <div className="opacity-70 text-sm leading-relaxed max-w-sm">
              GameBazaar (Private) Limited. We are authorized by the Gamer Gods
              to ensure your loot is safe. No shady business allowed.
            </div>
            <div className="text-xs font-bold mt-8 opacity-50 sm:inline hidden">
              © 2025 GameBazaar. All rights reserved. GG WP.
            </div>
          </div>

          {/* Links Area (Spans 8 columns) */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-4">
                <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-200">
                  {section.title}
                </h4>
                {section.links.map((link, linkIdx) =>
                  link.isExternal ? (
                    <a
                      key={linkIdx}
                      href={link.path}
                      className="text-left text-sm opacity-60 hover:opacity-100 transition-opacity link_right w-fit"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={linkIdx}
                      to={link.path}
                      className="text-left text-sm opacity-60 hover:opacity-100 transition-opacity link_right w-fit"
                    >
                      {link.name}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>

          <div className="text-xs text-center sm:text-left font-bold mt-2 opacity-50 sm:hidden inline">
            © {new Date().getFullYear()} GameBazaar. All rights reserved! GG WP.
          </div>
        </div>
      </ContainerDiv>
    </footer>
  );
};

export default Footer;
