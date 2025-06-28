" use client";

import ChangeCompleteProfilePage from "../_components/ChangeCompleteProfile";
import { ChangePassword } from "../_components/ChangePassword";
import ChangePaymentDetails from "../_components/ChangePaymentDetails";
import { SuccessPage } from "../_components/SuccessPage";

export default function Home() {
  return (
    <div className="flex h-screen mt-[44px]">
      <main className="flex-1  p-[24px]">
        <div className="w-full h-fit flex flex-col pl-[10%]">
          <div className="font-[600] text-[24px]">Миний профайл</div>
          <ChangeCompleteProfilePage />
          <ChangePassword />
          <ChangePaymentDetails />
          <SuccessPage />
        </div>
      </main>
    </div>
  );
}
