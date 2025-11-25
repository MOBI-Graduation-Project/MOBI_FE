"use client";

import { useRouter } from "next/navigation";

import Topbar from "./HeaderButtons";

const Header = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 z-[100] w-full">
      <div className="flex items-center justify-between px-[20px] md:px-[43.39px]">
        <button
          onClick={() => router.push("/map")}
          className="md:text-title2 text-heading1 text-body text-yellow text-stroke-brown-m cursor-pointer font-[geekble]"
        >
          모비
        </button>
        <Topbar />
      </div>
    </div>
  );
};
export default Header;
