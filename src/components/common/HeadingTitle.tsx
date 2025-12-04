import { useUserStore } from "@/stores/userStore";

interface HeadingTitleProps {
  userName?: string;
  texts: string[];
  stockName?: string;
}

const HeadingTitle = ({ userName, texts, stockName }: HeadingTitleProps) => {
  const nickname = useUserStore(state => state.nickname);

  const finalUserName = userName ?? nickname ?? "사용자";

  const replacedTexts = texts.map(text => {
    let replaced = text;

    replaced = replaced.replace("{userName}", finalUserName);
    if (stockName) {
      replaced = replaced.replace("{stockName}", stockName);
    }
    return replaced.split("<br>");
  });

  return (
    <div className="flex flex-col items-center gap-1">
      {replacedTexts.map((lines, index) => (
        <p
          key={index}
          className="text-body text-lab1 text-stroke-white text-brown text-center font-[geekble] md:text-[45px]"
        >
          {lines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};
export default HeadingTitle;
