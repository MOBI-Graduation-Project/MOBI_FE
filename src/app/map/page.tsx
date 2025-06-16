"use client";

import { useRouter } from "next/navigation";

import FortuneTellerIcon from "@/assets/map/fortuneTellerIcon.svg";
import MyPageIcon from "@/assets/map/mypageIcon.svg";
import SquareIcon from "@/assets/map/squareIcon.svg";
import BottomBar from "@/components/bottomBar";

const Map = () => {
  const router = useRouter();

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pb-[99px] pt-[42.5px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <div className="flex flex-row items-center justify-evenly w-full p-[203.15px]">
        {/*마이페이지*/}
        <button className="flex cursor-pointer flex-col items-center justify-center gap-[82px]">
          <MyPageIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            마이페이지
          </div>
        </button>
        
        {/*광장*/}
        <button className="flex cursor-pointer flex-col items-center justify-center gap-[45.65px]">
          <SquareIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            광장
          </div>
        </button>

        {/*점집*/}
        <button className="flex cursor-pointer flex-col items-center justify-center gap-[40.68px]">
          <FortuneTellerIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            점집
          </div>
        </button>
      </div>
      <BottomBar/>
    </div>
  );
};
export default Map;
