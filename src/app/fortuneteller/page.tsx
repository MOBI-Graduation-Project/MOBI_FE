"use client";

import { useRouter } from "next/navigation";

import BottomBar from "@/components/bottomBar";
import Header from "@/components/header";

const FortuneTeller = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />
      <div className="flex flex-row items-center justify-center gap-[62px]">
        <button
          onClick={() => handleClick("/fortune/name")}
          className="bg-yellow-90 hover:bg-yellow text-title2 text-brown text-stroke-white button-shadow hover:button-shadow h-[94px] w-[532px] cursor-pointer rounded-[40px] font-[geekble]"
        >
          이름점 보기
        </button>
        <button
          onClick={() => handleClick("/fortune/compatibility")}
          className="bg-yellow-90 hover:bg-yellow text-title2 text-brown text-stroke-white button-shadow hover:button-shadow h-[94px] w-[532px] cursor-pointer rounded-[40px] font-[geekble]"
        >
          궁합 보기
        </button>
      </div>
      <BottomBar />
    </div>
  );
};
export default FortuneTeller;
