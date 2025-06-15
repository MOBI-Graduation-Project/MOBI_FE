import { create } from 'zustand'

interface NicknameState {
  nickname: string
  setNickname: (name: string) => void
}

export const useNicknameStore = create<NicknameState>((set) => ({
  nickname: '',
  setNickname: (name) => set({ nickname: name }),
}))
