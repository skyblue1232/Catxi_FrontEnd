import { useModal } from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

const LeaveRoomModal = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleLeave = () => {
    closeModal();
    navigate("/"); 
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-center font-semibold text-lg">채팅방을 나가시겠어요?</h2>
      <div className="flex gap-3 text-sm">
        <button
          onClick={closeModal}
          className="flex-1 bg-[#F5F5F5] text-[#7424F5] py-2 rounded"
        >
          취소
        </button>
        <button
          onClick={handleLeave}
          className="flex-1 bg-[#7424F5] text-white py-2 rounded"
        >
          나가기
        </button>
      </div>
    </div>
  );
};

export default LeaveRoomModal;
