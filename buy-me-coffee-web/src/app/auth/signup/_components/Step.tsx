"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/axios";
import { toast } from "sonner";

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
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username || "",
    },
    mode: "onBlur"
  });

  const checkUsernameAvailability = async (username: string) => {
    try {
      const res = await api.get(`/auth/check-username`, {
        params: { username },
      });

      // Хэрвээ username олдоогүй (available) бол true буцаана
      if (res.status === 200) {
        return true;
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        return "Энэ хэрэглэгчийн нэр аль хэдийн бүртгэлтэй байна.";
      }
      return "Алдаа гарлаа. Дахин оролдоно уу.";
    }
  };
  

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-[16px] font-[500]">Хэрэглэгчийн нэр</p>
          <Controller
            name="username"
            control={control}
            rules={{validate: checkUsernameAvailability}}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Хэрэглэгчийн нэрээ оруулна уу"
                  type="text"
                  className="w-[300px]"
                  onBlur={async () => {field.onBlur();
                    const isValid = await trigger("username")
                    if (!isValid && errors.username?.message) {
                      toast.error(errors.username.message);
                    }}}
                    
                />
              </div>
            )}
          />
          <Button type="submit" className="w-full">
            Үргэлжлүүлэх
          </Button>
        </form>
        <div className="flex justify-center items-center ">
          <span className="text-gray-500">Бүртгэлтэй юу?</span>
          <Link href="/auth/login" className="text-blue-600 ml-[10px]">
            Нэвтрэх
          </Link>
        </div>
      </div>
    </div>
  );
};
