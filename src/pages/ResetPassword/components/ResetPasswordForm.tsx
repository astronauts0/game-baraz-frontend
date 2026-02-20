import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ResetPasswordFormProps {
  onSubmit: (e: React.SubmitEvent) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
          New Credentials
        </h2>
        <p className="text-slate-500 font-medium text-xs lg:text-sm">
          Please enter your new security cipher below.
        </p>
      </div>

      <div className="space-y-4">
        {/* New Password */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
            New Password
          </Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10">
              <Lock size={16} />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              className="bg-[#F8FAFC] border-slate-200 rounded-xl pl-11 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
            Confirm Password
          </Label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10">
              <Lock size={16} />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••"
              className="bg-[#F8FAFC] border-slate-200 rounded-xl pl-11 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button size={"lg"} className="w-full mt-4 group">
          Update Records
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </div>

      {/* Security Footer */}
      <div className="mt-auto pt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50">
          <Lock size={12} className="text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
            Session Fully Secured
          </span>
        </div>
      </div>
    </form>
  );
};
