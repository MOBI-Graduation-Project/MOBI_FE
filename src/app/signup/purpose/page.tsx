"use client";

import dynamic from "next/dynamic";

const PurposePage = dynamic(() => import("@/components/signup/PurposePage"), {
  ssr: false,
});
export default function Page() {
  return <PurposePage />;
}
