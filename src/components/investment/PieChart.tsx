"use client";

import React, { useMemo, useState } from "react";

import { PieData } from "@/types/investment/stockTypes";

import { getRandomPieColors } from "@/utils/investment/getRandomPieColors";

interface PieChartProps {
  data: PieData[];
}

const PieChart = ({ data }: PieChartProps) => {
  const SIZE = 380;
  const RADIUS = SIZE / 2;
  const CENTER = RADIUS;
  const colors = useMemo(() => getRandomPieColors(data.length), [data.length]);
  const total = data.reduce((acc, cur) => acc + cur.holdingWeight, 0) || 1;

  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  let cumulative = 0;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 20,
    });
  };

  return (
    <div className="relative flex h-[300px] w-[300px] items-center justify-center md:h-[380px] md:w-[380px]">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        onMouseMove={handleMouseMove}
      >
        {data.map((item, idx) => {
          const startAngle = (cumulative / total) * 2 * Math.PI;
          const endAngle =
            ((cumulative + item.holdingWeight) / total) * 2 * Math.PI;
          cumulative += item.holdingWeight;

          const x1 = CENTER + RADIUS * Math.cos(startAngle);
          const y1 = CENTER + RADIUS * Math.sin(startAngle);
          const x2 = CENTER + RADIUS * Math.cos(endAngle);
          const y2 = CENTER + RADIUS * Math.sin(endAngle);

          const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

          // 전체 100%인 경우 원 전체를 그리도록 처리
          const pathD =
            endAngle - startAngle >= 2 * Math.PI
              ? `M${CENTER},${CENTER - RADIUS} A${RADIUS},${RADIUS} 0 1,1 ${CENTER},${CENTER + RADIUS} A${RADIUS},${RADIUS} 0 1,1 ${CENTER},${CENTER - RADIUS} Z`
              : `M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArc} 1 ${x2},${y2} Z`;

          const midAngle = (startAngle + endAngle) / 2;
          const labelRadius = RADIUS * 0.65;
          const labelX = CENTER + labelRadius * Math.cos(midAngle);
          const labelY = CENTER + labelRadius * Math.sin(midAngle);

          return (
            <g
              key={item.stockCode}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <path
                d={pathD}
                fill={colors[idx]}
                stroke="#4d2700"
                strokeWidth="1"
                style={{
                  cursor: "pointer",
                  opacity: hovered === null || hovered === idx ? 1 : 0.5,
                }}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="geekble"
                fontSize={hovered === idx ? "18" : "15"}
                fontWeight={hovered === idx ? "700" : "500"}
                fill={hovered === idx ? "#3d0303" : "#3e1f00"}
                style={{ pointerEvents: "none", transition: "font-size 0.3s" }}
              >
                {item.stockName}
              </text>
            </g>
          );
        })}
      </svg>

      {hovered !== null && (
        <div
          className="absolute z-10 flex h-[60px] w-[150px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 shadow-md"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(10px, -10px)",
            pointerEvents: "none",
          }}
        >
          <div className="text-cap1 font-[pretendard] text-gray-800">
            {data[hovered].stockName}
          </div>
          <div className="text-cap1 font-[pretendard] text-gray-500">
            {data[hovered].holdingWeight}%
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
