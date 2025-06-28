"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/AuthProvider";
import axios from "axios";

const profileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  socialMediaUrl: z.string().url("Зөв URL оруулна уу"),
  avatarImage: z.string().url().or(z.literal("")).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const UPLOAD_PRESET = "food-delivery";
const CLOUD_NAME = "dfjv83cxe";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "all",
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    setLoadingImage(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error: unknown) {
      console.error("Алдаа:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Алдаа гарлаа");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа");
      }
    } finally {
      setLoadingImage(false);
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
        setValue("avatarImage", deployed, { shouldValidate: true });
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUploadedUrl("");
    setValue("avatarImage", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.username) {
      toast.error("Нэвтэрсэн хэрэглэгч олдсонгүй");
      return;
    }

    try {
      await api.post(`/profile/${user.username}`, {
        ...data,
        avatarImage: data.avatarImage || uploadedUrl,
      });

      toast.success("Амжилттай хадгалагдлаа");
      router.push("/payment");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Алдаа:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Алдаа гарлаа");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа");
      }
    }
  };

  useEffect(() => {
    if (uploadedUrl) {
      setValue("avatarImage", uploadedUrl, { shouldValidate: true });
    }
  }, [uploadedUrl, setValue]);

  useEffect(() => {
    document.body.style.overflow =
      isSubmitting || loadingImage ? "hidden" : "auto";
  }, [isSubmitting, loadingImage]);

  useEffect(() => {
    if (user?.profile?.avatarImage) {
      setImagePreview(user.profile.avatarImage);
      setUploadedUrl(user.profile.avatarImage);
    }
  }, [user?.profile?.avatarImage]);

  return (
    <div className="relative flex flex-col bg-white mb-8 mt-8 pl-[30%]">
      {(isSubmitting || loadingImage) && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-800" />
        </div>
      )}

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
                <Label htmlFor="image">Зураг нэмэх</Label>
                <label
                  htmlFor="image"
                  className="cursor-pointer w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative"
                >
                  {loadingImage ? (
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                  ) : imagePreview || uploadedUrl ? (
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={imagePreview || uploadedUrl}
                        alt="Preview"
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 650px) 100vw, 650px"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100"
                        title="Зураг устгах"
                      >
                        <X size={18} className="text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <Camera className="w-[28px] h-[28px] text-gray-500" />
                  )}
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileRef}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                {errors.about && (
                  <p className="text-sm text-red-500">{errors.about.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialMediaUrl">Сошл хуудсын холбоос</Label>
                <Input
                  id="socialMediaUrl"
                  placeholder="https://"
                  {...register("socialMediaUrl")}
                  disabled={isSubmitting}
                />
                {errors.socialMediaUrl && (
                  <p className="text-sm text-red-500">
                    {errors.socialMediaUrl.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-[40px] mt-4 bg-black text-white"
                disabled={!isValid || isSubmitting || loadingImage}
              >
                {isSubmitting && (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                )}
                {isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
