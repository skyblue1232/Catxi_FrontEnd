import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Storage from '../utils/storage';
import { useChatSocket } from "./useChatSocket";
import type { ChatMessage } from "../types/chat/chat";
import { useChatMessages } from "./query/useChatMessages";

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function useChatConnection(roomId: number) {
  const jwtToken = Storage.getAccessToken();
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { data: chatHistory } = useChatMessages(roomId);

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(jwtToken);
        setEmail(decoded.email);
      } catch (err) {
        console.error('JWT 디코딩 실패', err);
      }
    }
  }, [jwtToken]);

  useEffect(() => {
    if (chatHistory?.data && email) {
      const initial: ChatMessage[] = chatHistory.data.map((msg) => ({
        messageId: msg.messageId,
        roomId: msg.roomId,
        sender: msg.senderId,
        email: msg.senderEmail,
        message: msg.content,
        sentAt: msg.sentAt,
        isMine: msg.senderEmail === email,
      }));
      setMessages(initial);
    }
  }, [chatHistory, email]);

  const handleMessage = useCallback(
    (msg: ChatMessage, options?: { isHistory?: boolean }) => {
      setMessages((prev) => {
        if (options?.isHistory) {
          const exists = prev.some(
            (m) =>
              m.sentAt === msg.sentAt &&
              m.message === msg.message &&
              m.email === msg.email
          );
          return exists ? prev : [...prev, msg];
        }
        return [...prev, msg];
      });
    },
    []
  );

  const { connect, disconnect, sendMessage } = useChatSocket(
    roomId,
    jwtToken!,
    email,
    handleMessage
  );

  useEffect(() => {
    if (!roomId || !email) return;
    connect();
    return () => disconnect();
  }, [roomId, email, connect, disconnect]);

  return {
    messages,
    myEmail: email,
    sendMessage,
  };
}
