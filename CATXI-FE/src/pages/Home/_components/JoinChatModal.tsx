import { useJoinChatRoom } from "../../../hooks/mutation/chat/useJoinChatRoom";
import { useNavigate } from 'react-router-dom';
import { useModal } from "../../../contexts/ModalContext";
import InfoModal from "../../../components/Modal/InfoModal";

interface Props {
  roomId: number;
}

const JoinChatModalContent = ({ roomId }: Props) => {
  const { mutate: joinRoom } = useJoinChatRoom();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal(); 

  const handleJoin = () => {
    joinRoom(roomId, {
      onSuccess: () => {
        closeModal();
        navigate(`/chat/${roomId}`);
      },
      onError: (error: any) => {
        closeModal();

        const status = error?.response?.status;
        const isAlreadyJoined = status === 409;
        const isStatus = status >= 400 && status < 500;

        openModal(
          <InfoModal
            message={ isAlreadyJoined ? "재로그인 해주세요." : "이미 채팅방에 참여 중입니다."
            }
            onClose={() => {
              closeModal();
              if (isStatus) {
                navigate("/");
              }
            }}
          />
        );
      },
    });
  };

  return (
    <div className="z-500">
      <h2 className="text-lg font-bold">채팅방 참여</h2>
      <p className="text-md mt-2">이 채팅방에 참여하시겠습니까?</p>
      <div className="flex w-full gap-[1.25rem] mt-4">
        <button onClick={closeModal} className="flex-1 px-[1.25rem] py-2 text-[#424242] bg-[#F5F5F5] rounded-lg">
          아니오
        </button>
        <button onClick={handleJoin} className="flex-1 bg-[#424242] text-[#FAFAFA] px-10 py-2 rounded-lg">
          예
        </button>
      </div>
    </div>
  );
};

export default JoinChatModalContent;
