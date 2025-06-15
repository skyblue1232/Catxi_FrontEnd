import { useEffect, useRef, useMemo } from "react";
import ChatItem from "./ChatItem";
import JoinMessage from "./JoinMessage";
import { useOutletContext } from "react-router-dom";
import type { ChatMessage } from "../../../types/chat/chat";

interface ChatContext {
  nicknameMap: Record<string, string>;
}

interface Props {
  messages: ChatMessage[]; 
}

const ChatList = ({ messages }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { nicknameMap } = useOutletContext<ChatContext>();

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const renderedMessages = useMemo(() => {
    const seenEmails = new Set<string>();

    return messages.flatMap((msg, idx) => {
      const isSystemJoinMessage =
        msg.message.includes("참여") && msg.email && !msg.isMine;

      const nickname = nicknameMap[msg.email] || msg.email;

      const elements = [];

      if (isSystemJoinMessage && !seenEmails.has(msg.email)) {
        seenEmails.add(msg.email);
        elements.push(
          <JoinMessage key={`join-${msg.email}-${idx}`} name={nickname} />
        );
      }

      elements.push(
        <ChatItem
          key={`chat-${idx}`}
          message={msg.message}
          isMe={msg.isMine ?? false}
          email={msg.email}
          sentAt={msg.sentAt}
        />
      );

      return elements;
    });
  }, [messages, nicknameMap]);

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto space-y-4 mb-22 pb-[1.25rem] custom-scrollbar"
    >
      {renderedMessages}
    </div>
  );
};

export default ChatList;
