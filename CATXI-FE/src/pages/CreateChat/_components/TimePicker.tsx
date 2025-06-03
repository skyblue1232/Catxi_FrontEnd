import { useState } from "react";
import Info from "../../../assets/icons/info.svg?react";
import Picker from "react-mobile-picker-scroll";

type PickerProp = {
  day: string | null;
  onCancel: () => void;
  setTime: (time: string) => void;
  initialTime: string | null;
};

const TimePicker = ({ day, onCancel, setTime, initialTime }: PickerProp) => {
  const parseInitialTime = (time: string | null) => {
    if (!time) return { hour: "00", minute: "00" };

    const match = time.match(/(오전|오후)\s(\d{1,2})시\s(\d{1,2})분/);
    if (!match) return { hour: "00", minute: "00" };

    const [, meridiem, h, m] = match;
    let hour = meridiem === "오후" ? String(Number(h) + 12) : h;
    if (hour === "24") hour = "00";
    return {
      hour: hour.padStart(2, "0"),
      minute: m.padStart(2, "0"),
    };
  };
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const optionGroups = {
    hour: hours,
    minute: minutes,
  };
  const [valueGroups, setValueGroups] = useState(() =>
    parseInitialTime(initialTime)
  );

  const handleChange = (name: string, value: string) => {
    setValueGroups((prev) => ({ ...prev, [name]: value }));
  };
  const handleApply = () => {
    const dayTime = Number(valueGroups.hour) < 12 ? "오전" : "오후";
    const formattedHour =
      dayTime === "오전"
        ? valueGroups.hour
        : String(Number(valueGroups.hour) - 12).padStart(2, "0");
    setTime(`${dayTime} ${formattedHour}시 ${valueGroups.minute}분`);
    onCancel();
  };
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full bg-[#1B1B1B80] flex justify-center items-center">
      <div className="bg-white w-65 h-85.25 rounded-sm flex flex-col">
        <div className=" flex flex-col items-center w-full h-full pt-5 px-2.5 gap-3.75">
          <p className="text-base font-medium">출발 시간 선택</p>
          <p className="text-sm font-medium text-[#9E9E9E]">
            {day === "today" ? "오늘" : "내일"} 출발
          </p>
          <hr className="w-full border-[#E0E0E0]" />
          <div className="w-full h-31.5 flex justify-center items-center relative">
            <div style={{ width: 300 }}>
              <Picker
                optionGroups={optionGroups}
                valueGroups={valueGroups}
                onChange={handleChange}
                height={160}
                itemHeight={44}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  fontSize: 22,
                  color: "#7424F5",
                  pointerEvents: "none",
                }}
              >
                :
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col mt-2">
          <div className="flex justify-center items-center gap-1.25 w-full h-7.5 bg-[#F5F5F5]">
            <Info />
            <p className="text-xs font-normal text-[#9E9E9E]">
              모이는 시간을 입력해주세요.
            </p>
          </div>
          <div className="flex gap-3.75 justify-center pt-3.75">
            <button
              className="cursor-pointer px-10 py-2.5 bg-[#FEFEFE] border border-[#9E9E9E] rounded-xs text-xs font-medium"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="cursor-pointer px-10 py-2.5 bg-[#7424F5] rounded-xs text-[#FEFEFE] text-xs font-medium"
              onClick={handleApply}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
