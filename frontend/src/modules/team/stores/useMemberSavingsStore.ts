import create from 'zustand';
import { MemberSavingsType } from '../../../types/memberSaving.type';

type State = {
    memberTransactions: MemberSavingsType[];
    actions: {
        setTransactions: (newSavings: MemberSavingsType[]) => void;
    };
};

export const useMemberSavingsStore = create<State>((set) => ({
    memberTransactions: [],
    actions: {
        setTransactions: (transactions) => set({ memberTransactions: transactions }),
    },
}));
