import { Outlet } from 'react-router-dom';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useState } from 'react';

const ChatLayout = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ content: string; isMe: boolean }[]>([]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { content: input, isMe: true }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { content: '자동 응답입니다', isMe: false }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="flex flex-col relative w-full min-h-screen bg-background overflow-hidden">
      <div className="h-full overflow-y-auto pb-[80px]">
        <Outlet context={{ messages }} />
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-b border-gray-300 bg-background px-[1.656rem] pt-[0.625rem] pb-[0.938rem] z-100">
        <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </div>
    </div>

  );
};

export default ChatLayout;
