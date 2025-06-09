import type { ApiResponse } from './apiResponse';

export const ChatRoomStatus = {
  WAITING: 'WAITING',
  READY_CHECK: 'READY_CHECK',
  READY_LOCKED: 'READY_LOCKED',
  MATCHED: 'MATCHED',
  EXPIRED: 'EXPIRED',
} as const;

export type ChatRoomStatus = typeof ChatRoomStatus[keyof typeof ChatRoomStatus];

export interface ChatMessageItem {
  messageId: number;
  roomId: number;
  senderId: number;
  senderName: string;
  content: string;
  sentAt: string;
};

export interface ChatRoomItem {
    roomId: number;
    hostId: number;
    hostName: string;
    startPoint: string;
    endPoint: string;
    recruitSize: number;
    currentSize: number;
    status: ChatRoomStatus;
    departAt: string;
    createdTime: string;
}

export interface ChatRoomList {
    content: ChatRoomItem[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;
    hasNext: boolean;
};
 
export type ChatMessagesResponse = ApiResponse<ChatMessageItem[]>;

export type ChatRoomResponse = ApiResponse<ChatRoomList[]>;
