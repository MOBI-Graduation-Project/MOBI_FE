import { useUserStore } from "@/stores/userStore";

import { apiClient } from "./apiClient";

export const checkNickname = async (nickname: string) => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get("/members/check-nickname", {
      params: { nickname },
      headers: { Authorization: `Bearer ${accessToken}` },
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
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요함");

  try {
    const res = await apiClient.post(
      "/signup/complete",
      { nickname, investmentAnswers, isPrivacyAgreed },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
