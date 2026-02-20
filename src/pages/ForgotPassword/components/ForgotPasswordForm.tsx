import React from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ForgotPasswordFormProps {
  onSubmit: (e: React.SubmitEvent) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
          Recover Password
        </h2>
        <p className="text-slate-500 font-medium text-xs lg:text-sm">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Address */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
            Email Address
          </Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10">
              <Mail size={16} />
            </div>
            <Input
              placeholder="email@site.com"
              type="email"
              className="bg-[#F8FAFC] border-slate-200 rounded-xl pl-11 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
              required
            />
          </div>
        </div>

        <Button size={"lg"} className="w-full group">
          Send Recovery Link
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>

      <div className="mt-8 text-center border-t border-slate-100 pt-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:underline transition-all"
        >
          <ArrowLeft size={14} />
          Back to Login
        </Link>
      </div>

      {/* Security Footer */}
      <div className="mt-auto pt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Protected by GameBazaar Systems
          </span>
        </div>
      </div>
    </form>
  );
};
