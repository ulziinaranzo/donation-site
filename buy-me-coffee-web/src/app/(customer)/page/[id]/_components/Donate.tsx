"use client";

import { useAuth } from "@/app/_components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-select";
import { Coffee } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/axios";
import { toast } from "sonner";
import { useState } from "react";

const donateSchema = z.object({
  amount: z.string().min(1, "Donation-ий дүн сонгоно уу"),
  socialMediaUrl: z.string().min(1, "Сошиал медиа холбоосоо тавиарай"),
  specialMessage: z.string().min(1, "Сэтгэлийн үгээ оруулна уу"),
});

type DonationFormData = z.infer<typeof donateSchema>;

export const Donate = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DonationFormData) => {
    try {
      await api.put("/donation/create-donation", {
        ...data,
        amount: Number(data.amount), // backend-д number гэж үзвэл
      });
      toast.success("Амжилттай donation илгээгдлээ, баярлалаа");
      console.log("Donation", data);
    } catch (error) {
      toast.error("Алдаа гарлаа");
      console.error("Error", error);
    }
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount.toString());
    setValue("amount", amount.toString(), { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mb-[50px] p-[24px] w-[623px]">
        <CardHeader className="text-2xl font-semibold">
          Buy {user?.profile?.name || "them"} a Coffee
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Select amount:</Label>
            <div className="flex gap-2 flex-wrap mt-2">
              {[1, 2, 5, 10].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount.toString() ? "default" : "outline"}
                  className="bg-[#F4F4F5CC] w-[72px]"
                  onClick={() => handleAmountClick(amount)}
                >
                  <Coffee className="mr-1" />${amount}
                </Button>
              ))}
            </div>
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <Label>Сошл медиа холбоосоо үлдээнэ үү:</Label>
            <Input
              id="socialMediaUrl"
              placeholder="buymeacoffee.com/your-username"
              className="mt-1"
              {...register("socialMediaUrl")}
            />
            {errors.socialMediaUrl && (
              <p className="text-sm text-red-500">{errors.socialMediaUrl.message}</p>
            )}
          </div>
          <div>
            <Label>Сэтгэлийн үгээ бичээрэй:</Label>
            <Textarea
              id="specialMessage"
              placeholder="Please write your message here."
              className="h-[153px] mt-1"
              {...register("specialMessage")}
            />
            {errors.specialMessage && (
              <p className="text-sm text-red-500">{errors.specialMessage.message}</p>
            )}
          </div>
          <Button className="w-full mt-4 bg-black text-white" type="submit" disabled={!isValid}>
            Support
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
