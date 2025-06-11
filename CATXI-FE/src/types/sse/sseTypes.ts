export type SseEventData = {
  senderName: 'SERVER' | 'HOST' | string;
  content: string;
  timestamp: string;
};

export type SseEvent = {
  event: string;
  data: SseEventData;
};
