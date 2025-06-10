// src/validations/registerSchema.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email("Please enter a valid email"),
  password: z.string({
    required_error: "Password is required"
  }).min(6, "Password must contain at least 6 character(s)"),
  role: z.enum(["parent", "admin"]).optional(),
  name: z.string({
    required_error: "Name is required"
  }).min(2),
});

export type RegisterInput = z.infer<typeof registerSchema>;
