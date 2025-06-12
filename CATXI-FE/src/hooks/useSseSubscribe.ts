import { useEffect, useRef, useCallback } from 'react';
import { useSseStore } from '../store/sseStore';
import { EventSourcePolyfill } from 'event-source-polyfill';

const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

export function useSseSubscribe(roomId: string, jwtToken: string) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const addEvent = useSseStore((state) => state.addEvent);
  const clearEvents = useSseStore((state) => state.clearEvents);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      clearEvents();
      console.log('SSE 연결 해제');
    }
  }, [clearEvents]);

  const connect = useCallback(() => {
    if (!roomId) return;
    if (eventSourceRef.current) {
      console.log('SSE 연결됨');
      return;
    }

    const url = `${SERVER_URL}/sse/subscribe/${roomId}`;
    const es = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      withCredentials: true,
    });
    eventSourceRef.current = es;

    es.addEventListener('open', () => {
      console.log('SSE 연결 성공');
    });

    es.addEventListener('message', (event) => {
      try {
        const parsed = JSON.parse(event.data);
        const eventName = (parsed.event ?? 'message') as string;
        const eventData = parsed.data ?? parsed;
        addEvent({ event: eventName, data: eventData });
        console.log(`[SSE] event: ${eventName}`, eventData);
      } catch (err) {
        console.error('[SSE] JSON 파싱 오류:', err);
      }
    });

    es.addEventListener('error', (err) => {
      console.error('[SSE] 연결 오류:', err);
      disconnect();
    });
  }, [roomId, jwtToken, addEvent, disconnect]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { connect, disconnect };
}
