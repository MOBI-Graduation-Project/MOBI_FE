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
}
