"use client";

import { useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0">
      <div className="divide-brown-20t bg-brown-10t buttombar-shadow grid h-[70px] grid-cols-4 items-center justify-around divide-x-4 overflow-hidden rounded-t-[30px] md:h-[85px]">
        <button
          onClick={() => handleClick("/map")}
          className="md:text-body text-lab1 text-yellow text-stroke-black hover:bg-brown hover:buttombar-shadow h-full cursor-pointer font-[geekble]"
        >
          이동지도
        </button>
        <button
          className="md:text-body text-lab1 text-yellow text-stroke-black hover:bg-brown hover:buttombar-shadow h-full cursor-pointer font-[geekble]"
          onClick={() => handleClick("/chat")}
        >
          채팅
        </button>
        <button
          className="md:text-body text-lab1 text-yellow text-stroke-black hover:bg-brown hover:buttombar-shadow h-full cursor-pointer font-[geekble]"
          onClick={() => handleClick("/investment")}
        >
          주식
        </button>
        <button
          onClick={() => handleClick("/chatbot")}
          className="md:text-body text-lab1 text-yellow text-stroke-black hover:bg-brown hover:buttombar-shadow h-full cursor-pointer font-[geekble]"
        >
          챗봇
        </button>
      </div>
    </div>
  );
};
export default BottomBar;
