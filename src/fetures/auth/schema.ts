import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters long",
  }).max(50, {
    message: "Password must be at most 50 characters long",
  }),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters long",
  }).max(50, {
    message: "Password must be at most 50 characters long",
  }),
});