import { useState } from "react";

import { patchMyStateMessage } from "@/apis/profile";

import EnterButton from "@/assets/profile/enter.svg";
import ProfileEdit from "@/assets/profile/profileEdit.svg";

import { ToastMessage } from "@/components/common/ToastMessage";

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
  const [toastMsg, setToastMsg] = useState<string>("");

  const handleEditClick = () => {
    setTempMessage(currentMessage);
    setIsEditMode(true);
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await patchMyStateMessage(tempMessage);
      setCurrentMessage(tempMessage);
      setIsEditMode(false);
      setToastMsg("상태메시지가 업데이트되었습니다.");
    } catch (error) {
      console.error("상태메시지 업데이트 실패:", error);
      setToastMsg("상태메시지 업데이트에 실패했습니다.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setToastMsg(""), 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto flex w-[300px] items-center justify-center px-[30px] py-[10px] md:w-[800px]">
        <div className="flex min-h-[40px] items-center gap-[10px] rounded-[20px] bg-white px-[20px] py-[5px]">
          {isEditMode ? (
            <input
              type="text"
              value={tempMessage || ""}
              onChange={e => setTempMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-cap1-med text-brown w-[300px] bg-transparent text-center font-[geekble] focus:outline-none md:w-[800px]"
              maxLength={MAX_MESSAGE_LENGTH}
            />
          ) : (
            <span className="text-cap1-med text-brown w-[300px] text-center font-[geekble] md:w-[800px]">
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
      {toastMsg && <ToastMessage message={toastMsg} />}
    </div>
  );
};

export default StateMessage;
