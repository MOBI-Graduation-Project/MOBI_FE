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

  const fullScreenRoutes = ["/chatbot", "/profile"];

  const isFullScreen =
    fullScreenRoutes.includes(pathname) ||
    (pathname
      ? pathname.startsWith("/profile/") ||
        pathname.startsWith("/chat/") ||
        pathname.startsWith("/metaverse/")
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
