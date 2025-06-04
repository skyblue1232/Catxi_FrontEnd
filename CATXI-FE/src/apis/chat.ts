import { chatMockData } from "../mocks/chatMock";
import type { ChatMessage } from "../types/chat";

export async function fetchChatHistory(roomId: string): Promise<ChatMessage[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(chatMockData[roomId] || []);
    }, 300); 
  });
}

// import axiosInstance from "./axios";
// import type { ChatMessage } from "../types/chat";

// export async function fetchChatHistory(roomId: string): Promise<ChatMessage[]> {
//   const res = await axiosInstance.get(`/chat/history/${roomId}`);
//   return res.data;
// }

