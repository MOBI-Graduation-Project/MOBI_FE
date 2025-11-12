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
        className="absolute top-1/2 left-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full transition-all"
      >
        <LeftArrow className="h-full w-full" />
      </button>

      <button
        onClick={handleNext}
        disabled={disabledNext}
        className={`absolute top-1/2 right-[30px] flex h-[114px] w-[114px] -translate-y-1/2 transform items-center justify-center rounded-full transition-all ${
          disabledNext ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <RightArrow className="h-full w-full" />
      </button>
    </>
  );
};
