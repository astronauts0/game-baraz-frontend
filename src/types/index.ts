import type { LucideIcon } from "lucide-react";

export interface FeaturedListing {
  id: number;
  title: string;
  seller: string;
  sellerStatus: "VERIFIED" | "ELITE" | "INSTANT";
  sellerStatusColor: string;
  price: string;
  badges: Array<{
    text: string;
    colorClass: string;
    borderClass: string;
    bgClass: string;
  }>;
  stats: Array<{ label: string; value: string }>;
  image: string;
  actionText: string;
  isFeatured?: boolean;
}

export interface Listing {
  id: number;
  title: string;
  game: string;
  seller: string;
  sellerAvatar?: string;
  sellerTier: "VERIFIED" | "ELITE" | "GODLIKE";
  sellerStats: {
    rating: number;
    reviews: number;
    sold: number;
    trust: number;
  };
  price: number;
  image: string;
  description: string;
  badges: string[];
  stats: { label: string; value: string }[];
  deliveryTime: string;
  aspectRatio: "square" | "portrait" | "landscape";
}

export interface BlogPost {
  id: number;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  featured?: boolean;
}
export type ThreatCardProps = {
  id: string;
  title: string;
  description: string;
  risk: string;
  riskColor: string;
  protocol: string;
  protocolSub: string;
  icon: LucideIcon;
  accent: string;
};

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  timestamp: number;
  verified: boolean;
  content: string;
  helpful: number;
  images: string[];
  sellerResponse?: string;
}
