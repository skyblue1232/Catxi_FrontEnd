import { useMutation } from '@tanstack/react-query';
import { requestReady, acceptReady, rejectReady } from '../../../apis/chat/chatReady';

export const useReadyRequest = () => {
  return useMutation({
    mutationFn: (roomId: number) => requestReady(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReadyAccept = () => {
  return useMutation({
    mutationFn: (roomId: number) => acceptReady(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useReadyReject = () => {
  return useMutation({
    mutationFn: (roomId: number) => rejectReady(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
