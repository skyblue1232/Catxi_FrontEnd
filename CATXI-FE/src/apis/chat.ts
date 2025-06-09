import axiosInstance from './axios';
import type { GetChatMessagesResponse } from '../types/chatData';

export const fetchChatMessages = async (roomId: number): Promise<GetChatMessagesResponse> => {
  const response = await axiosInstance.get<GetChatMessagesResponse>(
    `/chat/${roomId}/messages`,
  );

  return response.data;
};
