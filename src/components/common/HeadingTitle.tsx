interface HeadingTitleProps {
  userName?: string;
  texts: string[];
}

const HeadingTitle = ({ userName = "사용자", texts }: HeadingTitleProps) => {
  const replacedTexts = texts.map(text => text.replace("{userName}", userName));

  return (
    <div className="flex flex-col gap-1">
      {replacedTexts.map((text, index) => (
        <p
          key={index}
          className="text-heading1 text-stroke-white text-brown font-[geekble]"
        >
          {text}
        </p>
      ))}
    </div>
  );
};
export default HeadingTitle;
