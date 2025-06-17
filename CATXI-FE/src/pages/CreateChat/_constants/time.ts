export const toKSTISOString = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}.000`;
};
export const parseTimeToISOString = (
  timeText: string,
  day: string | null
): string => {
  const today = new Date();
  const date = new Date(today);
  const isTomorrow = day === "tomorrow";
  if (isTomorrow) {
    date.setDate(date.getDate() + 1);
  }
  const timeMatch = timeText.match(
    /^(오전|오후)?\s*(\d{1,2})시\s*(\d{1,2})분$/
  );

  if (!timeMatch) {
    throw new Error(`시간 형식이 올바르지 않습니다: ${timeText}`);
  }

  const period = timeMatch[1] || "오전";
  let hour = parseInt(timeMatch[2], 10);
  const minute = parseInt(timeMatch[3], 10);

  if (period === "오후" && hour !== 12) hour += 12;
  if (period === "오전" && hour === 12) hour = 0;

  date.setHours(hour, minute, 0, 0);
  return toKSTISOString(date);
};
