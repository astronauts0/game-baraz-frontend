import React from "react";
import { Tag } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface AssetInformationProps {
  isViewMode?: boolean;
}

const AssetInformation: React.FC<AssetInformationProps> = ({
  isViewMode = false,
}) => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <Tag size={16} className="text-primary" /> Asset Information
        </h3>

        <div className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold mb-2">
                  Listing Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Reaver Vandal - Max Upgrades"
                    disabled={isViewMode}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="assetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold mb-2">
                    Asset Type
                  </FormLabel>
                  <Select
                    disabled={isViewMode}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Weapon Skin">Weapon Skin</SelectItem>
                      <SelectItem value="Account">Account</SelectItem>
                      <SelectItem value="Currency">Currency</SelectItem>
                      <SelectItem value="Bundle">Bundle</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold mb-2">
                    Rarity / Grade
                  </FormLabel>
                  <Select
                    disabled={isViewMode}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Rarity..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Common">Common</SelectItem>
                      <SelectItem value="Rare">Rare</SelectItem>
                      <SelectItem value="Epic">Epic</SelectItem>
                      <SelectItem value="Legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold mb-2">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isViewMode}
                    placeholder="Describe the asset features, condition, and any specific details..."
                    className="w-full h-30"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetInformation;
