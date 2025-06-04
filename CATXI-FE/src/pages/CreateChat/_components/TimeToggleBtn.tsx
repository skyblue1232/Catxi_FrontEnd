import clsx from "clsx";
import { useState } from "react";
type PlaceToggleBtnProps = {
  onChange?: (val: "today" | "tomorrow") => void;
};
const TimeToggleBtn = ({ onChange }: PlaceToggleBtnProps) => {
  const [selected, setSelected] = useState<"today" | "tomorrow">("today");
  const handleClick = (val: "today" | "tomorrow") => {
    setSelected(val);
    onChange?.(val);
  };
  return (
    <div className="w-full flex gap-2.5">
      <button
        className={clsx(
          selected === "today"
            ? "bg-[#424242] text-[#FEFEFE]"
            : "text-[#9E9E9E] border border-[#E0E0E0]",
          "px-2.5 h-6.75 text-sm font-medium cursor-pointer rounded-sm"
        )}
        onClick={() => handleClick("today")}
      >
        오늘
      </button>
      <button
        className={clsx(
          selected === "tomorrow"
            ? "bg-[#424242] text-[#FEFEFE]"
            : "text-[#9E9E9E] border border-[#E0E0E0]",
          "px-2.5 h-6.75 text-sm font-medium cursor-pointer rounded-sm"
        )}
        onClick={() => handleClick("tomorrow")}
      >
        내일
      </button>
    </div>
  );
};

export default TimeToggleBtn;
