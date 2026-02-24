import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select an inquiry vector." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
export const listingSchema = z.object({
  game: z.string().min(1, "Please select a game"),
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  assetType: z.enum(["Weapon Skin", "Account", "Currency", "Bundle"]),
  rarity: z.string().min(1, "Please select a rarity"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().min(500, "Minimum listing price is Rs 500"),
  allowOffers: z.boolean().default(true),
  minOffer: z.coerce.number().optional().nullable(),
  deliveryMethod: z.enum(["instant", "chat"]).default("instant"),
  protectionPassword: z.string().optional(),
});

export type ListingFormValues = z.infer<typeof listingSchema>;
