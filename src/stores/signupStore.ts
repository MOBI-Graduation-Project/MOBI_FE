// store/signupStore.ts
import { create } from "zustand";

interface SignupStore {
  nickname: string;
  purposes: {
    step1: string | null;
    step2: string | null;
    step3: string | null;
  };
  character: {
    type: string;
    name: string;
  } | null;
  setNickname: (nickname: string) => void;
  setPurpose: (step: number, value: string) => void;
  setCharacter: (type: string, name: string) => void;
}

export const useSignupStore = create<SignupStore>(set => ({
  nickname: "",
  purposes: {
    step1: null,
    step2: null,
    step3: null,
  },
  character: null,
  setNickname: nickname => set({ nickname }),
  setPurpose: (step, value) =>
    set(state => ({
      purposes: {
        ...state.purposes,
        [`step${step}`]: value,
      },
    })),
  setCharacter: (type, name) => set({ character: { type, name } }),
}));
