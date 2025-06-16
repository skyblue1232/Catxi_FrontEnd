import { useMutation } from '@tanstack/react-query';
import { deleteChatRoom, leaveChatRoom } from '../../../apis/chat/chatDelete';

export const useDeleteChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: number) => deleteChatRoom(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLeaveChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: number) => leaveChatRoom(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
