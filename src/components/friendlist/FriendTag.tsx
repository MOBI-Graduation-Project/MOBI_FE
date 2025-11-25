"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

import { User } from "@/types/user";

interface FriendTagProps {
  friend: User;
  showButtons?: boolean;

  onAccept?: (friend: FriendTagProps["friend"]) => void;
  onDecline?: (friend: FriendTagProps["friend"]) => void;
}

const FriendTag = ({
  friend,
  showButtons,
  onAccept,
  onDecline,
}: FriendTagProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${friend.memberId}`);
  };

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAccept?.(friend);
  };

  const handleDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDecline?.(friend);
  };

  return (
    <div
      className="bg-brown/80 relative flex h-[94px] w-full cursor-pointer flex-row gap-[45px] px-10 py-[19px]"
      onClick={handleClick}
    >
      {/* 프로필 */}
      <div className="flex items-center gap-5">
        {friend.profileUrl?.trim() ? (
          <Image
            src={friend.profileUrl}
            alt={friend.nickname}
            width={65}
            height={65}
            className="block flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="bg-brown-dark h-[65px] w-[65px] flex-shrink-0 rounded-full" />
        )}
        <div className="text-body text-stroke-white font-[geekble] whitespace-nowrap">
          {friend.nickname}
        </div>
      </div>
      {/* 상태메세지 */}
      <div className="bg-yellow-light text-lab2 flex w-full items-center rounded-[30px] px-[30px] text-[pretendard]">
        {friend.profileDescribe}
      </div>
      {/* 버튼 */}
      {showButtons && (
        <div className="absolute top-[25.5px] right-[52px] flex flex-row gap-[26px]">
          <button
            className="bg-yellow text-body text-brown text-stroke-white hover:bg-yellow-10t button-shadow-yellow h-[45px] w-[130px] cursor-pointer rounded-[20px] font-[geekble] hover:scale-105"
            onClick={handleAccept}
          >
            수락
          </button>
          <button
            className="text-body text-stroke-white hover:bg-gray-60 button-shadow-gray h-[45px] w-[130px] cursor-pointer rounded-[20px] bg-gray-50 font-[geekble] text-gray-50 hover:scale-105"
            onClick={handleDecline}
          >
            거절
          </button>
        </div>
      )}
    </div>
  );
};
export default FriendTag;
