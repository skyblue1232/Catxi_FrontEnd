import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import * as webstomp from 'webstomp-client';
import type { Client } from 'webstomp-client';
import { useChatMessages } from './query/useChatMessages';
import type { ChatMessage } from '../types/chat';
import type { ChatMessageItem } from '../types/chatData';
import { createDuplicateChecker, createLocalMessage, parseServerMessage,  } from '../utils/chat/chatSocketUtils';

const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

export function useChatSocket(
  roomId: string,
  jwtToken: string,
  myEmail: string,
  onMessage: (msg: ChatMessage, options?: { isHistory?: boolean }) => void,
  replaceMessage?: (tempId: number, confirmed: ChatMessage) => void
) {
  const stompClientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<webstomp.Subscription | null>(null);
  const tempIdRef = useRef(-1);
  const { isDuplicate, remove, getTempIds } = createDuplicateChecker();

  const { data: chatHistory } = useChatMessages(parseInt(roomId, 7));

  useEffect(() => {
    chatHistory?.data.forEach((m: ChatMessageItem) => {
      const msg: ChatMessage = {
        messageId: m.messageId,
        message: m.content,
        email: m.senderEmail,
        roomId: String(m.roomId),
        sentAt: m.sentAt,
        isMine: m.senderEmail === myEmail,
      };
      if (!isDuplicate(msg.messageId)) onMessage(msg, { isHistory: true });
    });
  }, [chatHistory, onMessage, myEmail]);

  const connect = useCallback(() => {
    if (stompClientRef.current) return;

    const socket = new SockJS(`${SERVER_URL}/connect`);
    const client = webstomp.over(socket);
    client.debug = () => {};

    client.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
      const sub = client.subscribe(`/topic/${roomId}`, (message) => {
        const parsed = parseServerMessage(JSON.parse(message.body), myEmail);
        if (typeof parsed.messageId !== 'number' || isDuplicate(parsed.messageId)) return;

        if (parsed.email === myEmail && replaceMessage) {
          const tempId = getTempIds().pop();
          if (tempId !== undefined) {
            replaceMessage(tempId, parsed);
            remove(tempId);
          }
        } else {
          onMessage(parsed);
        }
      }, { Authorization: `Bearer ${jwtToken}` });

      stompClientRef.current = client;
      subscriptionRef.current = sub;
    }, (err) => console.error('STOMP 연결 실패:', err));
  }, [roomId, jwtToken, myEmail, onMessage, replaceMessage]);

  const disconnect = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
    stompClientRef.current = null;
  }, []);

  const sendMessage = useCallback((message: string) => {
    const now = new Date();
    const sentAt = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString();
    const tempId = tempIdRef.current--;

    const localMsg = createLocalMessage(tempId, message, myEmail, roomId);
    if (!isDuplicate(tempId)) onMessage(localMsg, { isHistory: false });

    const payload = { message, email: myEmail, roomId, sentAt };
    stompClientRef.current?.connected
      ? stompClientRef.current.send(`/publish/${roomId}`, JSON.stringify(payload), {
          Authorization: `Bearer ${jwtToken}`,
        })
      : console.warn('WebSocket 연결이 진행 중');
  }, [roomId, myEmail, jwtToken, onMessage]);

  useEffect(() => {
    if (!roomId || !myEmail) return;
    connect();
    return disconnect;
  }, [roomId, myEmail, connect, disconnect]);

  return { connect, disconnect, sendMessage };
};
