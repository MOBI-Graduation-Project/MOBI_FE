import YellowButton from "@/components/common/YellowButton";

interface ProfileButtonsProps {
  buttonNum: 1 | 2;
  text: string[] | string;
  onClick?: () => void;
}

const ProfileButtons = ({ buttonNum, text, onClick }: ProfileButtonsProps) => {
  const texts = Array.isArray(text) ? text : [text];
  return (
    <div className={`flex ${buttonNum === 2 ? "gap-[174px]" : ""}`}>
      {texts.map((text, index) => (
        <YellowButton key={index} text={text} onClick={onClick} />
      ))}
    </div>
  );
};
export default ProfileButtons;
