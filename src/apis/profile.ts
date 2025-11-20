import { useUserStore } from "@/stores/userStore";

import { apiClient } from "./apiClient";

export const getMyProfile = async () => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get("/members/profile/my", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (memberId: number) => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get(`/members/profile/${memberId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchMyStateMessage = async (stateMessage: string) => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.patch(
      "/members/profile/describe",
      { profileDescribe: stateMessage },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchMyProfileImage = async (image: File) => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  const formData = new FormData();
  formData.append("image", image);
  try {
    const res = await apiClient.patch("/members/profile/image", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
