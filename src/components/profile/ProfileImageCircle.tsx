import Image from "next/image";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

import { patchMyProfileImage } from "@/apis/profile";

import ProfileEdit from "@/assets/profile/profileEdit.svg";

import { ToastMessage } from "@/components/common/ToastMessage";

interface ProfileImageCircleProps {
  profileImg?: string | null;
  isEditable?: boolean;
}

const ProfileImageCircle = ({
  profileImg,
  isEditable = true,
}: ProfileImageCircleProps) => {
  const [currentImg, setCurrentImg] = useState(profileImg);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 항상 DOM에 있는 input 클릭
  };

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImg(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      const response = await patchMyProfileImage(file);

      if (response.result?.profileImgUrl) {
        setCurrentImg(response.result.profileImgUrl);
      }
      setToastMsg("프로필 이미지가 변경되었습니다");
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      setToastMsg("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setToastMsg(""), 1000);
    }
  };

  return (
    <div>
      <div className="relative h-[100px] w-[100px] md:h-[173px] md:w-[173px]">
        {/* 이미지 영역만 overflow-hidden */}
        <div className="border-brown relative h-full w-full overflow-hidden rounded-full border-[3px]">
          {currentImg ? (
            <Image
              src={currentImg}
              alt="profile"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="bg-brown-500 h-full w-full" />
          )}
        </div>

        {isEditable && (
          <ProfileEdit
            className="absolute right-1 bottom-1 z-10 h-[30px] w-[30px] cursor-pointer md:right-2 md:bottom-2 md:h-[40px] md:w-[40px]"
            onClick={handleClick}
          />
        )}

        {/* 숨겨진 파일 input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onUploadImage}
        />
      </div>
      {createPortal(
        <div className="fixed bottom-[10px] left-1/2 -translate-x-1/2">
          {isUploading && <ToastMessage message="프로필 이미지 업로드 중..." />}
          {toastMsg && <ToastMessage message={toastMsg} />}
        </div>,
        document.body,
      )}
    </div>
  );
};

export default ProfileImageCircle;
