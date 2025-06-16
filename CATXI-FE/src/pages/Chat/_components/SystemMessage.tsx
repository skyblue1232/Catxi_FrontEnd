import { useOutletContext } from 'react-router-dom';
import type { ChatRoomDetail } from '../../../types/chat/chatRoomDetail';

interface ChatContext {
  hostNickname: string;
  myEmail: string;
  chatRoom?: ChatRoomDetail;
}

const SystemMessage = () => {
  const { myEmail, chatRoom } = useOutletContext<ChatContext>();
  const displayName = chatRoom?.hostNickname || myEmail;

  const maskEmailName = (email: string) => {
    const [idPart] = email.split('@');
    if (idPart.length === 1) return idPart;
    if (idPart.length === 2) return `${idPart[0]}*`;
    if (idPart.length === 3) return `${idPart[0]}*${idPart[2]}`;
    return `${idPart[0]}**${idPart[idPart.length - 1]}`;
  };

  const isEmail = displayName.includes('@');
  const maskedName = isEmail ? maskEmailName(displayName) : displayName;

  return (
    <div className="font-regular text-xs text-center text-gray-400 px-4">
      {displayName && (
        <div className="bg-[#F2F6FC] text-gray-600 py-2.5 px-4 rounded-[5px] w-full mb-5 space-y-[5px]">
          <p>{maskedName}님이 채팅을 시작하였습니다.</p>
          <p>멤버가 모였다면 ‘준비완료’ 버튼을 눌러주세요.</p>
        </div>
      )}
    </div>
  );
};

export default SystemMessage;
