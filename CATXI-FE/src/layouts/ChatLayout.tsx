import { Outlet, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatSocket } from '../hooks/useChatSocket';
import { useSseSubscribe } from '../hooks/useSseSubscribe';
import type { ChatMessage } from '../types/chat';
import { jwtDecode } from 'jwt-decode';
import Storage from '../utils/storage';

interface JwtPayload {
  email: string;
  [key: string]: any;
}

const ChatLayout = () => {
  const { roomId } = useParams();
  const jwtToken = Storage.getAccessToken();
  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');
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

  const { connect, disconnect: disconnectWs, sendMessage } = useChatSocket(
    roomId!,
    jwtToken!,
    email,
    handleMessage
  );

  const { connect: connectSse, disconnect } = useSseSubscribe(roomId!, jwtToken!);

  useEffect(() => {
    if (!roomId || !email) return;

    connect();
    connectSse();
    console.log("WebSocket 연결 시도:", roomId);

    return () => {
      disconnect();
      disconnectWs();
      console.log("SSE, Websocket 연결 해제:", roomId);
    };
  }, [roomId, email, connect, connectSse, disconnect, disconnectWs]);

  const contextValue = useMemo(
    () => ({ messages, myEmail: email }),
    [messages, email]
  );

  if (!roomId) {
    return <div>Loading... 채팅방 아이디가 없습니다.</div>;
  }

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-[80px]">
        <Outlet context={contextValue} />
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t border-b border-gray-300 bg-background px-[1.656rem] pt-[0.625rem] pb-[0.938rem] z-100 flex-1">
        <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatLayout;
