" use client";

import ChangeCompleteProfilePage from "../components/ChangeCompleteProfile";
import { ChangePassword } from "../components/ChangePassword";
import ChangePaymentDetails from "../components/ChangePaymentDetails";
import { SidebarLeft } from "../components/Sidebar";
import { SuccessPage } from "../components/SuccessPage";

export default function Home() {
  return (
    <div className="flex h-screen mt-[44px]">
      <SidebarLeft />

      <main className="flex-1  p-[24px]">
        <div className="w-full h-fit flex flex-col pl-[10%]">
          <div className="font-[600] text-[24px]">My account</div>
          <ChangeCompleteProfilePage />
          <ChangePassword />
          <ChangePaymentDetails />
          <SuccessPage />
        </div>
      </main>
    </div>
  );
}
