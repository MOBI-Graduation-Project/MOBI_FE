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
    <div>
      <div>{stateMessage}</div>
      {isMyProfile && <ProfileEdit />}
    </div>
  );
};
export default StateMessage;
