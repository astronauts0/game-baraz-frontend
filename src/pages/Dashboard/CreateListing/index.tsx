import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DashboardListing } from "@/types";
import GameCategorySelection from "./components/GameCategorySelection";
import AssetInformation from "./components/AssetInformation";
import PricingDetails from "./components/PricingDetails";
import DeliveryMethod from "./components/DeliveryMethod";
import MediaUpload from "./components/MediaUpload";
import LivePreview from "./components/LivePreview";
import ContainerDiv from "@/components/shared/ContainerDiv";
import { getPageSubtitle, getPageTitle } from "./components/utils";
import { listingSchema, type ListingFormValues } from "@/validations";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/shared/AnimatedArrow";

interface CreateListingProps {
  mode?: "create" | "edit" | "view";
  initialData?: DashboardListing | null;
}

const CreateListing: React.FC<CreateListingProps> = ({
  mode = "create",
  initialData,
}) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema) as any,
    defaultValues: {
      game: "Valorant",
      title: "",
      assetType: "Weapon Skin",
      rarity: "Common",
      description: "",
      price: 500,
      allowOffers: true,
      minOffer: null,
      deliveryMethod: "instant",
      protectionPassword: "",
    },
  });

  // Watch values for LivePreview
  const watchedValues = form.watch();

  // Delivery Method State (for file upload logic which is outside of basic form binding sometimes, but we'll try to integrate)
  const [credentialFile, setCredentialFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate data when editing or viewing
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        price: initialData.price,
        game: initialData.game,
        assetType: "Weapon Skin", // Default or from initialData if available
        rarity: "",
        description: "",
        allowOffers: true,
        deliveryMethod: "instant",
      });
    } else {
      form.reset({
        game: "Valorant",
        title: "",
        assetType: "Weapon Skin",
        rarity: "",
        description: "",
        price: 0,
        allowOffers: true,
        minOffer: null,
        deliveryMethod: "instant",
        protectionPassword: "",
      });
      setCredentialFile(null);
    }
  }, [initialData, mode, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        setCredentialFile(file);
      } else {
        alert("Please upload a .txt file only.");
      }
    }
  };

  const onSubmit = (values: ListingFormValues) => {
    console.log("Form submitted with values:", values);
    // Include the credential file in the submission if it exists
    const submissionData = {
      ...values,
      credentialFile: credentialFile,
    };
    console.log("Submission data spanning files:", submissionData);
    // In a real app, you would send this to your API
  };

  return (
    <ContainerDiv className="py-10 md:py-20 space-y-8">
      {/* <BackgroundFx from="from-emerald-500/10" /> */}
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {getPageTitle(isViewMode, isEditMode)}
          </h1>
          <p className="text-slate-500 mt-1">
            {getPageSubtitle(isViewMode, isEditMode)}
          </p>
        </div>
        {isViewMode && (
          <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200">
            Read Only Mode
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <GameCategorySelection isViewMode={isViewMode} />

            <AssetInformation isViewMode={isViewMode} />

            <PricingDetails isViewMode={isViewMode} />

            <DeliveryMethod
              credentialFile={credentialFile}
              onFileChange={handleFileChange}
              onRemoveFile={() => setCredentialFile(null)}
              showPassword={showPassword}
              onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
              fileInputRef={fileInputRef}
              isViewMode={isViewMode}
            />

            <MediaUpload isViewMode={isViewMode} />

            {/* Actions */}
            {!isViewMode && (
              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" className="w-full group" size="lg">
                  {isEditMode ? "Save Changes" : "Publish Listing"}
                  <AnimatedArrow direction="right" iconClassName="text-white" />
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Preview & Tips */}
          <div className="space-y-6">
            <LivePreview
              title={watchedValues.title}
              selectedGame={watchedValues.game}
              image={initialData?.image}
            />
          </div>
        </form>
      </Form>
    </ContainerDiv>
  );
};

export default CreateListing;
