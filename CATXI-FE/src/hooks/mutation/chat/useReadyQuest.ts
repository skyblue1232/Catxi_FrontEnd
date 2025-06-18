import { useMutation } from '@tanstack/react-query';
import { requestReady, acceptReady, rejectReady } from '../../../apis/chat/chatReady';
import { queryClient } from '../../../App';

export const useReadyRequest = () => {
  return useMutation({
    mutationFn: (roomId: number) => requestReady(roomId),
    onSuccess: (roomId) => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomDetail', roomId] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReadyAccept = () => {
  return useMutation({
    mutationFn: (roomId: number) => acceptReady(roomId),
    onSuccess: (roomId) => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomDetail', roomId] });
    },
  });
};

export const useReadyReject = () => {
  return useMutation({
    mutationFn: (roomId: number) => rejectReady(roomId),
    onSuccess: (roomId) => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomDetail', roomId] });
    },
  });
};
