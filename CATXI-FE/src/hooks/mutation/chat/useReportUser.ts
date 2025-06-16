import { useMutation } from '@tanstack/react-query';
import { reportUser } from '../../../apis/chat/report';

export const useReportUser = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      targetUserId,
      reason,
    }: {
      roomId: number;
      targetUserId: string;
      reason: string;
    }) => reportUser(roomId, targetUserId, reason),
  });
};
