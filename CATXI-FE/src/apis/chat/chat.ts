import axiosInstance from '../axios';
import type { ChatMessagesResponse } from '../../types/chat/chatData';

export const fetchChatMessages = async (roomId: number): Promise<ChatMessagesResponse> => {
  const response = await axiosInstance.get<ChatMessagesResponse>(
    `/chat/${roomId}/messages`,
  );

  return response.data;
};
