"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "@/axios";
import { useAuth } from "../_components/AuthProvider";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  url: z.string().url("Зөв URL оруулна уу"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  // const onSubmit = (data: ProfileFormData) => {
  //   try {
  //     const { data } = await api.post("/profile/:userId",
  //      {avatarImage, about, name, socialMediaUrl, backgroundImage, successMessage}
  //     )
  //   }
  //   toast.success("Амжилттай профайл үүслээ")
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-[30%] py-12 bg-white">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-[24px] font-[600] text-left">
          Профайл хуудсаа бөглөнө үү
        </h1>

        <div className="flex flex-col space-y-2">
          <span className="text-[14px] text-black font-[500]">Зураг нэмэх</span>
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
              onChange={handleImageChange}
            />
          </label>
        </div>

      </div>
    </div>
  );
}
