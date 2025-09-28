// src/auth/callback.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  useEffect(() => {
    const handleCallback = () => {
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      
      if (error) {
        console.error('OAuth 에러:', error);
        router.push('/');
        return;
      }
      
      // 로그인 성공 - 쿠키는 자동으로 설정됨
      if (state === 'login') {
        setAuth(true, {});
        router.push('/map');
      } else if (state === 'signup') {
        router.push('/signup/nickname');
      }
    };
    
    handleCallback();
  }, [searchParams, router, setAuth]);
  
  return (
    <div className="flex h-screen items-center justify-center">
      <p>로그인 처리 중...</p>
    </div>
  );
}