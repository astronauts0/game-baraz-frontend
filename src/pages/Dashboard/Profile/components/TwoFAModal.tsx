import React from "react";
import { Smartphone, QrCode, Copy, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import { MOCK_2FA_SECRET } from "../data";

interface TwoFAModalProps {
  isOpen: boolean;
  isLoading: boolean;
  qrStep: boolean;
  otpCode: string;
  onClose: () => void;
  onOtpChange: (val: string) => void;
  onGoNext: () => void;
  onGoBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TwoFAModal: React.FC<TwoFAModalProps> = ({
  isOpen,
  isLoading,
  qrStep,
  otpCode,
  onClose,
  onOtpChange,
  onGoNext,
  onGoBack,
  onSubmit,
}) => {
  const handleCopySecret = () => {
    navigator.clipboard.writeText(MOCK_2FA_SECRET).catch(() => {});
  };

  return (
    <ModalPrimary
      isOpen={isOpen}
      onClose={onClose}
      title="Setup Two-Factor Authentication"
    >
      <div className="space-y-5 pt-2">
        {qrStep ? (
          /* Step 1: Scan QR */
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Open your authenticator app and scan the QR code below, or
              manually enter the key.
            </p>

            <div className="bg-background p-4 inline-block rounded-2xl border-2 border-border shadow-sm">
              <QrCode size={148} className="text-foreground" />
            </div>

            <div className="bg-muted/50 p-3 rounded-xl flex items-center justify-between border border-border">
              <code className="text-xs font-mono font-bold text-foreground tracking-wider">
                {MOCK_2FA_SECRET}
              </code>
              <button
                type="button"
                onClick={handleCopySecret}
                className="text-primary hover:text-primary/80 transition-colors ml-2"
                title="Copy Key"
              >
                <Copy size={14} />
              </button>
            </div>

            <Button className="w-full" onClick={onGoNext}>
              I've Scanned the Code <RefreshCw size={14} className="ml-1" />
            </Button>
          </div>
        ) : (
          /* Step 2: Verify OTP */
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone size={22} />
              </div>
              <h4 className="font-bold text-foreground">
                Enter Verification Code
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Enter the 6-digit code from your authenticator app.
              </p>
            </div>

            <Input
              value={otpCode}
              onChange={(e) => onOtpChange(e.target.value)}
              className="text-center text-2xl tracking-[0.5em] font-mono h-14"
              placeholder="000000"
              autoFocus
              inputMode="numeric"
              maxLength={6}
            />

            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={onGoBack}>
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={otpCode.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify & Enable"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </ModalPrimary>
  );
};

export default TwoFAModal;
