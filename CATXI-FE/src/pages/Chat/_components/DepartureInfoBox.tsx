const DepartureInfoBox = () => {
  return (
    <div className="w-full bg-[#F3F7FF] rounded-xl px-4 py-4.5 flex justify-between items-center mb-5">
      <div>
        <p className="text-sm font-semibold text-blue-600">09시 47분 출발</p>
        <p className="text-xs text-gray-500">위 시간까지 장소로 모여주세요!</p>
      </div>
      <div className="bg-white rounded-md px-2 py-1 text-center">
        <p className="text-[10px] text-gray-400">남은 시간</p>
        <p className="text-sm font-semibold text-gray-700">7분</p>
      </div>
    </div>
  );
};

export default DepartureInfoBox;
