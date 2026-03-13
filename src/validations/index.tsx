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

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    contact_number: z
      .string()
      .min(7, { message: "Contact number must be at least 7 digits." })
      .max(20, { message: "Contact number is too long." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
