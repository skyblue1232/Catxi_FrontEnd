export interface ReadyMessage {
  type: 'request' | 'accept' | 'reject';
  roomId: number;
  senderId: number;
  senderEmail: string;
  senderName: string;
  content: string;
  timestamp: string;
}
