"use client";

import { useState } from "react";
import { Step } from "./_components/Step";
import { Step1 } from "./_components/Step1";
import Image from "next/image";

type MyFormData = {
  username: string;
  password: string;
  email: string;
};

const SignUp = () => {
  const [step, setStep] = useState<boolean>(false);

  const [data, setData] = useState<MyFormData>({
    username: "",
    password: "",
    email: "",
  });

  const handlePrev = async () => setStep(false);
  const handleNext = async () => setStep(true);

  const saveFormDataChange = (newData: Partial<MyFormData>) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };
  return (
    <div className="w-screen h-screen flex ">
      <div className="flex flex-col flex-1/2 bg-[#ffe8dd] justify-center items-center">
        <Image
          src="/Images/bg.avif"
          className="w-[455px]"
          width={455}
          height={300}
          alt="Background image"
        />
        <div className="font-[700] text-[24px] mb-[10px]">
          Бүтээлч ажлаа санхүүжүүл
        </div>
        <div className="text-[20px] font-[200] w-[700px] mb-[100px]">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </div>
      </div>
      <div className="flex flex-1/2 justify-center items-center">
        {!step ? (
          <Step
            handleNext={handleNext}
            data={data}
            saveFormDataChange={saveFormDataChange}
          />
        ) : (
          <Step1
            handlePrev={handlePrev}
            handleNext={handleNext}
            data={data}
            saveFormDataChange={saveFormDataChange}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
