import axiosInstance from "../axios";

export const requestReady = (roomId: number) => {
  return axiosInstance.post(`/ready/request/${roomId}`);
};

export const acceptReady = (roomId: number) => {
  return axiosInstance.post(`/ready/accept/${roomId}`);
};

export const rejectReady = (roomId: number) => {
  return axiosInstance.post(`/ready/reject/${roomId}`);
};