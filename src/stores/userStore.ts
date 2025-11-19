import { create } from "zustand";

interface UserState {
  memberId: number | null;
  nickname: string | null;
  avatarCode: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiry: number | null;
  refreshTokenExpiry: number | null;
  setUser: (user: Partial<UserState>) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useUserStore = create<UserState>(set => ({
  memberId: null,
  nickname: null,
  avatarCode: null,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
  setUser: user => set(state => ({ ...state, ...user })),
  setTokens: (accessToken, refreshToken) =>
    set({
      accessToken,
      refreshToken,
      accessTokenExpiry: Date.now() + 1209600 * 1000, // 14일 후
      refreshTokenExpiry: Date.now() + 3600 * 1000, // 1시간 후 }),
    }),
}));
