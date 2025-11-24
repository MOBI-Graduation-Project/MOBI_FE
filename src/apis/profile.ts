import { apiClient } from "./apiClient";

export const getMyProfile = async () => {
  try {
    const res = await apiClient.get("/members/profile/my", {});
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (memberId: number) => {
  try {
    const res = await apiClient.get(`/members/profile/${memberId}`, {});
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchMyStateMessage = async (stateMessage: string) => {
  try {
    const res = await apiClient.patch("/members/profile/describe", {
      profileDescribe: stateMessage,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const patchMyProfileImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const res = await apiClient.patch("/members/profile/image", formData, {});
    return res.data;
  } catch (error) {
    throw error;
  }
};
