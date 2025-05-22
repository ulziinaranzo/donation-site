"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." })
    .email({ message: "Имэйлээ зөв оруулна уу." }),
  password: z.string().min(6, { message: "6-с дээш тэмдэгттэй байх ёстой." }),
});
type FormData = {
  email: string;
  password: string;
};
type StepProps = {
  handlePrev: () => void;
  handleNext: () => void;
  data: FormData;
  saveFormDataChange: (newData: Partial<FormData>) => void;
};
type SignupFormData = z.infer<typeof formSchema>;
export const Step = ({
  handleNext,
  handlePrev,
  data,
  saveFormDataChange,
}: StepProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = (savingData: SignupFormData) => {
    saveFormDataChange(savingData);
    handleNext();
  };
  return (
    <div className="w-[800px] h-screen flex justify-center items-center pb-[100px]">
      <div className="flex p-8 space-y-6 flex-col items-start">
        <div className="text-xl font-semibold text-gray-900">Welcome back!</div>
        <p className="text-md text-gray-600">Бүртгүүлээд хоолоо захиалаарай.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Хэрэглэгчийн мэйлээ оруулна уу"
                  type="text"
                  className="w-[300px]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Нууц үгээ оруулна уу"
                  type="text"
                  className="w-[300px]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />
          <Button type="submit" className="w-full">
            Нэвтрэх
          </Button>
        </form>
      </div>
    </div>
  );
};
