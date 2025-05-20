interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatInput = ({ value, onChange, onSubmit }: Props) => (
  <div className="flex items-center border border-gray-300 rounded-full px-3.5 py-3">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      className="flex-1 outline-none font-medium text-md placeholder-gray-400 bg-transparent"
      placeholder="메세지를 입력하세요."
    />
    <button onClick={onSubmit} className="ml-2 text-gray-400">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>
  </div>
);

export default ChatInput;
