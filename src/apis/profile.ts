import { apiClient } from "./apiClient";

export const getMyProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
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
  const accessToken = localStorage.getItem("accessToken");
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
  const accessToken = localStorage.getItem("accessToken");
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

export const patchMyProfileImage = async (imageFile: File) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  const formData = new FormData();
  formData.append("profileImage", imageFile);

  try {
    const res = await apiClient.patch("/members/profile/image", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
