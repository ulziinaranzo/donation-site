" use client"
import { ChangePassword } from "../_components/ChangePassword"
import ChangePaymentDetails from "../_components/ChangePaymentDetails"
import ChangeCompleteProfilePage from "../_components/ChangeCompleteProfile"
import { SuccessPage } from "../_components/SuccessPage"

export default function Home() {
return (
    <div className="w-full h-fit flex flex-col">
              <div className="font-[600] text-[24px]">My account</div>
      <ChangeCompleteProfilePage/>
        <ChangePassword />
        <ChangePaymentDetails />
        <SuccessPage/>
    </div>
)
}
