export interface ChatMessage {
  message: string;
  sender?: number;
  email: string;
  sentAt: string;
  roomId: number;
  isMine?: boolean;
  messageId?: number;
  senderName?: string;
}
