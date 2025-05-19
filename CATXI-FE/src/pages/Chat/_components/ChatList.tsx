import ChatItem from "./ChatItem";
import type{ ChatMessage } from "../../../types/chat";

interface Props {
  messages: ChatMessage[];
}

const ChatList = ({ messages }: Props) => (
  <div className="flex-1 overflow-y-auto space-y-4">
    {messages.map((msg, idx) => (
      <ChatItem key={idx} content={msg.content} isMe={msg.isMe} />
    ))}
  </div>
);

export default ChatList;
