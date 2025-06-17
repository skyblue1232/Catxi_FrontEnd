import { useParams, useOutletContext } from 'react-router-dom';
import { useReadyRequest } from '../../../hooks/mutation/chat/useReadyQuest';
import type { ChatRoomDetail } from '../../../types/chat/chatRoomDetail';
import { useState } from 'react';
import ReadyLockedBox from './Info/ReadyLockedBox';
import DefaultBox from './Info/DefaultBox';

interface ChatContext {
  hostEmail: string;
  myEmail: string;
  chatRoom?: ChatRoomDetail;
}

const DepartureInfoBox = () => {
  const { roomId } = useParams();
  const { myEmail, chatRoom, refetchChatRoomDetail } = useOutletContext<ChatContext & {
    refetchChatRoomDetail: () => void;
  }>();

  const [_isRequested, setIsRequested] = useState(false);
  const { mutate } = useReadyRequest();

  const handleRequestReady = () => {
    if (!roomId) return;

    mutate(Number(roomId), {
      onSuccess: () => {
        refetchChatRoomDetail();
        setIsRequested(true);
      }
    });
    setIsRequested(true);
  };

  if (!chatRoom) return null;

  if (['READY_LOCKED', 'MATCHED'].includes(chatRoom.roomStatus)) {
    return <ReadyLockedBox departAt={chatRoom.departAt} />;
  }

  return (
    <DefaultBox
      chatRoom={chatRoom}
      myEmail={myEmail} 
      onRequestReady={handleRequestReady}
    />
  );
};

export default DepartureInfoBox;
