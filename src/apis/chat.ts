import { Message } from "@/types/chatMessage";
import { ChatRoom } from "@/types/chatRoom";

import { apiClient } from "./apiClient";

export const createChatRoom = async (otherMemberId: number) => {
  try {
    const res = await apiClient.post(
      "/chat/room",
      {},
      {
        params: { otherMemberId },
      },
    );
    return res.data.result; // roomId 반환
  } catch (error) {
    console.error("createChatRoom Error:", error);
    throw error;
  }
};

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  try {
    const res = await apiClient.get("/chat/rooms", {});
    return res.data.result; // ChatRoom[] 반환
  } catch (error) {
    console.error("getChatRooms Error:", error);
    throw error;
  }
};

export const getMessages = async (roomId: number): Promise<Message[]> => {
  try {
    const res = await apiClient.get(`/chat/room/${roomId}/history`, {
      params: { roomId },
    });
    return res.data.result; // Message[] 반환
  } catch (error) {
    console.error("getMessages Error:", error);
    throw error;
  }
};
