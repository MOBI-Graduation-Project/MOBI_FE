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
      <div className="flex h-full w-full items-center justify-center">
        <PieChart data={holdingsData} />
      </div>

      <BottomBar />
    </div>
  );
};
export default HoldingStocks;
