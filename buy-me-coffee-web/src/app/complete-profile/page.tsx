"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaymentForm from "./_components/PaymentForm";
import { api } from "@/axios";
import { useAuth } from "../_components/AuthProvider";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  url: z.string().url("Зөв URL оруулна уу"),
  imgUrl: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

export default function ChangeCompleteProfilePage() {
  const { user } = useAuth();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [payment, setPayment] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await api.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Зураг илгээхэд алдаа гарлаа");
      return null;
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      const deployed = await uploadImage(file);
      if (deployed) {
        setUploadedUrl(deployed);
        setValue("imgUrl", deployed);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setUploadedUrl("");
    setValue("imgUrl", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await api.put(`/profile/${user?.id}`, {
        ...data,
        image: uploadedUrl,
      });
      toast.success("Амжилттай хадгалагдлаа");
      setPayment(true);
    } catch (error) {
      console.error("Алдаа гарлаа", error);
      toast.error("Алдаа гарлаа");
    }
  };

  return (
    <div className="flex flex-col bg-whit mb-[32px] mt-[32px] pl-[100px]">
      <Card className="w-[650px] space-y-8">
        <CardHeader>
          <CardTitle className="text-[16px] font-[700]">
            Хувийн мэдээлэл
          </CardTitle>
          <CardDescription>Профайл хуудсаа бөглөнө үү</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Зураг нэмэх</Label>
                <label
                  htmlFor="image"
                  className="cursor-pointer w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-[28px] h-[28px] text-gray-500" />
                  )}
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Нэр</Label>
                <Input
                  id="name"
                  placeholder="Нэрээ оруулна уу"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">Өөрийн тухай</Label>
                <Textarea
                  id="about"
                  placeholder="Өөрийнхөө тухай бичнэ үү"
                  {...register("about")}
                />
                {errors.about && (
                  <p className="text-sm text-red-500">{errors.about.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Сошл хуудсын холбоос</Label>
                <Input id="url" placeholder="https://" {...register("url")} />
                {errors.url && (
                  <p className="text-sm text-red-500">{errors.url.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-[40px] mt-4 bg-[black] text-white"
                disabled={!isValid}
              >
                Хадгалах
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {payment && <PaymentForm />}
    </div>
  );
}
