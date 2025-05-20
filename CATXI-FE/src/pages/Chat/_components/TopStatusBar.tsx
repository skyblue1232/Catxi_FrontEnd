import { ChevronLeft } from "lucide-react";

const TopStatusBar = () => {
  return (
    <div className="w-full flex justify-between items-center py-6 px-5">
      <button>
        <ChevronLeft size={20} />
      </button>
      <div className="font-medium text-[14px] flex items-center gap-1">
        <span className="text-green-500 text-[10px]">●</span>
        <span className="text-gray-600 font-medium">준비 완료 (2/4)</span>
      </div>
      <button className="text-sm text-gray-500">삭제하기</button>
    </div>
  );
};

export default TopStatusBar;
