import { useMutation } from '@tanstack/react-query';
import { requestReady, acceptReady, rejectReady } from '../../../apis/chat/chatReady';
import { queryClient } from '../../../App';

export const useReadyRequest = () => {
  return useMutation({
    mutationFn: (roomId: number) => requestReady(roomId),
    onSuccess: (data, roomId) => {
      queryClient.invalidateQueries({queryKey: ['chatRoomDetail', roomId]});
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
    onSuccess: (data, roomId) => {
       queryClient.invalidateQueries({queryKey: ['chatRoomDetail', roomId]});
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
    onSuccess: (data, roomId) => {
      queryClient.invalidateQueries({queryKey: ['chatRoomDetail', roomId]});
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
