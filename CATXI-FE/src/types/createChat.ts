export type createChatRequest = {
  startPoint: string;
  endPoint: string;
  recruitSize: number;
  departAt: string;
};
export type createChatResponse = {
  data: {
    startPoint: string;
    endPoint: string;
    recruitSize: number;
    departAt: string;
    status: string;
  };
};
