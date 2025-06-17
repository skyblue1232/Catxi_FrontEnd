export const getDepartText = (departAt: string) => {
  const now = new Date();
  const depart = new Date(departAt);

  const diffInHours = (depart.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24 && now.getDate() === depart.getDate()) return '오늘 출발';
  if (diffInHours >= 0 && diffInHours < 48 && depart.getDate() === now.getDate() + 1) return '내일 출발';

  return '';
};
