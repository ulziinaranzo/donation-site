"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/axios";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/app/_components/AuthProvider";

const changePaymentSchema = z.object({
  firstName: z.string().min(1, "Нэрээ оруулна уу"),
  lastName: z.string().min(1, "Овгоо оруулна уу"),
  cardNumber: z.string().min(16, "Картын дугаар буруу"),
  expiryDate: z.string().min(1, "Хугацааг оруулна уу"),
  cvc: z.string().min(3, "CVC буруу"),
});

type ChangePaymentFormData = z.infer<typeof changePaymentSchema>;

export default function ChangePaymentDetails() {
  const { user, getUser } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePaymentFormData>({
    resolver: zodResolver(changePaymentSchema),
    defaultValues: {
      firstName: user?.bankCard?.firstName || "",
      lastName: user?.bankCard?.lastName || "",
      cardNumber: user?.bankCard?.cardNumber || "",
      expiryDate: user?.bankCard?.expiryDate
        ? new Date(user.bankCard.expiryDate).toISOString().slice(0, 7)
        : "",
      cvc: user?.bankCard?.cvc || "",
    },
  });

  const onSubmit = async (data: ChangePaymentFormData) => {
    try {
      setLoading(true);
      await api.put(`/bank-card/${user?.bankCard?.id}`, {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        cardNumber: data.cardNumber.replace(/\s/g, ""),
      });
      await getUser();
      toast.success("Амжилттай хадгалагдлаа");
    } catch {
      toast.error("Карт нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[650px] mb-[32px]">
      <CardHeader>
        <CardTitle>Картын мэдээлэл өөрчлөх</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Нэр</Label>
            <Input {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label>Овог</Label>
            <Input {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label>Картын дугаар</Label>
            <Input {...register("cardNumber")} />
            {errors.cardNumber && (
              <p className="text-sm text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label>Хугацаа (YYYY-MM)</Label>
            <Input type="month" {...register("expiryDate")} />
            {errors.expiryDate && (
              <p className="text-sm text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <Label>CVC</Label>
            <Input {...register("cvc")} />
            {errors.cvc && (
              <p className="text-sm text-red-500">{errors.cvc.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-black">
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            ) : (
              "Хадгалах"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
