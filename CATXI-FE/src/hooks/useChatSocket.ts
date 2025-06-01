import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { getChatHistory, saveChatMessage } from "../utils/chatUtils"
import type { ChatMessage } from '../types/chat';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const subscriptionRef = useRef<webstomp.Subscription | null>(null);

export function useChatSocket(
  roomId: string,
  userId: number,
  jwtToken: string,
  membername: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const stompClientRef = useRef<Client | null>(null);

  const fetchHistory = async () => {
    try {
      const history = await getChatHistory(roomId, jwtToken);
      history.forEach((msg) => {
        saveChatMessage(roomId, msg);
        onMessage(msg, { isHistory: true });
      });
    } catch (error) {
      console.error('이전 메시지 불러오기 실패:', error);
    }
  };

  const connect = () => {
    fetchHistory();

    const socket = new SockJS(`${SERVER_URL}/connect`);
    const stompClient = webstomp.over(socket);

    stompClient.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        console.log('STOMP 연결 성공');
        stompClient.subscribe(`/topic/${roomId}`, (message) => {
          const msg = JSON.parse(message.body) as ChatMessage;
          if (msg.sender === userId) return;
          saveChatMessage(roomId, msg);
          onMessage(msg);
        });
      },
      (error) => {
        console.error('STOMP 연결 실패:', error);
      }
    );

    stompClientRef.current = stompClient;
  };

  const sendMessage = (content: string) => {
    const msg: ChatMessage = {
      content,
      sender: userId,
      membername,
      roomId,
      timestamp: new Date().toISOString(),
    };

    onMessage(msg, { isHistory: true });
    saveChatMessage(roomId, msg);

    stompClientRef.current?.send(
      `/publish/${roomId}`,
      JSON.stringify(msg),
      { Authorization: `Bearer ${jwtToken}` }
    );
  };

  useEffect(() => {
    if (roomId) {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
      stompClientRef.current = null;
      connect();
    }
    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
    };
  }, [roomId, jwtToken]);

  return { connect, sendMessage };
}
