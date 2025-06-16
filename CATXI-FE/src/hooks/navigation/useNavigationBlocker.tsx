import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import LeaveRoomModal from '../../components/Modal/LeaveRoomModal';
import { useLeaveChatRoom } from '../mutation/chat/useChatDelete';

export const useNavigationBlocker = (): void => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal } = useModal();
  const { roomId } = useParams();
  const prevPathRef = useRef(location.pathname);
  const { mutate: leaveRoom } = useLeaveChatRoom();

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', prevPathRef.current); 

      openModal(
        <LeaveRoomModal
          onConfirm={() => {
            if (!roomId) return;

            leaveRoom(Number(roomId), {
              onSuccess: () => {
                closeModal();
                window.removeEventListener('popstate', handlePopState);
                navigate('/home');
              },
              onError: () => {
                closeModal();
              },
            });
          }}
          onCancel={() => {
            closeModal();
            window.history.pushState(null, '', prevPathRef.current);
          }}
        />
      );
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, openModal, closeModal, leaveRoom, roomId]);

  useEffect(() => {
    const nextPath = location.pathname;
    if (nextPath !== prevPathRef.current) {
      window.history.pushState(null, '', prevPathRef.current);

      openModal(
        <LeaveRoomModal
          onConfirm={() => {
            if (!roomId) return;

            leaveRoom(Number(roomId), {
              onSuccess: () => {
                closeModal();
                navigate('/home');
              },
              onError: () => {
                closeModal();
              },
            });
          }}
          onCancel={() => {
            closeModal();
            window.history.pushState(null, '', prevPathRef.current);
          }}
        />
      );
    }
  }, [location.pathname, closeModal, navigate, openModal, leaveRoom, roomId]);
};
