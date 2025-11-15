export interface User {
  memberId: number;
  nickname: string;
  profileUrl?: string | null;
  profileDescribe?: string | null;
}

export interface ProfileData {
  memberId: number;
  email: string;
  nickname: string;
  profileImgUrl: string;
  avatar: string;
  profileDescribe: string | null;
  relationStatus: string;
}

export interface SearchUser {
  memberId: number;
  email: string;
  nickname: string;
  profileImg: string;
  loginType: string;
  relationStatus: string;
}

export interface FriendListItem {
  memberId: number;
  nickname: string;
  avatar: string;
  profileImgUrl: string;
  profileDescribe: string | null;
}

export interface FriendRequestItem {
  fromMemberId: number;
  fromMemberNickname: string;
  fromMemberProfileImgUrl: string;
  fromMemberProfileDescribe: string | null;
}

export interface FriendsResult {
  friendList: FriendListItem[];
  friendRequestList: FriendRequestItem[];
}

export interface SendFriendRequestResult {
  friendId: number;
  fromUserNickname: string;
  toUserNickname: string;
  status: "PENDING" | "ACCEPTED" 
}

export interface SendFriendRequestResponse {
  isSuccess: boolean;
  code: string;
  message: string; 
  result: SendFriendRequestResult;
}