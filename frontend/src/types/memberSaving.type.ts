export type MemberSavingsType = {
    sl: number;
    member_id: number;
    member_name: string;
    guardian_name: string;
    balance: number;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
};
export type FetchedMemberSavingsType = {
    count: number;
    next: string;
    previous: string;
    results: MemberSavingsType[];
};