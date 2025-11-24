import { apiClient } from "./apiClient";

export const checkNickname = async (nickname: string) => {
  try {
    const res = await apiClient.get("/members/check-nickname", {
      params: { nickname },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signupComplete = async (
  nickname: string,
  investmentAnswers: string,
  isPrivacyAgreed: boolean,
) => {
  try {
    const res = await apiClient.post("/signup/complete", {
      nickname,
      investmentAnswers,
      isPrivacyAgreed,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
