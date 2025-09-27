const FriendTag = () => {
  return (
    <div className="bg-brown/80 relative flex h-[94px] w-full flex-row gap-[45px] px-10 py-[19px]">
      {/* 프로필 */}
      <div className="flex items-center gap-5">
        <div className="bg-brown-dark h-[70px] w-[70px] rounded-full"></div>
        <div className="text-body text-stroke-white font-[geekble] whitespace-nowrap">
          신수진
        </div>
      </div>
      {/* 상태메세지 */}
      <div className="bg-yellow-light w-full rounded-[30px]"></div>
      {/* 버튼 */}
      <div className="absolute top-[25.5px] right-[52px] flex flex-row gap-[26px]">
        <button className="bg-yellow text-body text-brown text-stroke-white h-[45px] w-[130px] rounded-[20px] font-[geekble]">
          수락
        </button>
        <button className="text-body text-stroke-white h-[45px] w-[130px] rounded-[20px] bg-gray-50 font-[geekble] text-gray-50">
          거절
        </button>
      </div>
    </div>
  );
};
export default FriendTag;
