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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/_components/AuthProvider";

const formatCardNumber = (value: string) =>
  value.replace(/\D/g, "")
       .replace(/(.{4})/g, "$1-")
       .slice(0, 19)
       .replace(/-$/, "");

const paymentSchema = z.object({
  country: z.string().min(1, "Улсаа сонгоно уу"),
  firstName: z.string().min(1, "Нэрээ оруулна уу"),
  lastName: z.string().min(1, "Овгоо оруулна уу"),
  cardNumber: z.string().regex(/^(\d{4}-){3}\d{4}$/, "Картын дугаар буруу"),
  expiryMonth: z.string().min(1, "Сар сонгоно уу"),
  expiryYear: z.string().min(1, "Он сонгоно уу"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC 3-4 оронтой байх ёстой"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
const expiry = user?.bankCard?.expiryDate ? new Date(user.bankCard.expiryDate) : null
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      country: user?.bankCard?.country || "",
      firstName: user?.bankCard?.firstName || "",
      lastName: user?.bankCard?.lastName || "",
      cardNumber: user?.bankCard?.cardNumber || "",
      expiryMonth: expiry? String(expiry.getMonth() + 1).padStart(2, "0") : "",
      expiryYear: expiry? String(expiry.getFullYear()) : "",
      cvc: user?.bankCard?.cvc || "",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setLoading(true);

      await api.put(`/bank-card/${user?.id}`, {
        ...data,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        cardNumber: data.cardNumber.replace(/-/g, ""),
        expiryDate: `${data.expiryMonth}/${data.expiryYear}`,
      });

      toast.success("Амжилттай хадгалагдлаа");
      router.push("/");
    } catch (error) {
      toast.error("Карт нэмэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white px-[30%] py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Банкны мэдээлэл</h2>
          <p className="text-sm text-gray-500">Картын мэдээллээ оруулна уу</p>
        </div>
        <div className="space-y-2">
          <Label>Улс <span className="text-red-500">*</span></Label>
          <Select onValueChange={(value) => setValue("country", value, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mongolia">Mongolia</SelectItem>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Нэр *</Label>
            <Input placeholder="Нэр" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Овог *</Label>
            <Input placeholder="Овог" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Картын дугаар *</Label>
          <Input
            placeholder="XXXX-XXXX-XXXX-XXXX"
            {...register("cardNumber")}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              setValue("cardNumber", formatted, { shouldValidate: true });
            }}
            value={watch("cardNumber")}
          />
          {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Сар *</Label>
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
            {errors.expiryMonth && <p className="text-sm text-red-500">{errors.expiryMonth.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Он *</Label>
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
            {errors.expiryYear && <p className="text-sm text-red-500">{errors.expiryYear.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>CVC *</Label>
            <Input type="number" placeholder="CVC" {...register("cvc")} />
            {errors.cvc && <p className="text-sm text-red-500">{errors.cvc.message}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-[246px]" disabled={!isValid || loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" /> }
            {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
          </Button>
        </div>
      </form>
    </div>
  );
}
