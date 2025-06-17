import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRoomId } from '../../apis/chat/chatStatus';

// 채팅 아이콘 눌렀을 때
export const useMyChatRoomId = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery<number, Error>({
    queryKey: ['myChatRoomId'],
    queryFn: fetchMyChatRoomId,
    enabled,
  });
};
