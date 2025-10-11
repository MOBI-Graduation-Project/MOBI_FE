import { useState } from "react";

import ProfileEdit from "@/assets/profile/profileEdit.svg";

interface StateMessageProps {
  isMyProfile: boolean;
  stateMessage: string;
}

const StateMessage = ({
  isMyProfile = false,
  stateMessage,
}: StateMessageProps) => {
  const [, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <div className="flex h-[94px] w-full items-center justify-center px-[30px] py-[10px]">
      <div className="flex items-center gap-[10px]">
        <span className="text-cap1-med text-brown text-center font-[geekble]">
          {stateMessage}
        </span>
        {isMyProfile && (
          <ProfileEdit className="cursor-pointer" onClick={handleEditClick} />
        )}
      </div>
    </div>
  );
};

export default StateMessage;
