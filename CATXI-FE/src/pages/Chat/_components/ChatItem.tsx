import { useModal } from "../../../contexts/ModalContext";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ChatMemberModal from "../../../components/Modal/UserModal";
import { useReportUser } from "../../../hooks/mutation/chat/useReportUser";
import { useKickUser } from "../../../hooks/mutation/chat/useKickUser.ts";

interface ChatContext {
  nicknameMap: Record<string, string>;
  hostEmail: string;
  hostNickname: string;
  myEmail: string;
}

interface Props {
  message: string;
  isMe: boolean;
  email: string;
  sentAt: string;
}

const maskName = (identifier: string | null | undefined) => {
  if (!identifier) return "";
  const isEmail = identifier.includes("@");
  const base = isEmail ? identifier.split("@")[0] : identifier;
  if (base.length === 1) return base;
  if (base.length === 2) return `${base[0]}*`;
  return `${base[0]}*${base[2]}`;
};

const formatTimestamp = (sentAt: string) => {
  const utc = new Date(sentAt);
  const kst = new Date(utc.getTime());
  return kst.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const ChatItem = ({ message, isMe, email, sentAt }: Props) => {
  const { openModal, closeModal } = useModal();
  const { nicknameMap, hostEmail, myEmail } = useOutletContext<ChatContext>();
  const { roomId } = useParams();
  const { mutate: reportUser } = useReportUser();
  const { mutate: kickUser } = useKickUser();
  const navigate = useNavigate();

  const isMyself = email === myEmail;
  const isHost = myEmail === hostEmail;
  const isTargetHost = email === hostEmail;

  const nickname = nicknameMap[email];
  const masked = maskName(email);
  const displayName = nickname ? nickname : masked;

  const handleReport = (reason: string) => {
    if (!roomId) return;
    reportUser({
      roomId: Number(roomId),
      targetUserId: email,
      reason,
    });
  };

  const handleKick = () => {
    if (!roomId) return;
    kickUser(
      {
        roomId: Number(roomId),
        targetEmail: email,
      },
      {
        onSuccess: () => {
          closeModal();
          navigate("/home");
        },
        onError: () => {
          alert("강퇴에 실패했습니다.");
        },
      }
    );
  };

  const handleNameClick = () => {
    if (isHost && isMyself) return;
    if (!isHost && (isMyself || isTargetHost)) return;

    openModal(
      <ChatMemberModal
        name={displayName}
        nickname={nickname}
        isHost={isHost}
        isMyself={isMyself}
        roomId={parseInt(roomId ?? "0")}
        targetUserId={email}
        onReport={(reason) => handleReport(reason)}
        onKick={isHost && !isTargetHost ? () => handleKick() : undefined}
      />
    );
  };

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-[0.5rem] mb-1">
        <p
          className="text-xs text-gray-600 cursor-pointer hover:underline"
          onClick={handleNameClick}
        >
          {displayName}
        </p>
        {email === hostEmail && (
          <span className="text-[0.625rem] font-medium text-[#FF8114] bg-[#FFF4EA] px-[0.205rem] py-[0.125rem] rounded">
            방장
          </span>
        )}
      </div>
      <div
        className={`inline-flex items-end gap-[0.625rem] ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {isMe ? (
          <>
            <span className="text-[10px] text-gray-400 mb-0.5">
              {formatTimestamp(sentAt)}
            </span>
            <div className="inline-block text-sm px-3 py-2 bg-[#8C46F6] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
              {message}
            </div>
          </>
        ) : (
          <>
            <div className="inline-block text-sm px-3 py-2 bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-bl-2xl">
              {message}
            </div>
            <span className="text-[10px] text-gray-400 mb-0.5">
              {formatTimestamp(sentAt)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
