import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onSubmit: (e: React.SubmitEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
          Welcome Back
        </h2>
        <p className="text-slate-500 font-medium text-xs lg:text-sm">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="space-y-4">
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
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center pr-1">
            <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10">
              <Lock size={16} />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              className="bg-[#F8FAFC] border-slate-200 rounded-xl pl-11 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
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

        {/* Remember Me */}
        <div className="flex items-start gap-3 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 group">
          <div className="relative flex items-center">
            <Checkbox
              id="remember"
              className="w-5 h-5 rounded-md border-slate-300 cursor-pointer"
            />
          </div>
          <Label
            htmlFor="remember"
            className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors select-none leading-normal cursor-pointer"
          >
            Remember this device for 30 days
          </Label>
        </div>
      </div>

      <Button size={"lg"} className="w-full mt-8 group">
        Access Account
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Button>

      <div className="mt-6 text-center border-t border-slate-100 pt-5">
        <p className="text-slate-500 text-xs font-medium">
          New operative?
          <Link
            to="/signup"
            className="text-primary font-black hover:underline ml-1 transition-colors"
          >
            Create Your Account
          </Link>
        </p>
      </div>

      {/* Safety Badge */}
      <div className="mt-auto pt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50">
          <Lock size={12} className="text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
            Connection Fully Encrypted
          </span>
        </div>
      </div>
    </form>
  );
};
