import PlaceToggleBtn from "./PlaceToggleBtn";
import { IN_CAMPUS_PLACES, OUT_CAMPUS_PLACES } from "../_constants/place";
import clsx from "clsx";
import { useChatStore } from "../../../store/createChatStore";
type SelectPlaceProps = {
  type: 1 | 2;
};
const SelectPlace = ({ type }: SelectPlaceProps) => {
  const { answers, updateAnswer } = useChatStore();
  const isStart = type === 1;
  const isStartIn = answers.start === "in";
  const isEndIn = answers.end === "in";
  if (!isStart) {
    if (isStartIn && answers.end !== "out") {
      updateAnswer("end", "out");
      updateAnswer("endPoint", "");
    }
    if (!isStartIn && answers.end !== "in") {
      updateAnswer("end", "in");
      updateAnswer("endPoint", "");
    }
  }
  const placeList =
    (isStart && isStartIn) || (!isStart && isEndIn)
      ? IN_CAMPUS_PLACES
      : OUT_CAMPUS_PLACES;
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <p className="text-xl font-medium">
        {isStart ? "어디에서 출발하시나요?" : "어디로 가시나요?"}
      </p>
      <div className="flex flex-col gap-5">
        <PlaceToggleBtn
          value={isStart ? answers.start : answers.end}
          onChange={(val) => {
            updateAnswer(isStart ? "start" : "end", val);
          }}
          disabled={!isStart}
        />
        <div className="flex flex-col gap-3.75">
          {placeList.map((text, i) => {
            const selected =
              (isStart && answers.startPoint === text) ||
              (!isStart && answers.endPoint === text);
            return (
              <button
                onClick={() => {
                  if (isStart) updateAnswer("startPoint", text);
                  else updateAnswer("endPoint", text);
                }}
                key={i}
                className={clsx(
                  selected ? "border-[#7424F5]" : "border-transparent",
                  "flex items-center border-1 cursor-pointer text-left rounded-sm bg-[#FEFEFE] p-3.75 w-full h-12.75 text-4.5 font-medium shadow-[0_0_4px_0_rgba(0,0,0,0.10)]"
                )}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectPlace;
