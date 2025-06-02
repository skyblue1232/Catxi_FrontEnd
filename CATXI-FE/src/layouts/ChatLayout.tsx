import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatInput from '../pages/Chat/_components/ChatInput';
import { useChatSocket } from '../hooks/useChatSocket';
import type { ChatMessage } from '../types/chat';

// 서버 테스트용.

const ChatLayout = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const jwtToken = '토큰'; // 실제 테스트용 JWT로 바꾸면 될 것 같습니다.
  const membername = '사용자'; // 실제 사용자 이름 쓰면 될 것 같아요.

  const searchParams = new URLSearchParams(location.search);
  const userId = Number(searchParams.get('userId') || '0');

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { connect, sendMessage } = useChatSocket(
    roomId!,
    userId,
    jwtToken,
    membername,
    (msg, options) => {
      if (options?.isHistory) {
        setMessages((prev) => {
          const alreadyExists = prev.find(
            (m) =>
              m.timestamp === msg.timestamp &&
              m.content === msg.content &&
              m.sender === msg.sender
          );
          return alreadyExists ? prev : [...prev, msg];
        });
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    }
  );

  useEffect(() => {
    if (!roomId) return;

    connect();
    console.log("📡 WebSocket 연결 시도:", roomId);

    return () => {
      console.log("🔌 WebSocket 연결 해제:", roomId);
    };
  }, [roomId, connect]);

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


// 프론트 내에서 테스트하기 위한 라이브러리 사용.
// import { Outlet, useParams, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import ChatInput from '../pages/Chat/_components/ChatInput';
// import { useChatSocket } from '../hooks/useChatSocket';
// import type { ChatMessage } from '../types/chat';

// const ChatLayout = () => {
//   const { roomId } = useParams();
//   const location = useLocation();
//   const jwtToken = '토큰'; 
//   const membername = '사용자'; 

//   const searchParams = new URLSearchParams(location.search);
//   const userId = Number(searchParams.get('userId') || '0'); 

//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<ChatMessage[]>([]);

//   const { connect, sendMessage } = useChatSocket(
//     roomId!, 
//     userId, 
//     jwtToken,
//     membername,
//     (msg, options) => {
//       if (options?.isHistory) {
//         setMessages(prev => {
//           const alreadyExists = prev.find(
//             (m) => m.timestamp === msg.timestamp && m.content === msg.content && m.sender === msg.sender
//           );
//           return alreadyExists ? prev : [...prev, msg];
//         });
//       } else {
//         setMessages(prev => [...prev, msg]);
//       }
//     }
//   );

//   useEffect(() => {
//     if (!roomId) return;

//     connect();
//     console.log("📡 Connected to BroadcastChannel:", `room-${roomId}`);

//     return () => {
//       console.log("🔌 Cleaning up WebSocket connection");
//     };
//   }, [roomId]);

//   if (!roomId) {
//   return <div>Loading... 채팅방 아이디가 없습니다.</div>;
// }

//   const handleSubmit = () => {
//     if (!input.trim()) return;
//     sendMessage(input);
//     setInput('');
//   };

//   return (
//     <div className="flex flex-col relative w-full min-h-screen bg-background overflow-hidden">
//       <div className="h-full overflow-y-auto pb-[80px]">
//         <Outlet context={{ messages, userId }} />
//       </div>
//       <div className="absolute bottom-0 left-0 w-full border-t border-b border-gray-300 bg-background px-[1.656rem] pt-[0.625rem] pb-[0.938rem] z-100">
//         <ChatInput value={input} onChange={setInput} onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default ChatLayout;
