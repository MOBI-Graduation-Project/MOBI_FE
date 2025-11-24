"use client";

import { notFound } from "next/navigation";

import { useEffect, useState } from "react";

import { getMyProfile } from "@/apis/profile";

import HeadingTitle from "@/components/common/HeadingTitle";
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

  if (isLoading) {
    return (
      <div
        className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
      >
        <HeadingTitle texts={["프로필 불러오는 중..."]} />
      </div>
    );
  }

  if (error || !profile) {
    notFound();
  }

  return (
    <div>
      <ProfileLayout
        memberId={profile.memberId}
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
