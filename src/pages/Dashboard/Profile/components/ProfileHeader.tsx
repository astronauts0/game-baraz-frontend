import React from "react";
import { Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import type { UserProfile } from "../types";

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="relative mb-10">
      {/* Cover Image */}
      <div className="h-44 sm:h-52 w-full bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden relative shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition-all">
          <Camera size={13} /> Change Cover
        </button>
      </div>

      {/* Profile Info Bar */}
      <div className="px-2 sm:px-6">
        <div className="relative -mt-12 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative shrink-0 z-20">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-background bg-muted overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/200/200"
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border-2 border-background hover:bg-primary/90 transition-colors shadow-md">
              <Camera size={13} />
            </button>
          </div>

          {/* Name & Status */}
          <div className="pb-2 flex-1 min-w-0 z-10 pt-2 sm:pt-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {user.name}
              </h1>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-wide text-[10px]">
                Level {user.level}
              </Badge>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
              <Shield size={13} className="text-emerald-500 fill-emerald-500" />
              Operative Status:{" "}
              <span className="text-emerald-600 font-bold">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
