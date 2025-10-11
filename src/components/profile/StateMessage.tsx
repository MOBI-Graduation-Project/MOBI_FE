import ProfileEdit from "@/assets/profile/profileEdit.svg";

interface StateMessageProps {
  isMyProfile: boolean;
  stateMessage: string;
}

const StateMessage = ({
  isMyProfile = false,
  stateMessage,
}: StateMessageProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center gap-[10px]">
        <span className="text-cap1-med text-brown text-center font-[geekble]">
          {stateMessage}
        </span>
        {isMyProfile && <ProfileEdit />}
      </div>
    </div>
  );
};

export default StateMessage;
