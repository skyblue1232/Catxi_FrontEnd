import { Outlet, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatConnection } from '../hooks/useChatConnection.ts';

const ChatLayout = () => {
  const { roomId } = useParams();
  const [input, setInput] = useState('');
  const parsedRoomId = Number(roomId); 
  const { messages, myEmail, sendMessage } = useChatConnection(parsedRoomId);

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const contextValue = useMemo(() => ({ messages, myEmail }), [messages, myEmail]);

  if (!roomId) {
    return <div>Loading... 채팅방 아이디가 없습니다.</div>;
  }

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
