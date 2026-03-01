import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Shield,
  Star,
  CheckCircle,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "../types";

interface OverviewTabProps {
  user: UserProfile;
  onEditClick: () => void;
}

const INFO_ITEMS = (user: UserProfile) => [
  {
    icon: Mail,
    label: "Email",
    value: user.email,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: user.phone,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: MapPin,
    label: "Base of Operations",
    value: user.location,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: Calendar,
    label: "Service Start Date",
    value: user.joinDate,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Fast Seller",
    desc: "Avg. delivery < 30m",
    icon: Award,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Trusted",
    desc: "100+ Verified Sales",
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    title: "Top Rated",
    desc: "5.0 Star Month",
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    title: "Verified ID",
    desc: "KYC Completed",
    icon: CheckCircle,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
];

const OverviewTab: React.FC<OverviewTabProps> = ({ user, onEditClick }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Profile Details */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-bold text-foreground">
            Operative Profile
          </h2>
          <Button variant="outline" size="sm" onClick={onEditClick}>
            <Edit2 size={13} /> Edit Details
          </Button>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm bg-muted/40 p-4 rounded-xl border border-border">
          {user.bio}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {INFO_ITEMS(user).map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <div
                className={`w-8 h-8 shrink-0 rounded-full ${bg} ${color} flex items-center justify-center`}
              >
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                  {label}
                </p>
                <p className="font-medium text-foreground truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map(({ title, desc, icon: Icon, color, bg }) => (
          <div
            key={title}
            className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow group"
          >
            <div
              className={`w-11 h-11 ${bg} ${color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <Icon size={22} />
            </div>
            <h4 className="text-xs font-bold text-foreground">{title}</h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
