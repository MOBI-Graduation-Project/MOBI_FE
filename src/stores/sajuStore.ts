"use client";

import { create } from "zustand";

type Birthday = {
  year: number;
  month: number;
  day: number;
};

interface SajuState {
  birthday?: Birthday;
  company?: string; 

  setBirthday: (b: Birthday) => void;
  setCompany: (c: string) => void; 
  reset: () => void;
}

export const useSajuStore = create<SajuState>((set) => ({
  birthday: undefined,
  company: "삼성전자", 

  setBirthday: (birthday) => set({ birthday }),
  setCompany: (company) => set({ company }),
  reset: () => set({ birthday: undefined, company: undefined }),
}));

