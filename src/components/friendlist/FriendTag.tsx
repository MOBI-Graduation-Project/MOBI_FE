interface FriendTagProps {
  friend: {
    memeberId: number;
    nickname: string;
    profileUrl: string;
    profileDescribe: string;
  };
  showButtons?: boolean; // 요청일 때만 수락/거절 버튼 보이도록
}

const FriendTag = ({ friend, showButtons }: FriendTagProps) => {
  return (
    <div className="bg-brown/80 relative flex h-[94px] w-full flex-row gap-[45px] px-10 py-[19px]">
      {/* 프로필 */}
      <div className="flex items-center gap-5">
        {friend.profileUrl?.trim() ? (
          <img
            src={friend.profileUrl}
            alt={friend.nickname}
            className="block h-[70px] w-[70px] flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="bg-brown-dark h-[70px] w-[70px] flex-shrink-0 rounded-full" />
        )}
        <div className="text-body text-stroke-white font-[geekble] whitespace-nowrap">
          {friend.nickname}
        </div>
      </div>
      {/* 상태메세지 */}
      <div className="bg-yellow-light w-full rounded-[30px]">
        {friend.profileDescribe}
      </div>
      {/* 버튼 */}
      {showButtons && (
        <div className="absolute top-[25.5px] right-[52px] flex flex-row gap-[26px]">
          <button className="bg-yellow text-body text-brown text-stroke-white h-[45px] w-[130px] rounded-[20px] font-[geekble]">
            수락
          </button>
          <button className="text-body text-stroke-white h-[45px] w-[130px] rounded-[20px] bg-gray-50 font-[geekble] text-gray-50">
            거절
          </button>
        </div>
      )}
    </div>
  );
};
export default FriendTag;
