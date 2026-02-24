import { GAME_LOGOS } from "@/data/appData";

export const getGameIcon = (gameName: string) => {
  if (GAME_LOGOS[gameName]) {
    return (
      <img
        src={GAME_LOGOS[gameName]}
        alt={gameName}
        className="w-5 h-5 object-contain"
      />
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">
      {gameName[0]}
    </div>
  );
};

export const getPageTitle = (isViewMode: boolean, isEditMode: boolean) => {
  if (isViewMode) return "ASSET DETAILS";
  if (isEditMode) return "EDIT ASSET";
  return "LIST NEW ASSET";
};

export const getPageSubtitle = (isViewMode: boolean, isEditMode: boolean) => {
  if (isViewMode) return "Viewing asset details in read-only mode.";
  if (isEditMode) return "Update your listing details and pricing.";
  return "Create a new listing for the marketplace. Operative clearance level 5 required.";
};