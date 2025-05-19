"use client";

import ChangeCompleteProfilePage from "./ChangeCompleteProfile";

export const EditProfile = () => {
  return (
    <div className="w-full h-fit px-[72px] flex flex-col ">
      <div className="font-[600] text-[24px]">My account</div>
      <ChangeCompleteProfilePage />
    </div>
  );
};
