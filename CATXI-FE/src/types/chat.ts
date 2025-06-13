export interface ChatMessage {
  message: string;
  sender?: number;
  timestamp?: string;
  email: string;
  roomId: string;
  isMine: boolean;
}
