const HomePage = () => {
  return (
    <div className="px-6 py-10 space-y-4">
      <h1 className="font-regular text-4xl">홈페이지 헤더 (4xl)</h1>
      <h2 className="font-bold text-3xl">섹션 타이틀 (3xl)</h2>
      <h3 className="text-2xl font-semibold">작은 제목 (2xl)</h3>
      <p className="text-xl font-bold">본문 내용 (xl) - Pretendard 폰트가 적용됩니다.</p>
      <p className="text-lg font-regular">일반 텍스트 (lg) - 약간 작게</p>
      <p className="text-base font-medium">기본 본문 (base)</p>
      <p className="text-sm font-semibold">보조 설명 텍스트 (sm)</p>
      <p className="text-xs font-regular">아주 작은 텍스트 (xs)</p>
    </div>
  );
};

export default HomePage;
