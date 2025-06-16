import AlarmIcon from "@/assets/header/alarmIcon.svg";
import FriendListIcon from "@/assets/header/friendListIcon.svg";
import LogoutIcon from "@/assets/header/logoutIcon.svg";
import ProfileIcon from "@/assets/header/profileIcon.svg";

const Topbar = () => {
  return (
    <div className="grid h-[127px] w-[375px] grid-cols-3 items-center justify-items-center overflow-visible rounded-b-[30px] bg-white/66">
      <button className="cursor-pointer">
        <AlarmIcon />
      </button>
      <button className="cursor-pointer">
        <FriendListIcon />
      </button>
      <button className="cursor-pointer">
        <ProfileIcon />
      </button>
    </div>
  );
};
export default Topbar;
