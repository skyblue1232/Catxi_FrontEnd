import CommonCard from "../../../components/Common/CommonCard";
import ChatJoinButton from "./ChatJoinButton";
import type { ChatRoomItem } from "../../../types/chatData";

interface Props {
  data: ChatRoomItem;
  onClick: () => void;
}

const ChatCard = ({ data, onClick }: Props) => {
  const isDisabled = data.status !== 'WAITING';
  
  return (
    <CommonCard size="default">
      <div
        className="rounded-lg p-[1.719rem] bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] transition cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col p-2">
            <span className="font-medium text-[14px]">{data.hostName}</span>
            <span className="font-regular text-[12px]">매칭 성공 0회</span>
          </div>
          <span className="text-xs text-[#8C46F6] font-medium">오늘 출발</span>
        </div>

        <div className="w-full bg-[#E0E0E0] h-[1px] my-[0.938rem]"></div>

        <div className="flex justify-between items-center ml-[2.406rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <span className="flex justify-center">출발지</span>
            <span className="text-[18px] font-medium">{data.startPoint}</span>
          </div>

          <span className="text-[#8C46F6] w-[1rem] h-[1rem]">→</span>

          <div className="flex flex-col gap-[0.5rem] mr-[2.406rem]">
            <span className="flex justify-center">도착지</span>
            <span className="text-[18px] font-medium">{data.endPoint}</span>
          </div>
        </div>

        <div className="flex justify-between mt-[1.25rem]">
          <div className="flex items-center px-[0.063rem] text-[12px]">
            <div className="flex flex-col mr-[1.25rem]">
              <span className="font-regular">출발시간</span>
              <span className="font-medium text-[14px]">{data.departAt}</span>
            </div>

            <div className="self-center justify-center w-[1px] h-[1.25rem] bg-[#E0E0E0]"></div>

            <div className="flex flex-col ml-[1.25rem]">
              <span>모집인원</span>
              <span className="flex justify-center">
                <span className="font-medium text-[14px] mx-[2px]">{data.currentSize}</span>
                /{data.recruitSize}
              </span>
            </div>
          </div>

          <div>
            <ChatJoinButton isDisabled={isDisabled} onClick={onClick}/>
          </div>
        </div>
      </div>
    </CommonCard>
  );
};

export default ChatCard;
