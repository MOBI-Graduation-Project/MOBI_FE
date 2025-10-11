"use client";

import CloseButton from "@/assets/closeButton.svg";

import useGoBack from "@/hooks/useGoBack";

import StateMessage from "./StateMessage";

interface ProfileLayoutProps {
  profileImg: string | null;
  nickname: string;
  stateMessage: string;
  isMyProfile?: boolean;
}

const ProfileLayout = ({
  profileImg,
  nickname,
  stateMessage,
  isMyProfile = false,
}: ProfileLayoutProps) => {
  const goBack = useGoBack();
  return (
    <div>
      <CloseButton
        className="fixed top-[19px] right-[22px] cursor-pointer"
        onClick={goBack}
      />
      {/*Background Component영역*/}
      {/* 노란 영역 */}
      <div className="yellow-3d fixed bottom-0 flex h-[40%] w-full flex-col items-center pt-[86px]">
        <div className="border-brown absolute top-0 left-1/2 h-[173px] w-[173px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white">
          {profileImg ? (
            <img
              src={profileImg}
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="bg-brown-500 h-full w-full" />
          )}
        </div>
        <div className="text-body text-brown text-stroke-white pt-[19.62px] font-[geekble]">
          {nickname}
        </div>
        <div className="pt-[34.98px]">
          <StateMessage stateMessage={stateMessage} isMyProfile={isMyProfile} />
        </div>
      </div>
    </div>
  );
};
export default ProfileLayout;
