"use client";

import { Suspense, useMemo } from "react";

import { useCharacterStore } from "@/stores/characterStore";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import CloseButton from "@/assets/closeButton.svg";

import useGoBack from "@/hooks/useGoBack";

import ProfileButtons from "./ProfileButtons";
import StateMessage from "./StateMessage";

interface ProfileLayoutProps {
  profileImg?: string | null;
  nickname: string;
  stateMessage?: string | null;
  isMyProfile?: boolean;
  isFriend?: boolean;
}

const AvatarPreview = () => {
  const { characterType } = useCharacterStore();
  const { scene } = useGLTF(
    characterType ? `/models/${characterType}.glb` : "/models/default.glb",
  );
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 6], fov: 45 }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, 0.6, 0]}
      />
      <Suspense fallback={null}>
        <Center>
          <primitive object={model} scale={0.7} />
        </Center>
      </Suspense>
    </Canvas>
  );
};

const ProfileLayout = ({
  profileImg,
  nickname,
  stateMessage = null,
  isMyProfile = false,
  isFriend = false,
}: ProfileLayoutProps) => {
  const goBack = useGoBack();
  return (
    <div>
      <CloseButton
        className="fixed top-[19px] right-[22px] cursor-pointer"
        onClick={goBack}
      />
      <div className="absolute inset-x-0 top-0 z-0 h-[60%]">
        <AvatarPreview />
      </div>

      {/* 노란 영역 */}
      <div className="bg-yellow-10 fixed bottom-0 flex h-[40%] w-full flex-col items-center pt-[86px]">
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

        <div
          className={`${isMyProfile ? "pt-[34.98px]" : "mb-[14.98px] pt-[14.98px]"}`}
        >
          <StateMessage stateMessage={stateMessage} isMyProfile={isMyProfile} />
        </div>

        {/*친구 프로필일 때 */}
        {!isMyProfile && isFriend && (
          <div>
            <ProfileButtons buttonNum={1} text="채팅하기" />
          </div>
        )}
        {/*친구가 아닌 유저 프로필일 때 */}
        {!isMyProfile && !isFriend && (
          <div>
            <ProfileButtons
              buttonNum={2}
              text={["친구 추가하기", "채팅하기"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileLayout;

useGLTF.preload("/models/default.glb");
