import { memo } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import SystemMessage from "./SystemMessage";
import ChatMessageList from "./ChatList";
import CommonCard from "../../../components/Common/CommonCard";
import type { ChatMessage } from "../../../types/chat";

interface ChatContext {
  messages: ChatMessage[];
  memberId: number;
}

const ChatBoard = () => {
  const [searchParams] = useSearchParams();
  const memberId = parseInt(searchParams.get("memberId") ?? "0", 10);
  const { messages } = useOutletContext<Pick<ChatContext, "messages">>();

  // console.log(memberId);

  return (
    <CommonCard className="flex flex-col h-[calc(100vh-220px)] w-full overflow-hidden">
      <SystemMessage />
      <ChatMessageList messages={messages} memberId={memberId} />
    </CommonCard>
  );
};

export default memo(ChatBoard);
