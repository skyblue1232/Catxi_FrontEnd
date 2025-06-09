import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '../../apis/chat';
import type { GetChatMessagesResponse } from '../../types/chatData';

export const useChatMessages = (
  roomId: number,
) => {
  return useQuery<GetChatMessagesResponse, Error>({
    queryKey: ['chatMessages', roomId],
    queryFn: () => fetchChatMessages(roomId),
    staleTime: 1000 * 60 * 1,
    enabled: !!roomId,
  });
};
