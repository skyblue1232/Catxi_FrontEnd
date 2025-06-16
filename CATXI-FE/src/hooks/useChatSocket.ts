import { useEffect, useRef, useCallback, useState } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client, Subscription } from 'webstomp-client';
import type { ChatMessage } from '../types/chat/chat';
import type { ReadyMessage } from '../types/chat/readyMessage';
import { parseChatMessage, parseReadyMessage } from '../utils/chat/parseSocketMessages';

const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

export function useChatSocket(
  roomId: number,
  jwtToken: string,
  myEmail: string,
  onChatMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void,
  onReadyMessage?: (msg: ReadyMessage) => void,
  nicknameMap: Record<string, string> = {}
) {
  const stompClientRef = useRef<Client | null>(null);
  const chatSubRef = useRef<Subscription | null>(null);
  const readySubRef = useRef<Subscription | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const isConnectingRef = useRef(false);

  const connect = useCallback(() => {
    if (isConnectingRef.current || stompClientRef.current?.connected) {
      console.log('[WebSocket] 이미 연결 중이거나 연결됨');
      return;
    }

    isConnectingRef.current = true;
    const socket = new SockJS(`${SERVER_URL}/connect`);
    const stompClient = webstomp.over(socket);
    stompClient.debug = () => {};

    stompClient.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        console.log('[WebSocket] 연결 성공');
        stompClientRef.current = stompClient;
        setIsConnected(true);
        isConnectingRef.current = false;

        chatSubRef.current?.unsubscribe();
        readySubRef.current?.unsubscribe();

        chatSubRef.current = stompClient.subscribe(
          `/topic/${roomId}`,
          (msg) => {
            const parsed = parseChatMessage(JSON.parse(msg.body), myEmail, nicknameMap);
            onChatMessage(parsed);
          },
          { Authorization: `Bearer ${jwtToken}` }
        );

        readySubRef.current = stompClient.subscribe(
          `/topic/ready/${roomId}`,
          (msg) => {
            if (!onReadyMessage) return;
            const parsed = parseReadyMessage(JSON.parse(msg.body));
            onReadyMessage(parsed);
          },
          { Authorization: `Bearer ${jwtToken}` }
        );
      },
      (err) => {
        console.error('[WebSocket] 연결 실패:', err);
        isConnectingRef.current = false;
        setIsConnected(false);
      }
    );
  }, [roomId, jwtToken, myEmail, onChatMessage, onReadyMessage, nicknameMap]);


  const disconnect = useCallback(() => {
    chatSubRef.current?.unsubscribe();
    readySubRef.current?.unsubscribe();
    chatSubRef.current = null;
    readySubRef.current = null;

    stompClientRef.current?.disconnect(() => {
      console.log('[WebSocket] 연결 해제됨');
      setIsConnected(false);
    });

    stompClientRef.current = null;
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!isConnected || !stompClientRef.current?.connected) {
        console.warn('[WebSocket] 연결 전이므로 메시지를 보낼 수 없음');
        return;
      }

      const sentAtKST = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString();

      const payload = {
        message,
        email: myEmail,
        roomId,
        sentAt: sentAtKST,
      };

      stompClientRef.current.send(
        `/publish/${roomId}`,
        JSON.stringify(payload),
        { Authorization: `Bearer ${jwtToken}` }
      );
    },
    [isConnected, roomId, myEmail, jwtToken]
  );

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, disconnect, sendMessage, isConnected };
}
