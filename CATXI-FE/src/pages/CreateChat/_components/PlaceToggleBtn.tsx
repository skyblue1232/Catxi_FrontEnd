import clsx from "clsx";
type PlaceToggleBtnProps = {
  value: "in" | "out";
  onChange?: (val: "in" | "out") => void;
};
const PlaceTogleBtn = ({ value, onChange }: PlaceToggleBtnProps) => {
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
          "px-3.75 py-1.25 text-sm font-medium cursor-pointer"
        )}
        onClick={() => handleClick("out")}
      >
        학교 밖
      </button>
      <button
        className={clsx(
          value === "in"
            ? "bg-[#424242] text-[#FEFEFE] rounded-4xl"
            : "text-[#9E9E9E]",
          "px-3.75 py-1.25 text-sm font-medium cursor-pointer"
        )}
        onClick={() => handleClick("in")}
      >
        학교 안
      </button>
    </div>
  );
};

export default PlaceTogleBtn;
