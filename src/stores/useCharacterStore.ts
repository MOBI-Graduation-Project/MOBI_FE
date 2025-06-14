// src/stores/characterStore.ts
import { create } from 'zustand'

type CharacterStore = {
  type: string
  setType: (type: string) => void
}

export const useCharacterStore = create<CharacterStore>(set => ({
  type: '111', // 초기값은 일단 111로 설정
  setType: type => set({ type }),
}))