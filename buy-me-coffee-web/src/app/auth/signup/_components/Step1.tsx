"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_components/AuthProvider";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z
      .string()
      .min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." })
      .email({ message: "Имэйлээ зөв оруулна уу." }),
    password: z.string().min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." }),
    confirmPassword: z.string().min(1, { message: "Нууц үг таарахгүй байна" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });
type FormData = {
  username: string;
  email: string;
  password: string;
};
type Step1Props = {
  handlePrev: () => void;
  handleNext: () => void;
  data: FormData;
  saveFormDataChange: (newData: Partial<FormData>) => void;
};

type Step1FormData = z.infer<typeof formSchema>;

export const Step1 = ({
  handleNext,
  handlePrev,
  data,
  saveFormDataChange,
}: Step1Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email || "",
      password: data.password || "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (savingData: Step1FormData) => {
    const { confirmPassword, ...dataToSave } = savingData;
    saveFormDataChange(dataToSave);
    try {
      await signUp(dataToSave.email, dataToSave.password, data.username);
      console.log("Бүртгэл амжилттай");
      handleNext();
      router.push("/");
    } catch (error) {
      console.error("Бүртгэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col space-y-6 mb-[100px]">
        <div className="text-xl font-semibold text-gray-900">
          Шинэ бүртгэл үүсгэх
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-[16px] font-[500]">Имэйл</p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="mt-4">
                <Input
                  {...field}
                  placeholder="Имэйлээ оруулна уу"
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500  mt-1">{errors.email.message}</p>
                )}
              </div>
            )}
          />
          <p className="text-[16px] font-[500] mt-1">Нууц үг</p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="mt-4">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div className="mt-4">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үгээ давтан оруулна уу"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
            />
            <Label htmlFor="showPassword">Нууц үгийг харах</Label>
          </div>
          <Button type="submit" className="w-full mt-4 ">
            Үргэлжлүүлэх
          </Button>
        </form>
      </div>
    </div>
  );
};
