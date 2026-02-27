import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ListingsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateNew: () => void;
}

export const ListingsHeader: React.FC<ListingsHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onCreateNew,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
      <div className="relative flex-1 md:flex-initial min-w-[150px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400"
          size={18}
        />
        <Input
          type="search"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full md:w-48 lg:w-64 h-10"
        />
      </div>

      <Button
        onClick={onCreateNew}
        size={"default"}
        className="gap-2 h-10 px-4 shrink-0"
      >
        <Plus size={18} /> <span className="hidden sm:inline">Create New</span>
      </Button>
    </div>
  );
};
