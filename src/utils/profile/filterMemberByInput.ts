import { Stock } from "@/types/investment/stockTypes";
import { User } from "@/types/user";

type Searchable = User | Stock;

// User 타입 판별 함수
function isUser(item: Searchable): item is User {
  return "nickname" in item;
}

// Stock 타입 판별 함수
function isStock(item: Searchable): item is Stock {
  return "stock" in item;
}

const FilterResultByInput = (input: string, data: Searchable[]) => {
  const keyword = input.trim().toLowerCase();
  if (!keyword) return data;
  return data.filter(item => {
    let target = "";
    if (isUser(item)) {
      target = item.nickname;
    } else if (isStock(item)) {
      target = item.stockName;
    }
    return target.toLowerCase().includes(keyword);
  });
};
export default FilterResultByInput;
