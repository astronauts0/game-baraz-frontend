import React, { useState } from "react";
import { Gamepad2, Check, ChevronsUpDown } from "lucide-react";
import { getGameIcon } from "./utils";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { INITIAL_GAMES } from "@/data/appData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface GameCategorySelectionProps {
  isViewMode?: boolean;
}

const GameCategorySelection: React.FC<GameCategorySelectionProps> = ({
  isViewMode = false,
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Card className={cn(isViewMode && "w-full opacity-80 pointer-events-none")}>
      <CardContent>
        <FormField
          control={control}
          name="game"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Gamepad2 size={16} className="text-primary" /> Game Category
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={isViewMode}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium h-auto hover:bg-slate-50 transition-colors",
                        !field.value && "text-slate-500",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {field.value ? (
                          <>
                            <div className="shrink-0">
                              {getGameIcon(field.value)}
                            </div>
                            <span className="text-slate-900 font-semibold">
                              {field.value}
                            </span>
                          </>
                        ) : (
                          <span>Select game...</span>
                        )}
                      </div>
                      {!isViewMode && (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-slate-500" />
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full flex-1 p-0" align="start">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search game..."
                      className="h-9"
                    />
                    <CommandList className="max-h-[200px]">
                      <CommandEmpty>No games found.</CommandEmpty>
                      <CommandGroup>
                        {INITIAL_GAMES.map((game) => (
                          <CommandItem
                            key={game}
                            value={game}
                            onSelect={() => {
                              field.onChange(game);
                              setOpen(false);
                            }}
                            className="flex items-center gap-3 px-2 py-2 cursor-pointer"
                          >
                            <div className="shrink-0 flex items-center justify-center w-6 text-center">
                              {getGameIcon(game)}
                            </div>
                            <span className="flex-1 text-slate-700">
                              {game}
                            </span>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4 text-purple-600",
                                field.value === game
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GameCategorySelection;
