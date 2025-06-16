import { useState } from "react";
import Arrow from "../../assets/icons/arrow.svg?react";
import SelectPlace from "./_components/SelectPlace";
import clsx from "clsx";
import SelectTime from "./_components/SelectTime";
import SelectMember from "./_components/SelectMembers";
import TimePicker from "./_components/TimePicker";
import AllSet from "./_components/AllSet";
import { useChatStore } from "../../store/createChatStore";
import { useCreateChat } from "../../hooks/mutation/useCreateChat";
import { labelToLocationMap } from "../MyPage/_utils/location";
import { parseTimeToISOString } from "./_constants/time";
import { useNavigate } from "react-router-dom";
const CreateChat = () => {
  const navigate = useNavigate();
  const { answers, clearAnswer } = useChatStore();
  const { startPoint, endPoint, size, isToday, time } = answers;
  const { createChatRoom } = useCreateChat();
  const [allSet, setAllSet] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const keys: (keyof typeof answers)[] = [
    "startPoint",
    "endPoint",
    "time",
    "size",
  ];
  const totalQuestions = 4;
  const progressWidth = `${(current / totalQuestions) * 100}%`;
  const handleMovePage = (offset: number) => {
    console.log(answers);
    const next = current + offset;
    if (allSet) {
      if (offset > 0) {
        createChatRoom({
          startPoint: labelToLocationMap[startPoint],
          endPoint: labelToLocationMap[endPoint],
          recruitSize: size,
          departAt: parseTimeToISOString(time, isToday),
        });
      } else if (offset < 0) {
        setCurrent(1);
        setAllSet(false);
      }
      return;
    }
    if (offset > 0 && current === totalQuestions) {
      setAllSet(true);
      return;
    }
    if (next > 0 && next <= totalQuestions) {
      setCurrent(next);
    }
  };
  const handleRouteMove = () => {
    if (startPoint) {
      const isConfirmed = confirm(
        "현재 입력하신 내용이 저장되지 않았습니다.\n페이지를 나가시겠어요?"
      );
      if (isConfirmed) {
        clearAnswer();
        navigate("/home");
      }
    } else navigate("/home");
  };
  return (
    <div className="w-full h-full relative">
      <div className="h-16.5 w-full border-b-2 border-b-[#E0E0E0] relative flex justify-center items-center">
        <div
          className="absolute -bottom-0.5 left-0 h-0.5 bg-[#7424F5] transition-all duration-300"
          style={{ width: progressWidth }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-6.5 cursor-pointer"
          onClick={handleRouteMove}
        >
          <Arrow />
        </div>
        <p className="font-regular text-xl font-medium">채팅방 생성</p>
      </div>
      <div
        className="w-full h-[calc(100vh-66px)] px-6.75 py-10 flex flex-col justify-between
      "
      >
        {current < 3 && <SelectPlace type={current as 1 | 2} />}
        {current == 3 && (
          <SelectTime onOpen={() => setIsTimePickerOpen(true)} />
        )}
        {current == 4 && !allSet && <SelectMember />}
        {allSet && <AllSet />}
        <div className="flex flex-col gap-2.5">
          {current > 1 && (
            <button
              className="text-[#9E9E9E] font-normal text-xl cursor-pointer"
              onClick={() => handleMovePage(-1)}
            >
              {allSet ? "다시 입력할게요." : "이전"}
            </button>
          )}
          <button
            disabled={!answers[keys[current - 1]]}
            className={clsx(
              answers[keys[current - 1]] ? "bg-[#7424F5]" : "bg-[#E0E0E0]",
              "w-full h-13.5 text-[#FAFAFA] rounded-sm text-xl font-medium cursor-pointer"
            )}
            onClick={() => handleMovePage(1)}
          >
            {allSet ? "네, 맞아요." : current < 4 ? "다음" : "완료"}
          </button>
        </div>
      </div>
      {isTimePickerOpen && (
        <TimePicker onCancel={() => setIsTimePickerOpen(false)} />
      )}
    </div>
  );
};

export default CreateChat;
