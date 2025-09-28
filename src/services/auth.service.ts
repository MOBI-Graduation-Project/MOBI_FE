// src/services/auth.service.ts
import { api } from '@/lib/api';

export const authService = {
  // 구글 로그인
  googleLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/google?state=login`;
  },
  
  // 구글 회원가입
  googleSignup: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/oauth2/authorization/google?state=signup`;
  },
  
  // 프로필 완성 (회원가입 완료)
  completeProfile: async (nickname: string, investmentAnswers: string) => {
    try {
      const response = await api.post('/api/auth/complete-profile', {
        nickname,
        investmentAnswers,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '프로필 등록에 실패했습니다.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('프로필 완성 에러:', error);
      throw error;
    }
  },
};