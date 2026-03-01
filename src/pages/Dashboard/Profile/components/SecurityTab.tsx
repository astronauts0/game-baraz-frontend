import React from "react";
import {
  Shield,
  Key,
  Smartphone,
  Laptop,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Session } from "../types";

interface SecurityTabProps {
  twoFactorEnabled: boolean;
  sessions: Session[];
  onChangePassword: () => void;
  onToggle2FA: () => void;
  onRevokeSession: (id: string) => void;
  onRevokeAll: () => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({
  twoFactorEnabled,
  sessions,
  onChangePassword,
  onToggle2FA,
  onRevokeSession,
  onRevokeAll,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Password & 2FA */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          Security Settings
        </h2>

        <div className="space-y-3">
          {/* Password Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-2xl bg-muted/30 hover:bg-accent/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-card border border-border rounded-xl text-muted-foreground shadow-xs">
                <Key size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Password</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Last changed 3 months ago
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-600 font-medium">
                  <CheckCircle size={10} /> Strong
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onChangePassword}>
              Change Password
            </Button>
          </div>

          {/* 2FA Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-2xl bg-muted/30 hover:bg-accent/40 transition-colors">
            <div className="flex items-start gap-4">
              <div
                className={`p-2.5 border rounded-xl shadow-xs transition-colors ${
                  twoFactorEnabled
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                <Smartphone size={18} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-foreground">
                    Two-Factor Authentication
                  </h4>
                  <Badge
                    className={
                      twoFactorEnabled
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800 text-[10px] font-bold"
                        : "bg-muted text-muted-foreground text-[10px] font-bold"
                    }
                  >
                    {twoFactorEnabled ? "ENABLED" : "DISABLED"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Secure your account with an authenticator app.
                </p>
              </div>
            </div>
            <Button
              variant={twoFactorEnabled ? "outline" : "default"}
              size="sm"
              onClick={onToggle2FA}
            >
              {twoFactorEnabled ? "Configure" : "Enable 2FA"}
            </Button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Laptop size={18} className="text-blue-500" />
            Active Sessions
          </h2>
          {sessions.filter((s) => !s.isCurrent).length > 0 && (
            <button
              onClick={onRevokeAll}
              className="text-xs font-bold text-destructive hover:text-destructive/80 hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-destructive/20"
            >
              Revoke All
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-border rounded-xl hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">
                  {session.type === "desktop" ? (
                    <Laptop size={18} />
                  ) : (
                    <Smartphone size={18} />
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-foreground">
                      {session.device}
                    </p>
                    {session.isCurrent && (
                      <Badge className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <Globe size={10} /> {session.location}
                    </span>
                    <span>·</span>
                    <span>{session.browser}</span>
                    <span>·</span>
                    <span
                      className={
                        session.isCurrent ? "text-emerald-600 font-medium" : ""
                      }
                    >
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {!session.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 w-full sm:w-auto"
                  onClick={() => onRevokeSession(session.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <Laptop size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No active sessions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
