import axiosInstance from "../axios";

export const requestReady = async (roomId: number) => {
  const response = await axiosInstance.post(`/ready/request/${roomId}`);
  return response.data;
};