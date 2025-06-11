import { useEffect, useRef } from "react";
import ChatItem from "./ChatItem";
import type { ChatMessage } from "../../../types/chat";

interface Props {
  messages: ChatMessage[];
  memberId: number;
}

const ChatList = ({ messages, memberId }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth" 
      });
    }
  }, [messages]);

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto space-y-4 mb-24 custom-scrollbar"
    >
      {messages.map((msg, idx) => (
        <ChatItem
          key={idx}
          message={msg.message}
          isMe={String(msg.sender) === String(memberId)}
          email={msg.email}
        />
      ))}
    </div>
  );
};

export default ChatList;
