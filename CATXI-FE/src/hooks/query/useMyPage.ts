import { getMyPageList } from "./../../apis/myPage";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  return useInfiniteQuery<GetHistoryResponse, Error>({
    queryKey: ["history"],
    queryFn: ({ pageParam = 0 }) =>
      getHistoryList({
        page: pageParam as number,
        size: 2,
        sort: "createdAt,desc",
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.last ? undefined : pages.length;
    },
    initialPageParam: 0,
  });
};
