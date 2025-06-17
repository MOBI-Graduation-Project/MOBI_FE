export const getButtonLog = (label: string) => {
  const now = new Date();

  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");

  let hours = now.getHours();
  const minutes = `${now.getMinutes()}`.padStart(2, "0");

  const isPM = hours >= 12;
  const period = isPM ? "오후" : "오전";

  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  const time = `${period} ${hours}:${minutes}`;

  return `KST ${year}년 ${month}월 ${date}일 ${time} 기준`;
};