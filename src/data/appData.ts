import type { FeaturedListing, Review, ThreatCardProps } from "@/types";
import { ShieldCheck, Gavel, Radar } from "lucide-react";

//todo nav links
export const navLinks = [
  { name: "Loot", path: "/marketplace", color: "text-primary" },
  { name: "How it works", path: "/how-it-works", color: "text-primary" },
  {
    name: "The Safehouse",
    path: "/safehouse",
    color: "text-emerald-600",
    special: true,
  },
  { name: "Anti-Fraud", path: "/antifraud", color: "text-red-500" },
  //   { name: "Journal", path: "/blog", color: "text-primary" },
  //   { name: "Showcase", path: "/gallery", color: "text-primary" },
];

//todo hero images
export const floatingImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBEOe979Rc61SZY_kO-XDXuuTvx1z_pxaQyV4h9o8u2CqC76TmU5K0h98SPvSKZS_9H0zGA3Hb4OSf93pN28uyykHNOhFWzutEl2t5db-cPnw48cwv95pVhmGFPPtwIZ6cKpTslzvwD5VQODF4SZoyfw5LTFf4DDWDkgYBI7C3DoVHhoQLi59fSGEUuAUwX0Nvp0VIhM7k0v1s2uuGFhD0ii0i_IfCfyr3Jy4ureXB34_7UVFpOqizLHg5WiVt-CUDxM4lSrRI47nU",
];

// Positions for the floating images (corners/sides to avoid center text)
export const imagePositions = [
  { top: "15%", left: "5%" },
  { top: "20%", right: "5%" },
  { bottom: "20%", left: "10%" },
  { bottom: "25%", right: "10%" },
];

// Featured Listings
export const featuredListings: FeaturedListing[] = [
  {
    id: 1,
    title: "Valo Radiant (Sweaty)",
    seller: "JettMain420",
    sellerStatus: "VERIFIED",
    sellerStatusColor: "text-emerald-600",
    price: "420.00 USDC",
    badges: [
      {
        text: "Aimbot Not Included",
        colorClass: "text-red-600",
        borderClass: "border-red-500/20",
        bgClass: "bg-red-50",
      },
    ],
    stats: [
      { label: "Skins", value: "Spent Too Much" },
      { label: "Rank", value: "Demon" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
    actionText: "Buy Now",
  },
  {
    id: 2,
    title: "C6 Furina (Whale Account)",
    seller: "GachaAddict",
    sellerStatus: "ELITE",
    sellerStatusColor: "text-primary",
    price: "1,250.00 USDC",
    badges: [
      {
        text: "Waifu Material",
        colorClass: "text-primary",
        borderClass: "border-primary/20",
        bgClass: "bg-primary/10",
      },
    ],
    stats: [
      { label: "Luck", value: "God-Tier" },
      { label: "Wallet", value: "Empty" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
    actionText: "Secure Waifu",
    isFeatured: true,
  },
  {
    id: 3,
    title: "LoL Challenger 700LP",
    seller: "TouchGrassLater",
    sellerStatus: "INSTANT",
    sellerStatusColor: "text-blue-600",
    price: "890.00 USDC",
    badges: [
      {
        text: "Rare Drop",
        colorClass: "text-secondary",
        borderClass: "border-secondary/20",
        bgClass: "bg-blue-50",
      },
    ],
    stats: [
      { label: "Sanity", value: "0%" },
      { label: "Skins", value: "210+" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
    actionText: "Dominate Rift",
  },
  {
    id: 4,
    title: "LoL Challenger 700LP",
    seller: "TouchGrassLater",
    sellerStatus: "INSTANT",
    sellerStatusColor: "text-blue-600",
    price: "890.00 USDC",
    badges: [
      {
        text: "Rare Drop",
        colorClass: "text-secondary",
        borderClass: "border-secondary/20",
        bgClass: "bg-blue-50",
      },
    ],
    stats: [
      { label: "Sanity", value: "0%" },
      { label: "Skins", value: "210+" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
    actionText: "Dominate Rift",
  },
  {
    id: 5,
    title: "LoL Challenger 700LP",
    seller: "TouchGrassLater",
    sellerStatus: "INSTANT",
    sellerStatusColor: "text-blue-600",
    price: "890.00 USDC",
    badges: [
      {
        text: "Rare Drop",
        colorClass: "text-secondary",
        borderClass: "border-secondary/20",
        bgClass: "bg-blue-50",
      },
    ],
    stats: [
      { label: "Sanity", value: "0%" },
      { label: "Skins", value: "210+" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
    actionText: "Dominate Rift",
  },
];

// Planning Board
export const steps = [
  {
    id: "01",
    title: "Window Shopping",
    description:
      "Browse the market. Find an account that makes your friends jealous.",
    log: "TARGET_ACQUIRED",
    rotation: "-rotate-2",
    markerColor: "bg-[#EF4444]",
    shadowColor: "shadow-none",
  },
  {
    id: "02",
    title: "The Handshake",
    description:
      "You pay us, NOT the seller. We hold the cash in a digital fortress.",
    log: "MONEY_SECURED",
    rotation: "rotate-3",
    markerColor: "bg-emerald-500 shadow-emerald-500",
    shadowColor: "shadow-emerald-500/10",
  },
  {
    id: "03",
    title: "The Vibe Check",
    description:
      "We check the login. We check the email. We make sure it's not banned.",
    log: "NO_SCAMS_DETECTED",
    rotation: "-rotate-1",
    markerColor: "bg-[#EF4444]", // Default red for non-highlighted
    shadowColor: "shadow-none",
  },
  {
    id: "04",
    title: "It's Yours",
    description:
      "We give you the keys. The seller gets paid. Everyone walks away happy.",
    log: "GG_WP",
    rotation: "rotate-2",
    markerColor: "bg-primary shadow-primary",
    shadowColor: "shadow-primary/10",
  },
];

// Challenges Solutions
export const challenges = [
  "Buying on Discord and praying you don't get blocked",
  "Sending crypto to 'TrustMeBro123' and losing it all",
  "Seller reclaiming the account after 2 days (rude)",
  "Dealing with kids who don't know how to transfer emails",
  "Zero support when things go wrong",
];

export const solutions = [
  "We hold the money until you confirm it works",
  "Verified sellers only (We check their IDs)",
  "Lifetime Warranty against recalls (We hunt them down)",
  "We handle the technical transfer stuff for you",
  "24/7 Support (Actual humans, not bots)",
];

// faqs
export const faqs = [
  {
    q: "IS THIS A SCAM?",
    a: "Nope. If we scammed you, we'd go to jail. We prefer not going to jail. The money stays in escrow until you change the password.",
  },
  {
    q: "WHAT IF THE SELLER RECLAIMS THE ACCOUNT?",
    a: "We hunt them down. Legally. We offer a lifetime warranty, so if they try to pull a fast one, you get your money back and they get banned into the shadow realm.",
  },
  {
    q: "HOW DO I PAY?",
    a: "Crypto (if you're cool), Credit Card (if you're normal), or PayPal. We don't take V-Bucks or Robux. Yet.",
  },
  {
    q: "CAN I SELL MY OWN ACCOUNT?",
    a: "Only if you're legit. We require ID verification. If you're a scammer, don't bother applying. Our verification system is smarter than you.",
  },
  {
    q: "IS IT INSTANT DELIVERY?",
    a: "Mostly yes. If the seller is online, it's instant. If they are asleep, you might have to wait a few hours. Gamers need sleep too.",
  },
];

// How It Works Steps
export const howItWorksSteps = [
  {
    number: "01",
    title: "Agreement",
    description:
      "Buyer and Seller agree on a price. A secure digital contract is generated instantly, locking in the terms.",
    icon: "Handshake",
    isDark: false,
  },
  {
    number: "02",
    title: "Secure Deposit",
    description:
      "Buyer deposits funds into the GameBazaar Vault. Seller sees the money but can't touch it.",
    icon: "Lock",
    isDark: true,
  },
  {
    number: "03",
    title: "Release & Play",
    description:
      "Seller delivers the account. Buyer verifies it works. Once confirmed, the vault releases funds.",
    icon: "CheckCircle2",
    isDark: false,
  },
];

// App Stats
export const appStats = [
  { value: "0%", label: "Fraud Rate" },
  { value: "24h", label: "Protection Period" },
  { value: "100%", label: "Money Back" },
  { value: "24/7", label: "Human Support" },
];

// Footer
export const footerLinks = [
  {
    title: "Stuff",
    links: [
      { name: "Buy Accounts", path: "/marketplace", isExternal: false },
      { name: "Sell Accounts", path: "/signup", isExternal: false },
      { name: "Help Me", path: "/contact", isExternal: false },
      { name: "Journal", path: "/blog", isExternal: false },
    ],
  },
  {
    title: "Socials",
    links: [
      { name: "Twitter / X", path: "#", isExternal: true },
      { name: "Discord (Join Us)", path: "#", isExternal: true },
    ],
  },
  {
    title: "Boring Stuff",
    links: [
      {
        name: "Terms & Conditions",
        path: "/terms-and-condition",
        isExternal: false,
      },
      { name: "Privacy Policy", path: "/privacy-policy", isExternal: false },
    ],
  },
];

// sample transactions for live ledger
export const transactions = [
  {
    type: "DEPOSIT",
    amount: "$450.00",
    user: "Jett***",
    time: "2s ago",
    status: "SECURED",
  },
  {
    type: "PAYOUT",
    amount: "$1,200.00",
    user: "Pro***",
    time: "15s ago",
    status: "RELEASED",
  },
  {
    type: "DEPOSIT",
    amount: "$85.00",
    user: "Noob***",
    time: "42s ago",
    status: "SECURED",
  },
  {
    type: "VERIFY",
    amount: "---",
    user: "System",
    time: "1m ago",
    status: "AUDIT_OK",
  },
];

// Safehouse Security Features
export const securityFeatures = [
  {
    id: "01",
    version: "PROTOCOL_V4.2",
    title: "Biometric KYC",
    description:
      "Sellers verified via government ID and facial recognition. We know exactly who they are, so they can't run. If they try, we have the data.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    action: "View Specs",
  },
  {
    id: "02",
    version: "PROTOCOL_V2.1",
    title: "Time-Locked Escrow",
    description:
      "Funds are programmatically locked in a smart contract. Even our staff cannot access them without multi-signature authorization keys.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    action: "Audit Code",
  },
  {
    id: "03",
    version: "PROTOCOL_V1.0",
    title: "Immutable Logs",
    description:
      "Every dispute, chat message, and file transfer is hashed and stored on-chain. We keep full evidence for any claims forever.",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698b98d?auto=format&fit=crop&q=80&w=800",
    action: "Explorer",
  },
];

// bannedUsers for BanHammerFeed
export const bannedUsersData = [
  { user: "Shadow***", reason: "Account Recall Attempt", time: "2m ago" },
  { user: "Glitch***", reason: "Fake Proof Provided", time: "5m ago" },
  { user: "NoPay***", reason: "Chargeback Fraud", time: "12m ago" },
  { user: "Vendor***", reason: "Identity Mismatch", time: "45m ago" },
];

export const threats: ThreatCardProps[] = [
  {
    id: "IMP-001",
    title: "The Impersonator",
    description:
      "Scammers creating identical Discord profiles to official staff. They strike in DMs asking for keys.",
    risk: "Critical Risk",
    riskColor: "text-red-600 bg-red-50 border-red-100",
    protocol: "Verify ID Badge",
    protocolSub: "Mandatory Check",
    icon: ShieldCheck,
    accent: "bg-red-600",
  },
  {
    id: "REC-042",
    title: "Account Recall",
    description:
      "Sellers using original recovery info to reclaim accounts days after the sale completes.",
    risk: "High Risk",
    riskColor: "text-orange-600 bg-orange-50 border-orange-100",
    protocol: "Legal Bonding",
    protocolSub: "Seller Insurance",
    icon: Gavel,
    accent: "bg-orange-500",
  },
  {
    id: "INV-099",
    title: "Inventory Spoofing",
    description:
      "Editing screenshots or using client-side skin changers to fake rare items in listings.",
    risk: "Medium Risk",
    riskColor: "text-purple-600 bg-purple-50 border-purple-100",
    protocol: "API Auto-Scan",
    protocolSub: "Live Inventory Check",
    icon: Radar,
    accent: "bg-purple-600",
  },
];

export const initialReviews: Review[] = [
  {
    id: 1,
    user: "Shadow_Walker_99",
    avatar: "S",
    rating: 5,
    date: "2 days ago",
    timestamp: 1715000000000,
    verified: true,
    content:
      "Transaction was buttery smooth. The account details were sent instantly via the escrow chat. Everything matches the description perfectly. Seller even helped me change the email.",
    helpful: 12,
    images: [],
  },
  {
    id: 2,
    user: "NoobMaster69",
    avatar: "N",
    rating: 5,
    date: "1 week ago",
    timestamp: 1714500000000,
    verified: true,
    content:
      "Honestly wasn't sure about buying a high-end account, but this seller is legit. The skins are insane. 10/10 would buy again.",
    helpful: 8,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
    ],
    sellerResponse: "Enjoy the skins! Thanks for the smooth deal.",
  },
  {
    id: 3,
    user: "EzClapz",
    avatar: "E",
    rating: 4,
    date: "2 weeks ago",
    timestamp: 1714000000000,
    verified: true,
    content:
      "Account is great, but delivery took about 30 mins instead of instant. Seller apologized though. Good price.",
    helpful: 3,
    images: [],
  },
  {
    id: 4,
    user: "ToxicViper",
    avatar: "T",
    rating: 1,
    date: "3 weeks ago",
    timestamp: 1713000000000,
    verified: false,
    content: "Logins didn't work initially. Support fixed it but annoying.",
    helpful: 0,
    images: [],
  },
  {
    id: 5,
    user: "ProGamer_X",
    avatar: "P",
    rating: 5,
    date: "1 month ago",
    timestamp: 1712000000000,
    verified: true,
    content: "Exactly as described. Ranked ready.",
    helpful: 1,
    images: [],
  },
];