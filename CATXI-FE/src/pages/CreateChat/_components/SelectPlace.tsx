import { useEffect, useState } from "react";
import PlaceToggleBtn from "./PlaceToggleBtn";
import { IN_CAMPUS_PLACES, OUT_CAMPUS_PLACES } from "../_constants/place";
import clsx from "clsx";

type SelectPlaceProps = {
  type: 1 | 2;
  value: string | null;
  onChange: (val: string | null) => void;
};
const SelectPlace = ({ value, type, onChange }: SelectPlaceProps) => {
  const [placeType, setPlaceType] = useState<"in" | "out">("out");
  useEffect(() => setPlaceType("out"), [type]);
  const placeList = placeType === "in" ? IN_CAMPUS_PLACES : OUT_CAMPUS_PLACES;
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <p className="text-xl font-medium">
        {type === 1 ? "어디에서 출발하시나요?" : "어디로 가시나요?"}
      </p>
      <div className="flex flex-col gap-5">
        <PlaceToggleBtn
          value={placeType}
          onChange={(val) => setPlaceType(val)}
        />
        <div className="flex flex-col gap-3.75">
          {placeList.map((text, i) => (
            <button
              onClick={() => onChange(text)}
              key={i}
              className={clsx(
                value === text ? "border-[#7424F5]" : "border-transparent",
                "flex items-center border-1 cursor-pointer text-left rounded-sm bg-[#FEFEFE] p-3.75 w-full h-12.75 text-4.5 font-medium shadow-[0_0_4px_0_rgba(0,0,0,0.10)]"
              )}
            >
              {text}
            </button>
          ))}
          {placeType === "out" && (
            <input
              value={value && !placeList.includes(value) ? value : ""}
              onFocus={() => onChange(null)}
              onChange={(e) => onChange(e.target.value)}
              placeholder="기타 (직접 작성)"
              className="cursor-pointer text-left rounded-sm bg-[#FEFEFE] p-3.75 w-full h-12.75 text-4.5 font-medium shadow-[0_0_4px_0_rgba(0,0,0,0.10)]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectPlace;
