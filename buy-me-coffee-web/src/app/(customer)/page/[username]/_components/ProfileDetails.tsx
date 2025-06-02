"use client";

import { User } from "@/app/_components/AuthProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditPageDialog } from "./EditPageDialog";

type ProfileDetailsProps = {
  user: User;
  isOwnPage: boolean;
};

export const ProfileDetails = ({ user, isOwnPage }: ProfileDetailsProps) => {
  const name = user?.profile?.name || "Unnamed";
  const avatar = user?.profile?.avatarImage || "";
  const about = user?.profile?.about || "Хэрэглэгчийн тухай мэдээлэл байхгүй.";

  return (
    <Card className="shadow-sm">
      <div className="flex justify-between items-center px-6 pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-bold text-lg">{name}</span>
        </div>
        {!isOwnPage && <EditPageDialog />}
      </div>
      <CardHeader>Тухай</CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{about}</p>
      </CardContent>
    </Card>
  );
};
