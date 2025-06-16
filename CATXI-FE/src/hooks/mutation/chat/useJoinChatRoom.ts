import { useMutation } from "@tanstack/react-query";
import { joinChatRoom } from "../../../apis/chat/chatRooms";

export const useJoinChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: number) => joinChatRoom(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
