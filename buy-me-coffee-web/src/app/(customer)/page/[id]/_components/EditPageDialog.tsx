"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../../../../_components/AuthProvider";
import { api } from "@/axios";

const editProfileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  socialMediaUrl: z.string().url("Зөв URL оруулна уу"),
});

type EditPageDialogFormData = z.infer<typeof editProfileSchema>;

export const EditPageDialog = () => {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EditPageDialogFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.profile?.name || "",
      about: user?.profile?.about || "",
      socialMediaUrl: user?.profile?.socialMediaUrl || "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: user?.profile?.name || "",
        about: user?.profile?.about || "",
        socialMediaUrl: user?.profile?.socialMediaUrl || "",
      });
    }
  }, [open, user?.profile, reset]);

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

  const onSubmit = async (data: EditPageDialogFormData) => {
    try {
      setLoading(true);

      await api.put(`/profile/${user?.id}`, {
        ...data,
        avatarImage: imagePreview,
      });

      toast.success("Амжилттай шинэчлэгдлээ");
      setImagePreview(null);
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Алдаа гарлаа");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F4F4F5] text-black text-[14px] font-[500] pb-[2px]">
          Edit Page
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[558px] h-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-2">
          <span className="text-[14px] text-black font-[500]">Зураг нэмэх</span>
          <label
            htmlFor="image"
            className="cursor-pointer w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative"
          >
            {imagePreview || user?.profile?.avatarImage ? (
              <img
                src={imagePreview || user?.profile.avatarImage}
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Нэр</Label>
            <Input id="name" {...register("name")} placeholder="Нэрээ оруулна уу" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">Өөрийн тухай</Label>
            <Textarea id="about" {...register("about")} placeholder="Өөрийнхөө тухай бичнэ үү" />
            {errors.about && <p className="text-sm text-red-500">{errors.about.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialMediaUrl">Сошл хуудсын холбоос</Label>
            <Input
              id="socialMediaUrl"
              {...register("socialMediaUrl")}
              placeholder="https://"
            />
            {errors.socialMediaUrl && (
              <p className="text-sm text-red-500">{errors.socialMediaUrl.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end">
            <Button type="submit" disabled={!isValid || loading} className="w-[246px] h-[40px] mt-4">
              {loading ? "Хадгалж байна..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
