"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import AlarmIcon from "@/assets/header/alarmIcon.svg";
import FriendListIcon from "@/assets/header/friendListIcon.svg";
import LogoutIcon from "@/assets/header/logoutIcon.svg";
import ProfileIcon from "@/assets/header/profileIcon.svg";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const friendListClick = () => {
    router.push("/friendlist");
  };
  const profileClick = () => setIsOpen(prev => !prev);
  const handleGoToMyProfile = () => {
    router.push("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="grid h-[127px] w-[357px] grid-cols-3 items-center justify-items-center overflow-visible rounded-b-[30px] bg-white/66">
        <button className="cursor-pointer hover:scale-105">
          <AlarmIcon />
        </button>
        <button
          onClick={friendListClick}
          className="cursor-pointer hover:scale-105"
        >
          <FriendListIcon />
        </button>
        <button
          onClick={profileClick}
          className="cursor-pointer hover:scale-105"
        >
          <ProfileIcon />
        </button>
      </div>

      {isOpen && (
        <div className="div absolute right-0 mt-2">
          <div className="divide-brown from-yellow-10 via-yellow-30 to-yellow grid h-[113px] w-[185px] grid-rows-2 divide-y rounded-[10px] bg-gradient-to-b">
            <button
              className="orange-3d flex w-full flex-row items-center justify-items-start gap-[10px] rounded-t-[10px] pl-[20px] transition"
              onClick={handleGoToMyProfile}
            >
              <LogoutIcon />
              <div className="text-lab1 font-[geekble]">내 프로필</div>
            </button>
            <button className="orange-3d flex w-full flex-row items-center justify-items-start gap-[10px] rounded-b-[10px] pl-[20px] transition">
              <LogoutIcon />
              <div className="text-lab1 font-[geekble]">로그아웃</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Topbar;
