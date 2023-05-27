import create from 'zustand';
import {MemberSavingsType} from '../types/memberSaving.type'

type State = {
  savings: MemberSavingsType[];
  actions: {
    setSavings: (newSavings: MemberSavingsType[]) => void;
  };
};

export const useMemberSavingsStore = create<State>((set) => ({
  savings: [],
  actions: {
    setSavings: (newSavings) => set({ savings: newSavings }),
  },
}));