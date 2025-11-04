import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import { StockTitle } from "@/components/investment/StockTitle";

const InvestmentPage = () => {
  return (
    <div
      className="min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="flex items-center justify-center gap-[41px]">
        <StockTitle />
      </div>
      <BottomBar />
    </div>
  );
};
export default InvestmentPage;
