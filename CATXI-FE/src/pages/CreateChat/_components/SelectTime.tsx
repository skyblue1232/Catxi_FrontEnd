import clsx from "clsx";
import { useChatStore } from "../../../store/createChatStore";
type SelectTimeProp = {
  onOpen: () => void;
};
const SelectTime = ({ onOpen }: SelectTimeProp) => {
  const { answers, updateAnswer } = useChatStore();
  return (
    <div className="w-full h-full flex flex-col gap-5 relative">
      <p className="text-xl font-medium">언제 출발하시나요?</p>
      <div className="flex flex-col gap-7.5">
        <div className="w-full rounded-sm bg-[#F3F7FF] px-2.5 py-3.75 text-[#9E9E9E] text-xs font-normal">
          <ul className="list-disc list-outside pl-4 marker:text-[0.5rem] marker:text-[#9E9E9E] flex flex-col gap-2.5">
            <li>
              정확하고 신속한 만남을 위해 택시 출발 기준이 아닌, 만남 시간
              기준으로 설정해주세요.
            </li>
            <li>시간 설정은 현재 시간 이후부터 가능합니다.</li>
          </ul>
        </div>
        <div className="w-full flex gap-2.5">
          <button
            className={clsx(
              answers.isToday === "today"
                ? "bg-[#424242] text-[#FEFEFE]"
                : "text-[#9E9E9E] border border-[#E0E0E0]",
              "px-2.5 h-6.75 text-sm font-medium cursor-pointer rounded-sm"
            )}
            onClick={() => updateAnswer("isToday", "today")}
          >
            오늘
          </button>
          <button
            className={clsx(
              answers.isToday === "tomorrow"
                ? "bg-[#424242] text-[#FEFEFE]"
                : "text-[#9E9E9E] border border-[#E0E0E0]",
              "px-2.5 h-6.75 text-sm font-medium cursor-pointer rounded-sm"
            )}
            onClick={() => updateAnswer("isToday", "tomorrow")}
          >
            내일
          </button>
        </div>
        <div
          className="w-full h-7.25 flex flex-col gap-5 px-2.5 pb-1.25 border-b-1 border-b-[#E0E0E0] cursor-pointer text-xl font-medium"
          onClick={() => onOpen?.()}
        >
          {answers.time ? (
            <p className="text-[#424242]">{answers.time}</p>
          ) : (
            <p className="text-[#9E9E9E]">출발 시간 선택</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTime;
