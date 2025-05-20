"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Anchor, CameraIcon, Coffee, PictureInPicture } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { EditPageDialog } from "../components/EditPageDialog";

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

type Params = {
  id: string;
};
type User = {
  name: string;
  email: string;
};

export default function UserPage() {
  //     const { id } = useParams<Params>()
  //     const [user, setUser] = useState<User>(null)
  // useEffect(() => {
  //     const getUser = async () => {
  //         const { data } = await axios.get(`http://localhost:3001/page/${id}?language=en-Us`,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${Access_Token}`
  //                 }
  //             }
  //         )
  //                     setUser(data)
  //     }
  //             getUser()
  // }, [id])

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
            <div className="flex justify-between pl-[24px] pr-[24px]">
              <div className="flex gap-[12px]">
                <Avatar className="w-[48px] h-[48px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-[48px] h-[48px]"
                  />
                  <AvatarFallback className="w-[48px] h-[48px]">
                    CN
                  </AvatarFallback>
                </Avatar>

                <div className="font-[700] text-[20px]">Jake</div>
              </div>
              <div className="w-[96px]">
                <EditPageDialog />
              </div>
            </div>
            <CardHeader className="text-lg font-semibold">
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
            <CardHeader className="text-lg font-semibold">
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
            <CardHeader className="text-lg font-semibold">
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
        <Card className="mb-[50px] p-[24px]">
          <CardHeader className="text-[24px] font-[600] text-left">
            Buy Jake a Coffee
          </CardHeader>

          <CardContent className="space-y-4 w-[623px]">
            <div className="space-y-2">
              <Label>Select amount:</Label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 5, 10].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="bg-[#F4F4F5CC] w-[72px]"
                  >
                    <Coffee />${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2 mt-[32px] mb-[20px]">
              <Label>Enter BuyMeCoffee or social account URL:</Label>
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
              <button className="flex justify-center items-center w-full bg-[black] rounded-lg text-white h-[40px] mt-[32px]">
                Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
