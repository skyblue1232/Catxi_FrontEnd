import type { ChatMessage } from "../../types/chat/chat";
import type { ChatMessageItem } from "../../types/chat/chatData";


export function mapChatHistoryToMessages(
  items: ChatMessageItem[],
  myEmail: string
): ChatMessage[] {
  return items.map((msg) => ({
    messageId: msg.messageId,
    roomId: msg.roomId,
    sender: msg.senderId,
    email: msg.senderEmail,
    message: msg.content,
    sentAt: msg.sentAt,
    isMine: msg.senderEmail === myEmail,
  }));
}
