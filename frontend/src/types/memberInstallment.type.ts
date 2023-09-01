export type MemberInstallmentType = {
    sl: number;
    member_id: number;
    loan_id: number;
    loan_balance: number;
    loan_amount: number;
    member_name: string;
    guardian_name: string;
    balance: number;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
};
export type FetchedMemberInstallmentsType = {
    count: number;
    next: string;
    previous: string;
    results: MemberInstallmentType[];
};
