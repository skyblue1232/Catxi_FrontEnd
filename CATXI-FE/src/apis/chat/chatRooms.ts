import type { ChatRoomItem, ChatRoomResponse } from '../../types/chat/chatData';
import axiosInstance from '../axios';

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
  const { data } = await axiosInstance.get<ChatRoomResponse>(
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
  return data;
};

export const joinChatRoom = async (roomId: number) => {
  const { data } = await axiosInstance.post(`/chat/rooms/${roomId}/join`);
  return data as ChatRoomItem;
};

