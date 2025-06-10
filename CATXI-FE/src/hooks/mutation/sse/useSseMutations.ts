import { useMutation } from '@tanstack/react-query';
import { sseApi } from '../../../apis/sse/sse';

export function useSseMutations(roomId: string) {
  const disconnect = useMutation({
    mutationFn: () => sseApi.disconnect(roomId),
    onSuccess: () => {
      console.log('SSE 연결 해제 성공');
    },
    onError: (err) => {
      console.error('SSE 연결 해제 실패', err);
    },
  });

  const rejectReady = useMutation({
    mutationFn: () => sseApi.rejectReady(roomId),
    onSuccess: () => {
      console.log('Ready 거절 성공');
    },
    onError: (err) => {
      console.error('Ready 거절 실패', err);
    },
  });

  const acceptReady = useMutation({
    mutationFn: () => sseApi.acceptReady(roomId),
    onSuccess: () => {
      console.log('Ready 승인 성공');
    },
    onError: (err) => {
      console.error('Ready 승인 실패', err);
    },
  });

  const requestReady = useMutation({
    mutationFn: () => sseApi.requestReady(roomId),
    onSuccess: () => {
      console.log('Ready 요청 성공');
    },
    onError: (err) => {
      console.error('Ready 요청 실패', err);
    },
  });

  return {
    disconnect,
    rejectReady,
    acceptReady,
    requestReady,
  };
}
