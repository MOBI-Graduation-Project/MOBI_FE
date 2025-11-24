import { create } from "zustand";

interface UserState {
  memberId: number | null;
  nickname: string | null;
  avatarCode: string | null;
  accessToken: string | null;

  setUser: (user: Partial<UserState>) => void;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>(set => ({
  memberId: null,
  nickname: null,
  avatarCode: null,
  accessToken: null,

  setUser: user => set(state => ({ ...state, ...user })),

  setAccessToken: accessToken =>
    set({
      accessToken,
    }),

  logout: () =>
    set({
      memberId: null,
      nickname: null,
      avatarCode: null,
      accessToken: null,
    }),
}));
