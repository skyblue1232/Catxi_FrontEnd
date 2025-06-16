import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ChatIcon from '../../assets/icons/ChatIcon.svg?react';
import ChatButton from '../../assets/icons/ChatButton.svg?react';
import HomeIcon from '../../assets/icons/HomeIcon.svg?react';
import HomeButton from '../../assets/icons/HomeButton.svg?react';
import MyIcon from '../../assets/icons/MyIcon.svg?react';
import MyButton from '../../assets/icons/MyButton.svg?react';
import SimpleToast from '../SimpleToast';
import { jwtDecode } from 'jwt-decode';
import Storage from '../../utils/storage';
import axiosInstance from '../../apis/axios';

interface JwtPayload {
  email: string;
  [key: string]: any;
}

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currentPath = location.pathname;
  const showTabRoutes = ['/home', '/chat', '/myPage'];
  const isTabVisible = showTabRoutes.some((path) => currentPath.startsWith(path));
  if (!isTabVisible) return null;

  const isExact = (path: string) => currentPath === path;

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleChatClick = async () => {
    if (loading) return;

    const token = Storage.getAccessToken();
    if (!token) {
      setToastMsg('로그인이 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      const decoded = jwtDecode<JwtPayload>(token);
      const email = decoded?.email;

      if (!email) {
        setToastMsg('사용자 정보를 불러올 수 없습니다.');
        return;
      }

      const res = await axiosInstance.get(`/chat/rooms/myid?email=${email}`);
      const roomId: number = res.data.data;

      if (roomId && roomId !== 0) {
        navigate(`/chat/${roomId}`);
      } else {
        setToastMsg('참여 중인 채팅방이 없습니다.');
      }
    } catch (err) {
      setToastMsg('채팅방 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleMyPageClick = () => {
    navigate('/myPage');
  };

  return (
    <>
      <nav className="fixed max-w-107.5 bottom-0 h-[3.75rem] px-[3.906rem] w-full bg-white flex justify-center items-center shadow-[0_-4px_5px_0_rgba(0,0,0,0.05)]">
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
