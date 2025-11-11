import { Suspense } from "react";

import GoogleCallback from "@/components/auth/GoogleCallback";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}
