import { memo } from "react";
import { useOutletContext } from "react-router-dom";
import SystemMessage from "./SystemMessage";
import ChatMessageList from "./ChatList";
import CommonCard from "../../../components/Common/CommonCard";
import type { ChatMessage } from "../../../types/chat";

interface ChatContext {
  messages: ChatMessage[];
  userId: number;
}

const ChatBoard = () => {
  const { messages, userId } = useOutletContext<ChatContext>();

  console.log("id:", userId); 

  return (
    <CommonCard className="flex flex-col h-[calc(100vh-220px)] w-full overflow-hidden">
      <SystemMessage />
      <ChatMessageList messages={messages} userId={userId} />
    </CommonCard>
  );
};

export default memo(ChatBoard);
