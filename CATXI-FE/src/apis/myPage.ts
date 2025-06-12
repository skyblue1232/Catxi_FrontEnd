import axiosInstance from "./axios";
import type { GetMemberResponse } from "../types/myPage";

export const getMyPageList = async (): Promise<GetMemberResponse> => {
  const { data } = await axiosInstance.get<GetMemberResponse>("/members/");
  return data;
};
