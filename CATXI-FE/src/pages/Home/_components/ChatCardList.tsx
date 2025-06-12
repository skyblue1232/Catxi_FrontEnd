import { useNavigate } from 'react-router-dom';
import { useChatRooms } from '../../../hooks/query/useChatRooms';
import { useJoinChatRoom } from '../../../hooks/mutation/chat/useJoinChatRoom';
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

  const { mutate: joinRoom } = useJoinChatRoom();

  const handleClick = (roomId: number) => {
    joinRoom(String(roomId), {
      onSuccess: () => {
        navigate(`/chat/${roomId}`);
      },
      onError: (err) => {
        console.error('입장 실패', err);
        alert('입장에 실패했습니다.');
      },
    });
  };

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return (
      <div>
        <p>에러: {error.message}</p>
        <button onClick={() => refetch()}>다시 시도하기</button>
      </div>
    );
  }

  const chatRooms = data?.data?.content || [];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {chatRooms.map((room: ChatRoomItem) => (
        <ChatCard
          key={room.roomId}
          data={room}
          onClick={() => handleClick(room.roomId)}
        />
      ))}
    </div>
  );
};

export default ChatCardList;
