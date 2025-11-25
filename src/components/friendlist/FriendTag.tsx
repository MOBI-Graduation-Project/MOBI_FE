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
      className="bg-brown/80 relative flex h-[50px] w-full cursor-pointer flex-row gap-[45px] px-[10px] py-[10px] md:h-[94px] md:px-10 md:py-[19px]"
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
            className="block h-[37px] w-[37px] flex-shrink-0 rounded-full object-cover md:h-[65px] md:w-[65px]"
          />
        ) : (
          <div className="bg-brown-dark h-[65px] w-[65px] flex-shrink-0 rounded-full" />
        )}
        <div className="md:text-body text-lab1 text-stroke-white font-[geekble] whitespace-nowrap">
          {friend.nickname}
        </div>
      </div>
      {/* 상태메세지 */}
      <div
        className={`${showButtons ? "hidden md:flex" : "flex"} bg-yellow-light md:text-lab2 text-cap1 w-full items-center overflow-hidden rounded-[30px] px-[30px] whitespace-nowrap text-[pretendard]`}
      >
        {friend.profileDescribe}
      </div>
      {/* 버튼 */}
      {showButtons && (
        <>
          {/* 데스크탑 버튼 */}
          <div className="absolute hidden gap-[26px] md:top-[24px] md:right-[30px] md:flex">
            <button
              className="bg-yellow text-body text-brown text-stroke-white button-shadow-yellow h-[45px] w-[130px] rounded-[20px] font-[geekble]"
              onClick={handleAccept}
            >
              수락
            </button>
            <button
              className="text-body text-stroke-white button-shadow-gray h-[45px] w-[130px] rounded-[20px] bg-gray-50 font-[geekble]"
              onClick={handleDecline}
            >
              거절
            </button>
          </div>

          <div className="absolute top-[10px] right-4 flex gap-2 md:hidden">
            <button
              className="bg-yellow button-shadow-yellow text-cap1 text-brown rounded-xl px-4 py-2 font-[geekble]"
              onClick={handleAccept}
            >
              수락
            </button>
            <button
              className="text-cap1 text-brown text-gray-60 button-shadow-gray rounded-xl bg-gray-50 px-4 py-2 font-[geekble]"
              onClick={handleDecline}
            >
              거절
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default FriendTag;
