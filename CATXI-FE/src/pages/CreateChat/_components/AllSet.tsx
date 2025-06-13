import { useChatStore } from "../../../store/createChatStore";
const AllSet = () => {
  const { answers } = useChatStore();
  const titles = ["출발지", "도착지", "출발 시간", "모집 인원"];
  const keys: (keyof typeof answers)[] = [
    "startPoint",
    "endPoint",
    "time",
    "size",
  ];
  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="flex flex-col gap-2.5">
        <p className="text-xl font-medium">이 정보가 맞나요?</p>
        <p className="text-base font-normal">
          맞으면 바로 채팅방을 생성할게요.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {titles.map((title, i) => {
          return (
            <div key={i} className="flex flex-col gap-2.5">
              <p className="text-base font-normal" key={i}>
                {title}
              </p>
              <div
                className="w-full h-9.75 py-2.5 px-3.75 bg-[#F5F5F5] text-base font-medium text-left flex items-center"
                key={title}
              >
                {answers[keys[i]] ?? "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSet;
