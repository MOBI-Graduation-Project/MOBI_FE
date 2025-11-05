import { PIE_COLORS } from "@/constants/PIE_CHART_COLORS";

export const getRandomPieColors = (count: number): string[] => {
  if (count <= 0) return [];

  const shuffled = [...PIE_COLORS].sort(() => Math.random() - 0.5);

  const result: string[] = [];
  for (let i = 0; i < shuffled.length && result.length < count; i++) {
    const color = shuffled[i];
    const prev = result[result.length - 1];
    if (!prev || prev !== color) result.push(color);
  }

  while (result.length < count) {
    const random = PIE_COLORS[Math.floor(Math.random() * PIE_COLORS.length)];
    if (random !== result[result.length - 1]) result.push(random);
  }

  return result;
};
