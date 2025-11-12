import { useState } from "react";

interface PurposeTextProps {
  leftText: string;
  rightText: string;
  selected?: "1" | "2" | null;
  onSelect?: (choice: "1" | "2") => void;
}
export const PurposeText = ({
  leftText,
  rightText,
  selected: selectedProp = null,
  onSelect,
}: PurposeTextProps) => {
  const [selected, setSelected] = useState<"1" | "2" | null>(selectedProp);

  const handleClick = (side: "left" | "right") => {
    const choice = side === "left" ? "1" : "2";
    setSelected(choice);
    onSelect?.(choice);
  };
  const renderText = (text: string) =>
    text.split("\\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

  return (
    <div className="relative z-10 flex gap-[20px]">
      <button
        onClick={() => handleClick("left")}
        className={`${selected === "1" ? "bg-yellow" : "bg-cream hover:bg-yellow"} button-shadow-yellow10 hover:button-shadow-yellow10 text-body text-brown flex h-[314px] w-[532px] cursor-pointer flex-col items-center justify-center rounded-[40px] p-[10px] text-center font-[geekble] whitespace-pre-line transition-all`}
      >
        {renderText(leftText)}
      </button>
      <button
        onClick={() => handleClick("right")}
        className={`${selected === "2" ? "bg-yellow" : "bg-cream hover:bg-yellow"} button-shadow-yellow10 hover:button-shadow-yellow10 text-body text-brown flex h-[314px] w-[532px] cursor-pointer flex-col items-center justify-center rounded-[40px] p-[10px] text-center font-[geekble] whitespace-pre-line transition-all`}
      >
        {renderText(rightText)}
      </button>
    </div>
  );
};
