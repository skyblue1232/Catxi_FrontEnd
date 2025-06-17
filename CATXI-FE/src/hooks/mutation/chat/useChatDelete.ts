import { useMutation } from '@tanstack/react-query';
import { deleteChatRoom, leaveChatRoom } from '../../../apis/chat/chatDelete';
import { queryClient } from '../../../App';

export const useDeleteChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: number) => deleteChatRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        predicate: (query) => query.queryKey[0] === 'chatRooms',
      });
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
      queryClient.invalidateQueries({ 
        predicate: (query) => query.queryKey[0] === 'chatRooms',
      }); 
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
