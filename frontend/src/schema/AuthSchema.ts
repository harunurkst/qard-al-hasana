import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: 'Please insert your email address.' })
        .email('This is not a valid email.'),
    password: z.string().min(1, { message: 'Please insert your password.' }),
});

export type LoginType = z.infer<typeof loginSchema>;
