import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRoomId } from '../../apis/chat/chatStatus';

export const useMyChatRoomId = () => {
  return useQuery<number, Error>({
    queryKey: ['myChatRoomId'],
    queryFn: fetchMyChatRoomId,
    staleTime: 1000 * 30, 
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
