import axiosInstance from "../axios";

export const requestReady = (roomId: number) => {
  return axiosInstance.post(`/ready/request/${roomId}`);
};
