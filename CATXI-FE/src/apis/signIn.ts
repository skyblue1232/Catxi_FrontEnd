import type { signInParams } from "../types/signIn";
import axiosInstance from "./axios";
import type { AxiosResponse } from "axios";

export const SignIn = async ({
  nickname,
  StudentNo,
}: signInParams): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.patch("/auth/signUp/catxi", {
    nickname,
    StudentNo,
  });

  return data;
};
