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
import { api } from "@/axios";
import { useAuth } from "@/app/_components/AuthProvider";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

const newPasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Одоогийн нууц үгээ оруулна уу"),
    password: z.string().min(6, "Нууц үгээ оруулна уу"),
    confirmPassword: z.string().min(6, "Нууц үгээ давтан оруулна уу"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

type NewPasswordData = z.infer<typeof newPasswordSchema>;

export const ChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: NewPasswordData) => {
    if (!user?.id) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй");
      return;
    }

    setLoading(true);
    try {
      await api.put(`auth/change-password/${user.id}`, {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      });

      // Form-ийг цэвэрлэх
      reset();
      toast.success("Нууц үг амжилттай солигдлоо!");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Нууц үг солиход алдаа гарлаа");
      }
      console.error("Нууц үг солиход алдаа гарлаа", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Мэдээлэл ачаалж байна...</span>
      </div>
    );
  }

  return (
    <Card className="w-[650px] mb-[32px]">
      <CardHeader>
        <CardTitle className="text-[16px] font-[700]">
          Шинэ нууц үг үүсгэх
        </CardTitle>
        <CardDescription>Нууц үгээ солих юм уу тэ?</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currentPassword">Хуучин нууц үг</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Хуучин нууц үгээ оруулна уу"
                {...register("currentPassword")}
                disabled={loading}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Шинэ нууц үг</Label>
              <Input
                id="password"
                type="password"
                placeholder="Шинэ нууц үгээ оруулна уу"
                {...register("password")}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">
                Нууц үгээ давтан оруулна уу
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Нууц үгээ давтан оруулна уу"
                {...register("confirmPassword")}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="w-full h-[40px] mt-4 bg-black disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
