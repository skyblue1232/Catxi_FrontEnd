import { useCallback, useEffect, useMemo, useState } from 'react';
import Storage from '../utils/storage';
import { useUserEmail } from './useUserEmail';
import { useChatSocket } from './useChatSocket';
import { useChatMessages } from './query/useChatMessages';
import { useChatRoomDetail } from './query/useChatDetail';
import { useModal } from '../contexts/ModalContext';
import ReadyRequestModal from '../components/Modal/ReadyRequestModal';
import { useReadyAccept, useReadyReject } from './mutation/chat/useReadyQuest';
import { mapChatHistoryToMessages } from '../utils/chat/messageUtils';
import { buildNicknameMap, getHostNickname } from '../utils/chat/chatUtils';
import type { ChatMessage } from '../types/chat/chat';
import type { ReadyMessage } from '../types/chat/readyMessage';

export function useChatConnection(roomId: number) {
  const email = useUserEmail();
  const [acceptCount, setAcceptCount] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [readyMessages, setReadyMessages] = useState<ReadyMessage[]>([]);
  const { data: chatRoomDetail, isLoading, isError, refetch: refetchChatRoomDetail } = useChatRoomDetail(roomId);
  const { data: chatHistory } = useChatMessages(roomId);
  const { openModal } = useModal();
  const { mutate: acceptReady } = useReadyAccept();
  const { mutate: rejectReady } = useReadyReject();

  const nicknameMap = useMemo(() => {
    return buildNicknameMap(
      chatRoomDetail?.data?.participantEmails,
      chatRoomDetail?.data?.participantNicknames
    );
  }, [chatRoomDetail]);

  const hostEmail = chatRoomDetail?.data?.hostEmail ?? '';
  const hostNickname = useMemo(() => {
    return getHostNickname(
      hostEmail,
      chatRoomDetail?.data?.participantEmails,
      chatRoomDetail?.data?.participantNicknames
    );
  }, [chatRoomDetail, hostEmail]);

  const handleAccept = () => {
    acceptReady(roomId);
    setAcceptCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (chatHistory?.data && email) {
      setMessages(mapChatHistoryToMessages(chatHistory.data, email));
    }
  }, [chatHistory, email]);

  const handleMessage = useCallback(
    (msg: ChatMessage, options?: { isHistory?: boolean }) => {
      setMessages((prev) => {
        if (options?.isHistory) {
          const exists = prev.some(
            (m) =>
              m.sentAt === msg.sentAt &&
              m.message === msg.message &&
              m.email === msg.email
          );
          return exists ? prev : [...prev, msg];
        }
        return [...prev, msg];
      });
    },
    []
  );

  const handleReadyMessage = useCallback(
    (msg: ReadyMessage) => {
      console.log('[useChatConnection Ready 수신]', msg);

      const senderName = nicknameMap[msg.senderEmail] || msg.senderEmail;

      openModal(
        <ReadyRequestModal
          senderName={senderName}
          current={acceptCount} 
          total={chatRoomDetail?.data.currentSize ?? 1}
          onAccept={handleAccept}
          onReject={() => rejectReady(roomId)}
        />
      );

      setReadyMessages((prev) => [...prev, msg]);
    },
    [nicknameMap, openModal, chatRoomDetail?.data.currentSize, acceptReady, rejectReady, roomId]
  );

  const { connect, disconnect, sendMessage } = useChatSocket(
    roomId,
    Storage.getAccessToken()!,
    email,
    handleMessage,
    handleReadyMessage,
    nicknameMap
  );

  useEffect(() => {
    if (!roomId || !email) return;
    connect();
    return () => disconnect();
  }, [roomId, email, connect, disconnect]);

  return {
    messages,
    myEmail: email,
    sendMessage,
    readyMessages,
    nicknameMap,
    hostEmail,
    hostNickname,
    chatRoomDetail: chatRoomDetail?.data,
    refetchChatRoomDetail,
    isLoading,
    isError,
  };
};
