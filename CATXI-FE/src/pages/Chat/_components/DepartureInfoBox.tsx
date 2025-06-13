import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import type { ChatRoomItem } from '../../../types/chatData';
import { useSseMutations } from '../../../hooks/mutation/sse/useSseMutations';

interface ChatContext {
  memberId: number;
  chatRoom: ChatRoomItem | null;
  remainingTime?: number; 
}

const DepartureInfoBox = () => {
  const { memberId, chatRoom } = useOutletContext<ChatContext>();
  const { requestReady } = useSseMutations(String(chatRoom?.roomId));
  const [isRequested, setIsRequested] = useState(false);

  if (!chatRoom) return null;

  const isHost = chatRoom.hostId === memberId;

  const handleRequestReady = () => {
    requestReady.mutate(undefined, {
      onSuccess: () => setIsRequested(true),
    });
  };

  return (
    <div className="w-full bg-[#F3F7FF] rounded-xl px-4 py-4.5 flex justify-between items-center mb-5">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          {chatRoom.startPoint} → {chatRoom.endPoint}
        </p>
        <p className="text-xs text-gray-500">
          🕒 오늘 {chatRoom.departAt}에 출발해요
        </p>
      </div>

      {isHost ? (
        <button
          disabled={isRequested}
          onClick={handleRequestReady}
          className={`rounded-md px-2 py-1 text-sm font-semibold ${
            isRequested
              ? 'bg-gray-300 text-gray-500'
              : 'bg-gray-900 text-white'
          }`}
        >
          {isRequested ? '전송됨' : '준비완료'}
        </button>
      ) : null}
    </div>
  );
};

export default DepartureInfoBox;
