interface YellowButtonProps {
  text: string;
  width?: string;
  onClick?: () => void;
}
const YellowButton = ({ text, width, onClick }: YellowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${width ?? "w-[130px] md:w-[216px]"} bg-yellow hover:bg-yellow-110 button-shadow-yellow flex cursor-pointer items-center justify-center rounded-[20px]`}
    >
      <div className="text-stroke-white text-brown md:text-lab1 text-lab2 cursor-pointer px-[5px] py-[3px] font-[geekble] md:p-[10px]">
        {text}
      </div>
    </button>
  );
};
export default YellowButton;
