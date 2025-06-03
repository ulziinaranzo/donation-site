"use client";

import { CameraIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { Donation, useAuth, User } from "@/app/_components/AuthProvider";
import { ProfileDetails } from "./_components/ProfileDetails";
import { DonationsDetails } from "./_components/DonationsDetails";
import { Donate } from "./_components/Donate";
import { api } from "@/axios";

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
      const { data: userData } = await api.get(`/profile/view/${username}`);
      setProfileUser(userData);
      setBackgroundImage(userData.profile?.backgroundImage || null);
      console.log("Fetched profile user:", userData);

      const { data: donationData } = await api.get(
        `/donation/received/${username}`
      );
      setDonations(donationData.donations || []);
    } catch (error) {
      console.error(error);
      toast.error("Мэдээллийг авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchProfileAndDonations();
    }
  }, [fetchProfileAndDonations, username]);

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
    } catch (error) {
      console.error(error);
      toast.error("Зураг байрлуулахад алдаа гарлаа");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleImageUpload(file);
  };

  const isOwnPage = user?.id === profileUser?.id;

  return (
    <div className="w-full p-4 relative">
      <div className="w-full h-[319px] bg-gray-200 rounded-md overflow-hidden relative">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="cover"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        )}
        {isOwnPage && user?.id && (
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
          {profileUser && (
            <>
              <ProfileDetails user={profileUser} isOwnPage={isOwnPage} />
              <DonationsDetails data={donations} profileUser={profileUser} />
            </>
          )}
        </div>
        <Donate
          recipientId={profileUser?.id}
          refetchDonations={fetchProfileAndDonations}
        />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="text-white text-lg">Ачааллаж байна...</div>
        </div>
      )}
    </div>
  );
}
