import PushButton from "../../../assets/icons/PushButton.svg?react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatInput = ({ value, onChange, onSubmit }: Props) => (
  <div className="mb-[3.75rem] flex items-center gap-2">
    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        className="w-full bg-transparent outline-none font-medium text-md placeholder-gray-400"
        placeholder="메세지를 입력하세요."
      />
    </div>

    <button
      onClick={onSubmit}
      className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
    >
      <PushButton className="w-4 h-4 text-gray-400" />
    </button>
  </div>
);

export default ChatInput;
