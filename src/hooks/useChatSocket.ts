"use client";

import { useEffect, useRef } from "react";

import { useUserStore } from "@/stores/userStore";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { Message } from "@/types/chatMessage";

export function useChatSocket(
  roomId: number,
  onReceiveMessage: (msg: Message) => void,
) {
  const clientRef = useRef<Client | null>(null);
  const accessToken = useUserStore(state => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket as WebSocket,

      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },

      reconnectDelay: 3000,
      debug: () => {},
    });

    client.onConnect = () => {
      console.log("WebSocket Connected");

      // 메시지 + 읽음 이벤트 구독
      client.subscribe(`/sub/chat/room/${roomId}`, frame => {
        const body = JSON.parse(frame.body);
        onReceiveMessage(body);
      });

      // 입장 시 읽음 처리 요청
      client.publish({
        destination: "/pub/chat/read",
        body: JSON.stringify({ roomId }),
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId, accessToken]);

  const sendMessage = (content: string) => {
    clientRef.current?.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ roomId, content }),
    });
  };

  return { sendMessage };
}
