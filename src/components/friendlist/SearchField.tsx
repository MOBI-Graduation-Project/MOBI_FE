import SearchIcon from "@/assets/chatting/searchIcon.svg";

const SearchField = () => {
  return (
    <section className="bg-brown/80 relative flex h-[94px] w-full flex-row gap-[45px] px-10 py-[19px]">
      <input
        className="bg-yellow-light text-lab1 w-full rounded-[30px] px-[30px] text-[pretendart]"
        type="text"
        placeholder="친구 맺고 싶은 사람의 닉네임을 검색해보세요"
      ></input>
      <button>
        <SearchIcon className="fill text-brown-10 absolute top-1/2 right-[90px] h-[40px] w-[40px] -translate-y-1/2 cursor-pointer hover:scale-110" />
      </button>
    </section>
  );
};
export default SearchField;
