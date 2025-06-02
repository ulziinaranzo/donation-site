"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/axios";
import { User } from "@/app/_components/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CompletedIcon } from "@/assets/CompletedIcon";

type SuccessMessageProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: number;
};

export const SuccessMessage = ({
  open,
  onOpenChange,
  recipientId,
}: SuccessMessageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (recipientId && open) {
      const fetchUser = async () => {
        try {
          setLoading(true);
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
  }, [recipientId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Donation амжилттай илгээгдлээ</DialogTitle>
          <DialogDescription>Хэрэглэгчийн талархал</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <CompletedIcon />
          </div>

          {loading ? (
            <p>Уншиж байна...</p>
          ) : (
            <Card className="w-full p-4">
              <div className="flex items-start gap-3">
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
                <div className="text-sm">
                  <p className="font-semibold mb-1">{user?.profile?.name}</p>
                  <p>{user?.profile?.successMessage || "Танд баярлалаа!"}</p>
                </div>
              </div>
            </Card>
          )}

          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Буцах
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
