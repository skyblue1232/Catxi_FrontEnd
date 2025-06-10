export type GetHistory = {
  historyId: number;
  matchedAt: string;
  startPoint: string;
  endPoint: string;
  maskedFellas: string[];
};
export type GetHistoryResponse = GetHistory[];
