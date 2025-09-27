import Header from "@/components/common/header";
import FriendTag from "@/components/friendlist/FriendTag";

import friendData from "@/mock/friendList.json";

const FriendList = () => {
  const { friendList, friendRequestList } = friendData.friend[0];
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />

      <main className="scrollbar-hide mt-[129px] flex flex-1 flex-col gap-5 overflow-y-auto">
        {/* 친구요청 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구요청
          </div>
          <div className="flex flex-col">
            {friendRequestList.map(f => (
              <FriendTag key={f.memeberId} friend={f} showButtons />
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
              <FriendTag key={f.memeberId} friend={f} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default FriendList;
