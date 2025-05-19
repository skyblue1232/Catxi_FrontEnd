interface Props {
  content: string;
  isMe: boolean;
}

const ChatItem = ({ content, isMe }: Props) => (
  <div className={isMe ? "text-right" : "text-left"}>
    <div
      className={[
        "inline-block text-sm px-3 py-2",
        isMe
          ? "bg-[#8C46F6] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
          : "bg-gray-200 text-black rounded-tr-2xl rounded-br-2xl rounded-bl-2xl",
      ].join(" ")}
    >
      {content}
    </div>
    <p className="text-[10px] text-gray-400 mt-1">05:26</p>
  </div>
);

export default ChatItem;
