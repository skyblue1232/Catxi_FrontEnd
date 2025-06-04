import type { ChatMessage } from "../types/chat"

export const chatMockData: Record<string, ChatMessage[]> = {
  "1": [
    { content: "안녕하세요!", sender: 101, timestamp: "2025-05-26T12:00:00Z" },
    { content: "반가워요!", sender: 102, timestamp: "2025-05-26T12:01:00Z" },
  ],
  "2": [
    { content: "2번 방입니다!", sender: 201, timestamp: "2025-05-26T13:00:00Z" },
  ],
};
