import { useModal } from "../../../contexts/ModalContext";

interface Props {
  message: string;
  isMe: boolean;
  email: string;
  sentAt: string;
}

const maskName = (identifier: string | null | undefined) => {
  if (!identifier) return "";

  const isEmail = identifier.includes("@");
  if (isEmail) {
    const localPart = identifier.split("@")[0];
    if (localPart.length === 1) return localPart;
    if (localPart.length === 2) return `${localPart[0]}*`;
    return `${localPart[0]}*${localPart[2]}`;
  } else {
    if (identifier.length <= 2) {
      return identifier[0] + "*";
    }
    const first = identifier[0];
    const last = identifier[identifier.length - 1];
    const middle = "*".repeat(identifier.length - 2);
    return `${first}${middle}${last}`;
  }
};

const formatTimestamp = (sentAt: string) => {
  const utc = new Date(sentAt);
  const kst = new Date(utc.getTime() + 9 * 60 * 60 * 1000);
  return kst.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};


const ChatItem = ({ message, isMe, email, sentAt }: Props) => {
  const { openModal, closeModal } = useModal();

  const handleNameClick = () => {
    openModal(
      <div>
        <h2 className="text-lg font-bold text-center">{maskName(email)}</h2>
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={closeModal}
            className="bg-[#8C46F6] text-white px-4 py-2 rounded"
          >
            신고하기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <p
        className="text-xs text-gray-600 mb-1 cursor-pointer hover:underline"
        onClick={handleNameClick}
      >
        {maskName(email)}
      </p>

      <div className={`inline-flex items-end gap-[0.625rem] ${isMe ? "justify-end" : "justify-start"}`}>
        {isMe ? (
          <>
            <span className="text-[10px] text-gray-400 mb-0.5">{formatTimestamp(sentAt)}</span>
            <div className="inline-block text-sm px-3 py-2 bg-[#8C46F6] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
              {message}
            </div>
          </>
        ) : (
          <>
            <div className="inline-block text-sm px-3 py-2 bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
              {message}
            </div>
            <span className="text-[10px] text-gray-400 mb-0.5">{formatTimestamp(sentAt)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
