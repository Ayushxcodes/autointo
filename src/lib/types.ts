import z from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("Invalid email"), // this is fine
  name: z.string().min(1, "Required"), // must be a non-empty string
});
