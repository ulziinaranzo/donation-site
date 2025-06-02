"use client";

import { useAuth } from "@/app/_components/AuthProvider";
import { Coffee } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/axios";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SuccessMessage } from "./SuccessPage";
import { motion } from "framer-motion";

const donateSchema = z.object({
  amount: z.coerce.number().min(1, "Donation-ий дүн сонгоно уу"),
  socialMediaUrl: z.string().min(1, "Сошиал медиа холбоосоо тавиарай"),
  specialMessage: z.string().min(1, "Сэтгэлийн үгээ оруулна уу"),
});

type DonationFormData = z.infer<typeof donateSchema>;

interface DonateProps {
  recipientId?: number;
  refetchDonations?: () => Promise<void>;
}

export const Donate = ({ recipientId, refetchDonations }: DonateProps) => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: DonationFormData) => {
    try {
      await api.post("/donation/create-donation", {
        ...data,
        recipientId,
        ...(user?.id && { senderId: user.id }),
      });

      toast.success("Амжилттай donation илгээгдлээ, баярлалаа");
      setIsDialogOpen(true);
      reset();

      if (refetchDonations) {
        await refetchDonations();
      }
    } catch (error) {
      toast.error("Алдаа гарлаа");
      console.error("Error", error);
    }
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setValue("amount", amount, { shouldValidate: true });
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
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
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className="bg-[#F4F4F5CC] w-[72px]"
                  onClick={() => handleAmountClick(amount)}
                >
                  <Coffee className="mr-1" />${amount}
                </Button>
              ))}
            </div>
            {errors.amount && (
              <p className="text-sm text-red-500 mt-1">
                {errors.amount.message}
              </p>
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
              <p className="text-sm text-red-500">
                {errors.socialMediaUrl.message}
              </p>
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
              <p className="text-sm text-red-500">
                {errors.specialMessage.message}
              </p>
            )}
          </div>
          <Button
            className="w-full mt-4 bg-black text-white"
            type="submit"
            disabled={!isValid}
            onClick={() => setIsDialogOpen(true)}
          >
            Support
          </Button>
        </CardContent>
      </Card>
      <SuccessMessage
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        recipientId={recipientId!}
      />
    </form>
  );
};
export default Donate;
