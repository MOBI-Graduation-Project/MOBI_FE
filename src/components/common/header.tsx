import Topbar from "./topBar";

const Header = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="flex items-center justify-between px-[43.39px]">
        <div className="text-title2 text-yellow text-stroke-brown-m font-[geekble]">
          모비
        </div>
        <Topbar />
      </div>
    </div>
  );
};
export default Header;
