import { useQuery } from '@tanstack/react-query';
import { fetchChatMessages } from '../../apis/chat/chat';
import type { ChatMessagesResponse } from '../../types/chat/chatData';

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
