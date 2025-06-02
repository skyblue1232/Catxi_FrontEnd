import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { getChatHistory, saveChatMessage } from '../utils/chatUtils';
import type { ChatMessage } from '../types/chat';

//서버에서 테스트 할 때

const SERVER_URL = ''; // 서버 주소 적어야 함. 

export function useChatSocket(
  roomId: string,
  userId: number,
  jwtToken: string,
  membername: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);

  const fetchHistory = async () => {
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
  };

  const connect = () => {
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
          }
        );
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

    saveChatMessage(roomId, msg);
    onMessage(msg); 

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


// 서버 주소 있을 때의 로직도 포함. 서버 주소 없을 때 프론트에서 처리하는 방식으로 구현.
/*
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { getChatHistory, saveChatMessage } from "../utils/chatUtils";
import type { ChatMessage } from '../types/chat';

const SERVER_URL = ""; // 프론트 테스트용

export function useChatSocket(
  roomId: string,
  userId: number,
  jwtToken: string,
  membername: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);
  const bcRef = useRef<BroadcastChannel | null>(null);

  const fetchHistory = async () => {
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
  };

  const connect = () => {
    fetchHistory();

    if (!SERVER_URL) {
      console.log('서버 주소가 없어 WebSocket 연결 생략');

      bcRef.current?.close();
      bcRef.current = new BroadcastChannel(`chat-${roomId}`);
      bcRef.current.onmessage = (event) => {
        const msg = event.data as ChatMessage;
        if (msg.sender === userId) return; // 본인 메시지는 렌더링 X
        onMessage(msg);
      };

      stompClientRef.current = {
        connect: (_headers: Record<string, string>, onConnect: () => void) => {
          console.log('프론트 테스트 - connect 호출');
          onConnect();
        },
        subscribe: (_destination: string, _callback: (message: any) => void) => {
          console.log('프론트 테스트 - subscribe 호출');
          return {
            unsubscribe: () => {
              console.log('프론트 테스트 - unsubscribe 호출');
              bcRef.current?.close();
            },
          };
        },
        send: (_destination: string, body: string, _headers: Record<string, string>) => {
          const msg = JSON.parse(body) as ChatMessage;
          console.log('프론트 테스트 - 메시지 전송됨:', msg);
          bcRef.current?.postMessage(msg);
        },
        disconnect: () => {
          console.log('프론트 테스트 - disconnect 호출');
          bcRef.current?.close();
        },
      } as unknown as Client;

      return;
    }

    const socket = new SockJS(`${SERVER_URL}/connect`);
    const stompClient = webstomp.over(socket);

    stompClient.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        console.log('STOMP 연결 성공');
        subscriptionRef.current = stompClient.subscribe(`/topic/${roomId}`, (message) => {
          const msg = JSON.parse(message.body) as ChatMessage;
          if (msg.sender === userId) return; // 본인 메시지는 렌더링 X
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

    // 로컬 저장은 모든 메시지 공통
    saveChatMessage(roomId, msg);
    onMessage(msg); // 본인 메시지 즉시 렌더링

    if (!SERVER_URL) {
      bcRef.current?.postMessage(msg);
      return;
    }

    stompClientRef.current?.send(
      `/publish/${roomId}`,
      JSON.stringify(msg),
      { Authorization: `Bearer ${jwtToken}` }
    );
  };

  useEffect(() => {
    if (roomId) {
      // clean-up
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
      stompClientRef.current = null;
      bcRef.current?.close();

      connect();
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
      bcRef.current?.close();
    };
  }, [roomId, jwtToken]);

  return { connect, sendMessage };
}
*/