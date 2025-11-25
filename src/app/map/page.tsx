"use client";

import { useRouter } from "next/navigation";

import FortuneTellerIcon from "@/assets/map/fortuneTellerIcon.svg";
import MyPageIcon from "@/assets/map/mypageIcon.svg";
import SquareIcon from "@/assets/map/squareIcon.svg";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";

const Map = () => {
  const router = useRouter();
  const mypageClick = () => {
    router.push("/metaverse/myroom");
  };
  const squareClick = () => {
    router.push("/metaverse/square");
  };
  const fortuneTellerClick = () => {
    router.push("/fortuneteller");
  };
  return (
    <>
      <Header />
      <div className="flex h-full w-full flex-row items-center justify-evenly">
        {/*마이페이지*/}
        <button
          onClick={mypageClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-[82px] hover:scale-110"
        >
          <MyPageIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            마이페이지
          </div>
        </button>

        {/*광장*/}
        <button
          onClick={squareClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-[45.65px] hover:scale-110"
        >
          <SquareIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            광장
          </div>
        </button>

        {/*점집*/}
        <button
          onClick={fortuneTellerClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-[40.68px] hover:scale-110"
        >
          <FortuneTellerIcon />
          <div className="text-body color-brown text-stroke-white font-[geekble]">
            점집
          </div>
        </button>
      </div>
      <BottomBar />
    </>
  );
};
export default Map;
