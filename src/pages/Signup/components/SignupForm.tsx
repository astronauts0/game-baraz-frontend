import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SignupFormProps {
  role: "buyer" | "seller";
  onPrev: () => void;
  onSubmit: (e: React.SubmitEvent) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  role,
  onPrev,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setProfilePreview(e.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <Button
          type="button"
          variant="ghost"
          onClick={onPrev}
          className="uppercase bg-accent hover:bg-accent/50"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </Button>
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
          {role}
        </span>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-900 mb-1">
          Final Details
        </h2>
        <p className="text-slate-500 font-medium text-xs lg:text-sm">
          Complete your profile to get started.
        </p>
      </div>

      <div className="space-y-4">
        {/* Profile Upload - Professional Design */}
        <div className="flex items-center sm:gap-6 gap-3 p-3 sm:p-5 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
          <div className="relative group">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:border-primary/30 transition-all duration-300">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Camera size={24} strokeWidth={1.5} />
                </div>
              )}
            </div>
            {profilePreview && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                <CheckCircle2 size={14} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Profile Picture
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                JPG, PNG or GIF (Max 1MB)
              </p>
            </div>
            <label className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-primary/30 hover:text-primary cursor-pointer transition-all shadow-sm active:scale-95">
              <Camera size={14} />
              {profilePreview ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Name & Email Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
              Full Name
            </Label>
            <Input
              placeholder="John Doe"
              type="text"
              className="bg-[#F8FAFC] border-slate-200 rounded-xl px-4 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
            />
          </div>

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
        </div>

        {/* Password & Confirm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
              Password
            </Label>
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
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 tracking-widest pl-1">
              Confirm
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10">
                <Lock size={16} />
              </div>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••"
                className="bg-[#F8FAFC] border-slate-200 rounded-xl pl-11 py-3 h-auto text-sm font-bold text-slate-900 focus-visible:ring-primary/10 focus-visible:border-primary placeholder:text-slate-400 shadow-none hover:bg-white hover:border-primary/30 transition-all duration-300"
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
        </div>

        {/* Terms Checkbox */}

        <div className="flex items-start gap-3 mt-2 bg-slate-50 p-3  rounded-xl border border-slate-100 group">
          <div className="relative flex items-center">
            <Checkbox
              id="terms"
              className="w-5 h-5 rounded-md border-slate-300 cursor-pointer"
            />
          </div>
          <Label
            htmlFor="terms"
            className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors select-none leading-normal cursor-pointer flex"
          >
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
          </Label>
        </div>
      </div>

      <Button size={"lg"} className="w-full mt-5 group">
        Create Account
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Button>

      <div className="mt-4 text-center border-t border-slate-100 pt-3">
        <p className="text-slate-500 text-xs font-medium">
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
  );
};
