import React from "react";
import {
  Package,
  Zap,
  MessageCircle,
  Lock,
  FileText,
  X,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DeliveryMethodProps {
  credentialFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  showPassword: boolean;
  onTogglePasswordVisibility: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isViewMode?: boolean;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({
  credentialFile,
  onFileChange,
  onRemoveFile,
  showPassword,
  onTogglePasswordVisibility,
  fileInputRef,
  isViewMode = false,
}) => {
  const { control } = useFormContext();
  const deliveryMethod = useWatch({
    control,
    name: "deliveryMethod",
  });

  return (
    <Card className={cn(isViewMode && "opacity-80 pointer-events-none")}>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <Package size={16} className="text-primary" /> Delivery Method
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            control={control}
            name="deliveryMethod"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <div
                    onClick={() => !isViewMode && field.onChange("instant")}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all flex flex-col gap-2 cursor-pointer h-full",
                      field.value === "instant"
                        ? "bg-emerald-50 border-emerald-500 shadow-sm shadow-emerald-100"
                        : "bg-white border-slate-200 hover:border-slate-300",
                    )}
                  >
                    {field.value === "instant" && (
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    )}
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          field.value === "instant"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-500",
                        )}
                      >
                        <Zap
                          size={18}
                          className={cn(
                            field.value === "instant" && "fill-current",
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "font-bold text-sm transition-colors",
                          field.value === "instant"
                            ? "text-emerald-900"
                            : "text-slate-700",
                        )}
                      >
                        Instant Delivery
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-[11px] leading-relaxed transition-colors",
                        field.value === "instant"
                          ? "text-emerald-700"
                          : "text-slate-500",
                      )}
                    >
                      Credentials are securely stored in our vault and delivered
                      instantly.
                    </p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="deliveryMethod"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <div
                    onClick={() => !isViewMode && field.onChange("chat")}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all flex flex-col gap-2 cursor-pointer h-full",
                      field.value === "chat"
                        ? "bg-primary/10 border-primary shadow-sm shadow-primary/10"
                        : "bg-white border-slate-200 hover:border-slate-300",
                    )}
                  >
                    {field.value === "chat" && (
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                    )}
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          field.value === "chat"
                            ? "bg-primary/20 text-primary"
                            : "bg-slate-100 text-slate-500",
                        )}
                      >
                        <MessageCircle size={18} />
                      </div>
                      <span
                        className={cn(
                          "font-bold text-sm transition-colors",
                          field.value === "chat"
                            ? "text-primary"
                            : "text-slate-700",
                        )}
                      >
                        Chat Delivery
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-[11px] leading-relaxed transition-colors",
                        field.value === "chat"
                          ? "text-primary/80"
                          : "text-slate-500",
                      )}
                    >
                      You'll manually share credentials with the buyer via
                      in-app chat.
                    </p>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Credentials Form (Only for Instant) */}
        {deliveryMethod === "instant" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 border-t border-slate-100 pt-6">
              <Lock size={12} /> Vault Configuration
            </div>

            {/* File Upload Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Credentials File (.txt)
              </label>
              <input
                type="file"
                accept=".txt"
                onChange={onFileChange}
                ref={fileInputRef}
                className="hidden"
                disabled={isViewMode}
              />

              {!credentialFile && !isViewMode ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group bg-slate-50/30"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText size={20} className="text-slate-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Click to upload credentials.txt
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Plain text file containing account details
                  </span>
                </div>
              ) : (
                (credentialFile || isViewMode) && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          {credentialFile
                            ? credentialFile.name
                            : "encrypted_creds.txt"}
                        </p>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          {credentialFile
                            ? (credentialFile.size / 1024).toFixed(2)
                            : "1.2"}{" "}
                          KB
                        </p>
                      </div>
                    </div>
                    {!isViewMode && (
                      <button
                        type="button"
                        onClick={onRemoveFile}
                        className="p-1.5 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Protection Password */}
            <FormField
              control={control}
              name="protectionPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    File Protection Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={
                          isViewMode
                            ? "********"
                            : "Create a password to lock the file"
                        }
                        disabled={isViewMode}
                        className="w-full focus-visible:ring-2 focus-visible:ring-emerald-100 focus-visible:border-emerald-500"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={onTogglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-copy"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {!isViewMode && (
                    <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                      <Key size={10} className="text-emerald-500" />{" "}
                      Automatically shared with the buyer post-transaction.
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Info Box (Bank Analogy) */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 mt-4">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg mt-0.5">
                <Lock size={16} />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Biometric Escrow Simulation
                </h4>
                <p className="text-[11px] text-emerald-600/90 font-medium mt-1 leading-relaxed">
                  We secure your credentials in a virtual vault. The buyer
                  receives the encrypted file instantly, but keys are granted
                  only after payment is finalized.
                </p>
              </div>
            </div>
          </div>
        )}

        {deliveryMethod === "chat" && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg mt-0.5">
                <MessageCircle size={16} />
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  Manual Distribution Mode
                </h4>
                <p className="text-[11px] text-primary/80 font-medium mt-1 leading-relaxed">
                  You are responsible for delivery. Once a sale is confirmed,
                  open the transaction chat to share credentials. Platform
                  protection applies only to verified exchanges.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryMethod;
