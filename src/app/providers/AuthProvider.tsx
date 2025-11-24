"use client";

import { usePathname, useRouter } from "next/navigation";

import { ReactNode, useEffect } from "react";

import { useUserStore } from "@/stores/userStore";

import { apiClient } from "@/apis/apiClient";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setAccessToken, setUser } = useUserStore();

  const publicPaths = ["/"];

  const isPublic = publicPaths.includes(pathname);

  useEffect(() => {
    if (accessToken) return;

    if (isPublic) return;

    const fetchAccessToken = async () => {
      try {
        const res = await apiClient.post(
          "/auth/reissue",
          {},
          { withCredentials: true },
        );
        const data = res.data.result;
        setAccessToken(data.accessToken);
        setUser({
          memberId: data.member.memberId,
          nickname: data.member.username,
          avatarCode: data.member.avatar,
        });
      } catch {
        router.replace("/");
      }
    };

    fetchAccessToken();
  }, [pathname, accessToken, isPublic, router, setAccessToken, setUser]);

  return <>{children}</>;
}
