"use client";

import { usePathname } from "next/navigation";

import { LayeredBackground } from "@/components/layout/LayeredBackground";

import AuthProvider from "./providers/AuthProvider";

interface LayoutClientProps {
  children: React.ReactNode;
  isBackgroundOnly?: boolean;
}
export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname();

  // 레이아웃 제외(상단바, 하단바, BG 모두 없음)
  const fullScreenRoutes = ["/chatbot", "/profile"];

  const isFullScreen =
    fullScreenRoutes.includes(pathname) ||
    (pathname
      ? pathname.startsWith("/profile/") || pathname.startsWith("/chat/")
      : false);

  return (
    <>
      {!isFullScreen && <LayeredBackground />}
      <AuthProvider>
        <div className="flex h-screen w-screen">{children}</div>
      </AuthProvider>
    </>
  );
}
