export type BranchIncomeExpenseType = {
    id: number;
    amount: number;
    date: string;
    category: number;
    summary: string;
};

export type BranchIncomeExpenseListType = {
    count: number;
    next: null | string;
    previous: null | string;
    results: Array<BranchIncomeExpenseType>;
};
export type BranchAddExpensePayloadType = {
    amount: number;
    date: string;
    category: number;
    summary: string;
};
