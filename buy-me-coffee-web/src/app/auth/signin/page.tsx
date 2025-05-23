"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_components/AuthProvider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." })
    .email({ message: "Имэйлээ зөв оруулна уу." }),
  password: z.string().min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." }),
});
type FormData = z.infer<typeof formSchema>;

const SignInPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = async (data: FormData) => {
    setFormData(data);
    try {
      await signIn(data.email, data.password);
      console.log("Амжилттай нэвтэрлээ");
      router.push("/");
    } catch (error) {
      console.error("Нэвтрэхэд алдаа гарлаа:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-col flex-1/2 bg-[#ffe8dd] justify-center items-center">
        <img src="/Images/bg.avif" className="w-[455px]" alt="Background" />
        <div className="font-[700] text-[24px] mb-[10px]">
          Бүтээлч ажлаа санхүүжүүл
        </div>
        <div className="text-[20px] font-[200] w-[700px] mb-[100px]">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </div>
      </div>

      <div className="flex flex-1/2 justify-center items-center">
        <div className="flex flex-col space-y-6 mb-[100px] w-[300px]">
          <div className="text-[25px] font-semibold text-gray-900">
            Welcome back
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-[16px] font-[500]">Email</p>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="mt-1">
                  <Input
                    {...field}
                    placeholder="Имэйлээ оруулна уу"
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
            <p className="text-[15px] font-[500] mt-[10px]">Нууц үг</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="mt-1">
                  <Input {...field} type="password" placeholder="Нууц үг" />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Үргэлжлүүлэх
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
