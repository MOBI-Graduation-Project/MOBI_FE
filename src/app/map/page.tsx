"use client";

import { useRouter } from "next/navigation";

import FortuneTellerIcon from "@/assets/map/fortuneTellerIcon.svg";
import MyPageIcon from "@/assets/map/mypageIcon.svg";
import SquareIcon from "@/assets/map/squareIcon.svg";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/header";

const Map = () => {
  const router = useRouter();
  const mypageClick = () => {
    router.push("/mypage");
  };
  const squareClick = () => {
    router.push("/square");
  };
  const fortuneTellerClick = () => {
    router.push("/fortuneteller");
  };
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />
      <div className="flex w-full flex-row items-center justify-evenly p-[203.15px]">
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
    </div>
  );
};
export default Map;
