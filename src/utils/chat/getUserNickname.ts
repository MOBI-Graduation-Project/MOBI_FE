export const getUserNickname = (
  userId: number,
  users: { memberId: number; nickname: string }[],
): string => {
  const user = users.find(u => u.memberId === userId);
  return user ? user.nickname : "주식 챗봇 모비";
};
