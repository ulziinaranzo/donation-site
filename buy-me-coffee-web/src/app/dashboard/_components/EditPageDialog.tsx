"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "sonner"

const editProfileSchema = z.object({
  name: z.string().min(1, "Нэрээ оруулна уу"),
  about: z.string().min(1, "Өөрийн тухай бичнэ үү"),
  url: z.string().url("Зөв URL оруулна уу"),
});

type  EditPageDialogFormData = z.infer<typeof editProfileSchema>

export function EditPageDialog() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const {
        register, handleSubmit, formState: {errors, isValid}
    } = useForm<EditPageDialogFormData>({
        resolver: zodResolver(editProfileSchema),
        mode: "onChange"
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            };
             reader.readAsDataURL(file);
        }
    }

    const onSubmit = (data: EditPageDialogFormData) => {
        console.log("updated profile", data);
        toast.success("Амжилттай шинэчлэгдлээ")
        
    }

  return (
    <Dialog>
                              <DialogTrigger asChild>
       <Button className="bg-[#F4F4F5] text-black text-[14px] font-[500] pb-[2px]">Edit Page</Button>
      </DialogTrigger>
      <DialogContent className="w-[558px] h-[441px]">
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
            className="cursor-pointer w-40 h-40 rounded-full/// border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative"
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
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
           <DialogFooter className="flex justify-end">
          <Button type="submit"
                        className="w-[246px] h-[40px] mt-4"
              disabled={!isValid}>Save changes</Button>
        </DialogFooter>
        </form>
       <DialogContent/>
    </Dialog>
  )
}
