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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type ChangePaymentFormData = z.infer<typeof paymentSchema>;

const countries = [
  { code: "mn", name: "Монгол" },
  { code: "us", name: "United States" },
  { code: "uk", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "cn", name: "China" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  { code: "au", name: "Australia" },
];

export default function ChangePaymentDetails() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ChangePaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ChangePaymentFormData) => {
    console.log("Payment Data:", data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Банкны мэдээлэл</CardTitle>
          <CardDescription>
            Байршил болон картын мэдээллээ оруулна уу
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Улс */}
            <div className="space-y-2">
              <Label>Улс</Label>
              <Select onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Улсаа сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            {/* Нэр, овог */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Нэр</Label>
                <Input
                  placeholder="Нэрээ оруулна уу"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Овог</Label>
                <Input
                  placeholder="Овгоо оруулна уу"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Картын дугаар */}
            <div className="space-y-2">
              <Label>Картын дугаар</Label>
              <Input
                placeholder="XXXX-XXXX-XXXX-XXXX"
                {...register("cardNumber")}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            {/* Дуусах сар, он, CVC */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Дуусах сар</Label>
                <Select
                  onValueChange={(value) => setValue("expiryMonth", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сар" />
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
                <Label>Дуусах он</Label>
                <Select
                  onValueChange={(value) => setValue("expiryYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Он" />
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
          </CardContent>
          <div className="flex justify-end p-6 pt-0">
            <Button type="submit" className="w-[246px]" disabled={!isValid}>
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
