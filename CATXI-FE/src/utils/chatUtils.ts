import type { ChatMessage } from '../types/chat';
import axiosInstance from '../apis/axios';

const SERVER_URL = '';

export const getChatHistory = async (
  roomId: string,
  jwtToken: string,
): Promise<ChatMessage[]> => {
  if (!SERVER_URL) {
    const localKey = `chat-history-${roomId}`;
    const data = JSON.parse(localStorage.getItem(localKey) || '[]');
    console.log('[프론트 테스트] 로컬스토리지에서 불러오기:', data);

    if (!Array.isArray(data)) {
      console.warn('[프론트 테스트] 배열이 아닙니다. 초기화합니다.');
      return [];
    }

    return data as ChatMessage[];
  }

  try {
    const headers: Record<string, string> = {};

    if (jwtToken && jwtToken !== '토큰') {
      headers.Authorization = `Bearer ${jwtToken}`;
    }

    const res = await axiosInstance.get<ChatMessage[]>(
      `/chat/${roomId}/message`,
      { headers }
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
