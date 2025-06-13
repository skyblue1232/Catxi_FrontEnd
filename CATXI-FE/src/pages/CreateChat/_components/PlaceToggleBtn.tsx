import clsx from "clsx";
type PlaceToggleBtnProps = {
  value: "in" | "out";
  onChange?: (val: "in" | "out") => void;
  disabled: boolean;
};
const PlaceTogleBtn = ({ value, onChange, disabled }: PlaceToggleBtnProps) => {
  const handleClick = (val: "in" | "out") => {
    onChange?.(val);
  };
  return (
    <div className="w-full flex gap-2.5">
      <button
        className={clsx(
          value === "out"
            ? "bg-[#424242] text-[#FEFEFE] rounded-4xl"
            : "text-[#9E9E9E]",
          disabled ? "cursor-default" : "cursor-pointer",
          "px-3.75 py-1.25 text-sm font-medium"
        )}
        onClick={() => handleClick("out")}
        disabled={disabled}
      >
        학교 밖
      </button>
      <button
        className={clsx(
          value === "in"
            ? "bg-[#424242] text-[#FEFEFE] rounded-4xl"
            : "text-[#9E9E9E]",
          disabled ? "cursor-default" : "cursor-pointer",
          "px-3.75 py-1.25 text-sm font-medium",
          disabled && "disabled"
        )}
        onClick={() => handleClick("in")}
        disabled={disabled}
      >
        학교 안
      </button>
    </div>
  );
};

export default PlaceTogleBtn;
