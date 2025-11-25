"use client";

import { useEffect, useState } from "react";

import {
  acceptFriendRequest,
  getFriends,
  refuseFriendRequest,
} from "@/apis/friend";

import HeadingTitle from "@/components/common/HeadingTitle";
import { ToastMessage } from "@/components/common/ToastMessage";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import FriendTag from "@/components/friendlist/FriendTag";
import SearchField from "@/components/friendlist/SearchField";

import type { FriendsResult, User } from "@/types/user";

const FriendList = () => {
  const [friendList, setFriendList] = useState<User[]>([]);
  const [friendRequestList, setFriendRequestList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastmessage, setToastMessage] = useState<string | null>(null);

  // friends API 호출
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data: { result: FriendsResult } = await getFriends();

        const mappedFriends: User[] =
          data.result.friendList?.map(friend => ({
            memberId: friend.memberId,
            nickname: friend.nickname,
            profileUrl: friend.profileImgUrl,
            profileDescribe: friend.profileDescribe,
          })) ?? [];

        const mappedRequests: User[] =
          data.result.friendRequestList?.map(req => ({
            memberId: req.fromMemberId,
            nickname: req.fromMemberNickname,
            profileUrl: req.fromMemberProfileImgUrl,
            profileDescribe: req.fromMemberProfileDescribe,
          })) ?? [];

        setFriendList(mappedFriends);
        setFriendRequestList(mappedRequests);
      } catch (err) {
        console.error("친구 목록 조회 실패:", err);
        setError("친구 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-[91.27px]">
        <HeadingTitle texts={["친구 목록 불러오는 중..."]} />
      </div>
    );
  }

  // 에러 화면
  if (error) {
    return <div>{error}</div>;
  }

  // 친구 요청 수락
  const handleAccept = async (friend: User) => {
    try {
      const res = await acceptFriendRequest(friend.memberId); // fromMemberId = friend.memberId

      if (!res.isSuccess) {
        return;
      }

      // 수락 성공 시: 요청 리스트에서 제거 + 친구 목록에 추가
      setFriendRequestList(prev =>
        prev.filter(f => f.memberId !== friend.memberId),
      );
      setFriendList(prev =>
        prev.some(f => f.memberId === friend.memberId)
          ? prev
          : [friend, ...prev],
      );
    } catch (err) {
      console.error("친구 요청 수락 실패:", err);
      setToastMessage("친구 요청 수락 중 오류가 발생했어요.");
    } finally {
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  };

  // 친구 요청 거절
  const handleDecline = async (friend: User) => {
    try {
      const res = await refuseFriendRequest(friend.memberId);

      if (!res.isSuccess) {
        return;
      }
      setFriendRequestList(prev =>
        prev.filter(f => f.memberId !== friend.memberId),
      );
    } catch (err) {
      console.error("친구 요청 거절 실패:", err);
      setToastMessage("친구 요청 거절 중 오류가 발생했어요.");
    } finally {
      setTimeout(() => {
        setToastMessage(null);
      }, 1000);
    }
  };
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="flex flex-col gap-5 pt-[55px] pb-[72px] md:pt-[100px] md:pb-[90px]">
        {/* 친구 검색 */}
        <section className="flex flex-col gap-5">
          <div className="md:text-body text-brown text-lab1 flex w-[100px] rounded-r-[30px] bg-white/60 px-[3px] py-[10px] font-[geekble] md:w-[216px] md:px-[40px]">
            친구신청
          </div>
          <SearchField />
        </section>

        {/* 친구요청 */}
        {friendRequestList.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="md:text-body text-brown text-lab1 flex w-[100px] rounded-r-[30px] bg-white/60 px-[3px] py-[10px] font-[geekble] md:w-[216px] md:px-[40px]">
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
        {toastmessage && <ToastMessage message={toastmessage} />}
        {/* 친구목록 */}
        <section className="flex flex-col gap-5">
          <div className="md:text-body text-brown text-lab1 flex w-[100px] rounded-r-[30px] bg-white/60 px-[3px] py-[10px] font-[geekble] md:w-[216px] md:px-[40px]">
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
