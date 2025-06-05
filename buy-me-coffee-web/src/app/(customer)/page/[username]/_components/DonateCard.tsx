"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { DonationFormData } from "./Donate";
import { User } from "@/app/_components/AuthProvider";

export type Donation = {
  label: string;
  url: string;
};

interface DonateCardProps {
  user: User | null | undefined;
  donations: { label: string; url: string }[];
  selectedDonation: { label: string; url: string } | null;
  handleAmountClick: (item: { label: string; url: string }) => void;
  register: UseFormRegister<DonationFormData>;
  errors: Partial<Record<keyof DonationFormData, { message?: string }>>;
  isValid: boolean;
}

export const DonateCard = ({
  user,
  donations,
  selectedDonation,
  handleAmountClick,
  register,
  errors,
  isValid,
}: DonateCardProps) => {
  return (
    <Card className="mb-[50px] p-[24px] w-[623px]">
      <CardHeader className="text-2xl font-semibold">
        Buy {user?.profile?.name || "them"} a Coffee
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Select amount:</Label>
          <div className="flex gap-2 flex-wrap mt-2">
            {donations.map((item) => (
              <Button
                key={item.label}
                type="button"
                variant={
                  item.label === selectedDonation?.label
                    ? "default"
                    : "secondary"
                }
                className="bg-[#F4F4F5CC] w-[72px]"
                onClick={() => handleAmountClick(item)}
              >
                <Coffee className="mr-1" />
                {item.label}
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
            <p className="text-sm text-red-500 mt-1">
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
            <p className="text-sm text-red-500 mt-1">
              {errors.specialMessage.message}
            </p>
          )}
        </div>

        <Button
          className="w-full mt-4 bg-black text-white"
          type="submit"
          disabled={!isValid}
        >
          Support
        </Button>
      </CardContent>
    </Card>
  );
};
