import React from "react";
import { ShieldCheck, Lock, Zap, Fingerprint } from "lucide-react";
import Logo from "@/components/global/Logo";

export const SignupLeftPanel: React.FC = () => {
  return (
    <div className="w-full bg-primary p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
      <div className="relative z-10 signup-content mt-2">
        <Logo className="text-white" />
        <div className="font-mono text-xs mt-8 font-bold text-black uppercase tracking-[0.2em]">
          Join the Community
        </div>
        <h1 className="text-3xl lg:text-4xl font-display font-black text-white leading-[1.1] tracking-tight">
          Create Your Account
        </h1>
      </div>

      <div className="relative z-10 space-y-6 signup-content mt-8 lg:mt-0">
        {/* Feature Highlights */}
        <div className="space-y-5">
          <HighlightItem
            icon={<ShieldCheck size={20} />}
            text="Identity Verification"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
          <HighlightItem
            icon={<Lock size={20} />}
            text="Escrow Vault Access"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
          <HighlightItem
            icon={<Zap size={20} />}
            text="Instant Activation"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
        </div>

        {/* Badge */}
        <div className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md shadow-sm flex items-start gap-4 max-w-sm">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Fingerprint className="text-white" size={24} />
          </div>
          <div>
            <div className="text-sm font-black text-white mb-1">
              Secure & Private
            </div>
            <div className="text-[10px] font-medium text-white/70 leading-relaxed">
              Your data is encrypted and never shared with third parties.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HighlightItemProps {
  icon: React.ReactNode;
  text: string;
  iconColor: string;
  bg: string;
  border: string;
}

const HighlightItem: React.FC<HighlightItemProps> = ({
  icon,
  text,
  iconColor,
  bg,
  border,
}) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center ${iconColor} shadow-sm backdrop-blur-sm`}
    >
      {icon}
    </div>
    <span className="text-sm font-bold text-white/90">{text}</span>
  </div>
);
