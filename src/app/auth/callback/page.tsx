// src/app/auth/callback/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setNewUser = useAuthStore((state) => state.setNewUser);

  useEffect(() => {
    const handleCallback = async () => {
      const state = searchParams.get('state');
      const isNewUser = searchParams.get('isNewUser') === 'true';
      
      if (state === 'signup' && isNewUser) {
        // 신규 회원가입인 경우
        setNewUser(true);
        router.push('/signup/nickname');
      } else if (state === 'login') {
        // 로그인 성공
        setAuth(true);
        router.push('/map');
      } else {
        // 에러 처리
        console.error('인증 실패');
        router.push('/');
      }
    };

    handleCallback();
  }, [searchParams, router, setAuth, setNewUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">인증 처리 중...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}