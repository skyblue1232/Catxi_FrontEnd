import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatConnection } from '../hooks/useChatConnection';
import LogoText from '../assets/icons/logoText.svg?react';
import { useNavigationBlocker } from '../hooks/navigation/useNavigationBlocker';

const ChatLayout = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const parsedRoomId = Number(roomId);
  const [input, setInput] = useState('');

  const {
    messages,
    myEmail,
    sendMessage,
    nicknameMap,
    hostEmail,
    hostNickname,
    chatRoomDetail,
    isLoading,
    isError,
  } = useChatConnection(parsedRoomId);

  useNavigationBlocker();

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const contextValue = useMemo(
    () => ({
      messages,
      myEmail,
      hostEmail,
      hostNickname,
      chatRoom: chatRoomDetail,
      nicknameMap,
    }),
    [messages, myEmail, hostEmail, hostNickname, chatRoomDetail, nicknameMap]
  );

  if (!roomId || isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#8C46F6] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !chatRoomDetail) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <LogoText className="w-[140px] h-auto" />
          <button
            onClick={() => navigate('/')}
            className="px-8 py-2 bg-[#8C46F6] text-white rounded-full shadow hover:bg-[#722de2] transition"
          >
            retry
          </button>
        </div>
      </div>
    );
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
