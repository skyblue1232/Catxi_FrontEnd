import type { ChatMessage } from "../../types/chat/chat";

export const createDuplicateChecker = () => {
  const receivedIds = new Set<number>();
  return {
    isDuplicate: (id?: number) => {
      if (typeof id !== 'number') return false;
      if (receivedIds.has(id)) return true;
      receivedIds.add(id);
      return false;
    },
    remove: (id: number) => {
      receivedIds.delete(id);
    },
    getTempIds: () => {
      return [...receivedIds].filter((id) => id < 0);
    },
  };
};

export const parseServerMessage = (p: any, myEmail: string): ChatMessage => ({
  messageId: p.messageId,
  message: p.message,
  email: p.senderEmail ?? p.email,
  roomId: p.roomId,
  sentAt: p.sentAt,
  isMine: (p.senderEmail ?? p.email) === myEmail,
});

export const createLocalMessage = (
  tempId: number,
  message: string,
  myEmail: string,
  roomId: number,
): ChatMessage => {
  const now = new Date();
  const sentAt = new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString();
  return {
    messageId: tempId,
    message,
    email: myEmail,
    roomId,
    sentAt,
    isMine: true,
  };
};
