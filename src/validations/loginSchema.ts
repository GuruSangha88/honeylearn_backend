// src/validations/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email(),
  password: z.string({
    required_error: "Password is required"
  }).min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
