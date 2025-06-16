import CommonCard from "../../../components/Common/CommonCard";
import ChatJoinButton from "./ChatJoinButton";
import type { ChatRoomItem } from "../../../types/chat/chatData";
import { stationDisplayMap } from "../../../constants/stationMap";
import { getDepartText } from "../../../utils/date";
import { useModal } from "../../../contexts/ModalContext";
import JoinChatModalContent from "./JoinChatModal";

interface Props {
  data: ChatRoomItem;
}

const ChatCard = ({ data }: Props) => {
  const { openModal } = useModal();

  const handleJoinClick = () => {
    openModal(
      <JoinChatModalContent roomId={data.roomId} />
    );
  };

  const maskName = (name: string) => {
    if (name.length <= 1) return name;
    const mid = Math.floor(name.length / 2);
    return name.substring(0, mid) + '*' + name.substring(mid + 1);
  };

  return (
    <CommonCard size="default">
      <div className="rounded-lg p-[1.719rem] bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] transition cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex flex-col p-2">
            <span className="font-medium text-[14px]">{`${maskName(data.hostName)}(${data.hostNickname || '방장'})`}</span>
            <span className="font-regular text-[12px]">매칭 성공 {data.matchCount}회</span>
          </div>
          <span className="text-xs text-[#8C46F6] font-medium">{getDepartText(data.departAt)}</span>
        </div>

        <div className="w-full bg-[#E0E0E0] h-[1px] my-[0.938rem]" />

        <div className="flex justify-between items-center ml-[2.406rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <span className="flex justify-center">출발지</span>
            <span className="text-[18px] font-medium">
              {stationDisplayMap[data.startPoint.toUpperCase()] || data.startPoint}
            </span>
          </div>

          <span className="text-[#8C46F6] w-[1rem] h-[1rem]">→</span>

          <div className="flex flex-col gap-[0.5rem] mr-[2.406rem]">
            <span className="flex justify-center">도착지</span>
            <span className="text-[18px] font-medium">
              {stationDisplayMap[data.endPoint.toUpperCase()] || data.endPoint}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-[1.25rem]">
          <div className="flex items-center px-[0.05rem] text-[12px]">
            <div className="flex flex-col mr-[1.25rem]">
              <span className="font-regular">출발시간</span>
              <span className="font-medium text-[14px]">
                {(() => {
                  const [date, time] = data.departAt.split("T");
                  const [_year, month, day] = date.split("-");
                  const [hour, minute] = time.split(":");
                  return (
                    <>
                      {`${Number(month)}월 ${Number(day)}일`}<br />
                      {minute === '00' ? `${hour}시` : `${hour}시 ${minute}분`}
                    </>
                  );
                })()}
              </span>
            </div>

            <div className="self-center justify-center w-[1px] h-[1.5rem] bg-[#E0E0E0]" />

            <div className="flex flex-col ml-[1.25rem]">
              <span>전체인원</span>
              <span className="flex justify-center font-medium">
                <span className="font-medium text-[13px] mb-1">{data.currentSize}</span>/{data.recruitSize+1}
              </span>
            </div>
          </div>

          <div className="mt-[1.25rem]">
            <ChatJoinButton status={data.status} onClick={handleJoinClick} />
          </div>
        </div>
      </div>
    </CommonCard>
  );
};

export default ChatCard;
