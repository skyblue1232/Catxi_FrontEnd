import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { useChatMessages } from './query/useChatMessages';
import type { ChatMessage } from '../types/chat';
import type { ChatMessageItem } from '../types/chatData';

const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

export function useChatSocket(
  roomId: string,
  memberId: number,
  jwtToken: string,
  membername: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);
  const { data: chatHistory } = useChatMessages(parseInt(roomId, 7));

  useEffect(() => {
    if (chatHistory?.data) {
      chatHistory.data.forEach((msg: ChatMessageItem) => {
        const convertedMsg: ChatMessage = {
          message: msg.content,
          sender: msg.senderId,
          membername: msg.senderName,
          roomId: String(msg.roomId),
          timestamp: msg.sentAt,
        };
        onMessage(convertedMsg, { isHistory: true });
      });
    }
  }, [chatHistory, onMessage]);

  const connect = useCallback(() => {
    if (stompClientRef.current) {
      console.log('이미 연결됨');
      return;
    }

    const socket = new SockJS(`${SERVER_URL}/connect`);
    const stompClient = webstomp.over(socket);

    stompClient.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        console.log('STOMP 연결 성공');
        subscriptionRef.current = stompClient.subscribe(
          `/topic/${roomId}`,
          (message) => {
            const msg = JSON.parse(message.body) as ChatMessage;
            if (msg.sender === memberId) return;
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
  }, [roomId, memberId, jwtToken, onMessage]);

  const disconnect = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
    stompClientRef.current = null;
    console.log('STOMP 연결 해제');
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      const localmsg: ChatMessage = {
        message,
        sender: memberId,
        membername,
        roomId,
        timestamp: new Date().toISOString(),
      };

      onMessage(localmsg);

      const outgoingMsg = {
        message,
        membername,
        roomId,
      };

      stompClientRef.current?.send(
        `/publish/${roomId}`,
        JSON.stringify(outgoingMsg),
        { Authorization: `Bearer ${jwtToken}` }
      );
    },
    [roomId, memberId, membername, jwtToken, onMessage]
  );

  useEffect(() => {
    if (!roomId) return;
    connect();
    return () => {
      disconnect();
    };
  }, [roomId, connect, disconnect]);

  return { connect, disconnect, sendMessage };
}
