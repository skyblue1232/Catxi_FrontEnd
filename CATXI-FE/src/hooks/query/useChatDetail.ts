import { useQuery } from '@tanstack/react-query';
import { fetchChatRoomDetail } from '../../apis/chat/chatDetail';

export const useChatRoomDetail = (roomId: number) => {
  return useQuery({
    queryKey: ['chatRoomDetail', roomId],
    queryFn: () => fetchChatRoomDetail(roomId),
    enabled: !!roomId,
  });
};
