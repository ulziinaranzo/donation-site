"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/axios";
import { useAuth } from "../_components/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const paymentSchema = z.object({
  country: z.string().min(1, "Улсаа сонгоно уу"),
  firstName: z.string().min(1, "Нэрээ оруулна уу"),
  lastName: z.string().min(1, "Овгоо оруулна уу"),
  cardNumber: z
    .string()
    .regex(/^(\d{4}-){3}\d{4}$/, "Картын дугаар нь XXXX-XXXX-XXXX-XXXX форматтай байх ёстой"),
  expiryMonth: z.string().min(1, "Дуусах сар"),
  expiryYear: z.string().min(1, "Дуусах он"),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, "CVC нь 3 эсвэл 4 оронтой байх ёстой"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setLoading(true);

      const response = await api.post(`/bank-card/${user?.id}`, {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        cardNumber: data.cardNumber.replace(/\s/g, ""),
      });

      toast.success("Амжилттай хадгалагдлаа");
      router.push("/");
    } catch (error) {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white px-[30%] py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Банкны мэдээлэл</h2>
          <p className="text-sm text-gray-500">Байршил болон картын мэдээллээ оруулна уу</p>
        </div>

        <div className="space-y-2">
          <Label>Улс <span className="text-red-500">*</span></Label>
          <Select onValueChange={(value) => setValue("country", value, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="mongolia">Mongolia</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Нэр <span className="text-red-500">*</span></Label>
            <Input placeholder="Enter your name here" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Овог <span className="text-red-500">*</span></Label>
            <Input placeholder="Enter your last name here" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Картын дугаар <span className="text-red-500">*</span></Label>
          <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...register("cardNumber")} />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Дуусах сар <span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => setValue("expiryMonth", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Сар" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0");
                  return <SelectItem key={month} value={month}>{month}</SelectItem>;
                })}
              </SelectContent>
            </Select>
            {errors.expiryMonth && (
              <p className="text-sm text-red-500">{errors.expiryMonth.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Дуусах он <span className="text-red-500">*</span></Label>
            <Select onValueChange={(value) => setValue("expiryYear", value, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Он" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString();
                  return <SelectItem key={year} value={year}>{year}</SelectItem>;
                })}
              </SelectContent>
            </Select>
            {errors.expiryYear && (
              <p className="text-sm text-red-500">{errors.expiryYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>CVC <span className="text-red-500">*</span></Label>
            <Input placeholder="CVC" {...register("cvc")} />
            {errors.cvc && (
              <p className="text-sm text-red-500">{errors.cvc.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-[246px] mt-4" disabled={!isValid || loading}>
            {loading ? "Түр хүлээнэ үү..." : "Үргэлжлүүлэх"}
          </Button>
        </div>
      </form>
    </div>
  );
}
