import Backbtn from "@/assets/chatbot/backbtn.svg";

const Chatbot = () => {
  return (
    <div className="h-screen w-full bg-[#ffeebd]">
      {/*상단바*/}
      <div className="sticky flex h-[100px] flex-row items-center gap-5 pl-[30px]">
        <Backbtn />
        <div className="text-heading2 text-brown text-stroke-white font-[geekble]">
          주식 챗봇 모비
        </div>
      </div>
      {/*단축버튼 */}
      {/*하단바*/}
      <div className="bg-brown fixed bottom-0 flex h-[116px] w-full items-center justify-center">
        <div className="font-pretendard flex h-[58px] w-full max-w-[1185px] items-center rounded-[30px] bg-[#EFEFEF] px-10">
          <input
            type="text"
            placeholder="궁금한 점을 물어보세요!"
            className="w-full text-cap2/60 font-[pretendard] outline-none"
          />
        </div>
      </div>
    </div>
  );
};
export default Chatbot;
