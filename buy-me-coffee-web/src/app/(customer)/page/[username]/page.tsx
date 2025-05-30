"use client";

import { CameraIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { api } from "@/axios";
import { Donation, useAuth, User } from "@/app/_components/AuthProvider";
import { ProfileDetails } from "./_components/ProfileDetails";
import { DonationsDetails } from "./_components/DonationsDetails";
import { Donate } from "./_components/Donate";

const CLOUD_NAME = "dxhmgs7wt";
const UPLOAD_PRESET = "buy-me-coffee";

type Params = {
  username: string;
};

export default function UserPage() {
  const { user } = useAuth();
  const { username } = useParams<Params>();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProfileAndDonations = useCallback(async () => {
    setLoading(true);
    try {
      const { data: userData } = await api.get(`/${username}`);
      setProfileUser(userData.user);
      setBackgroundImage(userData.user?.profile?.backgroundImage || null);

      const { data: donationData } = await api.get(
        `/donation/received/${username}`
      );
      setDonations(donationData.donations || []);
    } catch (error) {
      toast.error("Мэдээллийг авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) fetchProfileAndDonations();
  }, [fetchProfileAndDonations]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = res.data.url;

      if (user?.id) {
        await api.put(`/profile/${user.id}`, { backgroundImage: imageUrl });
        setBackgroundImage(imageUrl);
      }
    } catch {
      toast.error("Зураг байрлуулахад алдаа гарлаа");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleImageUpload(file);
  };

  if (loading || !profileUser) {
    return <div className="text-center p-4">Ачааллаж байна...</div>;
  }

  const isOwnPage = user?.id === profileUser.id;

  return (
    <div className="w-full p-4 relative">
      <div className="w-full h-[319px] bg-gray-200 rounded-md overflow-hidden relative">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
        )}
        {!isOwnPage && user?.id && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded flex items-center gap-2 z-20"
            >
              <CameraIcon className="w-4 h-4" />
              Add cover page
            </button>
          </>
        )}
      </div>

      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 flex gap-[100px] z-30">
        <div className="flex flex-col gap-5 w-[632px]">
          <ProfileDetails user={profileUser} isOwnPage={isOwnPage} />
          <DonationsDetails data={donations} profileUser={profileUser} />
        </div>
        <Donate recipientId={profileUser.id} />
      </div>
    </div>
  );
}
