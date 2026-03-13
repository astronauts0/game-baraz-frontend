import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

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
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
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
            <h3 className="font-display font-black text-xl">
              Recover Password
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Protocol Override Active
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="text-right">
            <span className="text-[9px] font-black  uppercase tracking-widest block mb-0.5">
              Status
            </span>
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Secure
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1">
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

          <div className="pt-2">
            <Button size="lg" className="w-full group">
              Send Recovery Link
              <AnimatedArrow direction="right" iconClassName="text-white">
                <ArrowRight className="text-white" />
              </AnimatedArrow>
            </Button>
          </div>
        </form>
      </Form>

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
        <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest">
            Protected by GameBazaar Systems
          </span>
        </div>
      </div>
    </div>
  );
};
