import Info from "../../../assets/icons/info.svg?react";
type PickerProp = {
  day: string | null;
  onCancel: () => void;
};
const TimePicker = ({ day, onCancel }: PickerProp) => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full bg-[#1B1B1B80] flex justify-center items-center">
      <div className="bg-white w-65 h-85.25 rounded-sm flex flex-col">
        <div className=" flex flex-col items-center w-full h-full pt-5 px-2.5 gap-3.75">
          <p className="text-base font-medium">출발 시간 선택</p>
          <p className="text-sm font-medium text-[#9E9E9E]">
            {day === "today" ? "오늘" : "내일"} 출발
          </p>
          <hr className="w-full border-[#E0E0E0]" />
          <div className="w-full h-31.5 flex justify-center">
            라이브러리 쓰기
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
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
              onClick={onCancel}
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
