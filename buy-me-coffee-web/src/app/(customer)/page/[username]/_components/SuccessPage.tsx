// SuccessMessage.tsx
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { api } from "@/axios";
import { User } from "@/app/_components/AuthProvider";
import { useEffect, useState } from "react";
import { CompletedIcon } from "@/assets/CompletedIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SuccessMessageProps = {
  recipientId: number;
};

export const SuccessMessage = ({ recipientId }: SuccessMessageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (recipientId) {
      const fetchUser = async () => {
        try {
          const res = await api.get(`/profile/id/${recipientId}`);
          setUser(res.data.user);
        } catch (err) {
          console.error("Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [recipientId]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <Card className="w-full max-w-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <CompletedIcon />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">
          Donation амжилттай илгээгдлээ
        </h2>
        {loading ? (
          <p>Уншиж байна...</p>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            {user?.profile?.avatarImage?.startsWith("http") ? (
              <Image
                src={user.profile.avatarImage}
                alt="User"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
            )}
            <div className="text-left text-sm">
              <p className="font-semibold">{user?.profile?.name}</p>
              <p>{user?.profile?.successMessage || "Танд баярлалаа!"}</p>
            </div>
          </div>
        )}
        <Button onClick={() => router.push("/")}>Буцах</Button>
      </Card>
    </div>
  );
};
