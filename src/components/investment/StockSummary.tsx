import { useEffect, useState } from "react";

import { getMyDataList } from "@/apis/investment";

import { StockSummaryItem } from "@/types/investment/stockTypes";

import { SortOrder, sortListByField } from "@/utils/investment/sortedList";

export const StockSummary = () => {
  const [myDataList, setMyDataList] = useState<StockSummaryItem[]>([]);
  const [, setLoading] = useState(true);

  const [sortField, setSortField] = useState<keyof StockSummaryItem | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: keyof StockSummaryItem) => {
    let nextOrder: SortOrder = "desc";

    if (sortField === field) {
      nextOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(nextOrder);
    } else {
      setSortField(field);
      setSortOrder("desc");
    }

    const sorted = sortListByField(myDataList, field, nextOrder);
    setMyDataList(sorted);
  };

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const data = await getMyDataList();
        if (data?.isSuccess) {
          setMyDataList(data.result);
        }
      } catch (e) {
        console.error("Error fetching my data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, []);

  return (
    <div className="border-brown overflow-y-auto border-[2px] bg-white/80 md:h-[355px] md:w-[650px]">
      <div className="md:text-cap1-sb text-cap3 bg-yellow-light/80 text-brown grid w-full grid-cols-4 justify-items-center border-b px-4 py-3 font-[pretendard]">
        <div className="cursor-pointer" onClick={() => handleSort("stockName")}>
          종목명{" "}
          {sortField === "stockName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleSort("returnRate")}
        >
          수익률{" "}
          {sortField === "returnRate" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleSort("returnAmount")}
        >
          손익 금액{" "}
          {sortField === "returnAmount"
            ? sortOrder === "asc"
              ? "▲"
              : "▼"
            : ""}
        </div>

        <div onClick={() => handleSort("valuationAmount")}>
          평가 금액{" "}
          {sortField === "valuationAmount"
            ? sortOrder === "asc"
              ? "▲"
              : "▼"
            : ""}
        </div>
      </div>

      {myDataList.map(item => (
        <div
          className="md:text-lab2 text-cap3 text-brown grid h-[25px] w-full grid-cols-4 justify-items-center border-b px-4 py-3 font-[pretendard] md:h-[45px]"
          key={item.myDataId}
        >
          {/* 종목명 */}
          <div className="font-medium">{item.stockName}</div>

          {/* 수익률 */}
          <div
            className={
              item.returnRate !== null && item.returnRate > 0
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {item.returnRate === null
              ? "-"
              : `${item.returnRate > 0 ? "+" : ""}${item.returnRate}%`}
          </div>

          {/* 손익 금액 */}
          <div
            className={
              item.returnAmount !== null && item.returnAmount > 0
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {item.returnAmount === null
              ? "-"
              : `${item.returnAmount > 0 ? "+" : ""}${item.returnAmount.toLocaleString()}원`}
          </div>

          {/* 평가금액 */}
          <div>
            {item.valuationAmount === null
              ? "-"
              : `${item.valuationAmount.toLocaleString()}원`}
          </div>
        </div>
      ))}
    </div>
  );
};
