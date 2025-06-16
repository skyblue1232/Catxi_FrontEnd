import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { useChatMessages } from './query/useChatMessages';
import type { ChatMessage } from '../types/chat/chat';
import type { ChatMessageItem } from '../types/chat/chatData';
const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

export function useChatSocket(
  roomId: number,
  jwtToken: string,
  myEmail: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void,
  nicknameMap?: Record<string, string> 
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);
  const { data: chatHistory } = useChatMessages(roomId);

  useEffect(() => {
    if (chatHistory?.data) {
      chatHistory.data.forEach((msg: ChatMessageItem) => {
        const senderEmail = msg.senderEmail;
        const senderName = nicknameMap?.[senderEmail] || msg.senderName || senderEmail;
        const convertedMsg: ChatMessage = {
          messageId: msg.messageId, roomId: msg.roomId, sender: msg.senderId,email: senderEmail, senderName, message: msg.content, sentAt: msg.sentAt, isMine: senderEmail === myEmail,
        };
        onMessage(convertedMsg, { isHistory: true });
      });
    }
  }, [chatHistory, onMessage, myEmail, nicknameMap]);

  const connect = useCallback(() => {
    if (stompClientRef.current) {
      console.log('이미 연결됨');
      return;
    }

    const socket = new SockJS(`${SERVER_URL}/connect`);
    const stompClient = webstomp.over(socket);
    stompClient.debug = () => {};

    stompClient.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        console.log('STOMP 연결 성공');

        subscriptionRef.current = stompClient.subscribe(
          `/topic/${roomId}`,
          (message) => {
            const parsed = JSON.parse(message.body);
            const email = parsed.senderEmail ?? parsed.email;
            const senderName = nicknameMap?.[email] || parsed.senderName || email;
            const msg: ChatMessage = { 
              message: parsed.message, email, senderName, roomId: parsed.roomId, sentAt: parsed.sentAt,isMine: email === myEmail, 
            };

            onMessage(msg);
          },
          { Authorization: `Bearer ${jwtToken}` }
        );
      },
      (error) => {
        console.error('STOMP 연결 실패:', error);
      }
    );

    stompClientRef.current = stompClient;
  }, [roomId, jwtToken, myEmail, onMessage, nicknameMap]);

  const disconnect = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
    stompClientRef.current = null;
    console.log('STOMP 연결 해제');
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      const utcNow = new Date();
      const sentAtKST = new Date(utcNow.getTime() + 9 * 60 * 60 * 1000).toISOString();
      const outgoingMsg = { message, email: myEmail, roomId, sentAt: sentAtKST };

      if (stompClientRef.current?.connected) {
        stompClientRef.current.send(
          `/publish/${roomId}`,
          JSON.stringify(outgoingMsg),
          { Authorization: `Bearer ${jwtToken}` }
        );
      } else {
        console.warn("WebSocket 연결이 아직 완료되지 않음");
      }
    },
    [roomId, myEmail, jwtToken]
  );

  useEffect(() => {
    if (!roomId || !myEmail) return;
    connect();
    return () => {
      disconnect();
    };
  }, [roomId, myEmail, connect, disconnect]);

  return { connect, disconnect, sendMessage };
};
