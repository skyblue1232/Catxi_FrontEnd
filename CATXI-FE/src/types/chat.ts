export interface ChatMessage {
  message: string;
  sender?: number;
  email: string;
  sentAt: string;
  roomId: string;
  isMine?: boolean;
}
