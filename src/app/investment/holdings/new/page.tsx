import HeadingTitle from "@/components/common/HeadingTitle";
import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import { InputStockField } from "@/components/investment/InputStockField";
import StocksList from "@/components/investment/StocksList";

const MyStock = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px]">
        <DropdownMenu />
      </div>
      <div className="flex h-full flex-col items-center justify-center gap-[25px]">
        <HeadingTitle
          texts={[
            "{userName}님의 보유종목입니다.",
            "차트보기를 통해 보유 주식 현황차트를 조회해 보세요.",
          ]}
        />
        <InputStockField />
        <div className="h-[252px] overflow-y-auto">
          <StocksList />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default MyStock;
