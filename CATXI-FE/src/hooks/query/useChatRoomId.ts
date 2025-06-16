import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRoomId } from '../../apis/chat/chatStatus';

// 채팅 아이콘 눌렀을 때
export const useMyChatRoomId = () => {
  return useQuery<number, Error>({
    queryKey: ['myChatRoomId'],
    queryFn: fetchMyChatRoomId,
  });
};
