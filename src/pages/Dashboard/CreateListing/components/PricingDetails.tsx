import React, { useEffect } from "react";
import { DollarSign, Info, Gavel } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface PricingDetailsProps {
  isViewMode?: boolean;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({
  isViewMode = false,
}) => {
  const { control, setValue } = useFormContext();

  const price = useWatch({
    control,
    name: "price",
  });

  const watchedAllowOffers = useWatch({
    control,
    name: "allowOffers",
  });

  const numericPrice = Number(price) || 0;
  const platformFee = numericPrice * 0.05;
  const estimatedPayout = numericPrice * 0.95;

  // Auto-decline offer logic could be handled by Zod or here if needed
  useEffect(() => {
    if (watchedAllowOffers === false) {
      setValue("minOffer", null);
    }
  }, [watchedAllowOffers, setValue]);

  return (
    <Card>
      <CardContent>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <DollarSign size={16} className="text-primary" /> Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold mb-2">
                  Selling Price
                </FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <span className="text-primary font-bold">Rs</span>
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isViewMode}
                      className="w-full pl-12 pr-4"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
                <p className="text-xs mt-2 flex items-center gap-1">
                  <Info size={12} /> Minimum listing price is Rs 500
                </p>
              </FormItem>
            )}
          />

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Platform Fee (5%)</span>
              <span className="text-slate-900 font-medium">
                - Rs {platformFee.toFixed(0)}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm">
              <span className="font-bold">Estimated Payout</span>
              <span className="font-bold text-emerald-600 text-lg">
                Rs {estimatedPayout.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Counter Offer Controls */}
        <div className="pt-6 border-t border-slate-100">
          <FormField
            control={control}
            name="allowOffers"
            render={({ field }) => (
              <div className="space-y-4">
                <FormItem className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FormLabel className="text-sm font-bold text-slate-900 cursor-pointer">
                        Allow Counter Offers
                      </FormLabel>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded border border-primary/20">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Allow buyers to suggest a lower price. You can accept or
                      decline.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value ?? true}
                      onCheckedChange={field.onChange}
                      disabled={isViewMode}
                      size="lg"
                    />
                  </FormControl>
                </FormItem>

                {field.value !== false && (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <FormField
                        control={control}
                        name="minOffer"
                        render={({ field: minOfferField }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel className="block text-xs font-bold uppercase tracking-wide mb-2">
                              Minimum Accepted Offer (Optional)
                            </FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                <span className="text-primary font-bold text-sm">
                                  Rs
                                </span>
                              </div>
                              <FormControl>
                                <Input
                                  type="number"
                                  disabled={isViewMode}
                                  placeholder="Auto-decline below..."
                                  className="w-full pl-9 pr-4 py-2"
                                  {...minOfferField}
                                  value={minOfferField.value ?? ""}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <Gavel
                            size={16}
                            className="text-slate-400 mt-0.5 shrink-0"
                          />
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Offers below your minimum will be automatically
                            rejected. Offers above will be sent to your inbox
                            for review.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingDetails;
