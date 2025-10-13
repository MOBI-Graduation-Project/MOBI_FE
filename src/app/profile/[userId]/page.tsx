"use client";

import { useParams } from "next/navigation";

import ProfileLayout from "@/components/profile/ProfileLayout";

import { getUserData } from "@/utils/profile/getUserData";

// 상대방 프로필 조회
const UserProfile = () => {
  const { userId } = useParams();
  const { user, isFriend } = getUserData(Number(userId));

  if (!user) {
    return <div>유저를 찾을 수 없습니다.</div>;
  }

  return (
    <ProfileLayout
      profileImg={user.profileUrl}
      nickname={user.nickname}
      stateMessage={user.profileDescribe}
      isMyProfile={false}
      isFriend={isFriend}
    />
  );
};

export default UserProfile;
