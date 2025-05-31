import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";

export function useChatSocket(
  roomId: string,
  userId: number,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const LOCAL_KEY = `chat-history-${roomId}`;

  const connect = () => {
    // 1️⃣ 이전 메시지 불러오기
    const history = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as ChatMessage[];
    history.forEach((msg) => {
      onMessage(msg, { isHistory: true });
    });

    // 2️⃣ 실시간 수신
    const channel = new BroadcastChannel(`room-${roomId}`);
    channel.onmessage = (event) => {
      const msg: ChatMessage = event.data;

      if (msg.sender === userId) return;
      saveMessage(msg);
      onMessage(msg);
    };
    channelRef.current = channel;
  };

  const saveMessage = (msg: ChatMessage) => {
    const prev = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as ChatMessage[];
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...prev, msg]));
  };

  const sendMessage = (content: string) => {
    const msg: ChatMessage = {
      content,
      sender: userId,
      timestamp: new Date().toISOString(),
    };

    onMessage(msg, { isHistory: true });       // 화면 반영
    saveMessage(msg);     // 저장
    channelRef.current?.postMessage(msg); // 브로드캐스트
  };

  useEffect(() => {
    return () => {
      channelRef.current?.close();
    };
  }, []);

  return { connect, sendMessage };
}
