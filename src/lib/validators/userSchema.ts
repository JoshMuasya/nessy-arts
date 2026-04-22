import { z } from "zod";

export const registerSchema = z.object({
    uid: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    profileImage: z.string().optional().or(z.literal("")),
    password: z.string().min(1, "Password is required"),
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
})

export const updateProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    profileImage: z.string().url("Invalid URL").optional().or(z.literal("")),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email"),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

export const userIdSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
})