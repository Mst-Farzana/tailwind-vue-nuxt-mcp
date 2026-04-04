// server/validators/auth.schema.ts
import { z } from 'zod';

// ================= AUTH =================
export const SignupSchema = z.object({
  name: z.string().min(2, 'Name is required').max(120),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(255),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});

// ================= USER PROFILE =================
export const UserPublicSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  verified: z.boolean(),
  notificationsEnabled: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  avatar: z.string().max(255).nullable().optional(),
  notificationsEnabled: z.boolean().optional(),
});
