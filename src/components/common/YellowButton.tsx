interface YellowButtonProps {
  canCheck?: boolean;
  text: string;
  checkHandler?: () => void;
  width?: string;
}
const YellowButton = ({ canCheck = false, text, width }: YellowButtonProps) => {
  return (
    <>
      {canCheck ? (
        <button></button>
      ) : (
        <button
          className={`${width ?? "w-[216px]"} bg-yellow button-shadow-yellow cursor-pointer rounded-[20px]`}
        >
          <div className="text-stroke-white text-brown text-lab1 p-[10px] font-[geekble]">
            {text}
          </div>
        </button>
      )}
    </>
  );
};
export default YellowButton;
