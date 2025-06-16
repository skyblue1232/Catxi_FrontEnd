import type { ChatMessage } from '../../types/chat/chat';
import type { ChatMessageItem } from '../../types/chat/chatData';
import type { ReadyMessage } from '../../types/chat/readyMessage';

export function parseChatMessage(
  raw: ChatMessageItem | any,
  myEmail: string,
  nicknameMap?: Record<string, string>
): ChatMessage {
  const senderEmail = raw.senderEmail ?? raw.email;
  return {
    messageId: raw.messageId,
    roomId: raw.roomId,
    sender: raw.senderId,
    email: senderEmail,
    senderName: nicknameMap?.[senderEmail] || raw.senderName || senderEmail,
    message: raw.message,
    sentAt: raw.sentAt,
    isMine: senderEmail === myEmail,
  };
}

export function parseReadyMessage(raw: any): ReadyMessage {
  return {
    type: raw.type,
    roomId: raw.roomId,
    senderId: raw.senderId,
    senderEmail: raw.senderEmail,
    senderName: raw.senderName,
    content: raw.content,
    timestamp: raw.timestamp,
  };
}
