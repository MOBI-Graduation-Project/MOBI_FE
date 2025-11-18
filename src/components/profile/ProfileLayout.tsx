"use client";

import dynamic from "next/dynamic";

import { useState } from "react";

import { sendFriendRequest } from "@/apis/friend";

import CloseButton from "@/assets/closeButton.svg";

import YellowButton from "@/components/common/YellowButton";

import useGoBack from "@/hooks/useGoBack";

import ProfileButtons from "./ProfileButtons";
import ProfileImageCircle from "./ProfileImageCircle";
import StateMessage from "./StateMessage";

interface ProfileLayoutProps {
  memberId: number;
  profileImg?: string | null;
  nickname: string;
  stateMessage?: string | null;
  isMyProfile?: boolean;
  isFriend?: boolean;
  avatarCode?: string | null;
}
const AvatarPreview = dynamic(
  () => import("@/components/profile/AvartarPreview"),
  {
    ssr: false,
  },
);
const ProfileLayout = ({
  memberId,
  profileImg,
  nickname,
  stateMessage = null,
  isMyProfile = false,
  isFriend = false,
  avatarCode = null,
}: ProfileLayoutProps) => {
  const goBack = useGoBack();

  const [isRequesting, setIsRequesting] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleAddFriend = async () => {
    if (isRequesting || isRequestSent) return;

    console.log("친구 추가 요청 target memberId:", memberId);

    try {
      setIsRequesting(true);
      const data = await sendFriendRequest(memberId);

      if (data.isSuccess) {
        setIsRequestSent(true);
      } else {
        alert(data.message || "친구 요청에 실패했어요.");
      }
    } catch (error) {
      console.error("친구 요청 실패:", error);
      alert("친구 요청 중 오류가 발생했어요.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div>
      <CloseButton
        className="fixed top-[19px] right-[22px] z-10 cursor-pointer"
        onClick={goBack}
      />
      <div className="absolute inset-x-0 top-0 h-[60%]">
        <AvatarPreview avatarCode={avatarCode ?? undefined} />
      </div>

      {/* 노란 영역 */}
      <div className="bg-yellow-10 fixed bottom-0 flex h-[40%] w-full flex-col items-center pt-[86px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ProfileImageCircle
            profileImg={profileImg}
            isEditable={isMyProfile}
          />
        </div>
        <div className="text-body text-brown text-stroke-white pt-[19.62px] font-[geekble]">
          {nickname}
        </div>

        <div
          className={`${isMyProfile ? "pt-[34.98px]" : "mb-[5px] pt-[14.98px]"}`}
        >
          <StateMessage stateMessage={stateMessage} isMyProfile={isMyProfile} />
        </div>

        {/*친구 프로필일 때 */}
        {!isMyProfile && isFriend && (
          <div>
            <ProfileButtons buttonNum={1} text="채팅하기" />
          </div>
        )}
        {/*친구가 아닌 유저 프로필일 때 */}
        {!isMyProfile && !isFriend && (
          <div className="flex gap-[174px]">
            {/* 친구 추가하기 버튼 */}
            <div
              onClick={
                isRequesting || isRequestSent ? undefined : handleAddFriend
              }
              className={`transition-all ${
                isRequestSent || isRequesting
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
            >
              <YellowButton
                text={
                  isRequestSent
                    ? "요청 보냄"
                    : isRequesting
                      ? "요청 중..."
                      : "친구 추가하기"
                }
              />
            </div>

            {/* 채팅하기 버튼 */}
            <YellowButton text="채팅하기" />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileLayout;
