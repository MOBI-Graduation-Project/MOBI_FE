"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getUserProfile } from "@/apis/profile";

import ProfileLayout from "@/components/profile/ProfileLayout";

import type { ProfileData } from "@/types/user";  


// 상대방 프로필 조회
const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null); 
  const [isLoading, setIsLoading] = useState(true);                 
  const [error, setError] = useState<string | null>(null);          

  const memberId = Number(userId);                                  

  //relationStatus -> isFriend 판정
  const isFriend = profile?.relationStatus === "FRIEND";            

  // 실제 API 호출
  useEffect(() => {
    if (!memberId || Number.isNaN(memberId)) {
      setError("잘못된 사용자 ID입니다.");
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await getUserProfile(memberId); // GET /members/profile/{id}
        setProfile(res.result);
      } catch (e) {
        console.error("상대방 프로필 조회 실패:", e);
        setError("상대방 프로필을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [memberId]);

  // 로딩/에러 분기
  if (isLoading) return <div>로딩 중...</div>;                     
  if (error) return <div>{error}</div>;                             
  if (!profile) return <div>유저를 찾을 수 없습니다.</div>;         

  return (
    <ProfileLayout
      profileImg={profile.profileImgUrl}                            
      nickname={profile.nickname}
      stateMessage={profile.profileDescribe ?? ""}
      isMyProfile={false}
      isFriend={isFriend}                                          
      avatarCode={profile.avatar} 
    />
  );
};

export default UserProfile;
