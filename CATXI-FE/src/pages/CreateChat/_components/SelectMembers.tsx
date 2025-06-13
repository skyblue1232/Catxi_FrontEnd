import Reduce from "../../../assets/icons/reduce.svg?react";
import Increase from "../../../assets/icons/increase.svg?react";
import { useState } from "react";
import { useChatStore } from "../../../store/createChatStore";
const SelectMember = () => {
  const { answers, updateAnswer } = useChatStore();
  const [count, setCount] = useState(answers.size);
  const handleIncrease = () => {
    if (count < 3) {
      const newCount = count + 1;
      setCount(newCount);
      updateAnswer("size", newCount);
    }
  };
  const handleDecrease = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateAnswer("size", newCount === 0 ? 0 : newCount);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <p className="text-xl font-medium">몇 명을 구하시나요?</p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1.25">
          <p className="text-xl font-medium">모집 인원</p>
          <p className="text-xs font-normal text-[#9E9E9E]">3인 이하</p>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className="h-6.25 w-6.25 flex justify-center items-center
           rounded-full cursor-pointer bg-[#F5F5F5]"
            disabled={count === 0}
            onClick={handleDecrease}
          >
            <Reduce />
          </button>
          <p className="text-[22px] font-medium">{answers.size}</p>
          <button
            className="h-6.25 w-6.25 flex justify-center items-center rounded-full cursor-pointer bg-[#3574FF]"
            disabled={count === 3}
            onClick={handleIncrease}
          >
            <Increase />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectMember;
