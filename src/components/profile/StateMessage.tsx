import { useState } from "react";

import { patchMyStateMessage } from "@/apis/profile";

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
  const [currentMessage, setCurrentMessage] = useState(stateMessage ?? "");
  const [tempMessage, setTempMessage] = useState(stateMessage ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = () => {
    setTempMessage(currentMessage);
    setIsEditMode(true);
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await patchMyStateMessage(tempMessage);
      console.log("상태메시지 업데이트 성공:", res);

      setCurrentMessage(tempMessage);
      setIsEditMode(false);
    } catch (error) {
      console.error("상태메시지 업데이트 실패:", error);
    } finally {
      setIsSaving(false);
    }
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
          <>
            <span className="text-cap3-med text-brown">
              {tempMessage.length}/{MAX_MESSAGE_LENGTH}
            </span>
            <EnterButton
              className={`h-[30px] w-[30px] cursor-pointer ${
                isSaving ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={!isSaving ? handleSave : undefined}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StateMessage;
