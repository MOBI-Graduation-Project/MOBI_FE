"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { createChatRoom } from "@/apis/chat";
import { sendFriendRequest } from "@/apis/friend";

import CloseButton from "@/assets/closeButton.svg";

import YellowButton from "@/components/common/YellowButton";

import useGoBack from "@/hooks/useGoBack";

import { ToastMessage } from "../common/ToastMessage";
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
  const router = useRouter();

  const [isRequesting, setIsRequesting] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleChatClick = async () => {
    if (!memberId) return;
    try {
      const roomId = await createChatRoom(memberId);
      setToastMessage("채팅방으로 이동중...");
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      setToastMessage("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  };

  const handleAddFriend = async () => {
    if (isRequesting || isRequestSent) return;

    try {
      setIsRequesting(true);
      const data = await sendFriendRequest(memberId);

      if (data.isSuccess) {
        setIsRequestSent(true);
      } else {
        setToastMessage(data.message || "친구 요청에 실패했어요.");
      }
    } catch (error) {
      console.error("친구 요청 실패:", error);
      setToastMessage("친구 요청 중 오류가 발생했어요.");
    } finally {
      setIsRequesting(false);
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  };

  return (
    <div>
      <CloseButton
        className="fixed top-[10px] right-[10px] z-10 h-[50px] w-[50px] cursor-pointer md:top-[19px] md:right-[22px] md:h-[70px] md:w-[70px]"
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
        <div className="text-body text-brown text-stroke-white font-[geekble] md:pt-[19.62px]">
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
            <ProfileButtons
              buttonNum={1}
              text="채팅하기"
              onClick={handleChatClick}
            />
          </div>
        )}
        {/*친구가 아닌 유저 프로필일 때 */}
        {!isMyProfile && !isFriend && (
          <div className="flex gap-[20px] md:gap-[174px]">
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
            <YellowButton text="채팅하기" onClick={handleChatClick} />
          </div>
        )}
        {toastMessage && (
          <div className="pt-2 md:pt-7">
            <ToastMessage message={toastMessage} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileLayout;
