import axiosInstance from '../axios';

export const kickUser = (roomId: number, targetEmail: string) => {
  return axiosInstance.post(`/chat/rooms/${roomId}/kick`, {
    roomId,
    targetEmail,
  });
};
