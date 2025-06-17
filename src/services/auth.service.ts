// src/services/auth.service.ts
import { api } from "@/lib/api";

// 개발 모드 체크
const isDevelopment = process.env.NODE_ENV === "development";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authService = {
  // 구글 로그인
  googleLogin: () => {
    // 임시로 바로 이동
    window.location.href = "/map";
    return;

    // 백엔드 연결 시 아래 주석 해제
    // window.location.href = `${API_URL}/api/oauth2/authorization/google?state=login`;
  },

  // 구글 회원가입
  googleSignup: () => {
    // 임시로 바로 이동
    window.location.href = "/signup/nickname";
    return;

    // 백엔드 연결 시 아래 주석 해제
    // window.location.href = `${API_URL}/api/oauth2/authorization/google?state=signup`;
  },

  // 프로필 완성 (회원가입 완료)
  completeProfile: async (nickname: string, investmentAnswers: string) => {
    // 임시로 성공 응답 반환
    console.log("임시 회원가입 완료:", { nickname, investmentAnswers });
    return { message: "프로필 입력이 완료되었습니다." };

    // 백엔드 연결 시 아래 주석 해제
    /*
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
    */
  },
};
