"use client";

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

const paymentSchema = z.object({
  country: z.string().min(1, "Улсаа сонгоно уу"),
  firstName: z.string().min(1, "Нэрээ оруулна уу"),
  lastName: z.string().min(1, "Овгоо оруулна уу"),
  cardNumber: z.string().min(16, "Картын дугаараа оруулна уу"),
  expiryMonth: z.string().min(1, "Дуусах сар"),
  expiryYear: z.string().min(1, "Дуусах он"),
  cvc: z.string().min(3, "CVC-ээ оруулна уу"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log("Payment Data:", data);
  };

  return (
    <div className="min-h-screen flex  bg-white px-[30%] py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-6"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Банкны мэдээлэл</h2>
          <p className="text-sm text-gray-500">
            Байршил болон картын мэдээллээ оруулна уу
          </p>
        </div>

        <div className="space-y-2">
          <Label>Улс</Label>
          <Select onValueChange={(value) => setValue("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Нэр</Label>
            <Input
              placeholder="Enter your name here"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Овог</Label>
            <Input
              placeholder="Enter your name here"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Картын дугаараа оруулна уу</Label>
          <Input
            placeholder="XXXX-XXXX-XXXX-XXXX"
            {...register("cardNumber")}
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Дуусах хугацаа</Label>
            <Select onValueChange={(value) => setValue("expiryMonth", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem
                    key={i + 1}
                    value={(i + 1).toString().padStart(2, "0")}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.expiryMonth && (
              <p className="text-sm text-red-500">
                {errors.expiryMonth.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Year</Label>
            <Select onValueChange={(value) => setValue("expiryYear", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.expiryYear && (
              <p className="text-sm text-red-500">
                {errors.expiryYear.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>CVC</Label>
            <Input placeholder="CVC" {...register("cvc")} />
            {errors.cvc && (
              <p className="text-sm text-red-500">{errors.cvc.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-[246px] mt-4" disabled={!isValid}>
            Үргэлжлүүлэх
          </Button>
        </div>
      </form>
    </div>
  );
}
