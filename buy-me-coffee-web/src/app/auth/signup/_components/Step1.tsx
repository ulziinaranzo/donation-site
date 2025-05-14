"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sign } from "crypto";

const formSchema = z.object({
    email: z.string().min(6, {message: "6-с дээш тэмдэгттэй байх ёстой."}).email({message: "Имэйлээ зөв оруулна уу."}),
    password: z.string().min(6, {message: "6-с дээш тэмдэгттэй байх ёстой."}),
    confirmPassword: z.string().min(1, {message: "Нууц үг таарахгүй байна"}).refine((data) => data.password === data.confirmPassword, {
        message: "Нууц үг таарахгүй байна",
        path:["confirmPassword"]
    })
})
type FormData = {
  username: string;
  email: string;
  password: string;
};
    type  Step1Props = {
        handlePrev: () => void;
        handleNext: () => void;
        data: FormData;
        saveFormDataChange: (newData: Partial<FormData>) => void
    }


export const Step1 = ({handleNext, handlePrev, data, saveFormDataChange}: Step1Props) => {
    const [showPassword, setShowPassword] = useState(false)
    //   const { signUp } = useAuth();
    const { control, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(formSchema),
        defaultValues: {
            email: data.email || "",
            password: data.password || "",
            confirmPassword: ""
        }
    })

        const onSubmit = (savingData: FormData) => {
        saveFormDataChange(savingData)
        try {
            await signUp(savingData.email, savingData.password, savingData.username)
            console.log("Бүртгэл амжилттай");
            
        } catch (error) {
            console.error("Бүртгэхэд алдаа гарлаа")
        }
    }
  return (
  <div className="flex justify-center items-center">
    <div className="flex flex-col p-8 space-y-6 mt-[200px]">
        <div className="text-xl font-semibold text-gray-900">
              Шинэ бүртгэл үүсгэх
            </div>
            <p className="text-md text-gray-600">
            Бүртгүүлээд хоолоо захиалаарай.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Имэйлээ оруулна уу"
                    type="email"
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
            name="password" control={control} render={({ field }) => (
                <div>
                <Input {...field} type={showPassword ? "text" : "password"}
                placeholder="Нууц үг"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
                </div>
            })
            />
             <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="mt-4">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үг дахин"
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
                <Checkbox id="showPassword"
                checked={showPassword} onCheckedChange={(checked) => setShowPassword(Boolean(checked))}/>
                <Label htmlFor="showPassword"></Label>
            </div>
                      <Button type="submit" className="w-full">
            Үргэлжлүүлэх
          </Button>
          </form>
    </div>
    
  </div>
)
};
