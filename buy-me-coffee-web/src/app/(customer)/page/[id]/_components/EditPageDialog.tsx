"use client";

import { useEffect, useRef, useState } from "react";
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
import axios from "axios";

const editProfileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  socialMediaUrl: z.string().url("Зөв URL оруулна уу"),
  avatarImage: z.string().optional(),
});

type EditPageDialogFormData = z.infer<typeof editProfileSchema>;

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

export const EditPageDialog = () => {
  const { user, setUser, getUser } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deployedImg, setDeployedImg] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<EditPageDialogFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.profile?.name || "",
      about: user?.profile?.about || "",
      socialMediaUrl: user?.profile?.socialMediaUrl || "",
      avatarImage: user?.profile?.avatarImage || "",
    },
  });

  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `http://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.url;
    } catch (error) {
      toast.error("Зураг deploy хийхэд алдаа гарлаа");
      console.error("Зураг deploy хийхэд алдаа гарлаа", error);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setDeployedImg(uploadedUrl);
        setValue("avatarImage", uploadedUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setDeployedImg("");
    setValue("avatarImage", "");
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => {
    if (open && user?.profile) {
      reset({
        name: user?.profile?.name || "",
        about: user?.profile?.about || "",
        socialMediaUrl: user?.profile?.socialMediaUrl || "",
        avatarImage: user?.profile?.avatarImage || "",
      });
      setImagePreview(user.profile.avatarImage || null);
      setDeployedImg(user.profile.avatarImage || "");
    }
  }, [open, user?.profile, reset]);

  const onSubmit = async (data: EditPageDialogFormData) => {
    try {
      setLoading(true);

      await api.put(`/profile/${user?.id}`, {
        ...data,
        avatarImage: deployedImg,
      });
      console.log("zurag", data);

      toast.success("Амжилттай шинэчлэгдлээ");
      await getUser();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <DialogHeader>
            <DialogTitle>Профайл засварлах</DialogTitle>
            <DialogDescription>
              Өөрийн профайлыг энд засварлаж хадгална уу.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <span className="text-[14px] text-black font-[500]">
              Зураг нэмэх
            </span>
            <label
              htmlFor="image"
              className="cursor-pointer w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative"
            >
              {imagePreview ? (
                <img
                  src={imagePreview || user?.profile.avatarImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-[28px] h-[28px] text-gray-500" />
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
            {imagePreview && (
              <button
                className="text-sm text-red-500 absolute top-[140px] right-[330px]"
                onClick={handleRemoveImage}
              >
                x
              </button>
            )}
          </div>
          <input type="hidden" {...register("avatarImage")} />
          <div className="space-y-2">
            <Label htmlFor="name">Нэр</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Нэрээ оруулна уу"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">Өөрийн тухай</Label>
            <Textarea
              id="about"
              {...register("about")}
              placeholder="Өөрийнхөө тухай бичнэ үү"
            />
            {errors.about && (
              <p className="text-sm text-red-500">{errors.about.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="socialMediaUrl">Сошл хуудсын холбоос</Label>
            <Input
              id="socialMediaUrl"
              {...register("socialMediaUrl")}
              placeholder="https://"
            />
            {errors.socialMediaUrl && (
              <p className="text-sm text-red-500">
                {errors.socialMediaUrl.message}
              </p>
            )}
          </div>
          <DialogFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={!isValid || loading}
              className="w-[246px] h-[40px] mt-4"
            >
              {loading ? "Хадгалж байна..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
