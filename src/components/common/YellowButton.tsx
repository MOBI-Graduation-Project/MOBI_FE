interface YellowButtonProps {
  text: string;
  width?: string;
  onClick?: () => void;
}
const YellowButton = ({ text, width, onClick }: YellowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${width ?? "w-[216px]"} bg-yellow button-shadow-yellow flex cursor-pointer items-center justify-center rounded-[20px]`}
    >
      <div className="text-stroke-white text-brown text-lab1 cursor-pointer p-[10px] font-[geekble]">
        {text}
      </div>
    </button>
  );
};
export default YellowButton;
