import { create } from "zustand";

interface CharacterState {
  characterType: string | null;
  setCharacterType: (type: string) => void;
}

export const useCharacterStore = create<CharacterState>(set => ({
  characterType: null,
  setCharacterType: type => set({ characterType: type }),
}));
