import { create } from "zustand";

interface UserState {
  memberId: number | null;
  nickname: string | null;
  avatarCode: string | null;

  setUser: (data: {
    memberId: number;
    nickname: string;
    avatarCode: string | null;
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(set => ({
  memberId: null,
  nickname: null,
  avatarCode: null,

  setUser: ({ memberId, nickname, avatarCode }) =>
    set({ memberId, nickname, avatarCode }),

  clearUser: () => set({ memberId: null, nickname: null, avatarCode: null }),
}));
