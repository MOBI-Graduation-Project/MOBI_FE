"use client";

import { useEffect, useState } from "react";

import { getMyProfile } from "@/apis/profile";

import ProfileLayout from "@/components/profile/ProfileLayout";

import { ProfileData } from "@/types/user";

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data.result);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setError("프로필을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>프로필 데이터가 없습니다.</div>;

  return (
    <div>
      <ProfileLayout
        profileImg={profile.profileImgUrl}
        nickname={profile.nickname}
        stateMessage={profile.profileDescribe ?? ""}
        isMyProfile={true}
        avatarCode={profile.avatar}
      />
    </div>
  );
};
export default MyProfile;
