const BottomBar = () => {
  return (
    <div className="fixed right-0 bottom-0 left-0">
      <div className="grid grid-cols-4 divide-x-4 divide-brown-20t bg-brown-10t h-[99px] justify-around items-center rounded-t-[30px] buttombar-shadow">
        <button className="text-body font-[geekble] text-yellow text-stroke-black cursor-pointer">이동지도</button>
        <button className="text-body font-[geekble] text-yellow text-stroke-black cursor-pointer">채팅</button>
        <button className="text-body font-[geekble] text-yellow text-stroke-black cursor-pointer">주식</button>
        <button className="text-body font-[geekble] text-yellow text-stroke-black cursor-pointer">챗봇</button>
      </div>
    </div>
  );
};
export default BottomBar;
