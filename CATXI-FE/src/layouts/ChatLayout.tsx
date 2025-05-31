import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatSocket } from '../hooks/useChatSocket';
import { fetchChatHistory } from '../apis/chat';
import type { ChatMessage } from '../types/chat';

const ChatLayout = () => {
  const { roomId } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = Number(searchParams.get('userId') || '0'); // fallback 0

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { connect, sendMessage } = useChatSocket(roomId!, userId, (msg, options) => {
    if (options?.isHistory) {
      setMessages(prev => {
        const alreadyExists = prev.find(
          (m) => m.timestamp === msg.timestamp && m.content === msg.content && m.sender === msg.sender
        );
        return alreadyExists ? prev : [...prev, msg];
      });
    } else {
      setMessages(prev => [...prev, msg]);
    }
  });

  useEffect(() => {
    if (!roomId) return;

    connect();
    console.log("📡 Connected to BroadcastChannel:", `room-${roomId}`);
  }, [roomId]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-background overflow-hidden">
      <div className="h-full overflow-y-auto pb-[80px]">
        <Outlet context={{ messages, userId }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-b border-gray-300 bg-background px-[1.656rem] pt-[0.625rem] pb-[0.938rem] z-100">
        <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChatLayout;
