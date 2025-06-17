import { useMutation } from '@tanstack/react-query';
import { reportUser } from '../../../apis/chat/report';

export const useReportUser = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      targetUserEmail,
      reason,
    }: {
      roomId: number;
      targetUserEmail: string;
      reason: string;
    }) => reportUser(roomId, targetUserEmail, reason),
  });
};
