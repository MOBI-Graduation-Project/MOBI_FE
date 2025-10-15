import { Stock } from "@/types/stocks";
import { User } from "@/types/user";

type Seacrhable = User | Stock;

const FilterResultByInput = (input: string, data: Seacrhable[]) => {
  const keyword = input.trim().toLowerCase();
  if (!keyword) return data;
  return data.filter(item => {
    const target =
      "nickname" in item ? item.nickname : "stock" in item ? item.stock : "";
    return target.toLowerCase().includes(keyword);
  });
};
export default FilterResultByInput;
