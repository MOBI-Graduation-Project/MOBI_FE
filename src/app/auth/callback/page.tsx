import { useRouter } from "next/router";

import { useEffect } from "react";

export default function GoogleCallback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          }),
        },
      );

      const data = await res.json();

      if (data.isNewUser) {
        router.replace("/signup/nickname");
      } else {
        router.replace("/map");
      }
    })();
  }, [code]);

  return <div>로그인 중...</div>;
}
