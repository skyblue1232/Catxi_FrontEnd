const FloatingButton = () => {
  return (
    <button
      className="fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg text-2xl flex items-center justify-center"
      onClick={() => alert('추가 기능 준비중')}
    >
      +
    </button>
  );
};

export default FloatingButton;
