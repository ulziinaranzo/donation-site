" use client";

import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full h-[56px] flex bg-transparent px-[80px] py-[16px]">
      <div className="flex justify-between w-full">
        <div className="flex gap-[8px]">
          <img src="/Images/coffe.png" className="w-[24px] h-[34px]" />
          <div className="text-[20px] font-[700] text-black">Buy Me Coffee</div>
        </div>
        <div className="flex gap-[10px]">
          <button className="flex justify-center items-center bg-black rounded-full px-[15px] py-[15px] text-white text-[15px] h-[40px]">
            Нэвтрэх
          </button>
          <Link href={"/auth/signup"}>
            <button className="flex justify-center items-center bg-black rounded-full px-[15px] py-[15px] text-white text-[15px] h-[40px]">
              Бүртгүүлэх
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
