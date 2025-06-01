import type { ChatMessage } from '../types/chat';
import axiosInstance from '../apis/axios'; 

export const getChatHistory = async (
  roomId: string,
  jwtToken: string
): Promise<ChatMessage[]> => {
  try {
    const res = await axiosInstance.get<ChatMessage[]>(
      `/chat/history/${roomId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error('채팅 기록 불러오기 실패:', error);
    throw error; 
  }
};

export const saveChatMessage = (roomId: string, msg: ChatMessage) => {
  const LOCAL_KEY = `chat-history-${roomId}`;
  const prev = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') as ChatMessage[];
  localStorage.setItem(LOCAL_KEY, JSON.stringify([...prev, msg]));
};
