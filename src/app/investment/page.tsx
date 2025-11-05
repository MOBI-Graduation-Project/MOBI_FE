import BottomBar from "@/components/common/bottomBar";
import Header from "@/components/common/header";
import DropdownMenu from "@/components/investment/DropdownMenu";
import StockTitle from "@/components/investment/StockTitle";
import StocksList from "@/components/investment/StocksList";

const InvestmentPage = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-repeat-y"
      style={{ backgroundImage: "url('/svgs/bgImage.jpg')" }}
    >
      <Header />
      <div className="fixed top-[120px] left-[30px]">
        <DropdownMenu />
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-[41px]">
        <StockTitle />
        <StocksList />
      </div>
      <BottomBar />
    </div>
  );
};
export default InvestmentPage;
