"use client";

import { useMemo, useState } from "react";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import FriendTag from "@/components/friendlist/FriendTag";
import SearchField from "@/components/friendlist/SearchField";

import friendData from "@/mock/friendList.json";

import { User } from "@/types/user";

const FriendList = () => {
  const initial = useMemo(() => friendData.friend[0], []);
  const [friendList, setFriendList] = useState<User[]>(
    initial.friendList || [],
  );
  const [friendRequestList, setFriendRequestList] = useState<User[]>(
    initial.friendRequestList || [],
  );

  const handleAccept = (friend: User) => {
    setFriendRequestList(prev =>
      prev.filter(f => f.memberId !== friend.memberId),
    );
    setFriendList(prev =>
      prev.some(f => f.memberId === friend.memberId) ? prev : [friend, ...prev],
    );
  };

  const handleDecline = (friend: User) => {
    setFriendRequestList(prev =>
      prev.filter(f => f.memberId !== friend.memberId),
    );
  };
  return (
    <div
      className="scrollbar-hide min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <main className="mt-[129px] mb-[110px] flex flex-1 flex-col gap-5">
        {/* 친구 검색 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구신청
          </div>
          <SearchField />
        </section>

        {/* 친구요청 */}
        {friendRequestList.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
              친구요청
            </div>
            <div className="flex flex-col">
              {friendRequestList.map(f => (
                <FriendTag
                  key={f.memberId}
                  friend={f}
                  showButtons
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          </section>
        )}

        {/* 친구목록 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구목록
          </div>
          <div className="flex flex-col">
            {friendList.length > 0 &&
              friendList.map(f => <FriendTag key={f.memberId} friend={f} />)}
          </div>
        </section>
      </main>
      <BottomBar />
    </div>
  );
};
export default FriendList;
