import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../apis/createChat";
import type { createChatRequest } from "../../types/createChat";
import { useChatStore } from "../../store/createChatStore";
import { queryClient } from "../../App";
export const useCreateChat = () => {
  const navigate = useNavigate();
  const { clearAnswer } = useChatStore();
  const { mutate: createChatRoom } = useMutation({
    mutationKey: ["createChat"],
    mutationFn: async ({
      startPoint,
      endPoint,
      recruitSize,
      departAt,
    }: createChatRequest) => {
      return await createChat({
        startPoint,
        endPoint,
        recruitSize,
        departAt,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });

      clearAnswer();
      navigate("/home");
    },
    onError: (err: { message: string }) => {
      const confirmed = window.confirm(err.message);
      if (confirmed) navigate("/home");
    },
  });
  return {
    createChatRoom,
  };
};
