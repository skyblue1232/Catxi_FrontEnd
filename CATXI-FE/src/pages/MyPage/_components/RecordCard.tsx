import Close from "../../../assets/icons/cardClose.svg?react";
import type { GetHistory } from "../../../types/history";
import { locationLabelMap } from "../_utils/location";
const RecordCard = ({
  matchedAt,
  startPoint,
  endPoint,
  maskedFellas,
}: GetHistory) => {
  const isoString = new Date(matchedAt).toISOString();
  const date = new Date(isoString);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const krDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const formatted = `${krDate.getFullYear()}.${String(
    krDate.getMonth() + 1
  ).padStart(2, "0")}.${String(krDate.getDate()).padStart(2, "0")} (${
    week[krDate.getDay()]
  }) ${String(krDate.getHours()).padStart(2, "0")}:${String(
    krDate.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <div className="bg-[#FEFEFE] w-full min-h-40 py-5 px-7 flex flex-col justify-center gap-3.75 rounded-[10px] text-[#424242] shadow-[0_0_4px_0_rgba(0,0,0,0.10)]">
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">{formatted}</p>
        <div className="cursor-pointer">
          <Close />
        </div>
      </div>
      <div className="w-full border-t-1 border-[#E0E0E0]" />
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">출발지</p>
          <p className="text-sm font-medium">{locationLabelMap[startPoint]}</p>
        </div>
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">도착지</p>
          <p className="text-sm font-medium">{locationLabelMap[endPoint]}</p>
        </div>
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">동행자</p>
          <p className="text-sm font-medium">{maskedFellas.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};
export default RecordCard;
