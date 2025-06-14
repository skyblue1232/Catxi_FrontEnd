import { useChatRooms } from "../../../hooks/query/useChatRooms";
import ChatCard from "./ChatCard";
import type { ChatRoomItem } from "../../../types/chatData";
import LogoText from "../../../assets/icons/logoText.svg?react";
import NoContent from "../../../assets/icons/noContent.svg?react";
interface ChatCardListProps {
  direction: string;
  station: string;
  sort: string;
  page?: number;
}

const ChatCardList = ({
  direction,
  station,
  sort,
  page = 0,
}: ChatCardListProps) => {
  const { data, isLoading, isError, refetch } = useChatRooms({
    direction,
    station,
    sort,
    page,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#8C46F6] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  if (!data?.data.content.length) {
    return (
      <div className="flex justify-center items-center p-4 h-[60vh]">
        <div className="flex flex-col justify-center items-center gap-2 text-[#9E9E9E]">
          <NoContent />
          <p>아직 생성된 채팅방이 없어요</p>
          <p>새로운 대화를 시작해보세요!</p>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <LogoText className="w-[140px] h-auto" />
          <button
            onClick={() => refetch()}
            className="px-8 py-2 bg-[#8C46F6] text-white rounded-full shadow hover:bg-[#722de2] transition"
          >
            retry
          </button>
        </div>
      </div>
    );
  }

  const chatRooms = data?.data?.content || [];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {chatRooms.map((room: ChatRoomItem) => (
        <ChatCard key={room.roomId} data={room} />
      ))}
    </div>
  );
};

export default ChatCardList;
