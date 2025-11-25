"use client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { useUserStore } from "@/stores/userStore";

import { apiClient } from "@/apis/apiClient";

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

  const { logout } = useUserStore();

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout", {});

      logout();
      const redirectUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      router.push(redirectUrl);
    } catch (err) {
      console.error("로그아웃 중 에러:", err);
    }
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
    <div className="fixed right-[5px] md:right-[30px]" ref={dropdownRef}>
      <div className="flex w-[150px] items-center gap-[10px] rounded-b-[30px] bg-white/66 px-[10px] py-[5px] md:w-[300px] md:px-[20px] md:py-[10px]">
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
          <div className="divide-brown from-yellow-10 via-yellow-30 to-yellow grid h-[80px] w-[110px] grid-rows-2 divide-y rounded-[10px] bg-gradient-to-b md:h-[113px] md:w-[185px]">
            <button
              className="orange-3d flex w-full flex-row items-center justify-items-start gap-[5px] rounded-t-[10px] pl-[20px] transition md:gap-[10px]"
              onClick={handleGoToMyProfile}
            >
              <LogoutIcon className="h-[25px] w-[25px] md:h-[31px] md:w-[31px]" />
              <div className="md:text-lab1 text-cap1 font-[geekble]">
                내 프로필
              </div>
            </button>
            <button
              className="orange-3d flex w-full flex-row items-center justify-items-start gap-[5px] rounded-b-[10px] pl-[20px] transition md:gap-[10px]"
              onClick={handleLogout}
            >
              <LogoutIcon className="h-[25px] w-[25px] md:h-[31px] md:w-[31px]" />
              <div className="md:text-lab1 text-cap1 font-[geekble]">
                로그아웃
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Topbar;
