// src/apis/chatRooms.ts
import axiosInstance from '../apis/axios';
import type { ChatRoomResponse } from '../types/chatData';

interface GetChatRoomsParams {
  direction: string;
  station: string;
  sort: string;
  page?: number;
}

export const fetchChatRooms = async ({
  direction,
  station,
  sort,
  page = 0
}: GetChatRoomsParams): Promise<ChatRoomResponse> => {
  const response = await axiosInstance.get<ChatRoomResponse>(
    '/chat/rooms',
    {
      params: {
        direction,
        station,
        sort,
        page
      }
    }
  );
  return response.data;
};
