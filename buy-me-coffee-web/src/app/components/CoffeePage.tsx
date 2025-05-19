"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anchor, CameraIcon, PictureInPicture } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

export default function CoffeePage() {
  const [profileImage, setProfileImage] = useState("");
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Error uploading image");
      return null;
    }
  };
  return (
    <div className="w-full mx-auto p-4 relative">
      <div className="w-full h-[319px] bg-gray-200 relative rounded-md overflow-hidden">
        {profileImage && (
          <img
            src={profileImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        <input
          type="file"
          className="w-full h-[319px] text-transparent bg-[gray]"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadImage(file).then((url) => {
                if (url) setProfileImage(url);
              });
            }
          }}
        />

        <button className="w-[181px] h-[40px] rounded-lg bg-black text-white flex items-center justify-center gap-[8px] text-[14px] absolute top-1/2 left-1/2 z-20">
          <CameraIcon className="w-[16px] h-[16px]" />
          Add cover page
        </button>
      </div>

      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 gap-[20px] z-30 flex">
        <div className="flex flex-col gap-[20px] w-[632px]">
          <Card className="shadow-sm">
            <div className="flex p-[24px]">
              <div className="flex gap-[12px]">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-[700] text-[20px]">Jake</div>
              </div>
            </div>
            <CardHeader className="text-lg font-semibold pb-2">
              About Jake
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                I'm a typical person who enjoys exploring different things. I
                also make music art as a hobby. Follow me along.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="text-lg font-semibold pb-2">
              Social Media
            </CardHeader>
            <CardContent>
              <a
                href="https://buymeacoffee.com/spacerutz44"
                className="text-sm break-all hover:underline text-black"
                target="_blank"
              >
                https://buymeacoffee.com/spacerutz44
              </a>
            </CardContent>
          </Card>
          <Card className="shadow-s">
            <CardHeader className="text-lg font-semibold pb-2">
              Recent Supporters
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <img
                src="/Images/177043.png"
                className="flex justify-items-center w-[64px] h-[64px]"
              />
              <p className="text-sm text-muted-foreground text-center py-2">
                Be the first one to support Jake
              </p>
            </CardContent>
          </Card>
        </div>
        <div className=""></div>
        <Card>
          <CardHeader className="text-2xl font-bold text-center">
            Buy Jake a Coffee
          </CardHeader>

          <CardContent className="space-y-4 w-[623px]">
            <div className="space-y-2">
              <Label>Social media URL:</Label>
              <a
                href="https://buymasacoffee.com/space/rcl4r4"
                className="text-sm text-blue-600 hover:underline"
                target="_blank"
              >
                https://buymasacoffee.com/space/rcl4r4
              </a>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Recent Supporters</h3>
              <p className="text-sm text-muted-foreground">
                Be the first one to support Jake
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Select amount:</Label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="flex-1 min-w-[80px]"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Enter buymasacoffee.com/ or social account URL:</Label>
              <div className="flex items-center gap-1">
                <Input placeholder="buymasacoffee.com/your-username" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Special message:</Label>
              <Textarea
                placeholder="Please write your message here."
                className="h-[153px]"
              />
              <button className="flex justify-center items-center w-full bg-[gray] rounded-lg text-white h-[40px]">
                Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
