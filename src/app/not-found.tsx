"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/map");
  };
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <div>
        <div className="text-title text-brown text-stroke-white font-[geekble]">
          <div>404</div>
          <div>ERROR</div>
        </div>
        <div className="text-heading1 text brown text-stroke-white pt-[32.71px] pb-[107.04px] font-[geekble]">
          죄송합니다. 페이지 준비중입니다.
        </div>
        <button
          onClick={handleClick}
          className="bg-yellow text-heading1 text-brown text-stroke-white button-shadow h-[81px] w-[265px] cursor-pointer rounded-[20px] font-[geekble]"
        >
          이동지도로
        </button>
      </div>
    </div>
  );
};
export default NotFound;
