"use client"

"use client";
import { CameraIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/axios";
import { Donation, useAuth } from "@/app/_components/AuthProvider";
import { ProfileDetails } from "@/app/(customer)/page/[id]/_components/ProfileDetails";
import { DonationsDetails } from "@/app/(customer)/page/[id]/_components/DonationsDetails";
import { Donate } from "@/app/(customer)/page/[id]/_components/Donate";
import { DonateUsingUsername } from "../_components/DonateUsingUsername";


const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dxhmgs7wt";

type Params = {
  username: string;
};

export default function UserPage() {
  const { user } = useAuth();
  const { username } = useParams<Params>();
  const [data, setData] = useState<Donation[]>([]);
  const [anonymousUser, setAnonymousUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    user?.profile?.backgroundImage || null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const [deployedImg, setDeployedImg] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/profile/view/${username}`);
        setData(response.data.donations || []);

        const anonRes = await api.get("/user/9");
        setAnonymousUser(anonRes.data.user);
      } catch (error) {
        console.error("Donation-ийг авахад алдаа гарлаа", error);
        toast.error("Мэдээллийг авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (username) getUser();
  }, [username]);

  const uploadImage = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = response.data.url;
      await api.put(`/profile/${user?.id}`, {
        backgroundImage: imageUrl,
      });
      return imageUrl;
    } catch (error) {
      toast.error("Зураг байрлуулахад алдаа гарлаа");
      console.error("Зураг deploy хийхэд алдаа гарлаа", error);
    }
  };

  const handleUpload = async (file: File) => {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      setDeployedImg(uploadedUrl);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleUpload(file);
  };

  useEffect(() => {
    if (user?.profile?.backgroundImage) {
      setBackgroundImage(user.profile.backgroundImage);
    }
  }, [user]);

  return (
    <div className="w-full mx-auto p-4 relative">
      <div className="w-full h-[319px] bg-gray-200 relative rounded-md overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        {String(user?.id) && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageSelect}
            />
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20 w-[181px] h-[40px] rounded-lg bg-black text-white flex items-center justify-center gap-2 text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraIcon className="w-4 h-4" />
              Add cover page
            </button>
          </>
        )}
      </div>

      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 z-30 flex gap-[100px]">
        <div className="flex flex-col gap-5 w-[632px]">
          <ProfileDetails />
          <DonationsDetails data={data} anonymousUser={anonymousUser} />
        </div>

        <DonateUsingUsername recipientId={Number(username)} />
      </div>
    </div>
  );
}
