import { FingerprintPattern, HatGlasses, ShieldCheck } from "lucide-react";
import React from "react";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import RotateBox from "@/components/shared/RotateBox";
import SocialSupportCard from "@/pages/ContactUs/components/SocialSupportCard";

const SecurityStats: React.FC = () => {
  return (
    <section id="security" className="sm:py-24 py-10">
      <ContainerDiv>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Security Card */}
          <div className="md:col-span-2 glass_box rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative group">
            <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
              <ShieldCheck size={300} className="text-primary" />
            </div>

            <div className="relative z-10 flex-1">
              <RotateBox className="bg-primary mb-6">
                <ShieldCheck size={24} className="text-white" />
              </RotateBox>
              <h2 className="text-4xl font-extrabold mb-4">
                Fort Knox, But Digital
              </h2>
              <p className="text-slate-500 max-w-md font-medium">
                We use an escrow system so tight, even we can't touch the money
                until the deal is done. No scams, no funny business.
              </p>

              <div className="mt-8 flex items-center gap-6">
                <div>
                  <div className="text-2xl font-bold">$42M+</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Scams Prevented
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Happy Nerds
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 hidden md:block">
              <div className="w-64 h-64 bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center shadow-lg">
                <FingerprintPattern
                  size={84}
                  className="text-primary rotate-10 group-hover:rotate-0 transition-all duration-300"
                />
                <div className="mt-4 font-mono text-[10px] text-slate-400">
                  STATUS: UNHACKABLE
                </div>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="glass_box rounded-2xl p-7 md:p-10 flex gap-5 flex-col justify-between bg-white/60 group">
            <div>
              <RotateBox className="mb-6 bg-black">
                <HatGlasses size={26} className="text-white" />
              </RotateBox>
              <h3 className="text-2xl font-bold mb-2">24/7 Human Support</h3>
              <p className="text-slate-500 text-sm font-medium">
                Real gamers handling your tickets. We know what 'SMURF' and
                'MMR' mean.
              </p>
            </div>
            <Button variant={"outline"} className="h-12">
              Talk to a Human
            </Button>
          </div>

          {/* Global Reach Card */}
          <div className="glass_box rounded-2xl p-7 md:p-8 md:col-span-1 bg-white/60">
            <h4 className="text-xl font-bold mb-4">Global Domination</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Countries Served</span>
                <span className="font-bold">142</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Active Traders</span>
                <span className="font-bold">50,000+</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
          </div>

          <SocialSupportCard
            href="#"
            icon={FaDiscord}
            title="Join the Cult (Discord)"
            subtitle="Chat with us, report bugs, or just post memes."
            className="md:col-span-2"
          />
        </div>
      </ContainerDiv>
    </section>
  );
};

export default SecurityStats;
