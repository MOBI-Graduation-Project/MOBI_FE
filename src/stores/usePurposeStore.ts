import { create } from "zustand";

export type PurposeStep = "step1" | "step2" | "step3";
export type SelectionValue = "1" | "2";

interface Context {
  step1?: SelectionValue;
  step2?: SelectionValue;
  step3?: SelectionValue;
}

interface PurposeState {
  context: Context;
  setSelection: (step: PurposeStep, value: SelectionValue) => void;
  reset: () => void;
}

export const usePurposeStore = create<PurposeState>(set => ({
  context: {},
  setSelection: (step, value) =>
    set(state => ({
      context: { ...state.context, [step]: value },
    })),
  reset: () => set({ context: {} }),
}));
