import { useMutation } from "@tanstack/react-query";
import { joinChatRoom } from "../../../apis/chatRooms";

export const useJoinChatRoom = () => {
  return useMutation({
    mutationFn: (roomId: string) => joinChatRoom(roomId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      console.log("요청을 보냈습니다.");
    }
  });
};
