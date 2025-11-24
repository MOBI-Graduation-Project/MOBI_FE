import type { SendFriendRequestResponse } from "@/types/user";

import { apiClient } from "./apiClient";

export const searchUserByNickname = async (nickname: string) => {
  try {
    const res = await apiClient.get("/members/search", {
      params: { nickname },
    });

    return res.data; // { isSuccess, code, message, result: SearchUser[] }
  } catch (error) {
    console.error("searchUserByNickname Error:", error);
    throw error;
  }
};

export const getFriends = async () => {
  try {
    const res = await apiClient.get("/friends", {});
    return res.data; // { isSuccess, code, message, result: { friendList, friendRequestList } }
  } catch (error) {
    console.error("getFriends Error:", error);
    throw error;
  }
};

export const sendFriendRequest = async (toMemberId: number) => {
  const res = await apiClient.post<SendFriendRequestResponse>(
    "/friends/request",
    null,
    {
      params: { toMemberId }, //  ?toMemberId=6 형태로 전송
    },
  );

  return res.data;
};

//  친구요청 수락
export const acceptFriendRequest = async (fromMemberId: number) => {
  const res = await apiClient.post("/friends/accept", null, {
    params: { fromMemberId },
  });

  return res.data; // { isSuccess, code, message, result: {...} }
};

//  친구요청 거절
export const refuseFriendRequest = async (fromMemberId: number) => {
  const res = await apiClient.post("/friends/refuse", null, {
    params: { fromMemberId },
  });

  return res.data;
};
