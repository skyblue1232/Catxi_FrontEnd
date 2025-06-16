import { useEffect, useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import Time from '../../assets/icons/Time.svg?react';

interface Props {
  senderName: string;
  current: number;
  total: number;
  onAccept: () => void;
  onReject: () => void;
  timeoutSec?: number;
}

const ReadyRequestModal = ({
  current,
  total,
  onAccept,
  onReject,
  timeoutSec = 20,
}: Props) => {
  const [remainingTime, setRemainingTime] = useState(timeoutSec);
  const { closeModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject();
          navigate('/home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReject, closeModal]);

  const handleAccept = () => {
    onAccept();
    closeModal();
  };

  const handleReject = () => {
    onReject();
    closeModal();
    navigate('/home');
  };

  return (
    <div className="text-center bg-[#FEFEFE] w-full flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <h3 className="text-[1.25rem] text-[#424242] font-medium mb-1">방장이 출발을 제안했어요!</h3>
        <p className="text-[0.875rem] text-[#9E9E9E] mb-1">
          거절할 경우 자동으로 방에서 나가게 됩니다.
        </p>

        <div className="mb-4 flex flex-col gap-1">
          <div className='flex h-[1px] w-full bg-[#E0E0E0] my-[1rem]'/>
          <div className="flex items-center justify-center gap-x-1 text-[1.125rem] font-regular text-[#424242]">
            <Time className="w-4 h-4" />
            <span>제한시간</span>
            <span className="text-[#7424F5] font-medium">{remainingTime}초</span>
          </div>
          <div className="text-[1.375rem] text-[#424242] font-medium">
            현재 수락 인원{' '}
            <span className="text-[#7424F5]">{current}/{total}</span>
          </div>
        </div>

        <div className="flex gap-[1.25rem]">
          <button
            className="flex-1 px-[2.75rem] py-[0.625rem] rounded-lg text-[#7424F5] bg-[#F5F5F5]"
            onClick={handleReject}
          >
            거절하기
          </button>
          <button
            className="flex-1 px-[2.75rem] py-[0.625rem] rounded-lg bg-[#7424F5] text-[#FAFAFA]"
            onClick={handleAccept}
          >
            수락하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyRequestModal;
