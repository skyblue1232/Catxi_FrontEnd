import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatSocket } from '../hooks/useChatSocket';
import { useSseSubscribe } from '../hooks/useSseSubscribe';
import type { ChatMessage } from '../types/chat';
import { getJwtToken, getMemberName } from '../utils/test/getMemberInfo';

const ChatLayout = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const memberId = Number(searchParams.get('memberId') || '0');
  const membername = getMemberName(memberId);        // 변경
  const jwtToken = getJwtToken(memberId);  

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleMessage = useCallback(
    (msg: ChatMessage, options?: { isHistory?: boolean }) => {
      setMessages((prev) => {
        if (options?.isHistory) {
          const alreadyExists = prev.some(
            (m) =>
              m.timestamp === msg.timestamp &&
              m.message === msg.message &&
              m.sender === msg.sender
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
    memberId,
    jwtToken,
    membername,
    handleMessage
  );

  const { connect: connectSse, disconnect: disconnect } = useSseSubscribe(roomId!, jwtToken);

  useEffect(() => {
    if (!roomId) return;

    connect();
    connectSse();
    
    console.log("WebSocket 연결 시도:", roomId);

    return () => {
      disconnect(); // sse 연결 해제
      disconnectWs(); // websocket 연결 해제
      console.log("SSE, Websocket 연결 해제:", roomId);
    };
  }, [roomId, connect, connectSse, disconnect, disconnectWs]);

  const contextValue = useMemo(
    () => ({ messages, memberId }),
    [messages, memberId]
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
