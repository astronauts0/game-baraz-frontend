import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormValues } from "@/validations";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isPending?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isPending }) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <div className="w-full">
      {/* Header Structure Same as ContactForm */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4 group">
          <RotateBox className="bg-slate-900 text-white">
            <Lock className="w-5 h-5" />
          </RotateBox>
          <div>
            <h3 className="font-display font-black text-xl">Welcome Back</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Secure Transmission Active
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="text-right">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-0.5">
              Identity
            </span>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Verification
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1 ">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail size={16} />
                    </div>
                    <Input
                      placeholder="email@site.com"
                      type="email"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-bold text-[10px]" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center pr-1">
                  <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1 ">
                    Password
                  </FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock size={16} />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      className="pl-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-20"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-bold text-[10px]" />
              </FormItem>
            )}
          />

          {/* Remember Me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0 bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 rounded-md border-slate-300 cursor-pointer"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs font-medium  group-hover:text-slate-700 transition-colors select-none cursor-pointer">
                    Remember this device for 30 days
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button size="lg" className="w-full group" disabled={isPending}>
              {isPending ? "Signing in..." : "Access Account"}
              <AnimatedArrow direction="right" iconClassName="text-white">
                <ArrowRight className="text-white" />
              </AnimatedArrow>
            </Button>
          </div>

          <div className="mt-6 text-center border-t border-slate-100 pt-5">
            <p className=" text-xs font-medium">
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
          <div className="mt-8 flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50">
              <CheckCircle2 size={12} className="text-emerald-500" />
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
                Connection Fully Encrypted
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
