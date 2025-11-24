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
    <div className="relative" ref={dropdownRef}>
      <div className="grid h-[100px] w-[300px] grid-cols-3 items-center justify-items-center overflow-visible rounded-b-[30px] bg-white/66">
        <button className="cursor-pointer hover:scale-105">
          <AlarmIcon className="h-[80px] w-[80px]" />
        </button>
        <button
          onClick={friendListClick}
          className="cursor-pointer hover:scale-105"
        >
          <FriendListIcon className="h-[80px] w-[80px]" />
        </button>
        <button
          onClick={profileClick}
          className="cursor-pointer hover:scale-105"
        >
          <ProfileIcon className="h-[80px] w-[80px]" />
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
            <button
              className="orange-3d flex w-full flex-row items-center justify-items-start gap-[10px] rounded-b-[10px] pl-[20px] transition"
              onClick={handleLogout}
            >
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
