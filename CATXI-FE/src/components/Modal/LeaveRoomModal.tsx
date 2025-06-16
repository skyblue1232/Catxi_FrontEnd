interface LeaveRoomModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'leave' | 'delete'; 
}

const LeaveRoomModal = ({ onConfirm, onCancel, type = 'leave' }: LeaveRoomModalProps) => {
  const isDelete = type === 'delete';

  return (
    <div className="w-full pt-1 rounded-xl bg-white">
      <h2 className="text-center font-medium text-[1.5rem] text-[#424242]">
        {isDelete ? '채팅방을 삭제하시겠어요?' : '채팅방을 나가시겠어요?'}
      </h2>

      {!isDelete && (
        <p className="text-center text-[1.125rem] text-[#9E9E9E] py-2 mt-1 ">
          단시간 내 여러번 나갈 경우, <br />
          사용에 제한이 있을 수 있습니다.
        </p>
      )}

      <div className="flex gap-[1.25rem] text-md mt-4">
        <button
          onClick={onCancel}
          className="flex-1 bg-[#F5F5F5] text-[#424242] py-[0.75rem] rounded-lg"
        >
          아니요
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-[#424242] text-[#FEFEFE] py-[0.75rem] rounded-lg"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default LeaveRoomModal;
