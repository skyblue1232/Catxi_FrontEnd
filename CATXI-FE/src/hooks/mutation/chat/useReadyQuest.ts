import { useMutation } from '@tanstack/react-query';
import { requestReady, acceptReady, rejectReady } from '../../../apis/chat/chatReady';
import { queryClient } from '../../../App';

export const useReadyRequest = () => {
  return useMutation({
    mutationFn: (roomId: number) => requestReady(roomId),
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReadyAccept = () => {
  return useMutation({
    mutationFn: (roomId: number) => acceptReady(roomId),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomDetail', variables] });
    },
  });
};

export const useReadyReject = () => {
  return useMutation({
    mutationFn: (roomId: number) => rejectReady(roomId),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomDetail', variables] });
    },
  });
};
