"use client";
import { Header } from "./components/Header";
import { SignUp } from "./auth/signup/page";
import MyPageComponent from "./components/Dashboard";
import CompleteProfilePage from "./components/CompleteProfile";
import PaymentForm from "./components/PaymentForm";
import CoffeePage from "./components/CoffeePage";
import MyPageWithSidebar from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col w-max-[1440px] h-fit">
      <Header />
      {/* <SignUp /> */}
      {/* <MyPageComponent /> */}
      {/* <CompleteProfilePage />
      <PaymentForm /> */}
      {/* <CoffeePage /> */}
      <MyPageWithSidebar />
    </div>
  );
}
