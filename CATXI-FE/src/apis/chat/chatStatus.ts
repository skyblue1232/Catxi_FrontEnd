import axiosInstance from "../axios";

export const fetchMyChatRoomId = async (): Promise<number> => {
  const res = await axiosInstance.get('/chat/rooms/myid');
  return res.data.data;
};
