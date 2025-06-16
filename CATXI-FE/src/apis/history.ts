import axiosInstance from "./axios";
import type { GetHistoryResponse, GetHistoryParams } from "../types/history";

export const getHistoryList = async ({
  page,
  size,
  sort,
}: GetHistoryParams): Promise<GetHistoryResponse> => {
  const { data } = await axiosInstance.get<GetHistoryResponse>(
    "/members/history/all",
    {
      params: {
        page,
        size,
        sort,
      },
    }
  );
  return data;
};
