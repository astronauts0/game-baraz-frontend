import type { Listing, BlogPost } from "../types";

export const mockListings: Listing[] = [
  {
    id: 1,
    title: "Valorant Radiant | All Bundles",
    game: "Valorant",
    seller: "JettRevives",
    sellerTier: "GODLIKE",
    sellerStats: { rating: 5.0, reviews: 142, sold: 850, trust: 100 },
    price: 450,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
    description:
      "Peak Radiant Ep 3-6. Has every VCT bundle including Champions 2021, 2022, 2023. This account is stacked beyond belief. Full email access provided immediately upon purchase.",
    badges: ["Champs 2021", "Radiant Buddy", "OG Email"],
    stats: [
      { label: "Skins", value: "450+" },
      { label: "Rank", value: "Radiant #42" },
    ],
    deliveryTime: "Instant",
    aspectRatio: "portrait",
  },
  {
    id: 2,
    title: "Fortnite Renegade Raider",
    game: "Fortnite",
    seller: "OG_Hunter",
    sellerTier: "VERIFIED",
    sellerStats: { rating: 4.8, reviews: 89, sold: 210, trust: 96 },
    price: 2400,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEOe979Rc61SZY_kO-XDXuuTvx1z_pxaQyV4h9o8u2CqC76TmU5K0h98SPvSKZS_9H0zGA3Hb4OSf93pN28uyykHNOhFWzutEl2t5db-cPnw48cwv95pVhmGFPPtwIZ6cKpTslzvwD5VQODF4SZoyfw5LTFf4DDWDkgYBI7C3DoVHhoQLi59fSGEUuAUwX0Nvp0VIhM7k0v1s2uuGFhD0ii0i_IfCfyr3Jy4ureXB34_7UVFpOqizLHg5WiVt-CUDxM4lSrRI47nU",
    description:
      "Full access. Linked to dummy Gmail. Comes with Mako Glider and Black Knight. No bans recorded.",
    badges: ["Renegade", "Black Knight"],
    stats: [{ label: "Wins", value: "2,000+" }],
    deliveryTime: "2 Hours",
    aspectRatio: "square",
  },
  {
    id: 3,
    title: "CS:GO Blue Gem Karambit",
    game: "CS:GO",
    seller: "SkinBaron_Official",
    sellerTier: "ELITE",
    sellerStats: { rating: 4.9, reviews: 2450, sold: 15400, trust: 99 },
    price: 12500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
    description:
      "Pattern 387. Float 0.001. The holy grail of knives. Middleman service mandatory for this transaction.",
    badges: ["Tier 1 Pattern", "Factory New"],
    stats: [
      { label: "Float", value: "0.001" },
      { label: "Pattern", value: "387" },
      { label: "History", value: "Clean" },
    ],
    deliveryTime: "Manual",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    title: "League Challenger Account",
    game: "League of Legends",
    seller: "MidGap",
    sellerTier: "VERIFIED",
    sellerStats: { rating: 4.5, reviews: 42, sold: 85, trust: 92 },
    price: 850,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
    description:
      "1000LP Challenger. High MMR. All Champs unlocked. 200k Blue Essence. Ready for pro play.",
    badges: ["Challenger", "Honor Lvl 5"],
    stats: [
      { label: "LP", value: "1050" },
      { label: "Winrate", value: "62%" },
    ],
    deliveryTime: "Instant",
    aspectRatio: "square",
  },
  {
    id: 5,
    title: "Genshin C6 Neuvillette",
    game: "Genshin Impact",
    seller: "WhaleWatcher",
    sellerTier: "ELITE",
    sellerStats: { rating: 5.0, reviews: 15, sold: 30, trust: 100 },
    price: 600,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDS33omKuIdRCTHMsTm_s9Yub7lPE1rJnvwVWA8Itw1qxaeZqPIEJFJnngUAYE7RFYfi8z97YPGGtwbqy5OhwJa58eu2XFMUKMRQfqwn8_VwlVE4FIg_5Zte5i5utOaRdTT4JpXtvCB_hqwdUH9UhVhnTS-698G2Nnsx2Ihd5V-ZEBhd-wCRy0VQIUifuolxMQ2pNjlpxxz1FhY2L6sUeAgDw4ERWhGCMmzmjIUzlDJJ9qhKYwEinssQA0mLImbSPDDlswBnbRlxgE",
    description:
      "Also has C6 Furina and R5 Signature weapons for both. Map 100% explored. Spiral Abyss clear.",
    badges: ["C6 R5", "Endgame"],
    stats: [
      { label: "AR", value: "60" },
      { label: "Primos", value: "25k" },
    ],
    deliveryTime: "Instant",
    aspectRatio: "portrait",
  },
  {
    id: 6,
    title: "Apex Predator S12-15",
    game: "Apex Legends",
    seller: "WraithQuit",
    sellerTier: "VERIFIED",
    sellerStats: { rating: 4.7, reviews: 310, sold: 890, trust: 95 },
    price: 350,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhqAyoks5QH3E-06zyXNAVgyh_t-qlH3WtpA46VUSf1nczmhxNcozvEjPnROReqTRCC4ekUiHN1d-N485BwjfDPzZNZVohekUw1zpO7nphBtiYmyPYN2CaRK0lQ30cdCUUknKa36TxysKBs-HrsrZtbcm9eM07G65zCHyT-6W1U-1SkfrGmtZnPu0Y-YxZL8cTVQ7qoVuFbVhq_VgXq6Ju3jzQFTTT0KzHkWgfGiS7_0VVskCcczEre2apRRqmTmbVrwNyeFNuq9Y",
    description:
      "4x Predator badges (Animated). 3 Heirlooms (Wraith, Path, Octane). Account level 500+.",
    badges: ["Multi-Pred", "Heirlooms"],
    stats: [{ label: "K/D", value: "4.2" }],
    deliveryTime: "Instant",
    aspectRatio: "square",
  },
  {
    id: 7,
    title: "Clash of Clans TH16 Max",
    game: "Clash of Clans",
    seller: "ChiefSmash",
    sellerTier: "VERIFIED",
    sellerStats: { rating: 4.9, reviews: 56, sold: 120, trust: 98 },
    price: 200,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhP3408Fvo1GW2Ut7NrnRt69oDVpjMgAQc_-1E7PYeiNc5khXBw9TJs5SMcDf8qcbW3Y18J8GUBUwTQCD2X1PouSrxNNAcIibIB1-upAB9F-R-XC7CKHz2cBPN80k1P_K5wrUNv6BdlBjkSahnSvG6UewSA-NSrXOWp87PafaP_9fjqiBR109rJ6sAhNTezEKGMazELEyRU97qxkMM2yeqdnGUTTPGNZLJXP45C4mo317Ptgp5a0Jz-N5xhcUCmB0FxBVJqU3LDhk",
    description:
      "Everything maxed. 5000 War stars. Local leaderboard #10. Name change available.",
    badges: ["Maxed", "Leader"],
    stats: [
      { label: "TH", value: "16" },
      { label: "Walls", value: "Max" },
    ],
    deliveryTime: "1 Hour",
    aspectRatio: "square",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Market Analysis",
    date: "OCT 12, 2025",
    readTime: "8 MIN READ",
    title: "The Economics of Virtual Scarcity: Why CS:GO Skins Outperform Gold",
    excerpt:
      "An in-depth look at how digital assets have decoupled from traditional market forces, creating a recession-proof economy governed by pixels and rarity.",
    image:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=2000",
    author: "Alex V.",
    featured: true,
  },
  {
    id: 2,
    category: "Security",
    date: "OCT 10, 2025",
    readTime: "5 MIN READ",
    title: "Inside Protocol V4: How We Catch Scammers Before They Strike",
    excerpt:
      "We updated our fraud detection algorithm. Here is a technical breakdown of how we fingerprint devices to stop repeat offenders.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    author: "Sarah K.",
  },
  {
    id: 3,
    category: "Game Updates",
    date: "OCT 08, 2025",
    readTime: "4 MIN READ",
    title: "Valorant Act 5: The Impact on Account Valuation",
    excerpt:
      "New agents mean new meta shifts. How does the latest patch affect the secondary market for high-ELO accounts?",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
    author: "JettMain99",
  },
  {
    id: 4,
    category: "Opinion",
    date: "OCT 05, 2025",
    readTime: "6 MIN READ",
    title: "The Ethics of Smurfing: A Marketplace Perspective",
    excerpt:
      "Is buying a low-ranked account ethical? We explore the grey area of skill-based matchmaking and account trading.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000",
    author: "Editorial Team",
  },
  {
    id: 5,
    category: "Guide",
    date: "SEP 28, 2025",
    readTime: "12 MIN READ",
    title: "The Ultimate Guide to Securing Your Bought Account",
    excerpt:
      "You bought it. Now keep it. A step-by-step guide to changing emails, enabling 2FA, and scrubbing previous owner data.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    author: "Security Ops",
  },
];
