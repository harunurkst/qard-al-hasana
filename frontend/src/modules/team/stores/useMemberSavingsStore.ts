import create from 'zustand';
import { MemberSavingsType } from '../../../types/memberSaving.type';

interface IMemberSavingsStore  {
    memberTransactions: MemberSavingsType[];
    selectedMember: MemberSavingsType | null;
    actions: {
        setTransactions: (newSavings: MemberSavingsType[]) => void;
        setSelectedMember: (data: MemberSavingsType) => void;
    };
}

export const useMemberSavingsStore = create<IMemberSavingsStore>((set) => ({
    memberTransactions: [],
    selectedMember: null,
    actions: {
        setTransactions: (transactions) => set({ memberTransactions: transactions }),
        setSelectedMember: (data:MemberSavingsType) => set({ selectedMember: data }),
    },
}));
