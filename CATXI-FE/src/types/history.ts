export type GetHistory = {
  historyId: number;
  matchedAt: string;
  startPoint: string;
  endPoint: string;
  maskedFellas: string[];
};
export type Sort = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}[];
export type GetHistoryResponse = {
  size: number;
  content: GetHistory[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: Sort;
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type GetHistoryParams = {
  page: number;
  size: number;
  sort: string;
};
