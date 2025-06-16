export const getDepartText = (departAt: string) => {
  const KST_OFFSET = 9 * 60 * 60 * 1000;
  const today = new Date();
  const todayKST = new Date(today.getTime() + KST_OFFSET);
  const depart = new Date(departAt);
  const departKST = new Date(depart.getTime() + KST_OFFSET);
  const todayDate = new Date(todayKST.getFullYear(), todayKST.getMonth(), todayKST.getDate());
  const departDateOnly = new Date(departKST.getFullYear(), departKST.getMonth(), departKST.getDate());
  const diffInDays = Math.floor(
    (departDateOnly.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return '오늘 출발';
  if (diffInDays === 1) return '내일 출발';

};