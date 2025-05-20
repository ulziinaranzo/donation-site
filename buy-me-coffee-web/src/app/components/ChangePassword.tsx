"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newPasswordSchema = z
  .object({
    password: z.string().min(6, "Нууц үгээ оруулна уу"),
    confirmPassword: z.string().min(6, "Нууц үгээ давтан оруулна уу"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

type NewPasswordData = z.infer<typeof newPasswordSchema>;

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: NewPasswordData) => {
    console.log("Password changed", data);
  };
  return (
    <Card className="w-[650px] mb-[32px]">
      <CardHeader>
        <CardTitle className="text-[16px] font-[700]">Шинэ нууц үг үүсгэх</CardTitle>
        <CardDescription>Нууц үгээ солих юм уу тэ?</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Шинэ нууц үг</Label>
              <Input
                id="password"
                type="password"
                placeholder="Шинэ нууц үг"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Нууц үгээ давтан оруулна уу</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="w-full h-[40px] mt-4 bg-black"
            disabled={!isValid}
          >
Хадгалах          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
