import { useRef, useState } from "react";

import ProfileEdit from "@/assets/profile/profileEdit.svg";

interface ProfileImageCircleProps {
  profileImg?: string | null;
}

const ProfileImageCircle = ({ profileImg }: ProfileImageCircleProps) => {
  const [currentImg, setCurrentImg] = useState(profileImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // 항상 DOM에 있는 input 클릭
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative h-[173px] w-[173px]">
      {/* 이미지 영역만 overflow-hidden */}
      <div className="border-brown h-full w-full overflow-hidden rounded-full border-[3px]">
        {currentImg ? (
          <img
            src={currentImg}
            alt="profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-brown-500 h-full w-full" />
        )}
      </div>

      {/* ProfileEdit 버튼 */}
      <ProfileEdit
        className="absolute right-2 bottom-2 z-10 h-[40px] w-[40px] cursor-pointer"
        onClick={handleClick}
      />

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onUploadImage}
      />
    </div>
  );
};

export default ProfileImageCircle;
