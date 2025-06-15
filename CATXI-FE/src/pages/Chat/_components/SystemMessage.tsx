import { useOutletContext } from 'react-router-dom';

interface ChatContext {
  hostNickname: string;
  myEmail: string;
}

const SystemMessage = () => {
  const { hostNickname, myEmail } = useOutletContext<ChatContext>();
  const displayName = hostNickname || myEmail;

  return (
    <div className="font-regular text-xs text-center text-gray-400 px-4">
      {displayName && (
        <div className="bg-[#F2F6FC] text-gray-600 py-2.5 px-4 rounded-[5px] w-full mb-5 space-y-[5px]">
          <p>{displayName}님이 채팅을 시작하였습니다.</p>
          <p>멤버가 모였다면 ‘준비완료’ 버튼을 눌러주세요.</p>
        </div>
      )}
    </div>
  );
};

export default SystemMessage;
