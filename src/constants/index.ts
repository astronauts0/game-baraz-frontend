export const GAMES = [
  "All",
  "Valorant",
  "Fortnite",
  "CS:GO",
  "Warzone",
  "Genshin",
];

export const getGridClass = (columns: number): string => {
  switch (columns) {
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case 5:
      return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};

export const sortOptions = [
  { label: "Sort: Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
  { label: "Newest Arrivals", value: "newest" },
];
