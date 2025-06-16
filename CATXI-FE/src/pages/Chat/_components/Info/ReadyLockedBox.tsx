import { useMemo } from 'react';

interface Props {
  departAt: string;
}

const ReadyLockedBox = ({ departAt }: Props) => {
  const { formattedTime, remainingMinutes, isUrgent } = useMemo(() => {
    const departDate = new Date(departAt);
    const nowUTC = new Date();
    const now = new Date(nowUTC.getTime() + 9 * 60 * 60 * 1000);

    const hour = departDate.getHours().toString().padStart(2, '0');
    const minute = departDate.getMinutes().toString().padStart(2, '0');
    const formatted = `${hour}시 ${minute}분 출발`;

    const diffMs = departDate.getTime() - now.getTime();
    const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);
    const isUrgent = diffMinutes <= 5;

    return {
      formattedTime: formatted,
      remainingMinutes: diffMinutes,
      isUrgent,
    };
  }, [departAt]);

  return (
    <div className="w-full bg-[#F3F7FF] rounded-xl px-[1.625rem] py-[1.125rem] flex justify-between items-center mb-5">
      <div>
        <p className="text-[1.25rem] font-medium text-[#3574FF]">{formattedTime}</p>
        <p className="text-sm text-[#666]">위 시간까지 장소로 모여주세요!</p>
      </div>
      <div className="bg-white px-4 py-2 rounded-md text-center">
        <p className="text-xs text-[#9E9E9E]">남은 시간</p>
        <p
          className="text-[1.25rem] font-medium"
          style={{ color: isUrgent ? '#FF5252' : '#424242' }}
        >
          {remainingMinutes}분
        </p>
      </div>
    </div>
  );
};

export default ReadyLockedBox;
