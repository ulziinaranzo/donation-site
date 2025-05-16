"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    email: z.string().email({ message: "Имэйлээ зөв оруулна уу." }),
    password: z.string().min(6, { message: "Нууц үг 6-аас дээш тэмдэгттэй байх ёстой." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });

type FormData = {
  username: string;
  email: string;
  password: string;
};

type Step1FormData = z.infer<typeof formSchema>;

type Step1Props = {
  handlePrev: () => void;
  handleNext: () => void;
  data: FormData;
  saveFormDataChange: (newData: Partial<FormData>) => void;
};

const signUp = async (email: string, password: string, username: string) => {
  return new Promise((resolve) => {
    console.log("📝 Бүртгэл үүсгэж байна:", { email, password, username });
    setTimeout(() => resolve(true), 1000);
  });
};

export const Step1 = ({ handleNext, data, saveFormDataChange }: Step1Props) => {
  const [showPassword, setShowPassword] = useState(false);

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
      console.log("✅ Бүртгэл амжилттай");
      handleNext();
    } catch (error) {
      console.error("❌ Бүртгэхэд алдаа гарлаа", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col p-8 space-y-6 mt-[200px]">
        <div className="text-xl font-semibold text-gray-900">Имэйл, Нууц үг</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <Input {...field} type="email" placeholder="Имэйлээ оруулна уу" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Нууц үг дахин"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}
          />

          {/* Show password */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
            />
            <Label htmlFor="showPassword">Нууц үг харах</Label>
          </div>

          <Button type="submit" className="w-full">
            Бүртгүүлэх
          </Button>
        </form>
      </div>
    </div>
  );
};
