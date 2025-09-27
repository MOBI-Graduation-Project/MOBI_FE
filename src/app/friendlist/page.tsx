import Header from "@/components/common/header";
import FriendTag from "@/components/frientlist/FriendTag";

const FriendList = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat pt-[42.5px] pb-[99px]"
      style={{ backgroundImage: "url('/svgs/backgroundImage.svg')" }}
    >
      <Header />
      <FriendTag />
    </div>
  );
};
export default FriendList;
