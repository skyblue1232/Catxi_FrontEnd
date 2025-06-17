import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChatIcon from '../../assets/icons/ChatIcon.svg?react';
import ChatButton from '../../assets/icons/ChatButton.svg?react';
import HomeIcon from '../../assets/icons/HomeIcon.svg?react';
import HomeButton from '../../assets/icons/HomeButton.svg?react';
import MyIcon from '../../assets/icons/MyIcon.svg?react';
import MyButton from '../../assets/icons/MyButton.svg?react';
import SimpleToast from '../SimpleToast';
import Storage from '../../utils/storage';
import { useMyChatRoomId } from '../../hooks/query/useChatRoomId';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentPath = location.pathname;
  const showTabRoutes = ['/home', '/chat', '/myPage'];
  const isTabVisible = showTabRoutes.some((path) => currentPath.startsWith(path));

  const isExact = (path: string) => currentPath === path;

  const token = Storage.getAccessToken();
  const { refetch, isFetching } = useMyChatRoomId({ enabled: false }); 

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleChatClick = async () => {
    if (!token) {
      setToastMsg('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    if (loading || isFetching) return;
    setLoading(true);

    try {
      const { data: roomId } = await refetch();
      if (roomId && roomId !== 0) {
        navigate(`/chat/${roomId}`);
      } else {
        setToastMsg('참여 중인 채팅방이 없습니다.');
      }
    } catch {
      setToastMsg('채팅방에 참여하고 있지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleMyPageClick = () => {
    navigate('/myPage');
  };

  if (!isTabVisible) {
    return toastMsg ? <SimpleToast message={toastMsg} onClose={() => setToastMsg(null)} /> : null;
  }

  return (
    <>
      <nav
        className="
          fixed 
          bottom-0 
          left-1/2 
          -translate-x-1/2
          w-full 
          max-w-[26.563rem] 
          h-[3.75rem] 
          px-[3.906rem] 
          bg-white 
          flex 
          justify-center 
          items-center 
          shadow-[0_-4px_5px_0_rgba(0,0,0,0.05)] 
          z-50
        "
      >
        <div className="cursor-pointer" onClick={handleHomeClick}>
          {isExact('/home') ? <HomeButton /> : <HomeIcon />}
        </div>

        <div className="mx-[5rem] cursor-pointer" onClick={handleChatClick}>
          {currentPath.startsWith('/chat') ? <ChatButton /> : <ChatIcon />}
        </div>

        <div className="cursor-pointer" onClick={handleMyPageClick}>
          {isExact('/myPage') ? <MyButton /> : <MyIcon />}
        </div>
      </nav>

      {toastMsg && <SimpleToast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </>
  );
};

export default TabBar;

