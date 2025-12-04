export const ToastMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-cap1 flex h-[20px] w-[300px] items-center justify-center rounded-[20px] bg-black px-[20px] py-[10px] font-[pretendard] text-white md:h-[30px] md:w-[500px]">
      {message}
    </div>
  );
};
