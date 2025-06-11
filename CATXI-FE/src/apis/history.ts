import axiosInstance from "./axios";
import type { GetHistoryResponse } from "../types/history";

export const getHistoryList = async (): Promise<GetHistoryResponse> => {
  const { data } = await axiosInstance.get<GetHistoryResponse>(
    "/members/history/recent"
  );
  return data;
};
