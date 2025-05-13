import Image from "next/image";
import { Header } from "./components/Header";
import { SignUp } from "./auth/signup/page";

export default function Home() {
  return (
    <div className="flex flex-col w-max-[1440px] h-fit">
      <Header />
      <SignUp />
    </div>
  );
}
