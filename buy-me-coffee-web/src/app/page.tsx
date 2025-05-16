import Image from "next/image";
import { Header } from "./components/Header";
import { SignUp } from "./auth/signup/page";
import MyPageComponent from "./components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col w-max-[1440px] h-fit">
      <Header />
      {/* <SignUp /> */}
      <MyPageComponent />
    </div>
  );
}
