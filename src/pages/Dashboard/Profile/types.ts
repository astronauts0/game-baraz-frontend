export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  type: "desktop" | "mobile";
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  level: number;
  xp: number;
  nextLevelXp: number;
}

export interface PasswordForm {
  current: string;
  new: string;
  confirm: string;
}

export type ProfileTab = "overview" | "settings" | "security";

export type NotificationState = {
  message: string;
  type: "success" | "error";
} | null;
