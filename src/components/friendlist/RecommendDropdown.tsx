import { SearchUser } from "@/types/user";

interface RecommendDropdownProps {
  width?: number;
  searchResult: SearchUser;
  onSelect?: (user: SearchUser) => void;
}

const RecommendDropdown = ({
  width,
  searchResult,
  onSelect,
}: RecommendDropdownProps) => {
  const handleClick = () => onSelect?.(searchResult);

  return (
    <div
      className="bg-yellow-10 hover:bg-yellow-30 cursor-pointer rounded-[20px] border px-[20px] py-[10px]"
      style={{ width }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <p className="md:text-lab1 text-cap1 font-[pretendard]">
        {searchResult.nickname}
      </p>
    </div>
  );
};
export default RecommendDropdown;
