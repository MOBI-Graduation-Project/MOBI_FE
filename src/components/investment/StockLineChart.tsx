"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StockPrediction } from "@/types/investment/stockTypes";

interface StockChartProps {
  data: StockPrediction;
}

export const StockChart = ({ data }: StockChartProps) => {
  const chartData = data.priceRecords.map(record => ({
    date: record.date.slice(5), // "11-02" 식으로 축에 표시
    실제가격: record.closePrice,
    예측가격: record.predictedPrice,
  }));

  return (
    <div className="w-[300px] w-full max-w-[800px] rounded-2xl bg-white p-6 shadow-md">
      <ResponsiveContainer width="100%" height={350} minHeight={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 500", "dataMax + 500"]} />
          <Tooltip />
          <Legend />

          {/* 실제 종가 */}
          <Line
            type="monotone"
            dataKey="실제가격"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="실제 종가"
          />

          {/* 예측가 (점선) */}
          <Line
            type="monotone"
            dataKey="예측가격"
            stroke="#f97316"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            name="예측 종가"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
