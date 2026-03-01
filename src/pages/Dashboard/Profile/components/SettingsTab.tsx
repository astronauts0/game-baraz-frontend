import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UserProfile } from "../types";

interface SettingsTabProps {
  editForm: UserProfile;
  isLoading: boolean;
  onFormChange: (updated: UserProfile) => void;
  onSave: (e: React.FormEvent) => void;
  onReset: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  editForm,
  isLoading,
  onFormChange,
  onSave,
  onReset,
}) => {
  const field = (key: keyof UserProfile) => ({
    value: String(editForm[key]),
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      onFormChange({ ...editForm, [key]: e.target.value });
    },
  });

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-base font-bold text-foreground mb-6">
        Update Credentials
      </h2>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Operative Name
            </label>
            <Input required {...field("name")} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Secure Email
            </label>
            <Input
              required
              type="email"
              {...field("email")}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Secure Line
            </label>
            <Input
              type="tel"
              {...field("phone")}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Location
            </label>
            <Input {...field("location")} placeholder="City, Country" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">
            Operative Bio
          </label>
          <Textarea
            rows={4}
            {...field("bio")}
            placeholder="Tell others about yourself..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset Changes
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
