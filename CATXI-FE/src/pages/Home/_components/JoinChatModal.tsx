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
      <p className="text-sm mt-2">이 채팅방에 참여하시겠습니까?</p>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={closeModal} className="px-4 py-2">아니오</button>
        <button onClick={handleJoin} className="bg-[#8C46F6] text-white px-4 py-2 rounded">예</button>
      </div>
    </div>
  );
};

export default JoinChatModalContent;
