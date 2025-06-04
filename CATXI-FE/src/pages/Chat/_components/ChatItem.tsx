import { useModal } from "../../../contexts/ModalContext";

interface Props {
  message: string;
  isMe: boolean;
  membername: string;
}

const maskName = (name: string) => {
  if (name.length <= 1) return name;
  const middle = "*".repeat(name.length - 2);
  return `${name[0]}${middle}${name[name.length - 1]}`;
};

const getCurrentTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  };
  return now.toLocaleTimeString('ko-KR', options);
};

const ChatItem = ({ message, isMe, membername }: Props) => {
  const { openModal, closeModal } = useModal(); 

  const handleNameClick = () => {
    if (!isMe) {
      openModal({
        title: `${maskName(membername)}`,
        buttons: [
          {
            label: "신고하기",
            onClick: closeModal,
            isPrimary: true,
          },
        ],
      });
    }
  };

  return (
    <div className={isMe ? "text-right" : "text-left"}>
      <p
        className={`text-xs text-gray-600 mb-1 ${!isMe ? 'cursor-pointer hover:underline' : ''}`}
        onClick={handleNameClick}
      >
        {isMe ? "나" : maskName(membername)}
      </p>
      <div
        className={[
          "inline-flex items-end gap-[0.625rem]",
          isMe ? "justify-end" : "justify-start",
        ].join(" ")}
      >
        {isMe ? (
          <>
            <span className="text-[10px] text-gray-400 mb-0.5">{getCurrentTime()}</span>
            <div
              className="inline-block text-sm px-3 py-2 bg-[#8C46F6] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
            >
              {message}
            </div>
          </>
        ) : (
          <>
            <div
              className="inline-block text-sm px-3 py-2 bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
            >
              {message}
            </div>
            <span className="text-[10px] text-gray-400 mb-0.5">{getCurrentTime()}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
