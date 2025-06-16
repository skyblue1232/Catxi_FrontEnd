import axiosInstance from '../axios';

export const reportUser = (
  roomId: number,
  targetUserId: string,
  reason: string
) => {
  return axiosInstance.post(`/rooms/${roomId}/report/${targetUserId}`, {
    reason,
  });
};
