import AlarmIcon from "@/assets/header/alarmIcon.svg";
import FriendListIcon from "@/assets/header/friendListIcon.svg";
import LogoutIcon from "@/assets/header/logoutIcon.svg";
import ProfileIcon from "@/assets/header/profileIcon.svg";

const Topbar = () => {
  return (

      <div className="grid grid-cols-3 h-[127px] w-[375px] justify-items-center items-center overflow-visible bg-white/66 rounded-b-[30px]">
        <AlarmIcon />
        <FriendListIcon />
        <ProfileIcon />
      </div>
  );
};
export default Topbar;
