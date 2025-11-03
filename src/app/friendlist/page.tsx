"use client";

import { useState, useMemo } from "react";

import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import FriendTag from "@/components/friendlist/FriendTag";
import SearchField from "@/components/friendlist/SearchField";
import type { Friend } from "@/types/friend";

import friendData from "@/mock/friendList.json";


const FriendList = () => {
  const initial = useMemo(() => friendData.friend[0], []);
  const [friendList, setFriendList] = useState<Friend[]>(initial.friendList || []);            
  const [friendRequestList, setFriendRequestList] = useState<Friend[]>(initial.friendRequestList || []); 

  // 수락: 요청 목록에서 제거 + 친구 목록에 추가
  const handleAccept = (friend: Friend) => {
    setFriendRequestList(prev => prev.filter(f => f.memberId !== friend.memberId));
    setFriendList(prev => (prev.some(f => f.memberId === friend.memberId) ? prev : [friend, ...prev]));
    console.log("친구가 추가되었습니다:", friend.nickname);
  };

  // 거절: 요청 목록에서 제거만
  const handleDecline = (friend: Friend) => {
    setFriendRequestList(prev => prev.filter(f => f.memberId !== friend.memberId));
    console.log("요청을 거절했습니다:", friend.nickname);
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
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구요청
          </div>
          <div className="flex flex-col">
            {friendRequestList.length === 0 ? (
              <div className="text-body text-white/80 px-10 py-4">대기 중인 요청이 없어요</div>
            ) : (
              friendRequestList.map(f => (
                <FriendTag
                  key={f.memberId}
                  friend={f}
                  showButtons
                  onAccept={handleAccept}   // 자식에게 수락 동작 함수 내려줌
                  onDecline={handleDecline} // 자식에게 거절 동작 함수 내려줌
                />
              ))
            )}
          </div>
        </section>

        {/* 친구목록 */}
        <section className="flex flex-col gap-5">
          <div className="text-body flex h-25 w-[216px] rounded-r-[30px] bg-white/60 px-[40px] py-[10px] font-[geekble]">
            친구목록
          </div>
          <div className="flex flex-col">
            {friendList.length === 0 ? (
              <div className="text-body text-white/80 px-10 py-4">친구가 아직 없어요</div>
            ) : (
              friendList.map(f => <FriendTag key={f.memberId} friend={f} />)
            )}
          </div>
        </section>
      </main>
      <BottomBar />
    </div>
  );
};
export default FriendList;
