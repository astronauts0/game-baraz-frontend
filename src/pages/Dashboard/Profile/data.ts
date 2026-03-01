import type { Session, UserProfile } from "./types";

export const MOCK_USER: UserProfile = {
  name: "Agent Phoenix",
  email: "operative.phoenix@gamebazaar.com",
  phone: "+1 (555) 000-8821",
  location: "New York, USA",
  bio: "Elite operative specializing in high-tier Valorant and CS:GO assets. Fast delivery and secure transfers guaranteed.",
  joinDate: "September 2021",
  level: 5,
  xp: 8540,
  nextLevelXp: 10000,
};

export const MOCK_SESSIONS: Session[] = [
  {
    id: "sess-1",
    device: "Windows PC",
    browser: "Chrome 118.0",
    location: "New York, USA",
    lastActive: "Active Now",
    isCurrent: true,
    type: "desktop",
  },
  {
    id: "sess-2",
    device: "iPhone 14 Pro",
    browser: "Safari Mobile",
    location: "New York, USA",
    lastActive: "2 hours ago",
    isCurrent: false,
    type: "mobile",
  },
  {
    id: "sess-3",
    device: "MacBook Pro",
    browser: "Firefox",
    location: "London, UK",
    lastActive: "3 days ago",
    isCurrent: false,
    type: "desktop",
  },
];

export const MOCK_2FA_SECRET = "BK7S-92J1-MM39-OPQ2";
