import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white">
      <div className="mb-6">
        <div className="w-12 h-12 border-4 border-[#7424F5] border-t-transparent rounded-full animate-spin" />
      </div>
      <h1 className="text-xl font-semibold mb-2">세션이 만료되었습니다.</h1>
      <p className="text-sm text-gray-600">3초 후 로그인 페이지로 이동합니다...</p>
    </div>
  );
};

export default SessionExpiredPage;
