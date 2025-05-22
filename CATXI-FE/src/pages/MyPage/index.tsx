import RecordCard from "./_components/recordCard";

const MyPage = () => {
  return (
    <div className="bg-[#FAFAFA] w-full h-full relative">
      <div className="bg-[#FEFEFE] h-16.5 w-full shadow-[0_4px_5px_0_rgba(0,0,0,0.05)] relative flex justify-center items-center">
        <p className="font-regular text-xl font-medium">마이페이지</p>
      </div>
      <div className="h-[calc(100vh-66px)] py-6 px-6.75 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-baseline">
            <p className="text-[22px] font-medium text-[#424242]">이동준 님</p>
            <p className="text-xs font-normal text-[#9E9E9E] cursor-pointer">
              회원 탈퇴하기
            </p>
          </div>
          <div className="bg-[#FEFEFE] w-full h-17.25 rounded-[10px] p-3.75 flex justify-center items-center gap-10">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-xs font-normal text-[#9E9E9E]">학번</p>
              <p className="text-sm font-medium text-[#424242]">202321023</p>
            </div>
            <div className="w-0.25 h-4 bg-[#E0E0E0]"></div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-xs font-normal text-[#9E9E9E]">매칭 횟수</p>
              <p className="text-sm font-medium text-[#424242]">4회</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-lg font-medium text-[#424242]">내 이용 기록</p>
          {[...Array(3)].map((_, i) => (
            <RecordCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
