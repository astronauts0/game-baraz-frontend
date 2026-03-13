import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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
import { Button } from "@/components/ui/button";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header Structure Same as ContactForm */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4 group">
          <RotateBox className="bg-slate-900 text-white">
            <Lock className="w-5 h-5" />
          </RotateBox>
          <div>
            <h3 className="font-display font-black text-xl">New Credentials</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Security Cipher Update
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest block mb-0.5">
              Status
            </span>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Isolated
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1">
                  New Password
                </FormLabel>
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

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock size={16} />
                    </div>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••"
                      className="pl-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-20"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-bold text-[10px]" />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button size="lg" className="w-full group">
              Update Records
              <AnimatedArrow direction="right" iconClassName="text-white">
                <ArrowRight className="text-white" />
              </AnimatedArrow>
            </Button>
          </div>
        </form>
      </Form>

      {/* Security Footer */}
      <div className="mt-auto pt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
            Session Fully Secured
          </span>
        </div>
      </div>
    </div>
  );
};
