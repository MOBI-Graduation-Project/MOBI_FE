import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import PieChart from "@/components/investment/PieChart";

import holdingsData from "@/mock/hodingsMockData.json";

const HoldingStocks = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px]">
        <DropdownMenu />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-[20px] pt-[100px] pb-[120px]">
        <HeadingTitle texts={["{userName}님의 보유 종목 비율입니다."]} />
        <PieChart data={holdingsData} />
      </div>

      <BottomBar />
    </div>
  );
};
export default HoldingStocks;
