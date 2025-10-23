import { useState } from "react";

import EnterButton from "@/assets/profile/enter.svg";
import ProfileEdit from "@/assets/profile/profileEdit.svg";

interface StateMessageProps {
  isMyProfile: boolean;
  stateMessage: string | null;
}

const MAX_MESSAGE_LENGTH = 50;

const StateMessage = ({
  isMyProfile = false,
  stateMessage,
}: StateMessageProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(stateMessage);
  const [tempMessage, setTempMessage] = useState(stateMessage);

  const handleEditClick = () => {
    setTempMessage(currentMessage);
    setIsEditMode(true);
  };

  const handleSave = () => {
    setCurrentMessage(tempMessage);
    setIsEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="mx-auto flex w-[800px] items-center justify-center px-[30px] py-[10px]">
      <div className="flex items-center gap-[10px] rounded-[20px] bg-white px-[20px] py-[5px]">
        {isEditMode ? (
          <input
            type="text"
            value={tempMessage || ""}
            onChange={e => setTempMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="text-cap1-med text-brown w-[800px] bg-transparent text-center font-[geekble] focus:outline-none"
            maxLength={MAX_MESSAGE_LENGTH}
          />
        ) : (
          <span className="text-cap1-med text-brown w-[800px] text-center font-[geekble]">
            {currentMessage}
          </span>
        )}
        {isMyProfile && !isEditMode && (
          <ProfileEdit
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={handleEditClick}
          />
        )}
        {isEditMode && (
          <span className="text-cap3-med text-brown">
            {tempMessage ? tempMessage.length : 0}/{MAX_MESSAGE_LENGTH}
          </span>
        )}
        {isEditMode && (
          <EnterButton
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default StateMessage;
