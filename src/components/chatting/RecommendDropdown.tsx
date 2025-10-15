import { User } from "@/types/user";

interface RecommendDropdownProps {
  width?: number;
  searchResult: User;
}

const RecommendDropdown = ({ width, searchResult }: RecommendDropdownProps) => {
  return (
    <div
      className="bg-yellow-10 hover:bg-yellow-30 cursor-pointer rounded-[20px] border px-[20px] py-[10px]"
      style={{ width }}
    >
      <p className="text-lab1 font-[pretendard]">{searchResult.nickname}</p>
      {/* TBD: 클릭 시 해당 유저 프로필로 들어가지게 */}
    </div>
  );
};
export default RecommendDropdown;
