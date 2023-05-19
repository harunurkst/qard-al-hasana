import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().trim().min(1, { message: 'Please insert your username.' }),
    // .username('This is not a valid username.'),
    password: z.string().min(1, { message: 'Please insert your password.' }),
});

export const registrationSchema = z
    .object({
        organizationName: z.string().trim().min(1, { message: 'Please insert your organization name.' }).max(50),
        address: z.string().trim().min(1, { message: 'Please insert your address.' }).max(50),
        email: z
            .string()
            .trim()
            .min(1, { message: 'Please insert your address.' })
            .email({ message: 'Invalid username' }),
        phoneNumber: z
            .string()
            .regex(new RegExp(/^(?:\+88|88)?(01[3-9]\d{8})$/), { message: 'Not a valid Bangladeshi number' }),

        password: z.string().min(5, { message: 'Please insert your password.' }),
        confirmPassword: z.string().min(5, { message: 'Please insert your confirm password.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });

export type LoginType = z.infer<typeof loginSchema>;
export type RegistrationType = z.infer<typeof registrationSchema>;
