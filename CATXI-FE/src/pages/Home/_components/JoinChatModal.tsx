import { useJoinChatRoom } from "../../../hooks/mutation/chat/useJoinChatRoom";
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../../contexts/ModalContext";

interface Props {
  roomId: number;
}

const JoinChatModalContent = ({ roomId }: Props) => {
  const { mutate: joinRoom } = useJoinChatRoom();
  const navigate = useNavigate();
  const { closeModal } = useModal(); 

  const handleJoin = () => {
    joinRoom(roomId, {
      onSuccess: () => {
        closeModal();
        navigate(`/chat/${roomId}`);
      },
      onError: () => {
        closeModal();
        alert("입장에 실패했습니다.");
      },
    });
  };

  return (
    <div className="z-500">
      <h2 className="text-lg font-bold">채팅방 참여</h2>
      <p className="text-md mt-2">이 채팅방에 참여하시겠습니까?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={closeModal} className="px-10 py-2 text-[#424242] bg-[#F5F5F5] rounded-lg">아니오</button>
        <button onClick={handleJoin} className="bg-[#424242] text-[#FAFAFA] px-10 py-2 rounded-lg">예</button>
      </div>
    </div>
  );
};

export default JoinChatModalContent;
