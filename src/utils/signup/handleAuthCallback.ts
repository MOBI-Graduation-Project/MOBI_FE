import { useRouter } from "next/navigation";

import { useUserStore } from "@/stores/userStore";

import { getMyProfile } from "@/apis/profile";

interface OAuthResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isNewMember: boolean;
    accessToken: string;
    refreshToken: string;
    member: {
      memberId: number;
      email: string;
      username: string;
      profileImg: string;
      loginType: string;
    };
  };
}

export const handleOAuthCallback = async (
  code: string,
  router: ReturnType<typeof useRouter>,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("서버 호출 실패:", text);
      return;
    }

    const data: OAuthResponse = await res.json();

    useUserStore.getState().setAccessToken(data.result.accessToken);
    try {
      const profileRes = await getMyProfile();
      if (profileRes?.isSuccess && profileRes.result) {
        const { memberId, nickname, avatar } = profileRes.result;
        const { setUser } = useUserStore.getState();

        setUser({
          memberId,
          nickname,
          avatarCode: avatar ?? null,
        });
      } else {
        console.error("내 프로필 조회 실패:", profileRes?.message);
      }
    } catch (e) {
      console.error("내 프로필 조회 중 에러:", e);
    }

    if (data.result.isNewMember) {
      router.push("/signup/nickname");
    } else {
      router.push("/map");
    }
  } catch (err) {
    console.error("OAuth 처리 중 에러:", err);
  }
};
