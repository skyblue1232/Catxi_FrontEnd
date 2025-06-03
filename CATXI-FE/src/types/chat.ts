export interface ChatMessage {
  message: string;
  sender?: number;
  timestamp?: string;
  membername: string;
  roomId: string;
}
