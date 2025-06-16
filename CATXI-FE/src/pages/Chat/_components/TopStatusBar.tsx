import { ChevronLeft } from 'lucide-react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import type { ChatRoomDetail } from '../../../types/chat/chatRoomDetail';
import { useLeaveChatRoom, useDeleteChatRoom } from '../../../hooks/mutation/chat/useChatDelete';
import { useModal } from '../../../contexts/ModalContext';
import LeaveRoomModal from '../../../components/Modal/LeaveRoomModal';

interface ChatContext {
  hostEmail: string;
  hostNickname: string;
  myEmail: string;
  chatRoom?: ChatRoomDetail;
}

const TopStatusBar = () => {
  const { myEmail, chatRoom } = useOutletContext<ChatContext>();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { mutate: leaveRoom } = useLeaveChatRoom();
  const { mutate: deleteRoom } = useDeleteChatRoom(); 
  const { openModal, closeModal } = useModal();
  const current = (chatRoom?.currentSize ?? 0);
  const total = (chatRoom?.recruitSize ?? 0) + 1;
  const statusTextMap = { WAITING: '모집중', READY_LOCKED: '준비 완료', MATCHED: '매칭 완료', EXPIRED: '만료됨' };
  const statusColorMap = { WAITING: '#7424F5', READY_LOCKED: '#1AD494', MATCHED: '#A0AEC0', EXPIRED: '#D1D5DB' };
  const statusText = chatRoom?.roomStatus ? statusTextMap[chatRoom.roomStatus] : '';
  const statusColor = chatRoom?.roomStatus ? statusColorMap[chatRoom.roomStatus] : '#D1D5DB';
  const isHost = myEmail === chatRoom?.hostEmail;
  const handleBackClick = () => { navigate('/home') };

  const handleLeave = () => {
    if (!roomId) return;
    openModal(
      <LeaveRoomModal
        onConfirm={() => {
          leaveRoom(Number(roomId), {
            onSuccess: () => {
              closeModal();
              navigate('/home');
            },
            onError: () => {
              closeModal();
              alert('채팅방 나가기에 실패했습니다.');
            },
          });
        }}
        onCancel={closeModal}
      />
    );
  };

  const handleDelete = () => {
    if (!roomId) return;
    openModal(
      <LeaveRoomModal
        type="delete" 
        onConfirm={() => {
          deleteRoom(Number(roomId), {
            onSuccess: () => {
              closeModal();
              navigate('/home');
            },
            onError: () => {
              closeModal();
              alert('채팅방 삭제에 실패했습니다.');
            },
          });
        }}
        onCancel={closeModal}
      />
    );
  };

  return (
    <div className="w-full flex justify-between items-center py-6 px-[1.688rem]">
      <button onClick={handleBackClick}><ChevronLeft size={20} /></button>
      <div className="font-medium text-[0.875rem] flex items-center gap-2">
        <span className="text-[0.5rem] ml-5" style={{ color: statusColor }}>●</span>
        <span className="text-gray-600 font-medium">
          {statusText} ({current}/{total})
        </span>
      </div>

      {isHost ? (
        <button className="text-sm text-gray-500" onClick={handleDelete}>삭제하기</button>
      ) : (
        <button className="text-sm text-gray-500" onClick={handleLeave}>나가기</button>
      )}
    </div>
  );
};

export default TopStatusBar;
