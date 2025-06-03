import { useState } from "react";
import Arrow from "../../assets/icons/arrow.svg?react";
import SelectPlace from "./_components/SelectPlace";
import clsx from "clsx";
import SelectTime from "./_components/SelectTime";
import SelectMember from "./_components/SelectMembers";
import TimePicker from "./_components/TimePicker";
import AllSet from "./_components/AllSet";
import { useNavigate } from "react-router-dom";
const CreateChat = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [allSet, setAllSet] = useState(false);
  const [selectPicker, setSelectPicker] = useState<null | string>(null);
  const [current, setCurrent] = useState(1);
  const totalQuestions = 4;
  const progressWidth = `${(current / totalQuestions) * 100}%`;
  const handleMovePage = (offset: number) => {
    const next = current + offset;
    if (allSet) {
      if (offset > 0) {
        navigate("/");
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
    console.log(answers);
  };
  const handleAnswerChange = (value: string | null) => {
    const updated = [...answers];
    updated[current - 1] = value;
    setAnswers(updated);
  };
  return (
    <div className="w-full h-full relative">
      <div className="h-16.5 w-full border-b-2 border-b-[#E0E0E0] relative flex justify-center items-center">
        <div
          className="absolute -bottom-0.5 left-0 h-0.5 bg-[#7424F5] transition-all duration-300"
          style={{ width: progressWidth }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-6.5 cursor-pointer">
          <Arrow />
        </div>
        <p className="font-regular text-xl font-medium">채팅방 생성</p>
      </div>
      <div
        className="w-full h-[calc(100vh-66px)] px-6.75 py-10 flex flex-col justify-between
      "
      >
        {current < 3 && (
          <SelectPlace
            type={current as 1 | 2}
            value={answers[current - 1]}
            onChange={(val) => handleAnswerChange(val)}
          />
        )}
        {current == 3 && (
          <SelectTime
            selectTime={(val) => setSelectPicker(val)}
            time={selectedTime}
          />
        )}
        {current == 4 && !allSet && (
          <SelectMember
            value={answers[current - 1]}
            onChange={(val) => handleAnswerChange(val)}
          />
        )}
        {allSet && <AllSet value={answers} />}
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
            disabled={!answers[current - 1]}
            className={clsx(
              answers[current - 1] ? "bg-[#7424F5]" : "bg-[#E0E0E0]",
              "w-full h-13.5 text-[#FAFAFA] rounded-sm text-xl font-medium cursor-pointer"
            )}
            onClick={() => handleMovePage(1)}
          >
            {allSet ? "네, 맞아요." : current < 4 ? "다음" : "완료"}
          </button>
        </div>
      </div>
      {selectPicker && (
        <TimePicker
          onCancel={() => setSelectPicker(null)}
          day={selectPicker}
          setTime={(time: string) => {
            setSelectedTime(time);
            const updated = [...answers];
            updated[2] = time;
            setAnswers(updated);
          }}
          initialTime={selectedTime}
        />
      )}
    </div>
  );
};

export default CreateChat;
