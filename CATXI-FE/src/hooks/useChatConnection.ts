import { useEffect, useCallback, useState, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useChatSocket } from './useChatSocket';
import type { ChatMessage } from '../types/chat';
import Storage from '../utils/storage';
import { useChatRoomStore } from '../store/chatRoomStore';
import { useLocation } from 'react-router-dom';
import type { ChatRoomItem } from '../types/chatData';
import { useChatMessages } from './query/useChatMessages';

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export function useChatConnection(roomId: number) {
  const jwtToken = Storage.getAccessToken();
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { currentChatRoom, setCurrentChatRoom } = useChatRoomStore();
  const location = useLocation() as ReturnType<typeof useLocation> & {
    state: { chatRoom?: ChatRoomItem };
  };

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
    if (!currentChatRoom && location.state?.chatRoom) {
      setCurrentChatRoom(location.state.chatRoom);
    }
  }, [location.state, currentChatRoom, setCurrentChatRoom]);

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

  const hostEmail = useMemo(() => {
    const joins = messages.filter((m) =>
      m.message.includes('참여')
    );
    const sorted = [...joins].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );
    return sorted[0]?.email ?? '';
  }, [messages]);

  const hostName = useMemo(() => {
    return currentChatRoom?.hostNickname ?? '';
  }, [currentChatRoom]);

  return {
    messages,
    myEmail: email,
    hostEmail,
    hostName,
    chatRoom: currentChatRoom,
    sendMessage,
  };
}
