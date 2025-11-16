import { apiClient } from "./apiClient";

import type { SendFriendRequestResponse } from "@/types/user";

export const searchUserByNickname = async (nickname: string) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get("/members/search", {
      params: { nickname },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data; // { isSuccess, code, message, result: SearchUser[] }
  } catch (error) {
    console.error("searchUserByNickname Error:", error);
    throw error;
  }
};

export const getFriends = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get("/friends", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data; // { isSuccess, code, message, result: { friendList, friendRequestList } }
  } catch (error) {
    console.error("getFriends Error:", error);
    throw error;
  }
};

export const sendFriendRequest = async (toMemberId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("로그인 필요");

  const res = await apiClient.post<SendFriendRequestResponse>(
    "/friends/request",
    null,
    {
      params: { toMemberId }, //  ?toMemberId=6 형태로 전송
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*", // Swagger랑 맞춤
      },
    },
  );

  return res.data;
};
