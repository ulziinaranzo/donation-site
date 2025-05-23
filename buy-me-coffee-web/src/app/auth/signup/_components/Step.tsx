"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Хамгийн багадаа 2 тэмдэгт байх ёстой." }),
});

type FormData = {
  username: string;
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
      username: data.username || "",
    },
  });

  const onSubmit = (savingData: SignupFormData) => {
    saveFormDataChange(savingData);
    handleNext();
  };
  return (
    <div className="w-[800px] h-screen flex justify-center items-center pb-[100px]">
      <div className="flex p-8 space-y-6 flex-col items-start">
        <div className="text-xl font-semibold text-gray-900">
          Шинэ бүртгэл үүсгэх
        </div>
        <p className="text-md text-gray-600">Бүртгүүлээд хоолоо захиалаарай.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                  type="text"
                  className="w-[300px]"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}
          />
          <Button type="submit" className="w-full">
            Үргэлжлүүлэх
          </Button>
        </form>
        <div className="flex justify-center items-center ">
          <span className="text-gray-500">Бүртгэлтэй юу?</span>
          <Link href="/auth/login" className="text-blue-600">
            Нэвтрэх
          </Link>
        </div>
      </div>
    </div>
  );
};
