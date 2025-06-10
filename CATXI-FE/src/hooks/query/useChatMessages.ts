import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '../../apis/chat';
import type { ChatMessagesResponse } from '../../types/chatData';

export const useChatMessages = (
  roomId: number,
) => {
  return useQuery<ChatMessagesResponse, Error>({
    queryKey: ['chatMessages', roomId],
    queryFn: () => fetchChatMessages(roomId),
    staleTime: 1000 * 60 * 1,
    enabled: !!roomId,
  });
};
