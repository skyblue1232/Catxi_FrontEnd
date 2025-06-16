import type { ChatRoomStatus } from "../../../types/chat/chatData";

interface Props {
  status?: ChatRoomStatus;
  onClick?: () => void;
}

const ChatJoinButton = ({ status, onClick }: Props) => {
  const isJoinable = status === "WAITING" || status === undefined;
  const isDisabled = !isJoinable;

  const displayText = isJoinable
    ? "채팅 참여하기"
    : "다른 채팅 참여중";

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`py-[0.65rem] px-[2rem] rounded-[6px] text-[14px] ${
        isDisabled
          ? "bg-[#E0E0E0] text-white cursor-not-allowed"
          : "bg-[#7424F5] text-white"
      }`}
    >
      {displayText}
    </button>
  );
};

export default ChatJoinButton;
