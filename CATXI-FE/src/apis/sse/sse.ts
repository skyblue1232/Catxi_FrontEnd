import axiosInstance from "../axios";

export const sseApi = {
  disconnect: (roomId: string) =>
    axiosInstance.delete(`/sse/disconnect/${roomId}`),

  rejectReady: (roomId: string) =>
    axiosInstance.post(`/sse/reject/${roomId}`),

  acceptReady: (roomId: string) =>
    axiosInstance.post(`/sse/accept/${roomId}`),

  requestReady: (roomId: string) =>
    axiosInstance.post(`/sse/request/${roomId}`),
};
