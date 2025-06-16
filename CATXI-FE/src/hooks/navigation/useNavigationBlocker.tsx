import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useNavigationBlocker = (): void => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId: currentRoomId } = useParams();

  const prevRoomIdRef = useRef<string | undefined>(currentRoomId);

  useEffect(() => {
    const prevRoomId = prevRoomIdRef.current;
    const nextRoomId = currentRoomId;

    const isFromChat = prevRoomId && location.pathname.startsWith('/chat/');
    const isToChat = nextRoomId && location.pathname.startsWith('/chat/');
    const isDifferentRoom = prevRoomId !== nextRoomId;

    if (!isFromChat || !isToChat || !isDifferentRoom) {
      prevRoomIdRef.current = nextRoomId;
      return;
    }

    navigate(`/chat/${prevRoomId}`, { replace: true });

  }, [location.pathname, currentRoomId, navigate]);
};
