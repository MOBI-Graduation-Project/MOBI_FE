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
  const codeVerifier = localStorage.getItem("code_verifier")!;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, codeVerifier }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("서버 호출 실패:", text);
      return;
    }

    const data: OAuthResponse = await res.json();

    // 토큰 저장
    localStorage.setItem("accessToken", data.result.accessToken);
    localStorage.setItem("refreshToken", data.result.refreshToken);
    localStorage.removeItem("code_verifier");

    // isNewMember에 따라 분기
    if (data.result.isNewMember) {
      window.location.href = "/signup/nickname";
    } else {
      window.location.href = "/map";
    }
  } catch (err) {
    console.error("OAuth 처리 중 에러:", err);
  }
};
