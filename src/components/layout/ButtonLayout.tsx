import LeftArrow from "@/assets/leftArrow.svg";
import RightArrow from "@/assets/rightArrow.svg";

interface ButtonLayoutProps {
  handlePrev: () => void;
  handleNext: () => void;
  disabledNext?: boolean;
}
export const ButtonLayout = ({
  handlePrev,
  handleNext,
  disabledNext = false,
}: ButtonLayoutProps) => {
  return (
    <>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[5px] flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all md:left-[30px]"
      >
        <LeftArrow className="h-[70px] w-[70px] md:h-[114px] md:w-[114px]" />
      </button>

      <button
        onClick={handleNext}
        disabled={disabledNext}
        className={`absolute top-1/2 right-[5px] flex -translate-y-1/2 transform items-center justify-center rounded-full transition-all md:right-[30px] ${
          disabledNext ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <RightArrow className="h-[70px] w-[70px] md:h-[114px] md:w-[114px]" />
      </button>
    </>
  );
};
