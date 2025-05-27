"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CameraIcon, Coffee } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { api } from "@/axios";
import { useAuth, User } from "@/app/_components/AuthProvider";
import { EditPageDialog } from "@/app/(customer)/page/[id]/_components/EditPageDialog";
import { Donate } from "./_components/Donate";

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

type Params = {
  id: string;
};

export default function UserPage() {
  const { user } = useAuth();
  const { id } = useParams<Params>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/donation/received/${user?.id}`);
        setData(response.data.donations || []);
        console.log(response.data.donations);
      } catch (error) {
        console.error("Donation-ийг авахад алдаа гарлаа", error);
        toast.error("Мэдээллийг авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (id) getUser();
  }, [id, user?.id]);

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
      toast.error("Зураг байрлуулахад алдаа гарлаа");
      return null;
    }
  };
  {
    console.log("BG Image:", user?.profile.backgroundImage);
  }
  return (
    <div className="w-full mx-auto p-4 relative">
      <div className="w-full h-[319px] bg-gray-200 relative rounded-md overflow-hidden">
        {user?.profile?.backgroundImage && (
          <img
            src={user.profile.backgroundImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadImage(file).then((url) => {
                if (url) setProfileImage(url);
              });
            }
          }}
        />
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20 w-[181px] h-[40px] rounded-lg bg-black text-white flex items-center justify-center gap-2 text-sm">
          <CameraIcon className="w-4 h-4" />
          Add cover page
        </button>
      </div>

      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 z-30 flex gap-[100px]">
        <div className="flex flex-col gap-5 w-[632px]">
          <Card className="shadow-sm">
            <div className="flex justify-between items-center px-6 pt-4">
              <div className="flex gap-3 items-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user?.profile?.avatarImage || ""} />
                  <AvatarFallback>
                    {user?.profile?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="font-bold text-lg">
                  {user?.profile?.name || "Unnamed"}
                </div>
              </div>
              <EditPageDialog />
            </div>
            <CardHeader>About {user?.profile?.name}</CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {user?.profile?.about || "No description provided."}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>Social Media</CardHeader>
            <CardContent>
              <a
                href={user?.profile?.socialMediaUrl || "#"}
                className="text-sm break-all hover:underline text-blue-600"
                target="_blank"
              >
                {user?.profile?.socialMediaUrl || "No link provided."}
              </a>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>Recent Supporters</CardHeader>
            <CardContent className="space-y-4">
              {data.length === 0 ? (
                <div className="text-center py-4">
                  <img src="/Images/177043.png" className="mx-auto w-16 h-16" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Be the first one to support{" "}
                    {user?.profile?.name || "this user"}.
                  </p>
                </div>
              ) : (
                data.map((item, i) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage
                            src={item.recipient?.profile?.avatarImage || ""}
                          />
                          <AvatarFallback>
                            {item.recipient?.profile?.name?.charAt(0) || "R"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {item.recipient?.profile?.name}
                          </p>
                          {item.recipient?.profile?.socialMediaUrl && (
                            <a
                              href={`https://${item.recipient.profile.socialMediaUrl}`}
                              className="text-sm text-blue-500 hover:underline"
                              target="_blank"
                            >
                              {item.recipient.profile.socialMediaUrl}
                            </a>
                          )}
                          {item.specialMessage && (
                            <p className="text-sm mt-1 text-muted-foreground">
                              {item.specialMessage.length > 100
                                ? `${item.specialMessage.slice(0, 100)}...`
                                : item.specialMessage}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">+ ${item.amount}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {i < data.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

<Donate/>
      </div>
    </div>
  );
}
