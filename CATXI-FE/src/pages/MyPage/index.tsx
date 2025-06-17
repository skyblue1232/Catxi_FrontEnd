import RecordCard from "./_components/RecordCard";
import { useGetHistory, useGetMyPage } from "../../hooks/query/useMyPage";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useEffect, useRef } from "react";
const MyPage = () => {
  const { data } = useGetMyPage();
  const { deleteUser } = useDeleteUser();
  const {
    data: historyData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetHistory();

  const allHistory = historyData?.pages.flatMap((page) => page.content) ?? [];

  const { membername, studentNo, matchCount } = data?.data || {};
  const handleDeleteUser = async () => {
    const isConfirmed = confirm("회원 탈퇴를 진행하시겠습니까?");
    if (isConfirmed) {
      await deleteUser();
    }
  };
  const bottomRef = useRef(null);

  useEffect(() => {
    const target = bottomRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [bottomRef, hasNextPage, fetchNextPage]);

  return (
    <div className="bg-[#FAFAFA] w-full h-full relative">
      <div className="bg-[#FEFEFE] h-16.5 w-full shadow-[0_4px_5px_0_rgba(0,0,0,0.05)] relative flex justify-center items-center">
        <p className="font-regular text-xl font-medium">마이페이지</p>
      </div>
      <div className="h-[calc(100vh-66px)] py-6 px-6.75 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-baseline">
            <p className="text-[22px] font-medium text-[#424242]">
              {membername} 님
            </p>
            <p
              className="text-xs font-normal text-[#9E9E9E] cursor-pointer"
              onClick={() => handleDeleteUser()}
            >
              회원 탈퇴하기
            </p>
          </div>
          <div className="bg-[#FEFEFE] w-full h-17.25 rounded-[10px] p-3.75 flex justify-center items-center gap-10">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-xs font-normal text-[#9E9E9E]">학번</p>
              <p className="text-sm font-medium text-[#424242]">
                {studentNo ?? "-"}
              </p>
            </div>
            <div className="w-0.25 h-4 bg-[#E0E0E0]"></div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-xs font-normal text-[#9E9E9E]">매칭 횟수</p>
              <p className="text-sm font-medium text-[#424242]">
                {matchCount}회
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-lg font-medium text-[#424242]">내 이용 기록</p>

          {allHistory.length === 0 ? (
            <div className="text-sm text-[#9E9E9E] text-center py-10">
              아직 이용한 채팅방 기록이 없어요
            </div>
          ) : (
            <>
              {allHistory.map((item, i) => (
                <RecordCard key={i} {...item} />
              ))}
              <div ref={bottomRef} className="h-6" />
              {isFetchingNextPage && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-[#8C46F6] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#6d6d6d]">로딩 중입니다...</p>
                </div>
              )}
              <div className="h-15" aria-hidden />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyPage;
