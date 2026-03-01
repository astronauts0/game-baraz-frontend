import React from "react";
import { User, Edit2, Shield, Award, Star } from "lucide-react";
import type { ProfileTab, UserProfile } from "../types";

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  user: UserProfile;
}

const NAV_ITEMS: { tab: ProfileTab; label: string; icon: React.ElementType }[] =
  [
    { tab: "overview", label: "Overview", icon: User },
    { tab: "settings", label: "Edit Profile", icon: Edit2 },
    { tab: "security", label: "Security", icon: Shield },
  ];

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onTabChange,
  user,
}) => {
  const xpPercent = Math.round((user.xp / user.nextLevelXp) * 100);

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <nav className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-2 space-y-1">
          {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                activeTab === tab
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Performance Card */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
        <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          Performance
        </h3>

        {/* XP Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-foreground">XP Progress</span>
            <span className="text-xs font-bold text-primary">
              {user.xp.toLocaleString()} / {user.nextLevelXp.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            {xpPercent}% to Level {user.level + 1}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 dark:bg-amber-950/40 dark:border-amber-800">
              <Award size={18} />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">
                Reputation Tier
              </p>
              <p className="text-sm font-bold text-foreground">Elite Seller</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-800">
              <Star size={18} />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-medium">
                Rating
              </p>
              <p className="text-sm font-bold text-foreground">
                4.9{" "}
                <span className="text-muted-foreground font-normal text-xs">
                  (1,240 Reviews)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
