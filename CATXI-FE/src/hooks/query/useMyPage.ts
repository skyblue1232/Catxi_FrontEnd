import { getMyPageList } from "./../../apis/myPage";
import { useQuery } from "@tanstack/react-query";
import type { GetMemberResponse } from "../../types/myPage";
import type { GetHistoryResponse } from "../../types/history";
import { getHistoryList } from "../../apis/history";

export const useGetMyPage = () => {
  return useQuery<GetMemberResponse, Error>({
    queryKey: ["myPage"],
    queryFn: () => getMyPageList(),
  });
};

export const useGetHistory = () => {
  return useQuery<GetHistoryResponse, Error>({
    queryKey: ["history"],
    queryFn: () => getHistoryList(),
  });
};
