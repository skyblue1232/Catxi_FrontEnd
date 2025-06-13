import { useQuery } from "@tanstack/react-query";
import { getNickNameCheck } from "../../apis/nickNameCheck";

export const useCheckNN = (nickname: string) => {
  return useQuery<boolean, Error>({
    queryKey: ["checkNN", nickname],
    queryFn: () => getNickNameCheck(nickname),
    enabled: false,
  });
};
