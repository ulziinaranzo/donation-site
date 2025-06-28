"use client";

import React, { useEffect } from "react";
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
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePaymentFormData>({
    resolver: zodResolver(changePaymentSchema),
  });

  useEffect(() => {
    console.log("User bankCard мэдээлэл:", user?.bankCard);

    if (user?.bankCard) {
      const cardData = {
        firstName: user.bankCard.firstName || "",
        lastName: user.bankCard.lastName || "",
        cardNumber: user.bankCard.cardNumber || "",
        expiryDate: user.bankCard.expiryDate
          ? new Date(user.bankCard.expiryDate).toISOString().slice(0, 7)
          : "",
        cvc: user.bankCard.cvc || "",
      };

      console.log("Card мэдээлэл:", cardData); // Debug
      reset(cardData);
    }
  }, [user, reset]);

  const onSubmit = async (data: ChangePaymentFormData) => {
    if (!user?.bankCard?.id) {
      toast.error("Картын мэдээлэл олдсонгүй");
      return;
    }

    try {
      setLoading(true);
      console.log("Илгээх мэдээлэл:", data); // Debug

      await api.put(`/bank-card/${user.bankCard.id}`, {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        cardNumber: data.cardNumber.replace(/\s/g, ""),
      });

      await getUser();
      toast.success("Амжилттай хадгалагдлаа");
    } catch (error) {
      toast.error("Карт өөрчлөхөд алдаа гарлаа");
      console.error("Card update error:", error);
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

  if (!user.bankCard) {
    return (
      <Card className="w-[650px] mb-[32px]">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            Картын мэдээлэл олдсонгүй. Эхлээд карт нэмнэ үү.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[650px] mb-[32px]">
      <CardHeader>
        <CardTitle>Картын мэдээлэл өөрчлөх</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Нэр</Label>
            <Input {...register("firstName")} disabled={loading} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label>Овог</Label>
            <Input {...register("lastName")} disabled={loading} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <Label>Картын дугаар</Label>
            <Input {...register("cardNumber")} disabled={loading} />
            {errors.cardNumber && (
              <p className="text-sm text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div>
            <Label>Хугацаа (YYYY-MM)</Label>
            <Input
              type="month"
              {...register("expiryDate")}
              disabled={loading}
            />
            {errors.expiryDate && (
              <p className="text-sm text-red-500">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <Label>CVC</Label>
            <Input {...register("cvc")} disabled={loading} />
            {errors.cvc && (
              <p className="text-sm text-red-500">{errors.cvc.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-black"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Хадгалж байна...
              </>
            ) : (
              "Хадгалах"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
