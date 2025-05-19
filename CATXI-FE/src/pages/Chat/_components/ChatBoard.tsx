import { useOutletContext } from "react-router-dom";
import SystemMessage from "./SystemMessage";
import ChatMessageList from "./ChatList";
import CommonCard from "../../../components/Common/CommonCard";
import type { ChatMessage } from "../../../types/chat";

interface ChatContext {
  messages: ChatMessage[];
}

const ChatPage = () => {
  const { messages } = useOutletContext<ChatContext>();

  return (
    <CommonCard className="flex flex-col h-[calc(100vh-220px)] w-full overflow-hidden">
      <SystemMessage />
      <ChatMessageList messages={messages} />
    </CommonCard>
  );
};

export default ChatPage;
