import Close from "../../../assets/icons/cardClose.svg?react";
const RecordCard = () => {
  return (
    <div className="bg-[#FEFEFE] w-full min-h-40 py-5 px-7 flex flex-col justify-center gap-3.75 rounded-[10px] text-[#424242] shadow-[0_0_4px_0_rgba(0,0,0,0.10)]">
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">2025.05.04 (일) 09:47</p>
        <div className="cursor-pointer">
          <Close />
        </div>
      </div>
      <div className="w-full border-t-1 border-[#E0E0E0]" />
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">출발지</p>
          <p className="text-sm font-medium">마리아관</p>
        </div>
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">도착지</p>
          <p className="text-sm font-medium">역곡역</p>
        </div>
        <div className="flex gap-3.75 items-center">
          <p className="text-sm font-normal">동행자</p>
          <p className="text-sm font-medium">홍*은(fhsja14), 윤*현(dkfjls23)</p>
        </div>
      </div>
    </div>
  );
};
export default RecordCard;
