import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext';
import LeaveRoomModal from '../../components/Modal/LeaveRoomModal';

export const useNavigationBlocker = (): void => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal } = useModal();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', prevPathRef.current); 

      openModal(
        <LeaveRoomModal
          onConfirm={() => {
            closeModal();
            window.removeEventListener('popstate', handlePopState);
            navigate('/home');
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
  }, [navigate, openModal, closeModal]);

  useEffect(() => {
    const nextPath = location.pathname;
    if (nextPath !== prevPathRef.current) {
      window.history.pushState(null, '', prevPathRef.current);

      openModal(
        <LeaveRoomModal
          onConfirm={() => {
            closeModal();
            navigate('/home');
          }}
          onCancel={() => {
            closeModal();
            window.history.pushState(null, '', prevPathRef.current);
          }}
        />
      );
    }
  }, [location.pathname, closeModal, navigate, openModal]);
};
