import { useMutation } from "@tanstack/react-query";
import type { signInParams } from "../types/signIn";
import { SignIn } from "../apis/signIn";
import { useNavigate } from "react-router-dom";
export const useSignin = () => {
  const navigate = useNavigate();
  const { mutate: signIn } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async ({ nickname, StudentNo }: signInParams) => {
      return await SignIn({ nickname, StudentNo });
    },
    onSuccess: () => {
      navigate("/home");
    },
    onError: () => {
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
    },
  });

  return {
    signIn,
  };
};
