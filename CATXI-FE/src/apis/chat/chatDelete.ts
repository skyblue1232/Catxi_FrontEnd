import axiosInstance from "../axios";

export const deleteChatRoom = (roomId: number) => {
  return axiosInstance.delete(`/chat/${roomId}/remove`);
};

export const leaveChatRoom = (roomId: number) => {
  return axiosInstance.delete(`/chat/${roomId}/leave`);
};
