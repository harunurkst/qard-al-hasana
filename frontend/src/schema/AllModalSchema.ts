import { z } from 'zod';

export const DisbursementSchema = z.object({
    loan_amount: z.string().trim().min(1, { message: 'please insert loan disbursement amount' }),
    date: z.string(),
    installment_count: z.string().trim().min(1, { message: 'please insert installment counting' }),
});
export type DisbursementType = z.infer<typeof DisbursementSchema>;
