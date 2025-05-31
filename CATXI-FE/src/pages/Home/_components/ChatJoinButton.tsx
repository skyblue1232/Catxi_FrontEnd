interface Props {
  isDisabled: boolean;
  onClick?: () => void;
}

const ChatJoinButton: React.FC<Props> = ({ isDisabled, onClick }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`ml-[1.25rem] py-[0.531rem] px-[1.75rem] rounded-[6px] text-[14px] ${
        isDisabled
          ? 'bg-[#E0E0E0] text-white cursor-not-allowed'
          : 'bg-[#7424F5] text-white'
      }`}
    >
      {isDisabled ? '다른 채팅 참여중' : '채팅 참여하기'}
    </button>
  );
};

export default ChatJoinButton;
