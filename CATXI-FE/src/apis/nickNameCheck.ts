import axiosInstance from "./axios";

export const getNickNameCheck = async (nickname: string): Promise<boolean> => {
  const { data } = await axiosInstance.get(
    `/auth/signUp/catxi/checkNN?nickname=${nickname}`
  );
  return data;
};
