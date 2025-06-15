import type { ChatRoomStatus, Station } from "./chatData";
import type { ApiResponse } from '../apiResponse';

export interface ChatRoomDetail {
  currentSize: number;
  recruitSize: number;
  roomStatus: ChatRoomStatus;
  hostEmail: string;
  hostNickname: string;
  participantEmails: string[];
  participantNicknames: string[];
  startPoint: Station;
  endPoint: Station;
  departAt: string;
}

export type ChatRoomDetailResponse = ApiResponse<ChatRoomDetail>;
