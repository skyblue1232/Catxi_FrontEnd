import { useModal } from "../../contexts/ModalContext";
import ReportReasonModal from '../Modal/ReportModal';

interface ChatMemberModalProps {
  name: string;
  nickname: string;
  isHost: boolean;
  isMyself: boolean;
  onReport: (target: string, reason: string) => void;
  onKick?: (nickname: string) => void;
}

const ChatMemberModal = ({
  name,
  nickname,
  isHost,
  onReport,
  onKick,
}: ChatMemberModalProps) => {
  const { openModal } = useModal();

  if (isHost) return null;

  const handleReportClick = () => {
    openModal(
      <ReportReasonModal
        nickname={nickname}
        onReport={onReport}
      />
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-lg font-bold text-center mb-[0.938rem]">{name}</h2>
      <div className="flex flex-col w-full gap-[1.25rem]">
        <button
          onClick={handleReportClick}
          className={`py-[0.625rem] font-medium text-[0.875rem] rounded-lg ${
            onKick
              ? "bg-[#F5F5F5] text-[#424242]"
              : "bg-[#424242] text-[#FEFEFE] w-full"
          }`}
        >
          신고하기
        </button>
        {onKick && (
          <button
            onClick={() => onKick(nickname)}
            className="bg-[#424242] text-[FEFEFE] text-sm py-[0.625rem] rounded-lg mt-[0.625rem]"
          >
            강퇴하기
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMemberModal;
