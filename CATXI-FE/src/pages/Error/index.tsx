import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-background text-center px-6">
      <h1 className="text-6xl font-bold text-primary-darkest mb-4">404</h1>
      <p className="text-lg text-secondary-medium mb-6">페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-6 py-2 bg-primary-dark text-white rounded-lg text-sm hover:bg-primary-darkest transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
