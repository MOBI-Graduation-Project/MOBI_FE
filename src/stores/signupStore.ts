import { create } from "zustand";

interface SignUpState {
  nickname: string;
  investmentAnswers: string;
  isPrivacyAgreed: boolean;
  setSignUpData: (data: Partial<Omit<SignUpState, "setSignUpData">>) => void;
  resetSignUpData: () => void;
}

export const useSignUpStore = create<SignUpState>(set => ({
  nickname: "",
  investmentAnswers: "",
  isPrivacyAgreed: false,
  setSignUpData: data => set(state => ({ ...state, ...data })),
  resetSignUpData: () =>
    set({ nickname: "", investmentAnswers: "", isPrivacyAgreed: false }),
}));
