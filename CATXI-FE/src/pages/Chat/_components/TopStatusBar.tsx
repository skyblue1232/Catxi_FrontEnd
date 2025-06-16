import { ChevronLeft } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import type { ChatRoomDetail } from '../../../types/chat/chatRoomDetail';

interface ChatContext {
  hostEmail: string;
  hostNickname: string;
  myEmail: string;
  chatRoom?: ChatRoomDetail;
}

const TopStatusBar = () => {
  const { hostEmail, myEmail, chatRoom, hostNickname } = useOutletContext<ChatContext>();
  const current = (chatRoom?.currentSize ?? 0) + 1;
  const total = (chatRoom?.recruitSize ?? 0) + 1;
  const handleBackClick = () => { window.history.back() };
  const statusTextMap = {
    WAITING: '모집중',
    READY_LOCKED: '준비 완료',
    MATCHED: '매칭 완료',
    EXPIRED: '만료됨',
  };
  const statusColorMap = {
    WAITING: '#7424F5',
    READY_LOCKED: '#1AD494',
    MATCHED: '#A0AEC0',
    EXPIRED: '#D1D5DB',
  };

  const statusText = chatRoom?.roomStatus ? statusTextMap[chatRoom.roomStatus] : '';
  const statusColor = chatRoom?.roomStatus ? statusColorMap[chatRoom.roomStatus] : '#D1D5DB';
  const isHost = hostNickname === (myEmail || hostEmail);

  return (
    <div className="w-full flex justify-between items-center py-6 px-[1.688rem]">
      <button onClick={handleBackClick}>
        <ChevronLeft size={20} />
      </button>
      <div className="font-medium text-[0.875rem] flex items-center gap-2">
        <span className="text-[0.5rem] ml-5" style={{ color: statusColor }}>●</span>
        <span className="text-gray-600 font-medium">
          {statusText} ({current}/{total})
        </span>
      </div>
      {isHost ? (
        <button className="text-sm text-gray-500">삭제하기</button>
      ) : (
        <div className="text-sm text-gray-500 invisible">삭제하기</div>
      )}
    </div>
  );
};

export default TopStatusBar;
