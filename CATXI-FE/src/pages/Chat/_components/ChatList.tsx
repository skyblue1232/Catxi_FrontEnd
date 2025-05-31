import ChatItem from "./ChatItem";
import type { ChatMessage } from "../../../types/chat";

interface Props {
  messages: ChatMessage[];
  userId: number;
}

const ChatList = ({ messages, userId }: Props) => (
  <div className="flex-1 overflow-y-auto space-y-4">
    {messages.map((msg, idx) => (
      <ChatItem
        key={idx}
        content={msg.content}
        isMe={msg.sender === userId}
      />
    ))}
  </div>
);

export default ChatList;
