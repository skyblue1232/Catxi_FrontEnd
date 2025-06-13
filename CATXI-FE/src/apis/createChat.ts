import type {
  createChatRequest,
  createChatResponse,
} from "../types/createChat";
import axiosInstance from "./axios";

export const createChat = async ({
  startPoint,
  endPoint,
  recruitSize,
  departAt,
}: createChatRequest): Promise<createChatResponse> => {
  const { data } = await axiosInstance.post("/chat/room/create", {
    startPoint,
    endPoint,
    recruitSize,
    departAt,
  });

  return data;
};
