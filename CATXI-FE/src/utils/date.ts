export const getDepartText = (departAt: string) => {
  const today = new Date();
  const departDate = new Date(departAt);

  const todayKST = new Date(today.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
  const departKST = new Date(departDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));

  const todayDate = new Date(todayKST.getFullYear(), todayKST.getMonth(), todayKST.getDate());
  const departDateOnly = new Date(departKST.getFullYear(), departKST.getMonth(), departKST.getDate());

  const diffInDays = (departDateOnly.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return '오늘 출발';
  if (diffInDays === 1) return '내일 출발';
  return '출발 예정';
};
