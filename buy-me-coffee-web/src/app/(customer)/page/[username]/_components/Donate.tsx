"use client";

import { useAuth } from "@/app/_components/AuthProvider";
import { Coffee, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SuccessMessage } from "./SuccessPage";

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

const donations = [
  {
    label: "$1",
    url: "https://buy.stripe.com/test_bJe9AT3G4f241sagJFcjS03",
  },
  {
    label: "$2",
    url: "https://buy.stripe.com/test_5kQdR9b8w07a0o6bplcjS02",
  },
  {
    label: "$5",
    url: "https://buy.stripe.com/test_14AcN5foMaLO5IqctpcjS01",
  },
  {
    label: "$6",
    url: "https://buy.stripe.com/test_9B65kDekI2fieeWalhcjS00",
  },
];

export const Donate = ({ recipientId, refetchDonations }: DonateProps) => {
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState<
    (typeof donations)[0] | null
  >(null);
  const [donationId, setDonationId] = useState<number | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

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
    if (!selectedDonation) {
      toast.error("Дүн сонгоно уу");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/donation/create-donation", {
        ...data,
        amount: parseInt(selectedDonation.label.slice(1), 10),
        recipientId,
        ...(user?.id && { senderId: user.id }),
      });

      const createdDonation = response.data;
      setDonationId(createdDonation.id);
      setPaymentFailed(false);

      window.open(
        `${selectedDonation.url}?client_reference_id=${createdDonation.id}`,
        "_blank"
      );
    } catch (error) {
      toast.error("Алдаа гарлаа");
      console.error("Donation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!donationId) return;

    let retryCount = 0;
    const maxRetries = 10;

    const checkPayment = async () => {
      try {
        const { data } = await api.get(`/donation/${donationId}`);

        if (data?.isPaid) {
          setIsPaid(true);
          if (refetchDonations) await refetchDonations();
          return;
        }

        retryCount++;
        if (retryCount < maxRetries) {
          const delay =
            retryCount <= 3 ? Math.pow(2, retryCount) * 1000 : 10000;
          setTimeout(checkPayment, delay);
        } else {
          setPaymentFailed(true);
          toast.error("Төлбөр шалгах хугацаа хэтэрлээ.");
        }
      } catch (err) {
        console.error("Payment check error:", err);
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(checkPayment, 5000);
        } else {
          setPaymentFailed(true);
        }
      }
    };

    checkPayment();
  }, [donationId, refetchDonations]);

  // ✅ Төлөвүүдийн дагуу UI-г сольж return хийх хэсэг:
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-gray-800" />
        <div className="text-black text-lg">
          Donation хийгдэхийг хүлээж байна...
        </div>
      </div>
    );
  }

  if (paymentFailed) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white space-y-4">
        <p className="text-2xl font-bold text-red-600">
          Төлбөр амжилтгүй боллоо 😢
        </p>
        <p className="text-gray-600">
          Хэрэв та амжилттай төлсөн бол хуудас дахин ачаална уу.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-black text-white"
        >
          Дахин оролдох
        </Button>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
        <SuccessMessage recipientId={recipientId!} />
      </div>
    );
  }

  const handleAmountClick = (item: (typeof donations)[0]) => {
    setSelectedDonation(item);
    setValue("amount", parseInt(item.label.slice(1), 10), {
      shouldValidate: true,
    });
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
          >
            Support
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
