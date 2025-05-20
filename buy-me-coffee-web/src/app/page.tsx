"use client";
import { SignUp } from "./auth/signup/page";
import MyPageComponent from "./components/Dashboard";
import CompleteProfilePage from "./components/CompleteProfile";
import PaymentForm from "./components/PaymentForm";
import MyPageWithSidebar from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col w-max-[1440px] h-fit">
      {/* <SignUp /> */}
      {/* <MyPageComponent /> */}
      {/* <CompleteProfilePage />
      <PaymentForm /> */}
      {/* <CoffeePage /> */}
      <MyPageWithSidebar />
    </div>
  );
}
