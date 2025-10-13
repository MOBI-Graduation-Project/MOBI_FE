import FriendTag from "@/components/chatting/FriendTag";
import SearchField from "@/components/chatting/SearchField";
import Header from "@/components/common/header";

import friendData from "@/mock/friendList.json";

const FriendList = () => {
  const { friendList, friendRequestList } = friendData.friend[0];
  return (
    <div
      className="min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <main className="scrollbar-hide o mt-[129px] flex flex-1 flex-col gap-5">
        {/* 친구 검색 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구신청
          </div>
          <SearchField />
        </section>
        {/* 친구요청 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구요청
          </div>
          <div className="flex flex-col">
            {friendRequestList.map(f => (
              <FriendTag key={f.memberId} friend={f} showButtons />
            ))}
          </div>
        </section>

        {/* 친구목록 */}
        <section>
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구목록
          </div>
          <div className="flex flex-col">
            {friendList.map(f => (
              <FriendTag key={f.memberId} friend={f} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default FriendList;
