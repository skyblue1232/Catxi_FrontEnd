import { useCallback, useEffect, useMemo, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Storage from '../utils/storage';
import { useChatSocket } from "./useChatSocket";
import { useChatMessages } from "./query/useChatMessages";
import { useChatRoomDetail } from "./query/useChatDetail";
import type { ChatMessage } from "../types/chat/chat";
import type { ReadyMessage } from "../types/chat/readyMessage";

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function useChatConnection(roomId: number) {
  const jwtToken = Storage.getAccessToken();
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [readyMessages, setReadyMessages] = useState<ReadyMessage[]>([]);

  const { data: chatRoomDetail, isLoading, isError } = useChatRoomDetail(roomId);
  const { data: chatHistory } = useChatMessages(roomId);

  // 닉네임 맵
  const nicknameMap = useMemo(() => {
    const emails = chatRoomDetail?.data?.participantEmails || [];
    const nicknames = chatRoomDetail?.data?.participantNicknames || [];
    return emails.reduce((acc, email, i) => {
      acc[email] = nicknames[i];
      return acc;
    }, {} as Record<string, string>);
  }, [chatRoomDetail]);

  const hostEmail = chatRoomDetail?.data?.hostEmail ?? '';
  const hostNickname = useMemo(() => {
    const idx = chatRoomDetail?.data?.participantEmails.findIndex(e => e === hostEmail);
    return idx !== undefined && idx !== -1
      ? chatRoomDetail?.data?.participantNicknames[idx]
      : hostEmail;
  }, [chatRoomDetail, hostEmail]);

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

  const handleReadyMessage = useCallback((msg: ReadyMessage) => {
    console.log('[useChatConnection Ready 수신]', msg);
    setReadyMessages((prev) => [...prev, msg]);
  }, []);

  const { connect, disconnect, sendMessage } = useChatSocket(
    roomId,
    jwtToken!,
    email,
    handleMessage,
    handleReadyMessage,
    nicknameMap,
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
    readyMessages,
    nicknameMap,
    hostEmail,
    hostNickname,
    chatRoomDetail: chatRoomDetail?.data,
    isLoading,
    isError,
  };
};
