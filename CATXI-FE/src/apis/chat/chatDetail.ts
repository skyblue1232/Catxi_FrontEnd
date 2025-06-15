import axiosInstance from '../axios';
import type { ChatRoomDetailResponse } from '../../types/chat/chatRoomDetail';

export const fetchChatRoomDetail = async (roomId: number): Promise<ChatRoomDetailResponse> => {
  const { data } = await axiosInstance.get<ChatRoomDetailResponse>(`/chat/rooms/${roomId}`);
  return data;
};
