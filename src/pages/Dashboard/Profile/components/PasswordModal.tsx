import React from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import type { PasswordForm } from "../types";

interface PasswordModalProps {
  isOpen: boolean;
  isLoading: boolean;
  form: PasswordForm;
  showPassword: boolean;
  onClose: () => void;
  onFormChange: (form: PasswordForm) => void;
  onToggleShowPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  isLoading,
  form,
  showPassword,
  onClose,
  onFormChange,
  onToggleShowPassword,
  onSubmit,
}) => {
  return (
    <ModalPrimary isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={onSubmit} className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-foreground">
            Current Password
          </label>
          <Input
            type="password"
            required
            value={form.current}
            onChange={(e) => onFormChange({ ...form, current: e.target.value })}
            placeholder="Enter current password"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-foreground">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={form.new}
              onChange={(e) => onFormChange({ ...form, new: e.target.value })}
              placeholder="Min 8 characters"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={onToggleShowPassword}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Minimum 8 characters, alphanumeric.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-foreground">
            Confirm New Password
          </label>
          <Input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => onFormChange({ ...form, confirm: e.target.value })}
            placeholder="Repeat new password"
            className={
              form.confirm && form.new !== form.confirm
                ? "border-destructive focus-visible:ring-destructive/30"
                : ""
            }
          />
          {form.confirm && form.new !== form.confirm && (
            <p className="text-[11px] text-destructive font-medium">
              Passwords do not match.
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </ModalPrimary>
  );
};

export default PasswordModal;
