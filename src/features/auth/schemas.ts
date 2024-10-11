import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(5, "Password must be atleast 5 chars long"),
})

export const signUpSchema = z.object({
    name: z.string().trim().min(2, "Name is required"),
    email: z.string().trim().email(),
    password: z.string().min(5, "Password must be atleast 5 chars long"),
})