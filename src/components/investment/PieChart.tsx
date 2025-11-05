"use client";

import React, { useMemo, useState } from "react";

import { PieData } from "@/types/pieData";

import { getRandomPieColors } from "@/utils/investment/getRandomPieColors";

interface PieChartProps {
  data: PieData[];
}

const PieChart = ({ data }: PieChartProps) => {
  const SIZE = 450;
  const RADIUS = SIZE / 2;
  const CENTER = RADIUS;
  const colors = useMemo(() => getRandomPieColors(data.length), [data.length]);
  const total = data.reduce((acc, cur) => acc + cur.holdingWeight, 0);

  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  let cumulative = 0;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // 현재 SVG 내에서 마우스 위치 계산
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 10, // 오른쪽으로 약간 이동
      y: e.clientY - rect.top - 20, // 위로 약간 이동
    });
  };

  return (
    <div className="relative flex items-center justify-center">
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

          // 중심 좌표 계산
          const midAngle = (startAngle + endAngle) / 2;
          const labelRadius = RADIUS * 0.65; // 글씨가 들어갈 거리 (중심에서)
          const labelX = CENTER + labelRadius * Math.cos(midAngle);
          const labelY = CENTER + labelRadius * Math.sin(midAngle);

          // 파이 섹터 좌표 계산
          const x1 = CENTER + RADIUS * Math.cos(startAngle);
          const y1 = CENTER + RADIUS * Math.sin(startAngle);
          const x2 = CENTER + RADIUS * Math.cos(endAngle);
          const y2 = CENTER + RADIUS * Math.sin(endAngle);
          const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

          return (
            <g
              key={item.stockCode}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* 파이 섹터 */}
              <path
                d={`M${CENTER},${CENTER} L${x1},${y1} A${RADIUS},${RADIUS} 0 ${largeArc} 1 ${x2},${y2} Z`}
                fill={colors[idx]}
                stroke="#4d2700"
                strokeWidth="1"
                style={{
                  cursor: "pointer",
                  opacity: hovered === null || hovered === idx ? 1 : 0.5,
                }}
              />

              {/* 섹터 중앙 텍스트 */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="geekble"
                fontSize={hovered === idx ? "18" : "15"}
                fontWeight={hovered === idx ? "700" : "500"}
                fill={hovered === idx ? "#3d0303" : "#3e1f00"}
                style={{
                  pointerEvents: "none",
                  transition: "font-size 0.3s",
                }}
              >
                {item.stockName}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div
          className="absolute z-10 flex h-[60px] w-[150px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 shadow-md"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(10px, -10px)", // 커서 오른쪽 위에 위치
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
