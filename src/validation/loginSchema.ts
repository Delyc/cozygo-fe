import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email").optional(),
  username: z.string().min(3, "Username is required").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.email || data.username, {
  message: "Email or Username is required",
});
