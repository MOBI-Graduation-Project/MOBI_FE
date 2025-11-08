import friendData from "@/mock/friendList.json";

import { User } from "@/types/user";

export const getUserData = (
  userId: number,
): { user: User | null; isFriend: boolean } => {
  const { friendList, friendRequestList } = friendData.friend[0];

  const foundFriend = friendList.find(u => u.memberId === userId);
  if (foundFriend) return { user: foundFriend, isFriend: true };

  const foundRequest = friendRequestList.find(u => u.memberId === userId);
  if (foundRequest) return { user: foundRequest, isFriend: false };

  return { user: null, isFriend: false };
};
