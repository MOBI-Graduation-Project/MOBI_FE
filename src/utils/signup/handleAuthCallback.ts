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

export const handleOAuthCallback = async (code: string) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`);
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

    localStorage.setItem("accessToken", data.result.accessToken);
    localStorage.setItem("refreshToken", data.result.refreshToken);

    if (data.result.isNewMember) {
      window.location.href = "/signup/nickname";
    } else {
      window.location.href = "/map";
    }
  } catch (err) {
    console.error("OAuth 처리 중 에러:", err);
  }
};
