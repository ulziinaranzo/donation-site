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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const profileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  url: z.string().url("Зөв URL оруулна уу"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ChangeCompleteProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Submitted data:", data);
  };

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
    <div className="flex flex-col bg-whit mb-[32px] mt-[32px]">
      <Card className="w-[650px] space-y-8">
        <CardHeader>
          <CardTitle className="text-[16px] font-[700]">Хувийн мэдээлэл</CardTitle>
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
                    onChange={handleImageChange}
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="w-full h-[40px] mt-4 bg-[black] text-white"
            disabled={!isValid}
          >
          Хадгалах
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
