import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { getChatHistory, saveChatMessage } from '../utils/chatUtils';
import type { ChatMessage } from '../types/chat';

const SERVER_URL = ''; // 서버 주소 설정

export function useChatSocket(
  roomId: string,
  userId: number,
  jwtToken: string,
  membername: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      const history = await getChatHistory(roomId, jwtToken);
      if (Array.isArray(history)) {
        history.forEach((msg) => {
          onMessage(msg, { isHistory: true });
        });
      }
    } catch (error) {
      console.error('이전 메시지 불러오기 실패:', error);
    }
  }, [roomId, jwtToken, onMessage]);

  const connect = useCallback(() => {
    if (stompClientRef.current) {
      console.log('이미 연결됨');
      return;
    }

    fetchHistory();

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
            if (msg.sender === userId) return;
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
  }, [fetchHistory, roomId, userId, jwtToken, onMessage]);

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
        sender: userId,
        membername,
        roomId,
        timestamp: new Date().toISOString(),
      };

      saveChatMessage(roomId, localmsg);
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
    [roomId, userId, membername, jwtToken, onMessage]
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