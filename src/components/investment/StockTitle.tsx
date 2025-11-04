interface StockTitleProps {
  userName?: string;
}

export const StockTitle = ({ userName = "사용자" }: StockTitleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-heading1 text-stroke-whie font-[geekble]">
        {userName}님의 관심종목입니다.
      </p>
      <p className="text-heading1 text-stroke-whie font-[geekble]">
        차트보기를 통해 오늘의 예상 주가를 확인해 보세요.
      </p>
    </div>
  );
};
