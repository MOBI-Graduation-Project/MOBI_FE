import { useUserStore } from "@/stores/userStore";

import { Message } from "@/types/chatMessage";
import { ChatRoom } from "@/types/chatRoom";

import { apiClient } from "./apiClient";

export const createChatRoom = async (otherMemberId: number) => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.post(
      "/chat/room",
      {},
      {
        params: { otherMemberId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data.result; // roomId 반환
  } catch (error) {
    console.log("createChatRoom Error:", error);
    throw error;
  }
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get("/chat/rooms", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result; // ChatRoom[] 반환
  } catch (error) {
    console.error("getChatRooms Error:", error);
    throw error;
  }
};

export const getMessages = async (roomId: number): Promise<Message[]> => {
  const accessToken = useUserStore.getState().accessToken;
  if (!accessToken) throw new Error("로그인 필요");

  try {
    const res = await apiClient.get(`/chat/room/${roomId}/history`, {
      params: { roomId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result; // Message[] 반환
  } catch (error) {
    console.error("getMessages Error:", error);
    throw error;
  }
};
