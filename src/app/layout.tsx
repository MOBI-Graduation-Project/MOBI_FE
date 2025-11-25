import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

import LayoutClient from "./layoutClient";

const geekble = localFont({
  src: "../../public/fonts/GeekbleMalang2WOFF2.woff2",
  display: "swap",
  style: "normal",
  weight: "400",
  variable: "--font-geekble",
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "MOBI",
  description:
    "메타버스 기반 커뮤니티와 AI 주식차트 예측 및 분석 기능을 갖춘 서비스",
  robots: "index, follow",
  icons: {
    icon: "/svgs/favicons.svg",
  },
  openGraph: {
    title: "MOBI",
    description:
      "메타버스 기반 커뮤니티와 AI 주식차트 예측 및 분석 기능을 갖춘 웹 플랫폼입니다.",
    siteName: "MOBI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geekble.variable} ${pretendard.variable}`}>
      <body suppressHydrationWarning>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
