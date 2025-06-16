import Topbar from "./topBar";

const Header = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="flex justify-between items-center px-[43.39px]">
        <div className="text-title2 font-[geekble] text-yellow text-stroke-brown-m">모비</div>
        <Topbar />
      </div>
    </div>
  );
};
export default Header;
