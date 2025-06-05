"use client";
import { useAuth } from "@/app/_components/AuthProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { SuccessMessage } from "./SuccessPage";
import { DonateCard } from "./DonateCard";

const donateSchema = z.object({
  amount: z.coerce.number().min(1, "Donation-ий дүн сонгоно уу"),
  socialMediaUrl: z.string().min(1, "Сошиал медиа холбоосоо тавиарай"),
  specialMessage: z.string().min(1, "Сэтгэлийн үгээ оруулна уу"),
});

export type DonationFormData = z.infer<typeof donateSchema>;

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
      const response = await api.post("/donation/create-donation", {
        ...data,
        amount: parseInt(selectedDonation.label.slice(1), 10),
        recipientId,
        senderId: user?.id ?? null,
      });

      const createdDonation = response.data;
      setDonationId(createdDonation.id);

      window.open(
        `${selectedDonation.url}?client_reference_id=${createdDonation.id}`,
        "_blank"
      );
    } catch (error) {
      toast.error("Алдаа гарлаа");
      console.error("Donation error:", error);
    }
  };

  useEffect(() => {
    if (!donationId) return;

    const checkPayment = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data } = await api.get(`/donation/${donationId}`);
      if (data?.isPaid) {
        setIsPaid(true);
        if (refetchDonations) await refetchDonations();
      }
    };

    checkPayment();
  }, [donationId, refetchDonations]);

  const handleAmountClick = (item: (typeof donations)[0]) => {
    setSelectedDonation(item);
    setValue("amount", parseInt(item.label.slice(1), 10), {
      shouldValidate: true,
    });
  };

  if (isPaid) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-white opacity-20">
        <SuccessMessage recipientId={recipientId!} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DonateCard
          user={user ?? null}
          donations={donations}
          selectedDonation={selectedDonation}
          handleAmountClick={handleAmountClick}
          register={register}
          errors={errors}
          isValid={isValid}
        />
      </form>
    </div>
  );
};
