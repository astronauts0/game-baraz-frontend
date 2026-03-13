import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Phone,
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
import { signupSchema, type SignupFormValues } from "@/validations";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface SignupFormProps {
  role: "buyer" | "seller";
  onPrev: () => void;
  onSubmit: (values: SignupFormValues) => void;
  isPending?: boolean;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  role,
  onPrev,
  onSubmit,
  isPending,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      contact_number: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  return (
    <div className="w-full">
      {/* Header Structure Same as ContactForm */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4 group">
          <RotateBox className="bg-slate-900 text-white">
            <Button
              type="button"
              variant="ghost"
              onClick={onPrev}
              className="p-0 h-auto hover:bg-transparent hover:text-white"
            >
              <ArrowLeft size={20} />
            </Button>
          </RotateBox>
          <div>
            <h3 className="font-display font-black text-xl">Final Details</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Endpoint Encryption Active
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-widest block mb-0.5">
              Role
            </span>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {role}
            </span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name & Email Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase  tracking-widest pl-1">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage className="font-bold text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase  tracking-widest pl-1">
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
          </div>

          {/* Contact Number */}
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase  tracking-widest pl-1">
                  Contact Number
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Phone size={16} />
                    </div>
                    <Input
                      placeholder="+92 3XX XXXXXXX"
                      type="tel"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="font-bold text-[10px]" />
              </FormItem>
            )}
          />

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase  tracking-widest pl-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-20"
                      >
                        {showPassword ? (
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase  tracking-widest pl-1">
                    Confirm
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Lock size={16} />
                      </div>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
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
          </div>

          {/* Terms Checkbox */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 group">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-5 h-5 rounded-md border-slate-300 cursor-pointer"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs font-medium  group-hover:text-slate-700 transition-colors select-none cursor-pointer flex">
                    <div>
                      <span>I agree to the</span>{" "}
                      <Link
                        to="/terms-and-condition"
                        className="text-primary font-bold underline underline-offset-[3px] link_right"
                      >
                        Terms
                      </Link>{" "}
                      <span> and </span>{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-primary font-bold underline underline-offset-[3px] link_right"
                      >
                        <span> Privacy Policy</span>
                      </Link>
                    </div>
                  </FormLabel>
                </div>
                <FormMessage className="font-bold text-[10px]" />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button size="lg" className="w-full group" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
              <AnimatedArrow direction="right" iconClassName="text-white">
                <ArrowRight className="text-white" />
              </AnimatedArrow>
            </Button>
          </div>

          <div className="mt-4 text-center border-t border-slate-100 pt-3">
            <p className=" text-xs font-medium">
              Already have an account?
              <Link
                to="/login"
                className="text-primary font-black hover:underline ml-1 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
