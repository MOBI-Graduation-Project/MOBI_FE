interface HeadingTitleProps {
  userName?: string;
  texts: string[];
  stockName?: string;
}

const HeadingTitle = ({
  userName = "사용자",
  texts,
  stockName,
}: HeadingTitleProps) => {
  // TBD 유저이름 zustand로 로그인연동시 가져오기

  const replacedTexts = texts.map(text => {
    let replaced = text;
    if (userName) {
      replaced = replaced.replace("{userName}", userName);
    } else {
      replaced = replaced.replace("{userName}", "사용자");
    }
    if (stockName) {
      replaced = replaced.replace("{stockName}", stockName);
    }
    return replaced;
  });

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {replacedTexts.map((text, index) => (
        <p
          key={index}
          className="text-heading1 text-stroke-white text-brown font-[geekble] leading-tight"
        >
          {text}
        </p>
      ))}
    </div>
  );
};
export default HeadingTitle;
