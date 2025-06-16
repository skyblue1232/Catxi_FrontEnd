import { useMutation } from '@tanstack/react-query';
import { kickUser } from '../../../apis/chat/kick.ts';

export const useKickUser = () => {
  return useMutation({
    mutationFn: ({ roomId, targetEmail }: { roomId: number; targetEmail: string }) =>
      kickUser(roomId, targetEmail),
  });
};
