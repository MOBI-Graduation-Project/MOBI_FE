import { useUserStore } from "@/stores/userStore";

interface HeadingTitleProps {
  userName?: string;
  texts: string[];
  stockName?: string;
}

const HeadingTitle = ({
  userName,
  texts,
  stockName,
}: HeadingTitleProps) => {
  // TBD 유저이름 zustand로 로그인연동시 가져오기

  const nickname = useUserStore(state => state.nickname);

  const finalUserName = userName ?? nickname ?? "사용자";

  const replacedTexts = texts.map(text => {
    let replaced = text;

    replaced = replaced.replace("{userName}", finalUserName);
    if (stockName) {
      replaced = replaced.replace("{stockName}", stockName);
    }
    return replaced;
  });

  return (
    <div className="flex flex-col items-center gap-1">
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
