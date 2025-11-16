import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  memberId: number | null;
  nickname: string | null;
  avatarCode: string | null; // 백엔드에서 내려주는 아바타 코드 (AVATAR_TYPE_1 이런 거)

  setUser: (data: { memberId: number; nickname: string; avatarCode: string | null }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      memberId: null,
      nickname: null,
      avatarCode: null,

      setUser: ({ memberId, nickname, avatarCode }) =>
        set({ memberId, nickname, avatarCode }),

      clearUser: () => set({ memberId: null, nickname: null, avatarCode: null }),
    }),
    {
      name: "mobi-user", // localStorage 키
    },
  ),
);
