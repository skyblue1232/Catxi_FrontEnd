import { useMutation } from '@tanstack/react-query';
import { requestReady } from '../../../apis/chat/chatRequest';

export const useReadyRequest = () => {
  return useMutation({
    mutationFn: (roomId: number) => requestReady(roomId),
  });
};