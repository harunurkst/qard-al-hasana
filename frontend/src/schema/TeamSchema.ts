import { z } from 'zod';

export const depositSchema = z.object({
    amount: z.string().trim().min(1, { message: 'Please insert your amount.' }),
    // date: z.string().min(1, { message: 'Please insert your Date.' }),
});
export const depositFormSubmitSchema = z.object({
    member: z.number(),
    amount: z.number(),
    date: z.string().min(1, { message: 'Please insert your Date.' }),
});

export type DepositType = z.infer<typeof depositSchema>;
