import { useNavigate } from 'react-router-dom';
import { useChatRooms } from '../../../hooks/query/useChatRooms';
import ChatCard from './ChatCard';
import type { ChatRoomItem } from '../../../types/chatData';

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
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useChatRooms({
    direction,
    station,
    sort,
    page,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>에러가 발생했습니다: {error.message}</p>
        <button onClick={() => refetch()}>다시 시도하기</button>
      </div>
    );
  }

  const chatRooms = data?.data.content || [];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {chatRooms.map((room: ChatRoomItem) => (
        <ChatCard
          key={room.roomId}
          data={room} 
          onClick={() => navigate(`/chat/${room.roomId}`)}
        />
      ))}
    </div>
  );
};

export default ChatCardList;
