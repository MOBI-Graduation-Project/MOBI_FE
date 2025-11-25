"use client";

import { useRouter } from "next/navigation";

import LayoutClient from "./layoutClient";

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/map");
  };
  return (
    <LayoutClient>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-[60px]">
        <div className="text-title text-brown text-stroke-white font-[geekble]">
          <div>404</div>
          <div>ERROR</div>
        </div>
        <button
          onClick={handleClick}
          className="bg-yellow text-heading1 text-brown text-stroke-white button-shadow-yellow hover:bg-yellow-10t h-[81px] w-[265px] cursor-pointer rounded-[20px] font-[geekble]"
        >
          이동지도로
        </button>
      </div>
    </LayoutClient>
  );
};
export default NotFound;
