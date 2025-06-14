import { useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useChatSocket } from './useChatSocket';
import type { ChatMessage } from '../types/chat';
import Storage from '../utils/storage';

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function useChatConnection(roomId: number) {
  const jwtToken = Storage.getAccessToken();
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

  const handleMessage = useCallback(
    (msg: ChatMessage, options?: { isHistory?: boolean }) => {
      setMessages((prev) => {
        if (options?.isHistory) {
          const alreadyExists = prev.some(
            (m) =>
              m.sentAt === msg.sentAt &&
              m.message === msg.message &&
              m.email === msg.email
          );
          return alreadyExists ? prev : [...prev, msg];
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
    console.log('WebSocket 연결 시도:', roomId);

    return () => {
      disconnect();
      console.log('WebSocket 연결 해제:', roomId);
    };
  }, [roomId, email, connect, disconnect]);

  return {
    messages,
    myEmail: email,
    sendMessage,
  };
};
