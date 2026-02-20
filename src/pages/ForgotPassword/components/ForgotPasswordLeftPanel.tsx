import React from "react";
import { ShieldCheck, Mail, Key, HelpCircle } from "lucide-react";
import Logo from "@/components/global/Logo";

export const ForgotPasswordLeftPanel: React.FC = () => {
  return (
    <div className="w-full bg-primary p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
      <div className="relative z-10 signup-content mt-2">
        <Logo className="text-white" />
        <div className="font-mono text-xs mt-8 font-bold text-black uppercase tracking-[0.2em]">
          Account Recovery
        </div>
        <h1 className="text-3xl lg:text-4xl font-display font-black text-white leading-[1.1] tracking-tight">
          Restore Your Access
        </h1>
      </div>

      <div className="relative z-10 space-y-6 signup-content mt-8 lg:mt-0">
        {/* Feature Highlights */}
        <div className="space-y-5">
          <HighlightItem
            icon={<ShieldCheck size={20} />}
            text="Secure Recovery Protocol"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
          <HighlightItem
            icon={<Mail size={20} />}
            text="Instant Email Verification"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
          <HighlightItem
            icon={<Key size={20} />}
            text="Multi-Factor Protection"
            iconColor="text-white"
            bg="bg-white/10"
            border="border-white/20"
          />
        </div>

        {/* Badge */}
        <div className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md shadow-sm flex items-start gap-4 max-w-sm">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <HelpCircle className="text-white" size={24} />
          </div>
          <div>
            <div className="text-sm font-black text-white mb-1">
              Need Assistance?
            </div>
            <div className="text-[10px] font-medium text-white/70 leading-relaxed">
              Our security team is available 24/7 to help you regain access to
              your vault.
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
