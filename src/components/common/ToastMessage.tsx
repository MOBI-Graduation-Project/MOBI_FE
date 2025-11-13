export const ToastMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-cap1 flex h-[30px] w-[500px] items-center justify-center rounded-[20px] bg-black/60 px-[20px] py-[10px] font-[pretendard] text-white">
      {message}
    </div>
  );
};
