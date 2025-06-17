import { stationDisplayMap } from '../../../../constants/stationMap';
import Timer from '../../../../assets/icons/Timer.svg?react';
import type { ChatRoomDetail } from '../../../../types/chat/chatRoomDetail';
import { useMemo } from 'react';

interface Props {
  chatRoom: ChatRoomDetail;
  isRequested: boolean;
  myEmail: string;
  onRequestReady: () => void;
}

const DefaultBox = ({ chatRoom, isRequested, myEmail, onRequestReady }: Props) => {
  const isHost = myEmail === chatRoom.hostEmail;

  const departText = useMemo(() => {
    const departDate = new Date(chatRoom.departAt);
    const now = new Date();
    const isTomorrow = departDate.getDate() !== now.getDate();
    const hour = departDate.getHours().toString().padStart(2, '0');
    const minute = departDate.getMinutes().toString().padStart(2, '0');
    return `${isTomorrow ? '내일' : '오늘'} ${minute === '00' ? `${hour}시` : `${hour}시 ${minute}분`}에 출발해요`;
  }, [chatRoom]);

  const displayStart = stationDisplayMap[chatRoom.startPoint] ?? chatRoom.startPoint;
  const displayEnd = stationDisplayMap[chatRoom.endPoint] ?? chatRoom.endPoint;

  return (
    <div className="w-full bg-[#F5F5F5] rounded-xl px-[1.625rem] py-4.5 flex justify-between items-center mb-5">
      <div>
        <p className="text-[1.25rem] font-medium text-[#7424F5]">
          {`${displayStart} → ${displayEnd}`}
        </p>
        <div className="flex items-center gap-1 text-[0.875rem] text-[#424242] mt-1">
          <Timer className="w-3 h-3 text-[#424242]" />
          <span>{departText}</span>
        </div>
      </div>

      {isHost && (
        <button
          disabled={isRequested}
          onClick={onRequestReady}
          className={`rounded-md px-[1.25rem] py-[0.625rem] text-sm font-semibold ${
            isRequested ? 'bg-gray-300 text-gray-500' : 'bg-[#424242] text-white'
          }`}
        >
          {isRequested ? '전송됨' : '준비완료'}
        </button>
      )}
    </div>
  );
};

export default DefaultBox;
