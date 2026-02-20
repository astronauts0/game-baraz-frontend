import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select an inquiry vector." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
