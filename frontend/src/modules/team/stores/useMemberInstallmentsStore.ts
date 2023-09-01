import { create } from 'zustand';
import { MemberInstallmentType } from '../../../types/memberInstallment.type';

interface IMemberInstallmentsStore {
    memberTransactions: MemberInstallmentType[];
    selectedMember: MemberInstallmentType | null;
    actions: {
        setTransactions: (newInstallments: MemberInstallmentType[]) => void;
        setSelectedMember: (data: MemberInstallmentType) => void;
    };
}

export const useMemberInstallmentsStore = create<IMemberInstallmentsStore>((set) => ({
    memberTransactions: [],
    selectedMember: null,
    actions: {
        setTransactions: (transactions) => set({ memberTransactions: transactions }),
        setSelectedMember: (data: MemberInstallmentType) => set({ selectedMember: data }),
    },
}));
